export interface WeatherData {
  message: string;
  data: ForecastData;
}

export interface ForecastData {
  forecast: HourlyWeatherData[];
}

export interface HourlyWeatherData {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}
