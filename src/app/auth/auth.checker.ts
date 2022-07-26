import { Injectable } from "@angular/core";

@Injectable()
export class AuthChecker {

    constructor() { }
    
    isAuthenticated() {
        return localStorage.getItem("user") !== null;
    }
    
}

