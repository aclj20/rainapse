import { Clock } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface HourlyWeatherSliderProps {
  activityTime: string;
}

interface HourlyWeather {
  time: string;
  hour: number;
  temperature: number;
  condition: string;
  precipitation: number;
  icon: string;
  windSpeed: number;
  humidity: number;
}

export function HourlyWeatherSlider({ activityTime }: HourlyWeatherSliderProps) {
  // Simulamos datos de 24 horas (12 horas antes y 12 después de la actividad)
  const hourlyWeather: HourlyWeather[] = [
    { time: '5:00', hour: 5, temperature: 14, condition: 'Despejado', precipitation: 0, icon: '☀️', windSpeed: 8, humidity: 60 },
    { time: '6:00', hour: 6, temperature: 15, condition: 'Despejado', precipitation: 0, icon: '☀️', windSpeed: 10, humidity: 58 },
    { time: '7:00', hour: 7, temperature: 16, condition: 'Parcialmente nublado', precipitation: 5, icon: '⛅', windSpeed: 12, humidity: 62 },
    { time: '8:00', hour: 8, temperature: 17, condition: 'Parcialmente nublado', precipitation: 10, icon: '⛅', windSpeed: 14, humidity: 65 },
    { time: '9:00', hour: 9, temperature: 18, condition: 'Nublado', precipitation: 15, icon: '☁️', windSpeed: 16, humidity: 70 },
    { time: '10:00', hour: 10, temperature: 19, condition: 'Nublado', precipitation: 20, icon: '☁️', windSpeed: 18, humidity: 72 },
    { time: '11:00', hour: 11, temperature: 20, condition: 'Nublado', precipitation: 25, icon: '☁️', windSpeed: 20, humidity: 75 },
    { time: '12:00', hour: 12, temperature: 21, condition: 'Lluvia ligera', precipitation: 30, icon: '🌦️', windSpeed: 22, humidity: 78 },
    { time: '13:00', hour: 13, temperature: 20, condition: 'Lluvia ligera', precipitation: 35, icon: '🌦️', windSpeed: 20, humidity: 80 },
    { time: '14:00', hour: 14, temperature: 19, condition: 'Lluvia', precipitation: 45, icon: '🌧️', windSpeed: 18, humidity: 85 },
    { time: '15:00', hour: 15, temperature: 18, condition: 'Lluvia', precipitation: 50, icon: '🌧️', windSpeed: 16, humidity: 88 },
    { time: '16:00', hour: 16, temperature: 17, condition: 'Nublado', precipitation: 30, icon: '☁️', windSpeed: 16, humidity: 82 },
    { time: '17:00', hour: 17, temperature: 17, condition: 'Nublado', precipitation: 20, icon: '☁️', windSpeed: 16, humidity: 79 }, // Hora de la actividad
    { time: '18:00', hour: 18, temperature: 18, condition: 'Parcialmente nublado', precipitation: 15, icon: '⛅', windSpeed: 14, humidity: 75 },
    { time: '19:00', hour: 19, temperature: 19, condition: 'Parcialmente nublado', precipitation: 10, icon: '⛅', windSpeed: 12, humidity: 70 },
    { time: '20:00', hour: 20, temperature: 20, condition: 'Despejado', precipitation: 5, icon: '☀️', windSpeed: 10, humidity: 65 },
    { time: '21:00', hour: 21, temperature: 19, condition: 'Despejado', precipitation: 0, icon: '☀️', windSpeed: 8, humidity: 60 },
    { time: '22:00', hour: 22, temperature: 18, condition: 'Despejado', precipitation: 0, icon: '☀️', windSpeed: 6, humidity: 58 },
    { time: '23:00', hour: 23, temperature: 17, condition: 'Despejado', precipitation: 0, icon: '☀️', windSpeed: 4, humidity: 55 },
  ];

  // Encontrar la hora actual de la actividad (17:00)
  const currentHourIndex = hourlyWeather.findIndex(h => h.time === '17:00');

  const getConditionColor = (precipitation: number) => {
    if (precipitation === 0) return 'text-green-600';
    if (precipitation <= 15) return 'text-yellow-600';
    if (precipitation <= 30) return 'text-orange-600';
    return 'text-red-600';
  };

  const getFavorabilityColor = (precipitation: number) => {
    if (precipitation === 0) return 'bg-green-500';
    if (precipitation <= 15) return 'bg-yellow-500';
    if (precipitation <= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="glass-effect rounded-2xl p-6">
      <h3 className="font-medium mb-4 flex items-center gap-2">
        <Clock size={20} className="text-primary" />
        Pronóstico por horas
      </h3>
      
      <div className="space-y-4">
        {/* Indicador de tiempo actual */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          Hora de tu actividad: {activityTime}
        </div>

        {/* Timeline deslizable horizontal */}
        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-4 min-w-max">
            {hourlyWeather.map((weather, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center text-center min-w-[80px] p-3 rounded-lg transition-all ${
                  index === currentHourIndex 
                    ? 'bg-primary/20 border-2 border-primary scale-105' 
                    : 'bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/50'
                }`}
              >
                {/* Hora */}
                <div className={`text-sm font-medium mb-2 ${
                  index === currentHourIndex ? 'text-primary' : 'text-foreground'
                }`}>
                  {weather.time}
                </div>
                
                {/* Icono del clima */}
                <div className="text-3xl mb-2">{weather.icon}</div>
                
                {/* Temperatura */}
                <div className="font-medium text-lg mb-1">{weather.temperature}°</div>
                
                {/* Precipitación */}
                <div className={`text-xs mb-2 px-2 py-1 rounded-full ${
                  weather.precipitation === 0 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : weather.precipitation <= 15
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                    : weather.precipitation <= 30
                    ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {weather.precipitation}%
                </div>
                
                {/* Viento y humedad (solo para hora actual) */}
                {index === currentHourIndex && (
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>💨 {weather.windSpeed}km/h</div>
                    <div>💧 {weather.humidity}%</div>
                  </div>
                )}
                
                {/* Indicador de favorabilidad */}
                <div className={`w-2 h-2 rounded-full mt-2 ${getFavorabilityColor(weather.precipitation)}`}></div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Leyenda */}
        <div className="flex justify-center gap-6 mt-6 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Ideal (0%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Bueno (≤15%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>Regular (≤30%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Malo ({'>'}30%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}