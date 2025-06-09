import axios from "axios";
import { useEffect, useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../constants/config";

type WeatherData = {
  temp: number;
  description: string;
  humidity: number;
  icon: string;
  date?: string;
};

type ForecastItem = {
  date: string;
  temp: {
    min: number;
    max: number;
  };
  icon: string;
  description: string;
};

export default function useWeather(city: string) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);

        const currentResponse = await axios.get(
          `${WEATHER_API_URL}?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
        );

        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
        );

        setWeather({
          temp: Math.round(currentResponse.data.main.temp),
          description: currentResponse.data.weather[0].description,
          humidity: currentResponse.data.main.humidity,
          icon: currentResponse.data.weather[0].icon,
        });

        const dailyForecast = processForecastData(forecastResponse.data.list);
        setForecast(dailyForecast);

        setError(null);
      } catch {
        setError("Ciudad no encontrada. Intenta con otro nombre.");
        setWeather(null);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, forecast, loading, error };
}

function processForecastData(list: any[]): ForecastItem[] {
  const forecastMap = new Map<string, ForecastItem>();

  list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString("es-ES", {
      weekday: "short",
      day: "numeric",
    });

    if (!forecastMap.has(date)) {
      forecastMap.set(date, {
        date,
        temp: {
          min: Math.round(item.main.temp_min),
          max: Math.round(item.main.temp_max),
        },
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      });
    } else {
      const existing = forecastMap.get(date)!;
      if (item.main.temp_min < existing.temp.min) {
        existing.temp.min = Math.round(item.main.temp_min);
      }
      if (item.main.temp_max > existing.temp.max) {
        existing.temp.max = Math.round(item.main.temp_max);
      }
    }
  });

  return Array.from(forecastMap.values()).slice(0, 5);
}
