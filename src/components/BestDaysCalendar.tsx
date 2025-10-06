import { Calendar as CalendarIcon } from 'lucide-react';

interface BestDaysCalendarProps {
  activityType: string;
}

interface DayData {
  day: number;
  dayName: string;
  temperature: number;
  condition: string;
  favorability: 'excellent' | 'good' | 'fair' | 'poor';
}

export function BestDaysCalendar({ activityType }: BestDaysCalendarProps) {
  // Simulamos datos de 14 días
  const days: DayData[] = [
    { day: 2, dayName: 'L', temperature: 25, condition: 'Soleado', favorability: 'fair' },
    { day: 3, dayName: 'M', temperature: 24, condition: 'Soleado', favorability: 'fair' },
    { day: 4, dayName: 'X', temperature: 26, condition: 'Parcialmente nublado', favorability: 'excellent' },
    { day: 5, dayName: 'J', temperature: 22, condition: 'Soleado', favorability: 'excellent' },
    { day: 6, dayName: 'V', temperature: 19, condition: 'Nublado', favorability: 'fair' },
    { day: 7, dayName: 'S', temperature: 20, condition: 'Lluvia ligera', favorability: 'poor' },
    { day: 8, dayName: 'D', temperature: 25, condition: 'Lluvia', favorability: 'poor' },
    { day: 9, dayName: 'L', temperature: 28, condition: 'Soleado', favorability: 'fair' },
    { day: 10, dayName: 'M', temperature: 21, condition: 'Soleado', favorability: 'fair' },
    { day: 11, dayName: 'X', temperature: 25, condition: 'Nublado', favorability: 'fair' },
    { day: 12, dayName: 'J', temperature: 24, condition: 'Soleado', favorability: 'excellent' },
    { day: 13, dayName: 'V', temperature: 22, condition: 'Lluvia ligera', favorability: 'poor' },
    { day: 14, dayName: 'S', temperature: 20, condition: 'Soleado', favorability: 'poor' },
    { day: 15, dayName: 'D', temperature: 25, condition: 'Lluvia', favorability: 'poor' },
  ];

  const getColorClass = (favorability: string) => {
    if (favorability === 'excellent') return 'bg-green-500 text-white border-green-600';
    if (favorability === 'good') return 'bg-green-400 text-white border-green-500';
    if (favorability === 'fair') return 'bg-yellow-400 text-gray-800 border-yellow-500';
    if (favorability === 'poor') return 'bg-orange-400 text-white border-orange-500';
    return 'bg-gray-400 text-white border-gray-500';
  };

  // Mejores días próximos (solo los excelentes)
  const bestUpcomingDays = days.filter(day => day.favorability === 'excellent').slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-effect rounded-2xl p-6">
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <CalendarIcon size={20} className="text-primary" />
          Mejores días para {activityType}
        </h3>
        
        {/* Calendario de 14 días */}
        <div className="space-y-4">
          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-2 text-center text-sm text-muted-foreground mb-2">
            <div>L</div>
            <div>M</div>
            <div>X</div>
            <div>J</div>
            <div>V</div>
            <div>S</div>
            <div>D</div>
          </div>
          
          {/* Primera semana */}
          <div className="grid grid-cols-7 gap-2">
            {days.slice(0, 7).map((day, index) => (
              <div
                key={index}
                className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-center p-2 transition-all hover:scale-105 ${getColorClass(day.favorability)}`}
              >
                <div className="font-medium text-lg">{day.day}</div>
                <div className="text-xs opacity-90">{day.temperature}°</div>
              </div>
            ))}
          </div>
          
          {/* Segunda semana */}
          <div className="grid grid-cols-7 gap-2">
            {days.slice(7, 14).map((day, index) => (
              <div
                key={index}
                className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-center p-2 transition-all hover:scale-105 ${getColorClass(day.favorability)}`}
              >
                <div className="font-medium text-lg">{day.day}</div>
                <div className="text-xs opacity-90">{day.temperature}°</div>
              </div>
            ))}
          </div>
        </div>

        {/* Leyenda */}
        <div className="flex justify-between items-center mt-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Menos favorable</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-orange-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <span className="text-muted-foreground">Más favorable</span>
          </div>
        </div>
      </div>

      {/* Mejores días próximos */}
      {bestUpcomingDays.length > 0 && (
        <div className="glass-effect rounded-2xl p-6">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <span className="text-green-500">📈</span>
            Mejores días próximos
          </h3>
          
          <div className="space-y-3">
            {bestUpcomingDays.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg"
              >
                <div>
                  <div className="font-medium">
                    {day.dayName === 'L' ? 'Lunes' : 
                     day.dayName === 'M' ? 'Martes' :
                     day.dayName === 'X' ? 'Miércoles' :
                     day.dayName === 'J' ? 'Jueves' :
                     day.dayName === 'V' ? 'Viernes' :
                     day.dayName === 'S' ? 'Sábado' : 'Domingo'}, {day.day} oct
                  </div>
                  <div className="text-sm text-muted-foreground">{day.condition}</div>
                </div>
                <div className="text-right">
                  <div className="text-green-600 font-medium">80%</div>
                  <div className="text-sm text-muted-foreground">{day.temperature}°C</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}