import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private cookieService: CookieService,
) { }
  typeOfAccount: any;
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

  }


}
