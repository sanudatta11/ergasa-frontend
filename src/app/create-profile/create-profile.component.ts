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
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {



imageURLLink: any;
resumeLink : any;
githubLink : any;
linkedInLink  : any;
fiverrLink : any;
codeforcesLink  : any;
codechefLink : any;
req:any;


    constructor(private router: Router,
     private cookieService: CookieService,
     private http: HttpClient,
     public appConstant: AppConstant, 

     ) { 
      console.log("Constructor is being called");
    }

 createNewProfile() { 
  const httpOptions  = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    // "Authorization" : this.cookieValue

  })
};
// oneDashURL

var body = {
    
"imgUrl": this.imageURLLink,
"resume" : this.resumeLink,
"github" : this.githubLink,
"linkedIn": this.linkedInLink,
"fiverr" : this.fiverrLink,
"codeforces" : this.codeforcesLink,
"codechef" : this.codechefLink
  }

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





  ngOnInit() {
  }
 
}
