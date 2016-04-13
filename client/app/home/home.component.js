System.register(['angular2/core', 'angular2/router', '../services/data.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, data_service_1;
    var HomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent(router, dataService) {
                    var _this = this;
                    this.router = router;
                    this.dataService = dataService;
                    this.ent = false;
                    this.admin = false;
                    var socket = data_service_1.DataService.getsocket();
                    this.name = sessionStorage.getItem("PokerEmail");
                    if (sessionStorage.getItem("PokerEmail") == null) {
                        this.router.navigate(['Login']);
                    }
                    else {
                        socket.emit('updateLogin', sessionStorage.getItem("PokerEmail"));
                    }
                    socket.emit('getUserList');
                    socket.on('userList', function (bool) {
                        _this.userList = bool;
                    });
                    socket.emit('getRoom');
                    socket.on('accountInRoom', function (bool) {
                        _this.accountRoom = bool;
                        _this.peoplenumber = bool.length;
                        if (bool[0] === null) {
                            _this.peoplenumber = 0;
                        }
                    });
                    socket.on('exitRoom', function (bool) {
                        // alert('Admin has been logout');
                        _this.ent = false;
                    });
                    socket.on('gameStart', function () {
                        _this.router.navigate(['Play']);
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
                }
                ;
                HomeComponent.prototype.enterRoom = function () {
                    var _this = this;
                    var socket = data_service_1.DataService.getsocket();
                    socket.emit('enterRoom', sessionStorage.getItem("PokerEmail"));
                    socket.on('Entered', function (bool) {
                        _this.ent = true;
                        _this.admin = (bool == 0);
                    });
                    socket.on('Failed', function () {
                        // alert('Full');
                        // this.ent = true;
                    });
                };
                HomeComponent.prototype.gameStart = function () {
                    var socket = data_service_1.DataService.getsocket();
                    socket.emit('gameStart');
                };
                HomeComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/home/home.html',
                        styleUrls: ['app/style.css'],
                        providers: [data_service_1.DataService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, data_service_1.DataService])
                ], HomeComponent);
                return HomeComponent;
            }());
            exports_1("HomeComponent", HomeComponent);
        }
    }
});
//# sourceMappingURL=home.component.js.map