import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PlayComponent } from './play/play.component';
import { DataService } from './services/data.service';
import { RouteConfig, Route, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.html',
    styleUrls:['app/style.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [DataService] 
})
@RouteConfig([
    new Route({path: '/home', component: HomeComponent, name: 'Home', useAsDefault: true,  data: { isAdmin: true } }),
    new Route({path: '/login', component: LoginComponent, name: 'Login'}),
    new Route({path: '/play', component: PlayComponent, name: 'Play'})
])


export class AppComponent {
	public title = 'abc';
    public loged = false;

    constructor(public router: Router,public dataService: DataService) {
        // let tmp = sessionStorage.getItem("PokerEmail");
        DataService.connect();
               
        var socket = DataService.getsocket();
        
        socket.on('checkLog',
                bool => {
                    this.loged = bool;
                });

        this.title = "3 Card Poker";


    }

    login(){
        this.router.navigate( ['Login'] );            
    }

    logout(){
        var socket = DataService.getsocket();
        socket.emit('logout',sessionStorage.getItem("PokerEmail"));
        sessionStorage.removeItem("PokerEmail");
        this.router.navigate( ['Login'] );
    }
}
