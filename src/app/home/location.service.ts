import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {baseUrl, apikey} from '../shared/http';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {
  }

  get(q): Observable<any> {
    return this.http.get(`${baseUrl}/locations/v1/cities/autocomplete`, {params: {apikey, q}});
  }

  getGeoLocation(lat: number, lon: number): Observable<any>{
    const q = `${lat},${lon}`;
    return this.http.get(`${baseUrl}/locations/v1/cities/geoposition/search`, {params: {apikey, q}});
  }
}
