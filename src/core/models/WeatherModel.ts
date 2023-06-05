import { CurrentWeatherModel } from './CurrentWeatherModel';
import { DailyWeatherModel } from './DailyWeatherModel';

export interface WeatherModel {
  current: CurrentWeatherModel;
  forecast: {
    forecastday: DailyWeatherModel[];
  };
}
