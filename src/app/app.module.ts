import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { LoginSignUpComponent } from './login-sign-up/login-sign-up.component';
import { RegisterComponent } from './register/register.component';

import { ProfileComponent } from './profile/profile.component';

import { AppConstant } from './app-constants';//application config
import { HttpModule } from '@angular/http';
import { RequestOptions } from '@angular/http'//application config
import { DefaultRequestOptions } from './default-request-options';
import { DisplayContentComponent } from './display-content/display-content.component';







const routes: Routes = [
 {path:'', redirectTo:'app', pathMatch:'full'},
 {path:'login-sign-up',component:LoginSignUpComponent},
 {path:'register' ,component:RegisterComponent },
 {path:'profile',component:ProfileComponent},
 {path:'**',redirectTo:'app'},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginSignUpComponent,
    RegisterComponent,
    ProfileComponent,
    DisplayContentComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    FormsModule,
    AngularMultiSelectModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [CookieService , AppConstant , 
        ],
  bootstrap: [AppComponent]
})
export class AppModule { }
