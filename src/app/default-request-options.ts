import {RequestOptionsArgs, Headers, BaseRequestOptions} from '@angular/http';
import { Injectable ,OnInit } from '@angular/core';
// import { LoginService } from './services/login.service';

@Injectable()
export  class DefaultRequestOptions  extends BaseRequestOptions  {
    constructor() {
        super();
     }   
    headers = new Headers({
        'Authorization': 'fhkdshfkjdshfkjhsdjfhkjsdhfjgdsjdshfjfgf'
      });
   
}
