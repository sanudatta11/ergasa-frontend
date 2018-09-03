import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpParams } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// import { LoginService } from '../services/login.service';
import { RequestOptions } from '@angular/http';
import { AppConstant } from '../app-constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  req:any;
  objRes: any;
  username: any;
  fName:any;
  lName:any;
  email:any;
  password:any;
  number:any;
  gender:any;
  type:any;
  userStatus:any;
  cookieValue:any;
  options: any;
  
    constructor(private router: Router,
     private cookieService: CookieService,
     private http: HttpClient,
     public appConstant: AppConstant, 

     ) { 
      console.log("Constructor is being called");
    }
  
  
  
 registerToApp() { 


  const httpOptions  = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization" : this.cookieValue

  })
};


var body = {
    "username": this.username,
    "firstName": this.fName,
    "lastName": this.lName,
    "email": this.email,
    "password": this.password,
    "phone":this.number,
    "gender":  this.gender,
    "type": this.type,
    "userStatus": this.userStatus,
  }
this.req = this.http.post(this.appConstant.LoginUrl + '/api/user',JSON.stringify(body), httpOptions)
.subscribe  (
 res => {
    alert("Success Register");
  },
  err => {
    // console.log("Error is ");
    // console.log(err);
    // console.log("This much only");
    // console.log("Error Occured in BASIC APi ");
    alert("Error while registering");
  })
  }
    ngOnInit() {
this.cookieValue = this.cookieService.get('jwt-token');
console.log("JJJJJJJJJJJWWWWWWWWWTTTTTTTTTTTTT" + this.cookieValue);

   console.log("JWT is: " + this.cookieValue);
   if(!this.cookieValue)
   {
     this.router.navigate([""]);
   }
}


}
