import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-enter-details',
  templateUrl: './enter-details.component.html',
  styleUrls: ['./enter-details.component.css']
})
export class EnterDetailsComponent implements OnInit {
	idOfUser: any;
  constructor(
    private router: Router, 
  ) { }

  ngOnInit() {
  	console.log(this.router.url);
  	this.idOfUser = this.router.url.split('/');
  	this.idOfUser = this.idOfUser[2];
  }

}
