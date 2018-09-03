import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppConstant } from '../app-constants';

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
  num: any;
  groupName: any;
  routerObject : any;
  groupId: any;
  groupDetailsObject: any;
  newNameGroup: any;


  contentTitle: any;
  contentType: any;
  contentIntro: any;
  contentDescription: any;
  contentPolicy: any;
  contentLocation: any;
  contentStatus: any;
  contentLevel: any;


totalEmailCount: any;
  constructor(private router: Router, private cookieService: CookieService, 
    private http: HttpClient,
    public appConstant: AppConstant, 
) {
    console.log("Constructor is being called");
  }
addMoreInputField() {
  let currentCount = this.totalEmailCount.length;
  currentCount++;
  this.totalEmailCount.push(currentCount);
}

deleteField(eachCount) {
  eachCount--;
  console.log("Deleting " + this.totalEmailCount[eachCount]);
   delete this.totalEmailCount[eachCount];
   console.log("After: " +  " total:  " +  this.totalEmailCount);
  console.log("Deleting " + this.totalEmailCount[eachCount] + " total:  " +  this.totalEmailCount);

}


  ngOnInit() {
    this.totalEmailCount = [1];

this.cookieValue = this.cookieService.get('jwt-token');
this.routerObject = this.router;
// this.groupId = this.routerObject.rawUrlTree.queryParams.groupId;
this.loadChildGroupDetails();

   if(!this.cookieValue)
   {
   this.router.navigate([""]);
     
}
}

loadChildGroupDetails() {
  console.log("Loading Group Details");

      const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'authorization': this.cookieValue
        // 'authorization': "asdasdsa"

      })
    };
this.req = this.http.get(this.appConstant.LoginUrl + '/api/group/find/children' , httpOptions)
.subscribe  (
 res => {
    // alert("Success");
    this.groupDetailsObject = res;
    console.log("OBJECT OF GROUP: NAME ", this.groupDetailsObject.data[0]);
  },
  err => {
    alert("Loging Fail");
  })





}

createContentForGroup() {


    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'authorization': this.cookieValue
        // 'authorization': "asdasdsa"

      })
    };

    var body = {
   "groupId": this.groupId,
    "title": this.contentTitle,
    "type": this.contentType,
    "introduction": this.contentIntro,
    "description": this.contentDescription,
    "policy": this.contentPolicy,
    "location": this.contentLocation,
    "status": this.contentStatus,
    "level": this.contentLevel
  }

console.log("BOSY IS: " , body);

console.log("BOSY IS: " + body.level);
this.req = this.http.post(this.appConstant.LoginUrl + '/api/content',JSON.stringify(body), httpOptions)
.subscribe  (
 res => {
    this.objRes = res;
    // alert("CONTENT CREATED");
    console.log(this.objRes);

  },
  err => {
    alert("Loging Fail");
  })





}


updateGroup() {
  console.log("New name: " + this.newNameGroup + " " + " grp id: " +this.groupId );

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'authorization': this.cookieValue
        // 'authorization': "asdasdsa"

      })
    };

    var body = {
    "name" : this.newNameGroup,
    "groupId" : this.groupId 
  }

this.req = this.http.put(this.appConstant.LoginUrl + '/api/group',JSON.stringify(body), httpOptions)
.subscribe  (
 res => {
    this.objRes = res;
    // alert(this.objRes.info);

    console.log(this.objRes);
    this.loadChildGroupDetails();

  },
  err => {
    alert("Loging Fail");
  })




}

setUpdateId(groupId){
  this.groupId = groupId;
  console.log("Val of groupId " + this.groupId);
}


addGroup() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'authorization': this.cookieValue
        // 'authorization': "asdasdsa"

      })
    };

    var body = {
    "name" : this.groupName
  }

this.req = this.http.post(this.appConstant.LoginUrl + '/api/group',JSON.stringify(body), httpOptions)
.subscribe  (
 res => {
    // alert("Success");
    this.objRes = res;
    console.log(this.objRes);
    this.loadChildGroupDetails();
  },
  err => {
    alert("Loging Fail");
  })
}


deleteGroup(groupId) {
     const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'authorization': this.cookieValue
        // 'authorization': "asdasdsa"

      })
    };

    var body = {
    "name" : this.groupName
  }

this.req = this.http.delete(this.appConstant.LoginUrl + '/api/group/'+ groupId, httpOptions)
.subscribe  (
 res => {
    this.loadChildGroupDetails();
  },
  err => {
    alert("Del Fail");
  })
}

}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjZiM2Q3Mzg4MzI2MDJhZjNhNzgyMzMiLCJncm91cElkIjoiNWI2YzY0YTlmNzkzNWMxMDVlZTUxOThmIiwiaWF0IjoxNTM1Mjg0ODQyLCJleHAiOjE2ODUyODQ4NDJ9.K54tEayTzf3kZjmAHJbfkkTCkqTuQl8EoTq81u9Mzmo
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjgyOTYxOGY1YThmNzJlM2Y3NGY4YzMiLCJpYXQiOjE1MzUyODQ5MjAsImV4cCI6MTY4NTI4NDkyMH0.PBPedIZ9K4GufNXe2Lsd7-8RlaWLhuBmoevuzRDZ0Bs
