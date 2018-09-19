import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpParams } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RequestOptions } from '@angular/http';
import { AppConstant } from '../app-constants';
@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {
req: any;
listOfAllApplicants: any;
constructor(
	private router: Router,
     private cookieService: CookieService,
     private http: HttpClient,
     public appConstant: AppConstant, 

     ) {

}

loadDashboard(eachData) {
	this.cookieService.set( 'github-token', eachData.userId.github);
	this.cookieService.set( 'fiverr-token', eachData.userId.fiverr);
	this.cookieService.set( 'codeforces-token', eachData.userId.codeforces);
	this.cookieService.set( 'codechef-token', eachData.userId.codechef);
	let tmp = this.cookieService.get( 'codechef-token');
	console.log("Hello tmp is:  " +  tmp);

	this.router.navigate(["dashboard"]);

}
listAllApplicants() {
	   const httpOptions  = {
        headers: new HttpHeaders({
           "Content-Type": "application/json",
            // "Authorization" : this.cookieValue

        })
      };
  this.req = this.http.get('https://ergasi-nodejs.cfapps.us10.hana.ondemand.com/api/getAllApplicants', httpOptions)
.subscribe  (
 res => {
  	this.listOfAllApplicants = res;
  },
  err => {
    alert("");
  })
}
  ngOnInit() {
  	this.listAllApplicants();
  }

}
