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
  selector: 'app-show-leads',
  templateUrl: './show-leads.component.html',
  styleUrls: ['./show-leads.component.css']
})
export class ShowLeadsComponent implements OnInit {

  constructor(
  	private http: HttpClient,
  	    public appConstant: AppConstant, 
  	    private cookieService: CookieService,
  	    ) { }
  shouldShowPreLoader: any;
  req: any;
  listOfAllLeads: any;
  cookieValue: any;

loadAllLeads() {

  const httpOptions  = {
	  headers: new HttpHeaders({
	     "Content-Type": "application/json",
	     "Authorization" : this.cookieValue
	  })
};
console.log(httpOptions);
let that = this;
this.req = this.http.get(this.appConstant.LoginUrl + '/api/getAllLeads', httpOptions)
.subscribe  (
 res => {
    this.listOfAllLeads = res;
    that.shouldShowPreLoader = false;
  },
  err => {
    alert("Loading List Failed");
  })
}
  ngOnInit() {
  	this.cookieValue = this.cookieService.get('jwt-token');
  	this.shouldShowPreLoader = true;
  	this.loadAllLeads()

  }

}
