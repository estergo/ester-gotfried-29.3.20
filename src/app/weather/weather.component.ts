import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';
import {Weather} from '../weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
 currentWeather: Weather;
  @Input() location: {id: string, name: string};

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.get(this.location.id).subscribe((data: Weather) => this.currentWeather = data[0]);
  }

}
