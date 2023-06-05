import { HourlyWeatherModel } from './HourlyWeatherModel';

export interface DailyWeatherModel {
  date: string;
  maxtemp_c: number;
  mintemp_c: number;
  maxwind_kph: number;
  avghumidity: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  hour: HourlyWeatherModel[];
}
