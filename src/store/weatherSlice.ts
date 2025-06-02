import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { OPENWEATHERMAP_API_KEY } from '@env';

export interface WeatherInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WeatherItem {
  id: string;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherApiResponse {
  coord: {
    lon: string;
    lat: string;
  };
  weather: WeatherItem[];
  list: WeatherApiResponse[];
  base: string;
  main: WeatherInfo;
  visibility: string;
  wind: {
    speed: string;
    deg: string;
    gust?: string;
  };
  dt: string;
  dt_txt: string;
  sys: {
    type: string;
    id: string;
    country: string;
    sunrise: string;
    sunset: string;
  };
  timezone: string;
  id: string;
  name: string;
  cod: string;
}

interface WeatherState {
  loading: boolean;
  current: WeatherApiResponse | null;
  forecast: WeatherApiResponse[];
  error: string | null;
}

const initialState: WeatherState = {
  loading: false,
  current: null,
  forecast: [],
  error: null,
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async ({ city, lat, lon }: { city?: string, lat?: string; lon?: string }) => {
    const currentRes = await axios.get<WeatherApiResponse>(
      `https://api.openweathermap.org/data/2.5/weather?${city ? `q=${city}` : `lat=${lat}&lon=${lon}`}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`
    );
    const forecastRes = await axios.get<WeatherApiResponse>(
      `https://api.openweathermap.org/data/2.5/forecast?${city ? `q=${city}` : `lat=${lat}&lon=${lon}`}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`
    );
    return {
      current: currentRes.data,
      forecast: forecastRes.data.list,
    };
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.current;
        state.forecast = action.payload.forecast;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default weatherSlice.reducer;
