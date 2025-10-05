import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './ui/card';

interface DayWeatherScore {
  date: Date;
  score: number; // 0-100, donde 100 es condiciones perfectas
  temperature: number;
  condition: string;
}

interface WeatherHeatMapProps {
  activityType: string;
  currentDate: Date;
}

export function WeatherHeatMap({ activityType, currentDate }: WeatherHeatMapProps) {
  // Mock data - aquí conectarías con tu API del clima
  const generateWeatherData = (): DayWeatherScore[] => {
    const data: DayWeatherScore[] = [];
    const baseDate = new Date(currentDate);
    baseDate.setDate(baseDate.getDate() - 3);

    for (let i = 0; i < 14; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      
      // Simular scores basados en patrones
      const dayOfWeek = date.getDay();
      const baseScore = Math.random() * 40 + 30;
      const weekendBonus = (dayOfWeek === 0 || dayOfWeek === 6) ? 15 : 0;
      const activityBonus = activityType.includes('exterior') ? Math.random() * 20 : 10;
      
      data.push({
        date,
        score: Math.min(100, Math.round(baseScore + weekendBonus + activityBonus)),
        temperature: Math.round(18 + Math.random() * 12),
        condition: ['Soleado', 'Parcialmente nublado', 'Nublado'][Math.floor(Math.random() * 3)]
      });
    }
    
    return data;
  };

  const weatherData = generateWeatherData();
  const currentDateStr = currentDate.toDateString();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreOpacity = (score: number) => {
    if (score >= 80) return 'opacity-90';
    if (score >= 60) return 'opacity-70';
    if (score >= 40) return 'opacity-50';
    return 'opacity-30';
  };

  const bestDays = weatherData
    .filter(day => day.date.getTime() > currentDate.getTime())
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <Card className="glass-effect border-0 shadow-lg">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={20} className="text-primary" />
          <h3 className="font-medium">Mejores días para {activityType}</h3>
        </div>

        {/* Heat Map */}
        <div className="mb-6">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(day => (
              <div key={day} className="text-center text-xs text-muted-foreground p-1">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {weatherData.map((day, index) => {
              const isToday = day.date.toDateString() === currentDateStr;
              const isPast = day.date.getTime() < currentDate.getTime();
              
              return (
                <div
                  key={index}
                  className={`
                    aspect-square rounded-md flex flex-col items-center justify-center text-xs
                    ${getScoreColor(day.score)} ${getScoreOpacity(day.score)}
                    ${isToday ? 'ring-2 ring-primary ring-offset-1' : ''}
                    ${isPast ? 'opacity-30' : ''}
                    transition-all cursor-pointer hover:scale-110
                  `}
                  title={`${day.date.toLocaleDateString('es-ES')}: ${day.score}% - ${day.temperature}°C`}
                >
                  <span className="text-white font-medium">
                    {day.date.getDate()}
                  </span>
                  <span className="text-white text-[10px]">
                    {day.temperature}°
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span>Menos favorable</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded bg-red-500 opacity-30"></div>
            <div className="w-3 h-3 rounded bg-orange-500 opacity-50"></div>
            <div className="w-3 h-3 rounded bg-yellow-500 opacity-70"></div>
            <div className="w-3 h-3 rounded bg-green-500 opacity-90"></div>
          </div>
          <span>Más favorable</span>
        </div>

        {/* Best Days Recommendations */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-green-500" />
            Mejores días próximos
          </h4>
          
          <div className="space-y-2">
            {bestDays.map((day, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-3 rounded-lg glass-effect">
                <div>
                  <p className="font-medium text-sm">
                    {day.date.toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      day: 'numeric', 
                      month: 'short' 
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">{day.condition}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-500">{day.score}%</p>
                  <p className="text-xs text-muted-foreground">{day.temperature}°C</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}