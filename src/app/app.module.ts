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
import { NavbarComponent } from './navbar/navbar.component';
import { EnterDetailsComponent } from './enter-details/enter-details.component';
import { MessageTemplateComponent } from './message-template/message-template.component';
import { LogPageComponent } from './log-page/log-page.component';
import { ConfigPageComponent } from './config-page/config-page.component';
import { LeadsDetailsComponent } from './leads-details/leads-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardsComponent } from './cards/cards.component';
import { ShowLeadsComponent } from './show-leads/show-leads.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';
   

import {
    SocialLoginModule,
    AuthServiceConfig,
    LinkedinLoginProvider
} from "angular5-social-auth";
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { ApplicantsComponent } from './applicants/applicants.component'



const routes: Routes = [
 // {path:'', redirectTo:'app', pathMatch:'full'},
 {path:'login-sign-up',component:LoginSignUpComponent},
 {path:'register' ,component:RegisterComponent },
 {path:'profile',component:ProfileComponent},
 {path:'',component:LoginSignUpComponent},
 {path:'oauth/callback/successful',component:EnterDetailsComponent},
 {path:'message-template',component:MessageTemplateComponent},
 {path:'log-page',component:LogPageComponent},
 {path:'config-page',component:ConfigPageComponent},
 {path:'leads-details',component:LeadsDetailsComponent},
 {path:'dashboard',component:DashboardComponent},
 {path:'admin-portal',component:AdminPortalComponent},
 {path:'admin-portal',component:AdminPortalComponent},
 {path:'create-profile',component:CreateProfileComponent},
 {path:'applicants',component:ApplicantsComponent},


 // {path:'**',redirectTo:'app'},
];
// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
         {
          id: LinkedinLoginProvider.PROVIDER_ID,
          provider: new LinkedinLoginProvider('814yacdk68651y')
        },
      ]
  );
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    LoginSignUpComponent,
    RegisterComponent,
    ProfileComponent,
    NavbarComponent,
    EnterDetailsComponent,
    MessageTemplateComponent,
    LogPageComponent,
    ConfigPageComponent,
    LeadsDetailsComponent,
    DashboardComponent,
    CardsComponent,
    ShowLeadsComponent,
    AdminPortalComponent,
    CreateProfileComponent,
    ApplicantsComponent,

  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    FormsModule,
    AngularMultiSelectModule,
    HttpClientModule,
    HttpModule,
    SocialLoginModule,
    Ng2GoogleChartsModule
  ],
  providers: [
  CookieService, 
  AppConstant, 
  {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
   }
        ],
  bootstrap: [AppComponent]
})
export class AppModule { }
