import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private cookieService: CookieService) { }
  cookieValue: any;
  typeOfUser : any;
  pieChartData: any;
  ngOnInit() {
	this.cookieValue = this.cookieService.get('jwt-token');
	this.typeOfUser = this.cookieService.get('type-of-user');
   
	console.log("Type of user: " + this.typeOfUser);
  }

}
