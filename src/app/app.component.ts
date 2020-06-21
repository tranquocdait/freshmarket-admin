import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStoreManager } from './services/local-store-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  checkLogin: boolean=false;
  uncheckLogin: boolean=true;
  constructor(private router: Router,private localStoreManager:LocalStoreManager){
    this.getCheckLogin();
  }
  getCheckLogin(){
    if(this.localStoreManager.getToken()===null){this.router.navigateByUrl('/login');}
    this.checkLogin=true;
    this.uncheckLogin=false;
  }
}
