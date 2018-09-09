import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpParams } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private cookieService: CookieService,
      private router: Router, 
) { }
  typeOfAccount: any;
  cookieValue: any;
logoutUser(){
	console.log("CLICKED");
	this.cookieService.deleteAll();

}
  ngOnInit() {
  	if(this.cookieService.get('type-of-user')=='1') {
  		 this.typeOfAccount = "Admin"
  	}
  	else if (this.cookieService.get('type-of-user')=='2') {
  		this.typeOfAccount = "Sales"
  	}
   this.cookieValue = this.cookieService.get('jwt-token');

  if(this.cookieValue == "") {
    this.router.navigate([""]);
  }

  }


}
