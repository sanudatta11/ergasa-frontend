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
@Component({
  selector: 'app-leads-details',
  templateUrl: './leads-details.component.html',
  styleUrls: ['./leads-details.component.css']
})
export class LeadsDetailsComponent implements OnInit {

  constructor(
  	    private http: HttpClient,
  	    public appConstant: AppConstant, 
  	    private cookieService: CookieService,
     
  	) { }

 req: any;
 listOfLeads :any;
 shouldShowPreLoader: any;

 githubRepo: any;
 githubUserId: any;
 contributionCount: any;
 gitHubDetails : any;
 githubFollowers: any;
 gitHubRepoCount : any;

loadRepoDetails() {
  this.req = this.http.get("https://api.github.com/users/"+this.githubUserId)
  .subscribe  (
   res => {
      console.log(res);
      this.gitHubDetails  = res;
      this.gitHubRepoCount = this.gitHubDetails.public_repos;
      this.githubFollowers = this.gitHubDetails.followers;
    },
    err => {
      alert("Loading List Failed");
    })
}

loadSelfDetails() {

//   const httpOptions  = {
//     headers: new HttpHeaders({
//        "Content-Type": "application/json",
//        "Authorization" : this.cookieValue
//     })
// };
let that = this;
this.req = this.http.get("https://api.github.com/search/issues?q=-type:pr+is:public+author:"+this.githubUserId+"&per_page=300" + '/api/getSalesSelfDetail')
.subscribe  (
 res => {
    console.log(res);
    this.githubRepo = res;
    console.log(" githubRepo" , this.githubRepo.items);
    this.githubRepo = this.githubRepo.items;
    this.contributionCount = this.githubRepo.length;

    that.shouldShowPreLoader = false;
  },
  err => {
    alert("Loading List Failed");
  })



}

  ngOnInit() {
   //  this.typeOfUser = this.cookieService.get('type-of-user');
  	// this.cookieValue = this.cookieService.get('jwt-token');
  	// this.shouldShowPreLoader = true;
  	// console.log("Val of cookie in the comp: " + this.cookieValue);
   //  if(this.typeOfUser == 1) {
   //    this.getAllSales();
   //  } else if (this.typeOfUser ==2 ){
   //      this.loadSelfDetails();
   //  }
   this.githubUserId = this.cookieService.get( 'github-token');
   this.loadSelfDetails();
   this.loadRepoDetails();
  }

}
