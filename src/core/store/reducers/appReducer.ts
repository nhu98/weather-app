import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { HourlyWeatherModel, WeatherModel } from '../../models';

export interface IAppState {
  isLoading: boolean;
  darkMode: boolean;
  searchTerm: string;
  position: any;
  weatherData: any;
  firstWidgetData: any;
}

const initialState: IAppState = {
  isLoading: false,
  darkMode: JSON.parse(localStorage.getItem('darkMode') as string) as boolean,
  searchTerm: '',
  position: {},
  weatherData: {},
  firstWidgetData: {},
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleDarkMode: (state: IAppState) => {
      localStorage.setItem('darkMode', (!state.darkMode).toString());
      state.darkMode = !state.darkMode;
    },
    setIsLoading: (state: IAppState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    setValueSearchTerm: (state: IAppState, action: PayloadAction<string>) => {
      state.searchTerm = String(action.payload);
    },
    setStayPosition: (state: IAppState, action: PayloadAction<any>) => {
      state.position = action.payload;
    },
    setWeatherData: (state: IAppState, action: PayloadAction<WeatherModel>) => {
      state.weatherData = action.payload;
    },
    setFirstWidgetData: (
      state: IAppState,
      action: PayloadAction<WeatherModel>
    ) => {
      state.firstWidgetData = action.payload;
    },
  },
});

export const {
  toggleDarkMode,
  setIsLoading,
  setValueSearchTerm,
  setStayPosition,
  setWeatherData,
  setFirstWidgetData,
} = appSlice.actions;
export default appSlice.reducer;

export const getDataWeather = createAsyncThunk(
  'app/setWeatherData',
  async (_, { dispatch, getState }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { lat, lng } = getState().app.position;
      const url = `${import.meta.env.VITE_WEATHER_API_BASEURL}?key=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&q=${lat},${lng}&days=10&aqi=no&alerts=no`;
      const response = await axios.get(url);

      const forecastData = response.data.forecast.forecastday.map(
        (item: any) => {
          return {
            date: item.date,
            maxtemp_c: item.day.maxtemp_c,
            mintemp_c: item.day.mintemp_c,
            maxwind_kph: item.day.maxwind_kph,
            avghumidity: item.day.avghumidity,
            condition: item.day.condition,
            hour: item.hour.map((item: HourlyWeatherModel) => {
              return {
                time: item.time,
                temp_c: item.temp_c,
                condition: item.condition,
              };
            }),
          };
        }
      );

      const weatherDataCustom: WeatherModel = {
        current: {
          conditions: response.data.current.condition,
          temp_c: response.data.current.temp_c,
          feelslike_c: response.data.current.feelslike_c,
          country: response.data.location.country,
          localtime: response.data.location.localtime,
          name: response.data.location.name,
          humidity: response.data.current.humidity,
          pressure_mb: response.data.current.pressure_mb,
          wind_kph: response.data.current.wind_kph,
        },
        forecast: {
          forecastday: forecastData,
        },
      };
      dispatch(setWeatherData(weatherDataCustom));
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
