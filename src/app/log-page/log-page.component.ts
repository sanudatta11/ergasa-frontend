import { Component, OnInit } from '@angular/core';


import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpParams } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AppConstant } from '../app-constants';
@Component({
  selector: 'app-log-page',
  templateUrl: './log-page.component.html',
  styleUrls: ['./log-page.component.css']
})
export class LogPageComponent implements OnInit {
  
  codeforcesId: any;
  req: any;
  codeForcesData: any;
  pieChartData:any;
  chartData: any[];
  bestCodeForcesRating : any;
  bestCodeForcesRank: any;

  loadCodeForcesData() {
  this.req = this.http.get("http://codeforces.com/api/user.rating?handle=" + this.codeforcesId)
  .subscribe  (
   res => {
      console.log(res);
      this.codeForcesData = res;
      this.codeForcesData = this.codeForcesData.result;
       var codeForceList : any;
       codeForceList = this.codeForcesData;
       var listOfAllRanks = codeForceList.map(a => a.rank);
       var listOfAllRatings = codeForceList.map(a => a.newRating);
       console.log("listOfAllRanks" , listOfAllRanks);
       console.log("listOfAllRanks" , listOfAllRatings);
       
       this.bestCodeForcesRating = Math.max(...listOfAllRatings);
       this.bestCodeForcesRank = Math.min(...listOfAllRanks);
      // this.bestCodeForcesRating = this.codeForcesData.result.map(this.codeForcesData.result => this.codeForcesData.result.rank);
      // console.log("112233" , this.bestCodeForcesRating);
      this.loadChartData();
      
    },
    err => {
      alert("Loading List Failed");

    })
  }  

  loadChartData() {
      this.pieChartData =  {
  chartType: 'PieChart',
  dataTable: [
    ['Contest', 'Rating'],
    ['Contest 101',     11],
    ['Contest 672',      4],
    ['Contest 231',  6],
    ['Contest 674', 8],
    ['Contest 901',    7],
    ['Contest 672',      9],
    ['Contest 231',  10],
    ['Contest 674', 12],
    ['Contest 901',    10],
    ['Contest 674', 12],
    ['Contest 901',    17],
    ['Contest 672',      16],
    ['Contest 231',  12],
  ],
  options: {'title': 'Codeforces Rating',
 animation: {easing: 'out'}},
};
this.pieChartData.chartType = 'AreaChart';
// this.pieChartData.dataTable[0][0] = 'AreaChart';
  }
  constructor(
  	private http: HttpClient,
  	public appConstant: AppConstant, 
  	private cookieService: CookieService,
     
  	) { }

  ngOnInit() {
    this.pieChartData = {};
  	this.codeforcesId = this.cookieService.get('codeforces-token');
  	this.loadCodeForcesData();
    
  }

}
