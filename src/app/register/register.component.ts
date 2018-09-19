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
  // objRes: any;
  // username: any;
  // fName:any;
  // lName:any;
  // email:any;
  // password:any;
  // number:any;
  // gender:any;
  // type:any;
  // userStatus:any;
  // cookieValue:any;
  // options: any;
  // listOfEmailTemplates: any;
  // listOfSMSTemplates: any;
  // typeOfUser: any;

  // emailTemplateId: any;
  // smsTemplateId: any;
  // timeOfSubscription: any;
  // countryCode: any;

  // companyName: any;
  // companyAbout: any;
  // companyYear: any;
  // companyFunding: any;



  
imageURLLink: any;
resumeLink : any;
githubLink : any;
linkedInLink  : any;
fiverrLink : any;
codeforcesLink  : any;
codechefLink : any;
userId: any;
    constructor(
      private router: Router,
     private cookieService: CookieService,
     private http: HttpClient,
     public appConstant: AppConstant, 

     ) { 
      console.log("Constructor is being called");
    }

// setEmailTemplate(event) {
//   this.emailTemplateId = event.target.value;
//   console.log(this.emailTemplateId);
// };
// setSMSTemplate(event) {
//   this.smsTemplateId = event.target.value;
//   console.log(this.smsTemplateId);

// }


createNewProfile() {
 const httpOptions  = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    // "Authorization" : this.cookieValue

  })
};

var body = {
    
"imgUrl": this.imageURLLink,
"resume" : this.resumeLink,
"github" : this.githubLink,
"linkedIn": this.linkedInLink,
"fiverr" : this.fiverrLink,
"codeforces" : this.codeforcesLink,
"codechef" : this.codechefLink,
"userId" :  this.userId
  }
console.log("BODY IS: " , body);
this.req = this.http.post(this.appConstant.oneDashURL + 'api/completeProfile', JSON.stringify(body),httpOptions)
.subscribe  (
 res => {
    alert("Success Register");
  },
  err => {
    // console.log("Error is ");
    // console.log(err);
    // console.log("This much only");
    // console.log("Error Occured in BASIC APi ");
    alert(err);
    console.log(err);
  })
}

//  createNewCompany() { 
// console.log("CCCCCCCVVVVVVVVVVV " + this.cookieValue);

//   const httpOptions  = {
//   headers: new HttpHeaders({
//     "Content-Type": "application/json",
//     // "Authorization" : this.cookieValue

//   })
// };
// // oneDashURL

// var body = {
//     "name": this.companyName,
//     "about": this.companyAbout,
//     "yearFounded": this.companyYear,
//     "funding": this.companyFunding,
//   }

// this.req = this.http.post(this.appConstant.oneDashURL + 'api/createCompany', JSON.stringify(body),httpOptions)
// .subscribe  (
//  res => {
//     alert("Success Register");
//   },
//   err => {
//     // console.log("Error is ");
//     // console.log(err);
//     // console.log("This much only");
//     // console.log("Error Occured in BASIC APi ");
//     alert(err);
//     console.log(err);
//   })
//   }




    ngOnInit() {

  this.userId = this.cookieService.get('userid-token');

// this.cookieValue = this.cookieService.get('jwt-token');
// console.log("JJJJJJJJJJJWWWWWWWWWTTTTTTTTTTTTT" + this.cookieValue);
// this.loadSMSTemplates();
// this.loadEmailTemplates();
   // console.log("JWT is: " + this.cookieValue);
   // if(!this.cookieValue)
   // {
   //   this.router.navigate([""]);
   // }
}


}
