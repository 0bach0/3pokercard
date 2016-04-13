import { Injectable } from 'angular2/core';


/**
 * UserService
 */

@Injectable()
export class DataService {
    public static socket;

    constructor() {
    }

    public static connect(){
        DataService.socket = io.connect('http://192.168.6.122:3000');
    }

    static getsocket(){
        return DataService.socket;
    }


    }

}

