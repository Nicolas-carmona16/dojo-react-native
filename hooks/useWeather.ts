import axios from "axios";
import * as Location from "expo-location";
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

export default function useWeather(
  city: string | { lat: number; lon: number }
) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCityName, setCurrentCityName] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);

        let urlParams = "";
        if (typeof city === "string") {
          urlParams = `q=${encodeURIComponent(city)}`;
        } else {
          urlParams = `lat=${city.lat}&lon=${city.lon}`;
        }

        const [currentResponse, forecastResponse] = await Promise.all([
          axios.get(
            `${WEATHER_API_URL}?${urlParams}&units=metric&appid=${WEATHER_API_KEY}`
          ),
          axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?${urlParams}&units=metric&appid=${WEATHER_API_KEY}`
          ),
        ]);

        setCurrentCityName(currentResponse.data.name);
        setWeather({
          temp: Math.round(currentResponse.data.main.temp),
          description: currentResponse.data.weather[0].description,
          humidity: currentResponse.data.main.humidity,
          icon: currentResponse.data.weather[0].icon,
        });

        setForecast(processForecastData(forecastResponse.data.list));
        setError(null);
      } catch {
        setError(
          typeof city === "string"
            ? "Ciudad no encontrada. Intenta con otro nombre."
            : "No se pudo obtener el clima para tu ubicación."
        );
        setWeather(null);
        setForecast([]);
        setCurrentCityName("");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, forecast, loading, error, cityName: currentCityName };
}

export function useCurrentLocation() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (!isMounted) return;

        if (status !== "granted") {
          setErrorMsg("Permiso de ubicación denegado");
          setLoading(false);
          return;
        }

        const locationData = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 5000,
        });

        if (isMounted) {
          setLocation({
            lat: locationData.coords.latitude,
            lon: locationData.coords.longitude,
          });
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setErrorMsg("No se pudo obtener la ubicación");
          setLoading(false);
        }
      }
    };

    getLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  return { location, errorMsg, loading };
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
      existing.temp.min = Math.min(
        existing.temp.min,
        Math.round(item.main.temp_min)
      );
      existing.temp.max = Math.max(
        existing.temp.max,
        Math.round(item.main.temp_max)
      );
    }
  });

  return Array.from(forecastMap.values()).slice(0, 5);
}
