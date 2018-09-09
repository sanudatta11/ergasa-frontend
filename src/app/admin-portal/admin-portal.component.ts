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

    adminUserIdEdit:any;
    adminFirstNameEdit: any;
adminLastNameEdit: any;
adminPasswordEdit: any;
adminPhoneNumberEdit: any;
adminGenderEdit: any;


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
   this.loadAllAdminDetails();
  },
  err => {
    alert("Admin creation failed");
  })
    }

 loadAllAdminDetails() {
   const httpOptions  = {
        headers: new HttpHeaders({
           "Content-Type": "application/json",
            "Authorization" : this.cookieValue

        })
      };

 this.req = this.http.get(this.appConstant.LoginUrl + '/api/getAllAdmin', httpOptions)
.subscribe  (
 res => {
   this.listOfAllAdmins = res;
   console.log(this.listOfAllAdmins);
  },
  err => {
    alert("Admin listing failed");
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
        "userId" : this.adminUserId,
        'firstName' : this.adminFirstNameEdit,
        'lastName': this.adminLastNameEdit,
        'password' : this.adminPasswordEdit,
        'phone' : this.adminPhoneNumberEdit,
        'gender' : this.adminGenderEdit
}
   this.req = this.http.put(this.appConstant.LoginUrl + '/api/editAdmin  ',JSON.stringify(body), httpOptions)
.subscribe  (
 res => {
   this.loadAllAdminDetails();
  },
  err => {
    alert("Admin creation failed");
  })



 }

  ngOnInit() {
     this.cookieValue = this.cookieService.get('jwt-token');
     this.loadAllAdminDetails();
  }

}
