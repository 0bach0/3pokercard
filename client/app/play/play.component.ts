import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {DataService} from '../services/data.service';

@Component({
    templateUrl:'app/play/play.html',
    styleUrls:['app/style.css'],
    providers: [DataService]
})

export class PlayComponent {
	public name;
	public admin;
	public accountList;
	public gamestatus;
	public receiveCard;
	public receiveCount=0;
	public u = [['', 0, 0],
	['', 0, 0],
	['', 0, 0],
	['', 0, 0]];

	public card = [['back','back','back'],
	['back','back','back'],
	['back','back','back'],
	['back','back','back']];

		

    constructor(public router: Router,public dataService: DataService) {
    	var socket = DataService.getsocket();
      	this.name = sessionStorage.getItem("PokerEmail");

        socket.emit('gamestatus');

		socket.emit('getRoom');
        socket.on('accountInRoom',
			bool => {
				var pos = -1;
				this.accountList = bool;

				for (var i = 0; i < this.accountList.length; ++i)
					if (this.name === this.accountList[i]) {
						pos = i;
						break;
					}

				this.admin = (pos == 0);
				this.u[0][0] = this.accountList[pos];
				this.u[1][0] = this.accountList[(pos + 1) % 4];
				this.u[2][0] = this.accountList[(pos + 2) % 4];
				this.u[3][0] = this.accountList[(pos + 3) % 4];

				if ((sessionStorage.getItem("PokerEmail") == null) || (pos == -1)) {
					this.router.navigate(['Home']);
				}
			});

        socket.on('cardDistribute',
        	card =>{
        		var cardbase = [['back','back','back'],
					['back','back','back'],
					['back','back','back'],
					['back','back','back']];

				this.card = cardbase;
				this.receiveCard = card;
				console.log('Receive Card', card);
        	}
        	);

        socket.on('userFlip',
        	(name,card)=>{
				this.receiveCount++;
				this.receiveCount = this.receiveCount%4;

				var base1, base2,pos;
				console.log('Thang khac lat ', name, card);
				for (var i = 0; i < this.accountList.length; ++i) 
				{
					if(this.accountList[i]===name) {
						base2 = i;
					}
					if(this.accountList[i]===this.name) {
						base1 = i;
					}
				}
				if(base2>base1) {
					pos = base2 - base1;
				}
				else{
					pos = 4 - base1 + base2;
				}
				this.card[pos] = card;

				console.log(this.receiveCount);
				if(this.receiveCount==0) {

					var max = 0;
					var sum;
					for (var i = 0; i < 4; ++i) {
						sum = this.card[i][0] + this.card[i][1] + this.card[i][2];
						if(sum>max) {
							max = sum;
						}
					}

					console.log('Gia tri lon nhat',max);

					for (var i = 0; i < 4; ++i) {
						sum = this.card[i][0] + this.card[i][1] + this.card[i][2];
						if(sum>=max) {
							this.u[i][1]++;
						}
						else{
							this.u[i][2]++;	
						}
					}
				}
				console.log(this.u);
        	}
       	);

	
        socket.on('exitWhenPlay',
                () => {
					alert('Game finish.');
					this.router.navigate( ['Home'] );
                });

    }

    distribute(){
    	if(true) {
    		var socket = DataService.getsocket();
    		socket.emit('cardDistribute');		
	   	}
    }

    flip(){
    	this.receiveCount++;
    	this.receiveCount = this.receiveCount%4;

		if(this.receiveCount==0) {

			var max = 0;
			var sum;
			for (var i = 0; i < 4; ++i) {
				sum = this.card[i][0] + this.card[i][1] + this.card[i][2];
				if(sum>max) {
					max = sum;
				}
			}
			console.log('Gia tri lon nhat',max);

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
		
    	var socket = DataService.getsocket();
		this.card[0] = this.receiveCard;
		socket.emit('flip', this.name,this.receiveCard);
    }


}
