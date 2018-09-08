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
  selector: 'app-config-page',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.css']
})
export class ConfigPageComponent implements OnInit {
	cookieValue: any;
	req: any;
	listOfAllConfigs: any;
  shouldLoadPreLoader: any;
  value: any;
	loadAllConfigs() {
		const httpOptions  = {
	  headers: new HttpHeaders({
	     "Content-Type": "application/json",
	     "Authorization" : this.cookieValue
	  })
};
let that = this;
this.req = this.http.get(this.appConstant.LoginUrl + '/api/getConfig', httpOptions)
.subscribe  (
 res => {
    this.listOfAllConfigs = res;
    that.shouldLoadPreLoader = false;
  },
  err => {
    alert("Loading List Failed");
  })
	}

  updateConfig(event, objectConfig, count) {
    console.log(this.value[count]);
    console.log(count);
    console.log(objectConfig);

  }

  constructor(
  	  	private http: HttpClient,
  	    public appConstant: AppConstant, 
  	    private cookieService: CookieService,
  	    ) { }

  ngOnInit() {
  	this.cookieValue = this.cookieService.get('jwt-token');
  	this.loadAllConfigs();
    this.shouldLoadPreLoader = true;
  }

}
