import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})

export class LocalStoreManager {
    private reservedKeys: any =
        {
            token: 'token'
        };
    public setToken(token: string) {
        localStorage.setItem(this.reservedKeys.token, token);
    }
    public removeToken() {
        localStorage.removeItem(this.reservedKeys.token);
    }
    public getToken() : string {
        return localStorage.getItem(this.reservedKeys.token);
    }
}