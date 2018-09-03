import { Component, OnInit } from '@angular/core';


import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpParams } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AppConstant } from '../app-constants';

// import { LoginService } from '../services/login.service';


var url = "http://localhost:8000/";

@Component({
  selector: 'app-login-sign-up',
  templateUrl: './login-sign-up.component.html',
  styleUrls: ['./login-sign-up.component.css' ]
})

export class LoginSignUpComponent implements OnInit {

req:any;
objRes: any;
email: any;
password:any;
cookieValue: any;
options: any;

  constructor(
    private router: Router, 
    private cookieService: CookieService,
    private http: HttpClient,     
    public appConstant: AppConstant, 

) { 
    console.log("Constructor is being called");
  }


loginToApp()
{
  console.log("CLICKED");
      const httpOptions  = {
  headers: new HttpHeaders({
     "Content-Type": "application/json"
  })
};


var body = {
     'email' : this.email,
    'password': this.password,
}
console.log("Body : " , body , "httpOptions" , httpOptions);
this.req = this.http.post(this.appConstant.LoginUrl + '/login',JSON.stringify(body), httpOptions)
.subscribe  (
 res => {
    this.objRes = res;
    console.log("Response: " , this.objRes.token);
    this.cookieService.set( 'jwt-token', this.objRes.token );
    
    this.router.navigate(["profile"]);

  },
  err => {
    alert("Loging Fail");
  })
}

 
  ngOnInit() {
    // console.log("Have a look" , this.appConstant.LoginUrl);

  }
 
  }


