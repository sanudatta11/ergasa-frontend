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


  getAllEmailDetails: any; 
  getAllNames: any;
  getAllEmails: any;
  getAllFirstNames:any;
  getAllSecondNames: any;
  getAllCountryCodes: any;
  getAllPhone:any;
  results: any;
  fileReaded: any;

  dataFromCSV: any;
  csvResponse: any;
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

setEmailToInvite(event,count) {
  this.getAllEmails[count]=event.target.value;
}
setPhoneToInvite(event,count) {
  this.getAllPhone[count]=event.target.value;
}
setFirstNameToInvite(event,count) {
  this.getAllFirstNames[count] = event.target.value;
}
setLastNameToInvite(event, count) {
  this.getAllSecondNames[count] = event.target.value;
}
setCountryCodeInvite(event, count) {
  this.getAllCountryCodes[count] = event.target.value;
}
submitAllData() {

  let emailList = this.getAllEmails;
  let firstNameList=  this.getAllFirstNames;
  let lastNameList = this.getAllSecondNames;
  let countryCodeList = this.getAllCountryCodes;
  let phoneList = this.getAllPhone;


  for (var i=0;i<this.totalEmailCount.length;i++) {
    this.results.push({
      "email" : emailList[i],
      "firstName": firstNameList[i],
      "lastName" : lastNameList[i],
      "phone": phoneList[i],
      "countryCode": countryCodeList[i]
    })
  }

  // this.results = this.results.toArray();
  this.results = this.results;
  console.log(typeof(this.results));
  console.log(this.results);


    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'authorization': this.cookieValue
        // 'authorization': "asdasdsa"

      })
    };
     var body = {
    "datas" : this.results
  }
this.req = this.http.post(this.appConstant.LoginUrl + '/api/inviteByEmails' , JSON.stringify(body),httpOptions)
.subscribe  (
 res => {
    alert("Success");
    
  },
  err => {
    alert("Loging Fail");
  })


}


csv2Array(fileInput: any){
//read file from input
this.fileReaded = fileInput.target.files[0];

let reader: FileReader = new FileReader();
reader.readAsText(this.fileReaded);
let that = this;
 reader.onload = (e) => {
 let csv = reader.result as string;
 let allTextLines = csv.split(/\r|\n|\r/);
 let headers = allTextLines[0].split(',');
 let lines = [];

  for (let i = 0; i < allTextLines.length; i++) {
    // split content based on comma
    let data = allTextLines[i].split(',');
    if (data.length === headers.length) {
      let tarr = [];
      for (let j = 0; j < headers.length; j++) {
        tarr.push(data[j]);
      }

     // log each row to see output 
     console.log(tarr);
     lines.push(tarr);
  }
 }
 // all rows in the csv file 
 console.log(">>>>>>>>>>>>>>>>>", lines);
 that.csvResponse = lines;
} 
}

sendAllInvitesFromCSV(){
//   console.log(this.csvResponse);

//   for (var i=0;i<this.csvResponse;i++) {
//       this.dataFromCSV.push({
//         "countryCode" : this.csvResponse[i][0],
//       })
//   }
// console.log(this.dataFromCSV);
//    const httpOptions = {
//       headers: new HttpHeaders({
//         "Content-Type": "application/json",
//         'authorization': this.cookieValue
//         // 'authorization': "asdasdsa"

//       })
//     };

// console.log(this.csvResponse[0][0]);
// console.log(this.csvResponse);
let csvResponseObject = this.csvResponse;
console.log("Have a look at my size: " + csvResponseObject.length);
let that = this;
for(let i=0;i<csvResponseObject.length;i++) {
  that.dataFromCSV.push({
      "countryCode" : csvResponseObject[i][0],
      "email" : csvResponseObject[i][1],
      "firstName": csvResponseObject[i][2],
      "lastName" : csvResponseObject[i][3],
      "phone": csvResponseObject[i][4],
  })
}
console.log(this.dataFromCSV);




    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'authorization': this.cookieValue
      })
    };


     var body = {
    "datas" : this.dataFromCSV
  }
this.req = this.http.post(this.appConstant.LoginUrl + '/api/inviteByEmails' , JSON.stringify(body),httpOptions)
.subscribe  (
 res => {
    alert("Success All!");
    
  },
  err => {
    alert("Loging Fail");
  })


}





  ngOnInit() {
    this.totalEmailCount = [1];
    this.getAllNames = {};
    this.getAllEmails = {};
    this.getAllFirstNames = {};
    this.getAllSecondNames = {};
    this.getAllCountryCodes = {};
    this.getAllPhone = {};
    this.results = [];
    this.dataFromCSV = [];


this.cookieValue = this.cookieService.get('jwt-token');
this.routerObject = this.router;
// this.groupId = this.routerObject.rawUrlTree.queryParams.groupId;
// this.loadChildGroupDetails();

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
