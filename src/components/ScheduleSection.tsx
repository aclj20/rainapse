import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { ActivityCard, Activity } from "./ActivityCard";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

interface ScheduleSectionProps {
  onActivitySelect: (activity: Activity) => void;
}

export function ScheduleSection({
  onActivitySelect,
}: ScheduleSectionProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      title: "Work meeting",
      time: "09:00",
      location: "Central Office",
      description:
        "Q4 project review with development team",
      color: "#3b82f6",
      duration: 60,
    },
    {
      id: "2",
      title: "Run in the park",
      time: "17:00",
      location: "Central Park",
      description: "5km running routine",
      color: "#f59e0b",
      duration: 30,
    },
    {
      id: "3",
      title: "Lunch with client",
      time: "13:00",
      location: "La Plaza Restaurant",
      description:
        "Discuss collaboration proposal for next year",
      color: "#10b981",
      duration: 90,
    },
    {
      id: "4",
      title: "Family dinner",
      time: "20:00",
      location: "Home",
      description: "Dinner with family",
      color: "#ef4444",
      duration: 120,
    },
  ]);

  // Available random activities
  const randomActivityTemplates = [
    {
      title: "Morning yoga",
      location: "Zen Studio",
      description:
        "Yoga class to start the day with energy",
      color: "#8b5cf6",
      duration: 60,
    },
    {
      title: "Bike ride",
      location: "Waterfront",
      description: "Coastal bike tour",
      color: "#06b6d4",
      duration: 45,
    },
    {
      title: "Reading session",
      location: "Municipal Library",
      description: "Time dedicated to reading and learning",
      color: "#ec4899",
      duration: 90,
    },
    {
      title: "Swimming classes",
      location: "Sports Club",
      description: "Swimming training",
      color: "#14b8a6",
      duration: 60,
    },
    {
      title: "Coffee with friends",
      location: "Downtown Café",
      description: "Casual meeting with friends",
      color: "#f97316",
      duration: 60,
    },
    {
      title: "Market shopping",
      location: "Central Market",
      description: "Shopping for fresh and healthy food",
      color: "#84cc16",
      duration: 45,
    },
    {
      title: "Photography session",
      location: "Historic Park",
      description: "Outdoor photography practice",
      color: "#6366f1",
      duration: 120,
    },
    {
      title: "Cooking class",
      location: "Culinary School",
      description:
        "Learn new recipes and culinary techniques",
      color: "#f43f5e",
      duration: 90,
    },
  ];

  // Ordenar actividades por hora
  const sortedActivities = [...activities].sort((a, b) => {
    const timeA = a.time.split(":").map(Number);
    const timeB = b.time.split(":").map(Number);
    const minutesA = timeA[0] * 60 + timeA[1];
    const minutesB = timeB[0] * 60 + timeB[1];
    return minutesA - minutesB;
  });

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "TODAY";
    } else if (
      date.toDateString() === tomorrow.toDateString()
    ) {
      return "TOMORROW";
    } else {
      return date
        .toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })
        .toUpperCase();
    }
  };

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const addActivity = () => {
    // Generar hora aleatoria entre 6:00 y 23:00
    const randomHour = Math.floor(Math.random() * 18) + 6; // 6-23
    const randomMinute = Math.random() < 0.5 ? "00" : "30";
    const randomTime = `${randomHour.toString().padStart(2, "0")}:${randomMinute}`;

    // Seleccionar actividad aleatoria del template
    const randomTemplate =
      randomActivityTemplates[
        Math.floor(
          Math.random() * randomActivityTemplates.length,
        )
      ];

    // Crear nueva actividad
    const newActivity: Activity = {
      id: Date.now().toString(),
      title: randomTemplate.title,
      time: randomTime,
      location: randomTemplate.location,
      description: randomTemplate.description,
      color: randomTemplate.color,
      duration: randomTemplate.duration,
    };

    // Agregar a la lista de actividades
    setActivities([...activities, newActivity]);
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
            <PopoverContent
              className="w-auto p-0"
              align="center"
            >
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={(date) =>
                  date && setCurrentDate(date)
                }
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
          {currentDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Activities list */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="space-y-3">
          {sortedActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onClick={() => onActivitySelect(activity)}
            />
          ))}
        </div>

        {sortedActivities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No scheduled activities
            </p>
            <Button
              onClick={addActivity}
              className="rounded-full bg-primary hover:bg-primary/90"
            >
              <Plus size={16} className="mr-2" />
              Add activity
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
          Add activity
        </Button>
      </div>
    </div>
  );
}