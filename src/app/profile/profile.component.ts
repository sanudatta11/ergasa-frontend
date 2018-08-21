import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

var url = "http://localhost:8000/api/";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  req: any;
  objRes: any;
  cookieValue: any;
  options: any;

  constructor(private router: Router, private cookieService: CookieService, private http: HttpClient) {
    console.log("Constructor is being called");
  }
  
  ngOnInit() {
    this.getUserData();
  }

  getUserData() {

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        'authorization': this.cookieService.get('JWT_token')
      })
    };
    let userId = this.cookieService.get('userId');

    this.req = this.http.get(url + 'user/id/' + userId, httpOptions)
      .subscribe(
        res => {
            this.objRes = res;
            console.log(this.objRes.data);
        },
        err => {
          alert("Wrong User Id");
          console.log("Error is ");
          console.log(err);
          console.log("This much only");
          console.log("Error Occured in BASIC APi ");
        })
  }

}
