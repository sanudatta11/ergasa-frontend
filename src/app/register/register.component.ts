import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpParams } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

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
  inlineRadioOptions:any;
  type:any;
  userStatus:any;
  cookieValue:any;
  options: any;
  
    constructor(private router: Router, private cookieService: CookieService,private http: HttpClient) { 
      console.log("Constructor is being called");
    }
  
  
  
  registerToApp() { 
  
    const httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin" : "*",
      "authorization" : this.cookieService.get('JWT_token')
    })
  };
  var body = {
    username : this.username,
    firstName: this.fName,
    lastName: this.lName,
    email: this.email,
    password : this.password,
    phone: this.number,
    gender: this.inlineRadioOptions,
    type : this.type,
    userStatus: this.userStatus
  };
  console.log(body);
  
  this.req = this.http.post('http://localhost:8000/api/user',JSON.stringify(body), httpOptions)
  .subscribe  (
   res => {
      console.log("I am in Good Block");
     this.objRes = res;
     console.log(this.objRes);
     this.router.navigate(["login"]);
    },
    err => {
      console.log("Error is ");
      console.log(err);
      console.log("This much only");
      console.log("Error Occured in BASIC APi ");
    })
    }
    ngOnInit() {
    }


}
