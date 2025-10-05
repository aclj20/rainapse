import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from './ui/button';
import { ActivityCard, Activity } from './ActivityCard';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface ScheduleSectionProps {
  onActivitySelect: (activity: Activity) => void;
}

export function ScheduleSection({ onActivitySelect }: ScheduleSectionProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock data - aquí conectarías con tu backend
  const mockActivities: Activity[] = [
    {
      id: '1',
      title: 'Reunión de trabajo',
      time: '09:00',
      location: 'Oficina Central',
      description: 'Revisión del proyecto Q4 con el equipo de desarrollo',
      color: '#3b82f6',
      duration: 60
    },
    {
      id: '2',
      title: 'Almuerzo con cliente',
      time: '13:00',
      location: 'Restaurante La Plaza',
      description: 'Discutir propuesta de colaboración para el próximo año',
      color: '#10b981',
      duration: 90
    },
    {
      id: '3',
      title: 'Gimnasio',
      time: '18:00',
      location: 'Fitness Center',
      description: 'Rutina de cardio y pesas',
      color: '#f59e0b',
      duration: 45
    },
    {
      id: '4',
      title: 'Cena familiar',
      time: '20:00',
      location: 'Casa',
      description: 'Cena con la familia',
      color: '#ef4444',
      duration: 120
    }
  ];

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'HOY';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'MAÑANA';
    } else {
      return date.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
      }).toUpperCase();
    }
  };

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const addActivity = () => {
    // Aquí implementarías la funcionalidad para agregar actividad
    console.log('Agregar nueva actividad');
  };

  return (
    <div className="flex flex-col h-full weather-gradient">
      {/* Header with date navigation */}
      <div className="px-6 py-4 border-b border-border glass-effect">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => changeDate(-1)}
            className="rounded-full glass-effect border-0 hover:bg-white/20"
          >
            <ChevronLeft size={20} />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="text-xl font-medium glass-effect border-0 hover:bg-white/20 px-4 py-2 h-auto"
              >
                <CalendarIcon size={16} className="mr-2" />
                {formatDate(currentDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={(date) => date && setCurrentDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => changeDate(1)}
            className="rounded-full glass-effect border-0 hover:bg-white/20"
          >
            <ChevronRight size={20} />
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          {currentDate.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          })}
        </div>
      </div>

      {/* Activities list */}
      <div className="flex-1 px-6 py-4">
        <div className="space-y-3">
          {mockActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onClick={() => onActivitySelect(activity)}
            />
          ))}
        </div>

        {mockActivities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No hay actividades programadas</p>
            <Button onClick={addActivity} className="rounded-full bg-primary hover:bg-primary/90">
              <Plus size={16} className="mr-2" />
              Agregar actividad
            </Button>
          </div>
        )}
      </div>

      {/* Add activity button */}
      <div className="px-6 pb-4">
        <Button 
          onClick={addActivity}
          className="w-full rounded-full glass-effect border-0 hover:bg-white/20"
          variant="outline"
        >
          <Plus size={16} className="mr-2" />
          Agregar actividad
        </Button>
      </div>
    </div>
  );
}