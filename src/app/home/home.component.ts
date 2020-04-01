import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {forkJoin, Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, switchMap} from 'rxjs/operators';

import {Location} from './location';
import {LocationService} from './location.service';
import {WeatherService} from '../weather.service';
import {Forecast, Weather} from '../weather';
import {LocalStorageService} from '../shared/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  locationCtrl = new FormControl();
  selectedLocation: Location;
  defaultLocation = new Subject();
  filteredLocations: Observable<Location[]>;
  currentWeather: Weather;
  forecastWeather: Forecast;

  get isLocationFavorite(): boolean {
    return this.localStorageService.getList().find(item => item.id === this.selectedLocation.Key);
  }

  constructor(private locationService: LocationService,
              private weatherService: WeatherService,
              private localStorageService: LocalStorageService,
              private route: ActivatedRoute) {
  }

  selectLocation(event, location) {
    if (!event || event.source.selected) {
      this.selectedLocation = location;
      forkJoin([this.getCurrentWeather(location.Key), this.getForecast(location.Key)]).subscribe(
        ([weather, forecast]: [Weather, Forecast]) => {
          this.currentWeather = weather[0];
          this.forecastWeather = forecast;
        }
      );
    }
  }

  displayFn(location: Location): string {
    return location && location.LocalizedName ? `${location.LocalizedName} - ${location.Country.LocalizedName}` : '';
  }

  private getCurrentWeather(locationKey: string) {
    return this.weatherService.get(locationKey);
  }

  private getForecast(locationKey: string) {
    return this.weatherService.getForecast(locationKey);
  }

  toggleFavorite() {
    let favoritesArr = this.localStorageService.getList();
    if (this.isLocationFavorite) {
      favoritesArr = favoritesArr.filter(item => item.id !== this.selectedLocation.Key);
    } else {
      favoritesArr.push({id: this.selectedLocation.Key, name: this.selectedLocation.LocalizedName});
    }
    this.localStorageService.setList(favoritesArr);
  }

  lockInvalidCharacters(event: KeyboardEvent) {
    const character = event.key;
    if (character.length === 1) {
      if (!/^[a-zA-Z]+$/.test(character)) {
        event.preventDefault();
      }
    }
  }

  private initFilteredLocations() {
    this.defaultLocation.subscribe(locationName => {
      this.locationService.get(locationName).subscribe(data => {
        this.locationCtrl.patchValue(data[0]);
        this.selectLocation('', this.locationCtrl.value);
      });

      this.filteredLocations = this.locationCtrl.valueChanges
        .pipe(
          debounceTime(300),
          switchMap(value => this.locationService.get(value))
        );
    });
  }

  private setDefaultLocation() {
    this.route.queryParams.subscribe(params => {
      if (params && params.loc) {
        this.defaultLocation.next(params.loc);
      } else {
        this.setCurrentUserLocation();
      }
    });
  }

  private setCurrentUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.locationService.getGeoLocation(position.coords.latitude, position.coords.longitude)
          .pipe(catchError(this.onGeoLocationErr))
          .subscribe((data: Location) => {
            this.defaultLocation.next(data.LocalizedName);
          });
      }, this.onGeoLocationErr);
    } else {
      this.onGeoLocationErr();
    }
  }

  private onGeoLocationErr() {
    this.defaultLocation.next('Tel Aviv');
    return of();
  }

  ngOnInit(): void {
    this.initFilteredLocations();
    this.setDefaultLocation();
  }
}
