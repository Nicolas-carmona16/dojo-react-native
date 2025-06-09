import axios from "axios";
import { useEffect, useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../constants/config";

type WeatherData = {
  temp: number;
  description: string;
  humidity: number;
  icon: string;
};

export default function useWeather(city: string) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${WEATHER_API_URL}?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
        );

        setWeather({
          temp: Math.round(response.data.main.temp),
          description: response.data.weather[0].description,
          humidity: response.data.main.humidity,
          icon: response.data.weather[0].icon,
        });
        setError(null);
      } catch {
        setError("Ciudad no encontrada. Intenta con otro nombre.");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, loading, error };
}
