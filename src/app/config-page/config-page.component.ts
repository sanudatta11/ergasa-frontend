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
  typeOfUser: any;

  codeChefDetailsObject: any;
  fiverrDetailsObject: any;

  codeChefUser: any;
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
    console.log("Loading List Failed");
  })
	}

  updateConfig(configObject) {

    let elm = (document.getElementById(configObject.name) as HTMLInputElement);
    let configId = configObject._id;
    let configName = configObject.name;
    let configData = elm.value;

    console.log("ELM VAL " + elm.value  + " config ID " + configId + " configName " + configName);
      const httpOptions  = {
        headers: new HttpHeaders({
           "Content-Type": "application/json",
           "Authorization" : this.cookieValue
        })
    };
    var body = {
     'configId':  configId,
      'name': configName,
      'data' : configData
    }
    this.req = this.http.put(this.appConstant.LoginUrl + '/api/editConfig',JSON.stringify(body) ,httpOptions)
      .subscribe  (
       res => {
         this.loadAllConfigs();
         alert("Configs Updated");
        },
        err => {
          console.log("Loading List Failed");
        })

  }
loadCodeChefdata() {
    const httpOptions  = {
        headers: new HttpHeaders({
           "Content-Type": "application/json",
           // "Authorization" : this.cookieValue
        })
    };

     this.req = this.http.get('https://ergasi-nodejs.cfapps.us10.hana.ondemand.com/api/getCodechefProfile/sanurocks5',httpOptions)
      .subscribe  (
       res => {
           this.codeChefDetailsObject = res;
           console.log("Codechef success");
           console.log(this.codeChefDetailsObject);
        },
        err => {
          console.log("Codechef failed");
        })


}
loadFiverrData() {
    const httpOptions  = {
        headers: new HttpHeaders({
           "Content-Type": "application/json",
           // "Authorization" : this.cookieValue
        })
    };

     this.req = this.http.get('https://ergasi-nodejs.cfapps.us10.hana.ondemand.com/api/getFiverrProfile/soumyajitdutta',httpOptions)
      .subscribe  (
       res => {
           this.fiverrDetailsObject = res;
           console.log("Fiverr success");
           console.log(this.fiverrDetailsObject);
        },
        err => {
          console.log("Fiverr failed");
        })


}
  constructor(
  	  	private http: HttpClient,
  	    public appConstant: AppConstant, 
  	    private cookieService: CookieService,
  	    ) { }

  ngOnInit() {
  	this.cookieValue = this.cookieService.get('jwt-token');
    console.log("cookie after login: " + this.cookieValue );
    this.typeOfUser = this.cookieService.get('type-of-user');
  	this.loadAllConfigs();
    this.loadCodeChefdata();
    this.loadFiverrData();
    this.shouldLoadPreLoader = true;
  }

}
