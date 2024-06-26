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
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {


    constructor(private router: Router,
     private cookieService: CookieService,
     private http: HttpClient,
     public appConstant: AppConstant, 

     ) { }
    adminFirstName: any;
    adminLastName: any;
    adminPhoneNumber: any;
    adminEmail: any;
    adminPassword: any;
    adminGender: any;
    req: any;
    cookieValue: any;
    listOfAllAdmins: any;
    adminUserId: any;

    listOfCompanies: any;

    jobId: any;
    companyid: any;
    questionOneId: any;
    questionTwoId: any;
    userId: any;

    questionOne: any;
    questionTwo: any;

applyToTheJob() {
     const httpOptions  = {
        headers: new HttpHeaders({
           "Content-Type": "application/json",
            // "Authorization" : this.cookieValue

        })
      };
  var body = {
  "companyId":  this.companyid,
  "jobId":  this.jobId,
  "userId": this.userId ,
  "answers": [
    {
      "question": this.questionOneId,
      "answer": this.questionOne
    },
    {
      "question": this.questionTwoId,
      "answer": this.questionTwo
    }
  ]
}

console.log("BOSY OF APPLY IS: " , body);


this.req = this.http.post(this.appConstant.oneDashURL + 'api/applyjob',JSON.stringify(body), httpOptions)
.subscribe  (
 res => {
   alert("Successfully applied!");
  },
  err => {
    alert("Job apply failed");
  })

} 






setDetailsForModalApply(jobId,companyId,questionOne,questionTwo) {
  console.log("Opening Modal " + jobId + " " + companyId + " "  + questionOne + " " + questionTwo);
    this.jobId = jobId;
    this.companyid = companyId;
    this.questionOneId = questionOne;
    this.questionTwoId = questionTwo;

}

    createAdmin() {
      const httpOptions  = {
        headers: new HttpHeaders({
           "Content-Type": "application/json",
            "Authorization" : this.cookieValue

        })
      };

      var body = {
        'firstName' : this.adminFirstName,
        'lastName': this.adminLastName,
        'email': this.adminEmail,
        'password' : this.adminPassword,
        'phone' : this.adminPhoneNumber,
        'gender' : this.adminGender
      }


      this.req = this.http.post(this.appConstant.LoginUrl + '/api/createAdmin',JSON.stringify(body), httpOptions)
.subscribe  (
 res => {
   // this.loadAllAdminDetails();
  },
  err => {
    alert("Admin creation failed");
  })
    }

 loadAllCompanies() {
   const httpOptions  = {
        headers: new HttpHeaders({
           "Content-Type": "application/json",
            // "Authorization" : this.cookieValue

        })
      };

 this.req = this.http.get('https://ergasi-nodejs.cfapps.us10.hana.ondemand.com/api/getjobs', httpOptions)
.subscribe  (
 res => {
   this.listOfCompanies = res;
   // console.log(this.Fapp);
  },
  err => {
    alert("Company listing failed");
  })
 }

 editAdminDetails(userId) {
   this.adminUserId = userId;
   console.log(this.adminUserId);
 }

 updateAdminDetails() {
    const httpOptions  = {
        headers: new HttpHeaders({
           "Content-Type": "application/json",
            "Authorization" : this.cookieValue

        })
      };

      var body = {
        // "userId" : this.adminUserId,
        // 'firstName' : this.adminFirstNameEdit,
        // 'lastName': this.adminLastNameEdit,
        // 'password' : this.adminPasswordEdit,
        // 'phone' : this.adminPhoneNumberEdit,
        // 'gender' : this.adminGenderEdit
}
   this.req = this.http.put(this.appConstant.LoginUrl + '/api/editAdmin  ',JSON.stringify(body), httpOptions)
.subscribe  (
 res => {
   // this.loadAllAdminDetails();
  },
  err => {
    alert("Admin creation failed");
  })
 }

  ngOnInit() {
     // this.cookieValue = this.cookieService.get('jwt-token');
     // this.loadAllCompanies();
       this.userId = this.cookieService.get('userid-token');
     this.loadAllCompanies();
  }

}
