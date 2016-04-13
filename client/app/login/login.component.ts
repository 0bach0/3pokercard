import {Component} from 'angular2/core';
import {AppComponent} from '../app.component';
import {Router} from 'angular2/router';
import {DataService} from '../services/data.service';


@Component({
    templateUrl: 'app/login/login.html',
    styleUrls:['app/style.css'],
    providers: [DataService]
})

export class LoginComponent {
	

    public email = '';
    public password = '';
    
    constructor(public dataService: DataService,public router: Router) {
        if(sessionStorage.getItem("PokerEmail")!=null) {
            this.router.navigate( ['Home'] );
        }

        // this.id = this.routerParams.get('id');
        // this.email = this.routerParams.get('email');
    }

    userLogin()
    {        
        var socket = DataService.getsocket();
        socket.emit('login', this.email, this.password);

        var p1 = new Promise(function(resolve) { 
            socket.on('loginResult',
                bool => {
                    resolve(bool);
                });
        });

        p1.then(val => {
            if (val){
                sessionStorage.setItem("PokerEmail", this.email);
                this.router.navigate( ['Home'] );   
            }
            else{
                alert("Your username or password mismatch.");                
            }
            
        });

        
        // var p1 = new Promise( resolve => { 
        //     resolve( this.userService.login(this.email, this.password));
        // });

        // p1.then(
        //     // Log the fulfillment value
        //     function(val) {
        //         console.log('Trong then', val);
        //     });

        // p1.then(val => {
        //     console.log('2',val);
        //     if (val){
        //         sessionStorage.setItem("PokerEmail", this.email);
        //         this.router.navigate( ['Home'] );   
        //     }
        //     else{
        //         alert("Your username or password mismatch.");
        //     }
        // });


        // if(this.userService.login(this.email,this.password)) {
        //     //Luu vao session
        //     AppComponent.loged = true;
        //     console.log('Function login',AppComponent.loged);
        //     sessionStorage.setItem("PokerEmail", this.email);
        //     this.router.navigate( ['Home'] );   
        // }
        // else{
        //     alert("Your username or password mismatch.");
        // }
        
    }
    
    
}