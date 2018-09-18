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
  selector: 'app-enter-details',
  templateUrl: './enter-details.component.html',
  styleUrls: ['./enter-details.component.css']
})
export class EnterDetailsComponent implements OnInit {
	idOfUser: any;
  req: any;
  userDetails: any;

firstName: any;
lastName: any;
email: any;
phoneNumber: any;
countryCode: any;

userId: any;
salesId: any;
showSuccessPage: any;

linkedInDetails: any;


  constructor(
    private router: Router,
     private cookieService: CookieService,
     private http: HttpClient,
     public appConstant: AppConstant,
  ) { }


getUserInfo() {
  const httpOptions  = {
        headers: new HttpHeaders({
           "Content-Type": "application/json"
        })
      }

  this.req = this.http.get(this.appConstant.LoginUrl + '/getLead/'+ this.idOfUser, httpOptions)
.subscribe  (
 res => {
    this.userDetails = res;
    this.userId = this.userDetails._id;
    this.salesId = this.userDetails.leadBy;
  },
  err => {
    alert("Error in loading.");
  })
}

registerUserFromReference() {

    const httpOptions  = {
        headers: new HttpHeaders({
           "Content-Type": "application/json"
        })
      }



      var body = {
        'firstName' : this.firstName,
        'lastName': this.lastName,
        'email': this.email,
        'phone' : this.phoneNumber,
        'countryCode' : this.countryCode,
        "userId" : this.userId,
        "salesId" : this.salesId

      }




      this.req = this.http.post(this.appConstant.LoginUrl + '/createOnReference',JSON.stringify(body), httpOptions)
.subscribe  (
 res => {
   // alert("Success");
   this.showSuccessPage = true;
  },
  err => {
    alert("Error in registering");
  })

}
loginSignUp() {
  let URLParams = this.router.url.split('?');
  console.log("DOOM" + URLParams[1]);

  


 this.req = this.http.get('https://ergasi-nodejs.cfapps.us10.hana.ondemand.com/oauth/linkedin/callback/?' +URLParams[1] )
.subscribe  (
 res => {
   // alert("Success");
   alert("SUCCESS");
   this.linkedInDetails = res;
   console.log(this.linkedInDetails);
  },
  err => {

    alert("Error in registering");
  })
}
  ngOnInit() {
    // this.showSuccessPage = false;
  	console.log("Router is: " + this.router.url);
    this.loginSignUp();
  	// this.idOfUser = this.router.url.split('/');
  	// this.idOfUser = this.idOfUser[2];
   //  console.log("FINAL ID IS: " + this.idOfUser);
   //  this.getUserInfo();
   //  window.scrollBy(0, 500);
  }

}
