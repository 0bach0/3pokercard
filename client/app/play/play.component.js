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
    var PlayComponent;
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
            PlayComponent = (function () {
                function PlayComponent(router, dataService) {
                    var _this = this;
                    this.router = router;
                    this.dataService = dataService;
                    this.receiveCount = 0;
                    this.u = [['', 0, 0],
                        ['', 0, 0],
                        ['', 0, 0],
                        ['', 0, 0]];
                    this.card = [['back', 'back', 'back'],
                        ['back', 'back', 'back'],
                        ['back', 'back', 'back'],
                        ['back', 'back', 'back']];
                    var socket = data_service_1.DataService.getsocket();
                    this.name = sessionStorage.getItem("PokerEmail");
                    socket.emit('gamestatus');
                    socket.emit('getRoom');
                    socket.on('accountInRoom', function (bool) {
                        var pos = -1;
                        _this.accountList = bool;
                        for (var i = 0; i < _this.accountList.length; ++i)
                            if (_this.name === _this.accountList[i]) {
                                pos = i;
                                break;
                            }
                        _this.admin = (pos == 0);
                        _this.u[0][0] = _this.accountList[pos];
                        _this.u[1][0] = _this.accountList[(pos + 1) % 4];
                        _this.u[2][0] = _this.accountList[(pos + 2) % 4];
                        _this.u[3][0] = _this.accountList[(pos + 3) % 4];
                        if ((sessionStorage.getItem("PokerEmail") == null) || (pos == -1)) {
                            _this.router.navigate(['Home']);
                        }
                    });
                    socket.on('cardDistribute', function (card) {
                        var cardbase = [['back', 'back', 'back'],
                            ['back', 'back', 'back'],
                            ['back', 'back', 'back'],
                            ['back', 'back', 'back']];
                        _this.card = cardbase;
                        _this.receiveCard = card;
                        console.log('Receive Card', card);
                    });
                    socket.on('userFlip', function (name, card) {
                        _this.receiveCount++;
                        _this.receiveCount = _this.receiveCount % 4;
                        var base1, base2, pos;
                        console.log('Thang khac lat ', name, card);
                        for (var i = 0; i < _this.accountList.length; ++i) {
                            if (_this.accountList[i] === name) {
                                base2 = i;
                            }
                            if (_this.accountList[i] === _this.name) {
                                base1 = i;
                            }
                        }
                        if (base2 > base1) {
                            pos = base2 - base1;
                        }
                        else {
                            pos = 4 - base1 + base2;
                        }
                        _this.card[pos] = card;
                        console.log(_this.receiveCount);
                        if (_this.receiveCount == 0) {
                            var max = 0;
                            var sum;
                            for (var i = 0; i < 4; ++i) {
                                sum = _this.card[i][0] + _this.card[i][1] + _this.card[i][2];
                                if (sum > max) {
                                    max = sum;
                                }
                            }
                            console.log('Gia tri lon nhat', max);
                            for (var i = 0; i < 4; ++i) {
                                sum = _this.card[i][0] + _this.card[i][1] + _this.card[i][2];
                                if (sum >= max) {
                                    _this.u[i][1]++;
                                }
                                else {
                                    _this.u[i][2]++;
                                }
                            }
                        }
                        console.log(_this.u);
                    });
                    socket.on('exitWhenPlay', function () {
                        alert('Game finish.');
                        _this.router.navigate(['Home']);
                    });
                }
                PlayComponent.prototype.distribute = function () {
                    if (true) {
                        var socket = data_service_1.DataService.getsocket();
                        socket.emit('cardDistribute');
                    }
                };
                PlayComponent.prototype.flip = function () {
                    this.receiveCount++;
                    this.receiveCount = this.receiveCount % 4;
                    if (this.receiveCount == 0) {
                        var max = 0;
                        var sum;
                        for (var i = 0; i < 4; ++i) {
                            sum = this.card[i][0] + this.card[i][1] + this.card[i][2];
                            if (sum > max) {
                                max = sum;
                            }
                        }
                        console.log('Gia tri lon nhat', max);
                        for (var i = 0; i < 4; ++i) {
                            sum = this.card[i][0] + this.card[i][1] + this.card[i][2];
                            if (sum >= max) {
                                this.u[i][1]++;
                            }
                            else {
                                this.u[i][2]++;
                            }
                        }
                    }
                    var socket = data_service_1.DataService.getsocket();
                    this.card[0] = this.receiveCard;
                    socket.emit('flip', this.name, this.receiveCard);
                };
                PlayComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/play/play.html',
                        styleUrls: ['app/style.css'],
                        providers: [data_service_1.DataService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, data_service_1.DataService])
                ], PlayComponent);
                return PlayComponent;
            }());
            exports_1("PlayComponent", PlayComponent);
        }
    }
});
//# sourceMappingURL=play.component.js.map