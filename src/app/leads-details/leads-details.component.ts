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
 cookieValue: any;
 detailsOfLead: any;
 managerName: any;
 listOfAllSaleDetails: any

 showSalesDetils(id) {
   console.log("Id is : " + id);
    const httpOptions  = {
    headers: new HttpHeaders({
       "Content-Type": "application/json",
       "Authorization" : this.cookieValue
    })
};
let that = this;
this.req = this.http.get(this.appConstant.LoginUrl + '/api/getSalesUserDetail/' + id, httpOptions)
.subscribe  (
 res => {
    this.detailsOfLead = res;
    this.managerName = this.detailsOfLead.salesUserObj.firstName + " " +this.detailsOfLead.salesUserObj.lastName;
    this.listOfAllSaleDetails = this.detailsOfLead.leadRefObj;
        console.log(this.listOfAllSaleDetails);


  },
  err => {
    alert("Loading List Failed");
  })

 }
getAllSales()
{

  const httpOptions  = {
	  headers: new HttpHeaders({
	     "Content-Type": "application/json",
	     "Authorization" : this.cookieValue
	  })
};
console.log(httpOptions);
let that = this;
this.req = this.http.get(this.appConstant.LoginUrl + '/api/getAllSales', httpOptions)
.subscribe  (
 res => {
    this.listOfLeads = res;
    that.shouldShowPreLoader = false;
  },
  err => {
    alert("Loading List Failed");
  })
}

  ngOnInit() {
  	this.cookieValue = this.cookieService.get('jwt-token');
  	this.shouldShowPreLoader = true;
  	console.log("Val of cookie in the comp: " + this.cookieValue);
  	this.getAllSales();
  }

}
