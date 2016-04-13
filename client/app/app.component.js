System.register(['angular2/core', 'angular2/router', './home/home.component', './login/login.component', './play/play.component', './services/data.service'], function(exports_1, context_1) {
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
    var core_1, router_1, home_component_1, login_component_1, play_component_1, data_service_1, router_2;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (play_component_1_1) {
                play_component_1 = play_component_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(router, dataService) {
                    var _this = this;
                    this.router = router;
                    this.dataService = dataService;
                    this.title = 'abc';
                    this.loged = false;
                    // let tmp = sessionStorage.getItem("PokerEmail");
                    data_service_1.DataService.connect();
                    var socket = data_service_1.DataService.getsocket();
                    socket.on('checkLog', function (bool) {
                        _this.loged = bool;
                    });
                    this.title = "3 Card Poker";
                }
                AppComponent.prototype.login = function () {
                    this.router.navigate(['Login']);
                };
                AppComponent.prototype.logout = function () {
                    var socket = data_service_1.DataService.getsocket();
                    socket.emit('logout', sessionStorage.getItem("PokerEmail"));
                    sessionStorage.removeItem("PokerEmail");
                    this.router.navigate(['Login']);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.html',
                        styleUrls: ['app/style.css'],
                        directives: [router_2.ROUTER_DIRECTIVES],
                        providers: [data_service_1.DataService]
                    }),
                    router_2.RouteConfig([
                        new router_2.Route({ path: '/home', component: home_component_1.HomeComponent, name: 'Home', useAsDefault: true, data: { isAdmin: true } }),
                        new router_2.Route({ path: '/login', component: login_component_1.LoginComponent, name: 'Login' }),
                        new router_2.Route({ path: '/play', component: play_component_1.PlayComponent, name: 'Play' })
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router, data_service_1.DataService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map