import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {DataService} from '../services/data.service';

@Component({
    templateUrl: 'app/home/home.html',
    styleUrls:['app/style.css'],
	providers: [DataService]
})

export class HomeComponent {
    public userList;
    public accountRoom;
    public number,peoplenumber;
    public ent = false;
    public admin = false;
    public name;

    constructor(public router: Router,public dataService: DataService) {
      var socket = DataService.getsocket();
      this.name = sessionStorage.getItem("PokerEmail");

      if(sessionStorage.getItem("PokerEmail")==null) {
            this.router.navigate( ['Login'] );
        }
       else{
        socket.emit('updateLogin',sessionStorage.getItem("PokerEmail"));
       }

      socket.emit('getUserList');

      socket.on('userList',
                bool => {
                    this.userList = bool;
                });
      
      socket.emit('getRoom');
      socket.on('accountInRoom',
                bool => {
                    this.accountRoom = bool;
                    this.peoplenumber = bool.length;
                    if (bool[0]===null)
                      {this.peoplenumber=0;}
                });

      socket.on('exitRoom',
                bool => {
                    // alert('Admin has been logout');
                    this.ent = false;
                });

      socket.on('gameStart',
                () => {
                    this.router.navigate( ['Play'] );
                });

      // var p1 = new Promise(function(resolve) { 
      //       socket.on('userList',
      //           bool => {
      //               resolve(bool);
      //           });
      //   });

      //   p1.then(val => {
      //       this.userList = val;
      //       console.log(this.userList);
        };       

    enterRoom(){
      var socket = DataService.getsocket();
      socket.emit('enterRoom',sessionStorage.getItem("PokerEmail"));
      socket.on('Entered',
                bool => {
                    this.ent = true;
                    this.admin = (bool == 0);
                });
      socket.on('Failed',
                () => {
                    // alert('Full');
                    // this.ent = true;
                });
    }

    gameStart(){
      var socket = DataService.getsocket();
      socket.emit('gameStart');
      
    }
}
