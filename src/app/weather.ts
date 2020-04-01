interface TemperatureUnit {
  Value: number;
  Unit: string;
  UnitType: number;
}

interface Temperature {
  Metric: TemperatureUnit;
  Imperial: TemperatureUnit;
}

export interface Weather {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: string;
  IsDayTime: boolean;
  Temperature: Temperature;
  MobileLink: string;
  Link: string;
}

interface DailyTemp {
  Minimum: TemperatureUnit;
  Maximum: TemperatureUnit;
}

interface DailyWeather {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
}

interface DailyForecast {
  Date: string;
  EpochDate: number;
  Temperature: DailyTemp;
  Day: DailyWeather;
  Night: DailyWeather;
}

export interface Forecast {
  DailyForecasts: DailyForecast[];
}
