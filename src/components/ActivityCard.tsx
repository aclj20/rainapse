import { Clock, MapPin } from 'lucide-react';

export interface Activity {
  id: string;
  title: string;
  time: string;
  location?: string;
  description?: string;
  color: string;
  duration: number; // in minutes
}

interface ActivityCardProps {
  activity: Activity;
  onClick: () => void;
}

export function ActivityCard({ activity, onClick }: ActivityCardProps) {
  const getHeightClass = () => {
    // Base height on duration (15min = base height, scale up for longer)
    if (activity.duration <= 30) return 'h-16';
    if (activity.duration <= 60) return 'h-20';
    if (activity.duration <= 120) return 'h-24';
    return 'h-28';
  };

  return (
    <div
      onClick={onClick}
      className={`${getHeightClass()} rounded-lg p-3 cursor-pointer transition-all hover:shadow-lg bg-white/90 backdrop-blur-sm border border-white/50 hover:bg-white/95`}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <h3 className="font-medium text-sm mb-1 line-clamp-1 text-slate-800">{activity.title}</h3>
          {activity.location && (
            <div className="flex items-center text-xs text-slate-600 mb-1">
              <MapPin size={10} className="mr-1" />
              <span className="line-clamp-1">{activity.location}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-slate-600 font-medium">
            <Clock size={10} className="mr-1" />
            <span>{activity.time}</span>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            {activity.duration}min
          </div>
        </div>
      </div>
    </div>
  );
}