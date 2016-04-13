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
    var LoginComponent;
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
            LoginComponent = (function () {
                function LoginComponent(dataService, router) {
                    this.dataService = dataService;
                    this.router = router;
                    this.email = '';
                    this.password = '';
                    if (sessionStorage.getItem("PokerEmail") != null) {
                        this.router.navigate(['Home']);
                    }
                    // this.id = this.routerParams.get('id');
                    // this.email = this.routerParams.get('email');
                }
                LoginComponent.prototype.userLogin = function () {
                    var _this = this;
                    var socket = data_service_1.DataService.getsocket();
                    socket.emit('login', this.email, this.password);
                    var p1 = new Promise(function (resolve) {
                        socket.on('loginResult', function (bool) {
                            resolve(bool);
                        });
                    });
                    p1.then(function (val) {
                        if (val) {
                            sessionStorage.setItem("PokerEmail", _this.email);
                            _this.router.navigate(['Home']);
                        }
                        else {
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
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/login/login.html',
                        styleUrls: ['app/style.css'],
                        providers: [data_service_1.DataService]
                    }), 
                    __metadata('design:paramtypes', [data_service_1.DataService, router_1.Router])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map