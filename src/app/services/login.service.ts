// import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import { AppConstant } from '../app-constants';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpParams } from '@angular/common/http';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// @Injectable()
// export class LoginService {

//   constructor(
//   	public http: Http, 
//     public appConstant: AppConstant) { }

//  Login(email, password){
//   console.log("CLICKED");
//       const httpOptions  = {
//   headers: new HttpHeaders({
//     // 'Authorization' : this.cookieValue,
//     'Content-Type': 'application/json',
//         "Access-Control-Allow-Origin" : "*",
//     "TEST HEADER": "fkshdfuhsuifyueru eru f874ryuwehsuhiufsheriushfiur"
//   })
// };

// var body = {
//   "email" : email,
//   "password" : password
// }
// return this.http.post(this.appConstant.LoginUrl + 'api/login',JSON.stringify(body), httpOptions);
// }





// //     Login(email, password) {
// // //    const httpOptions_addMember  = {
// // //   headers: new HttpHeaders({
// // //     'Content-Type': 'application/json',
// // //         "Access-Control-Allow-Origin" : "*"

    
// // //   })
// // // };
// //   // let headers = new Headers();
// //   //   headers.append('Accept', 'application/json');

// //   // let options = new Headers();
// //   //           options = new Headers();
// //   //           options.append('Content-Type', 'application/json');
// //   //           options.append('X-Requested-With', 'XMLHttpRequest');
// //     	return this.http.post(this.appConstant.LoginUrl + 'api/login', { email: email, password: password });
// //   }
//     Register (email, password) {
//     	return this.http.post(this.appConstant.LoginUrl + 'api/register', { email: email, password: password });
//   }
// }
//   