// import { Injectable } from '@angular/core';
// import {Observable} from 'rxjs/Rx';
// import { HttpClientModule, HTTP_INTERCEPTORS, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
// import { LoginSignUpComponent } from './login-sign-up/login-sign-up.component';
// import { RegisterComponent } from './register/register.component';
// import { AppComponent } from './app.component';

// import { ProfileComponent } from './profile/profile.component';




// @Injectable()
// export class I1 implements HttpInterceptor {
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const modified = req.clone({setHeaders: {'Custom-Header-1': '1'}});
//         return next.handle(modified);
//     }
// }

// @Injectable()
// export class I2 implements HttpInterceptor {
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const modified = req.clone({setHeaders: {'Custom-Header-2': '2'}});
//         return next.handle(modified);
//     }
// }


