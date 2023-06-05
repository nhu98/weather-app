import { CurrentWeatherDetailsModel } from '.';

export interface CurrentWeatherModel {
  conditions: CurrentWeatherDetailsModel;
  temp_c: number;
  feelslike_c: number;
  country: string;
  localtime: string;
  name: string;
  humidity: number;
  pressure_mb: number;
  wind_kph: number;
}
