import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react';
import { Card } from './ui/card';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: 'sun' | 'cloud' | 'rain';
}

export function WeatherCard() {
  // Mock weather data - aquí conectarías con tu API del clima
  const weatherData: WeatherData = {
    location: 'Tu ubicación',
    temperature: 24,
    condition: 'Parcialmente nublado',
    humidity: 65,
    windSpeed: 12,
    icon: 'cloud'
  };

  const getWeatherIcon = () => {
    switch (weatherData.icon) {
      case 'sun':
        return <Sun size={32} className="text-yellow-500" />;
      case 'rain':
        return <CloudRain size={32} className="text-blue-500" />;
      default:
        return <Cloud size={32} className="text-gray-400" />;
    }
  };

  return (
    <Card className="glass-effect border-0 shadow-lg">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-medium text-foreground/90">{weatherData.location}</h3>
            <p className="text-sm text-muted-foreground">{weatherData.condition}</p>
          </div>
          {getWeatherIcon()}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-3xl font-light text-foreground">
            {weatherData.temperature}°C
          </div>
          
          <div className="flex gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Droplets size={12} />
              <span>{weatherData.humidity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind size={12} />
              <span>{weatherData.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}