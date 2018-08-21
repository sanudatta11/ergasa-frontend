import { Component, OnInit } from '@angular/core';


import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpParams } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

var url = "http://localhost:8000/";

@Component({
  selector: 'app-login-sign-up',
  templateUrl: './login-sign-up.component.html',
  styleUrls: ['./login-sign-up.component.css' ]
})

export class LoginSignUpComponent implements OnInit {

req:any;
objRes: any;
userName: any;
password:any;
cookieValue: any;
options: any;

  constructor(private router: Router, private cookieService: CookieService,private http: HttpClient) { 
    console.log("Constructor is being called");
  }



  loginToApp() { 
console.log(this.userName);
console.log(this.password);

  const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin" : "*"
  })
};
var body = {
  email : this.userName,
  password: this.password
};
console.log(body);

 this.req = this.http.post(url+'login',JSON.stringify(body), httpOptions)
.subscribe  (
 res => {
    console.log("I am in Good Block");
   this.objRes = res;
   console.log(this.objRes);
   this.cookieService.set( 'JWT_token', this.objRes.token );
   this.cookieService.set( 'userId', this.objRes.userId );
   this.cookieValue = this.cookieService.get('JWT_token');
   console.log("JWT is: " + this.objRes.token + "and the cookie is " + this.cookieValue);
   this.router.navigate(["profile"]);
  },
  err => {
    alert("Wrong Email ID or  Password")
    console.log("Error is ");
    console.log(err);
    console.log("This much only");
    console.log("Error Occured in BASIC APi ");
  })
  }
 
  ngOnInit() {
  }

  }


