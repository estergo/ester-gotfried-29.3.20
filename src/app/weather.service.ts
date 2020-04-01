import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {baseUrl, apikey} from './shared/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {
  }
  get(location: string): Observable<any> {
   return this.http.get(`${baseUrl}/currentconditions/v1/${location}`, {params: {apikey}});
  }

  getForecast(location: string): Observable<any>{
    return this.http.get(`${baseUrl}/forecasts/v1/daily/5day/${location}`, {params: {apikey, metric: 'true'}});
  }
}
