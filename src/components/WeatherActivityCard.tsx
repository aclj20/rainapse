import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Activity } from 'lucide-react';
import { Card } from './ui/card';

interface WeatherCondition {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'partly-cloudy';
  uvIndex: number;
  precipitation: number;
}

interface ActivityWeatherProps {
  activity: {
    title: string;
    date: Date;
  };
  weather: WeatherCondition;
}

export function WeatherActivityCard({ activity, weather }: ActivityWeatherProps) {
  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun size={24} className="text-yellow-500" />;
      case 'rainy':
        return <CloudRain size={24} className="text-blue-500" />;
      case 'partly-cloudy':
        return <Cloud size={24} className="text-gray-400" />;
      default:
        return <Cloud size={24} className="text-gray-400" />;
    }
  };

  const getWeatherRecommendation = () => {
    const temp = weather.temperature;
    const humidity = weather.humidity;
    const wind = weather.windSpeed;
    
    if (weather.condition === 'rainy') {
      return { status: 'poor', message: 'No recomendado por lluvia', color: 'text-red-500' };
    }
    
    if (temp >= 20 && temp <= 28 && humidity < 70 && wind < 20) {
      return { status: 'excellent', message: 'Condiciones ideales', color: 'text-green-500' };
    }
    
    if (temp >= 15 && temp <= 32 && humidity < 80) {
      return { status: 'good', message: 'Buenas condiciones', color: 'text-yellow-600' };
    }
    
    return { status: 'fair', message: 'Condiciones regulares', color: 'text-orange-500' };
  };

  const recommendation = getWeatherRecommendation();

  return (
    <Card className="glass-effect border-0 shadow-lg">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium text-foreground">Clima para {activity.title}</h3>
            <p className="text-sm text-muted-foreground">
              {activity.date.toLocaleDateString('es-ES', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </p>
          </div>
          {getWeatherIcon()}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Thermometer size={16} className="text-orange-500" />
            <div>
              <p className="text-xs text-muted-foreground">Temperatura</p>
              <p className="font-medium">{weather.temperature}°C</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Droplets size={16} className="text-blue-500" />
            <div>
              <p className="text-xs text-muted-foreground">Humedad</p>
              <p className="font-medium">{weather.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Wind size={16} className="text-gray-500" />
            <div>
              <p className="text-xs text-muted-foreground">Viento</p>
              <p className="font-medium">{weather.windSpeed} km/h</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sun size={16} className="text-yellow-500" />
            <div>
              <p className="text-xs text-muted-foreground">UV</p>
              <p className="font-medium">{weather.uvIndex}/10</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity size={16} className={recommendation.color.replace('text-', 'text-')} />
              <span className="text-sm font-medium">Recomendación</span>
            </div>
            <span className={`text-sm font-medium ${recommendation.color}`}>
              {recommendation.message}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}