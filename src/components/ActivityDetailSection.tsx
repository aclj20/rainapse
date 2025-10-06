import { ArrowLeft, Clock, MapPin, Edit, Trash2, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Activity } from './ActivityCard';
import { Separator } from './ui/separator';
import { WeatherActivityCard } from './WeatherActivityCard';
import { WeatherHeatMap } from './WeatherHeatMap';
import { UnfavorableWeatherSection } from './UnfavorableWeatherSection';

interface ActivityDetailSectionProps {
  activity: Activity;
  onBack: () => void;
}

export function ActivityDetailSection({ activity, onBack }: ActivityDetailSectionProps) {
  const handleEdit = () => {
    // Here you would implement edit functionality
    console.log('Edit activity:', activity.id);
  };

  const handleDelete = () => {
    // Here you would implement delete functionality
    console.log('Delete activity:', activity.id);
  };

  const handleComplete = () => {
    // Here you would implement mark as completed
    console.log('Mark as completed:', activity.id);
  };

  // Simulate unfavorable weather conditions for running
  const isRunningActivity = activity.title.toLowerCase().includes('run') || activity.title.toLowerCase().includes('running');
  const isCloudyWeather = true; // Simulate cloudy weather
  const showUnfavorableWeather = isRunningActivity && isCloudyWeather;

  return (
    <div className="flex flex-col h-full weather-gradient">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border glass-effect">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full glass-effect border-0 hover:bg-white/20"
          >
            <ArrowLeft size={20} />
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEdit}
              className="rounded-full glass-effect border-0 hover:bg-white/20"
            >
              <Edit size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="rounded-full glass-effect border-0 text-destructive hover:bg-destructive/20"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Activity content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        {/* Title and color indicator */}
        <div className="flex items-start gap-3 mb-6">
          <div 
            className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
            style={{ backgroundColor: activity.color }}
          />
          <div className="flex-1">
            <h1 className="text-2xl mb-2">{activity.title}</h1>
            {activity.description && (
              <p className="text-muted-foreground">{activity.description}</p>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Activity details */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-muted-foreground" />
            <div>
              <p className="font-medium">{activity.time}</p>
              <p className="text-sm text-muted-foreground">{activity.duration} minutos</p>
            </div>
          </div>

          {activity.location && (
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium">{activity.location}</p>
                <p className="text-sm text-muted-foreground">Location</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-muted-foreground" />
            <div>
              <p className="font-medium">Today</p>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Weather Information */}
        <div className="space-y-4 mb-6">
          {showUnfavorableWeather ? (
            <UnfavorableWeatherSection 
              activityTime={activity.time} 
              activityTitle={activity.title}
            />
          ) : (
            <>
              <WeatherActivityCard 
                activity={{
                  title: activity.title,
                  date: new Date()
                }}
                weather={{
                  temperature: 24,
                  humidity: 65,
                  windSpeed: 12,
                  condition: 'partly-cloudy',
                  uvIndex: 6,
                  precipitation: 10
                }}
              />
              
              <WeatherHeatMap 
                activityType={activity.title}
                currentDate={new Date()}
              />
            </>
          )}
        </div>

        {/* Additional info */}
        <div className="glass-effect rounded-lg p-4">
          <h3 className="font-medium mb-2">Additional notes</h3>
          <p className="text-sm text-muted-foreground">
            {activity.description || 'No additional notes for this activity.'}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-6 pb-6 space-y-3">
        <Button onClick={handleComplete} className="w-full rounded-full bg-primary hover:bg-primary/90">
          Mark as completed
        </Button>
        <Button onClick={handleEdit} variant="outline" className="w-full rounded-full glass-effect border-0 hover:bg-white/20">
          Edit activity
        </Button>
      </div>
    </div>
  );
}