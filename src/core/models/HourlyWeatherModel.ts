export interface HourlyWeatherModel {
  time: string;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
}
