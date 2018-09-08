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
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrls: ['./message-template.component.css']
})
export class MessageTemplateComponent implements OnInit {
textBeforeName: any;
textAfterName: any;
textAfterLink: any;
templateName: any;
cookieValue: any;
req: any;
emailTemplateName: any;
emailTemplateId: any;
  constructor(
  		private http: HttpClient,
  	    public appConstant: AppConstant, 
  	    private cookieService: CookieService,
  	) { }
createSMSTemplate() {
	console.log(this.textAfterLink + " " + this.templateName + " " + this.textAfterLink + " " + this.textBeforeName);
	 const httpOptions  = {
        headers: new HttpHeaders({
           "Content-Type": "application/json",
           "Authorization" : this.cookieValue
        })
    };

     var body = {
       'name':  this.templateName,
      'textBeforeName': this.textBeforeName,
      'textAfterName' : this.textAfterName,
      'textAfterLink': this.textAfterLink
    }
      this.req = this.http.post(this.appConstant.LoginUrl + '/api/createSMSTemplate',JSON.stringify(body) ,httpOptions)
      .subscribe  (
       res => {
         alert("Template Created Successfully");
        },
        err => {
          alert("Loading List Failed");
        })

}

createEmailTemplate() {

 const httpOptions  = {
        headers: new HttpHeaders({
           "Content-Type": "application/json",
           "Authorization" : this.cookieValue
        })
    };

    var body = {
      'name':  this.emailTemplateName,
      'templateId': this.emailTemplateId
    }

    this.req = this.http.post(this.appConstant.LoginUrl + '/api/createEmailTemplate',JSON.stringify(body) ,httpOptions)
      .subscribe  (
       res => {
         alert("Template Created Successfully");
        },
        err => {
          alert("Loading List Failed");
        })


}
  ngOnInit() {
  	this.cookieValue = this.cookieService.get('jwt-token');

  }

}
