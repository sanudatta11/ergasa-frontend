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

import {
    AuthService,
    GoogleLoginProvider,
    LinkedinLoginProvider
} from 'angular5-social-auth';

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
socialPlatformProvider:any;
isRecruiter:any;
idOfUser: any;
  constructor(
    private router: Router, 
    private cookieService: CookieService,
    private http: HttpClient,     
    public appConstant: AppConstant, 
    private socialAuthService: AuthService

) { 
    console.log("Constructor is being called");
  }

   public socialSignIn(socialPlatform : string) {
     console.log("Hello");
     if(socialPlatform == "linkedin"){
       console.log(socialPlatform);
      this.socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
      console.log("LOGGING: " + this.socialPlatformProvider + " "   + LinkedinLoginProvider.PROVIDER_ID);
    }
    console.log("T1");
    this.socialAuthService.signIn(this.socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
            
      }
    );
  }
  
getValueOfChoice() {
  // console.log(event);
  this.isRecruiter = !this.isRecruiter;
    console.log(this.isRecruiter);

}

isProfileComplete() {
  this.req = this.http.get(this.appConstant.oneDashURL + 'api/isCompleteProfile/'+this.idOfUser)
.subscribe  (
 res => {
    console.log("COMPLETE PROFILE");
    this.router.navigate(["admin-portal"]);

  },
  err => {
    console.log("IN COMPLETE PROFILE");
    this.router.navigate(["register"]);

  })
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

if(!this.isRecruiter){
  this.req = this.http.post(this.appConstant.oneDashURL + 'loginapplicant',JSON.stringify(body), httpOptions)
.subscribe  (
 res => {
    this.objRes = res;
    console.log("Response: " , this.objRes.token);
    this.cookieService.set( 'jwt-token', this.objRes.token );
    console.log("cookie during login: " +this.objRes.token  );
    this.cookieService.set( 'type-of-user', this.objRes.typeOfUser );
    // this.router.navigate(["dashboard"]);
    this.idOfUser = this.objRes.userId;
    this.cookieService.set( 'userid-token',  this.idOfUser  );
    this.isProfileComplete();
  },
  err => {
    alert("Loging Fail");
  })
}
else {
   this.req = this.http.post(this.appConstant.oneDashURL + 'loginRecruiter',JSON.stringify(body), httpOptions)
.subscribe  (
 res => {
    this.objRes = res;
    console.log("Response: " , this.objRes.token);
    this.cookieService.set( 'jwt-token', this.objRes.token );
    console.log("cookie during login: " +this.objRes.token  );
    this.cookieService.set( 'type-of-user', this.objRes.typeOfUser );
    this.router.navigate(["dashboard"]);

  },
  err => {
    alert("Loging Fail");
  })
}
}


 
  ngOnInit() {

    this.isRecruiter = false;
    // console.log("Have a look" , this.appConstant.LoginUrl);

  }
 
  }


