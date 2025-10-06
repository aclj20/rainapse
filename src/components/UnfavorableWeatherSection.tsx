import { Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BestDaysCalendar } from './BestDaysCalendar';
import { HourlyWeatherSlider } from './HourlyWeatherSlider';
import rainyParkImage from 'figma:asset/4dc85576111da66b68e49e29c27ad8fe70d96f8c.png';

interface UnfavorableWeatherSectionProps {
  activityTime: string;
  activityTitle: string;
}

export function UnfavorableWeatherSection({ activityTime, activityTitle }: UnfavorableWeatherSectionProps) {
  return (
    <div className="space-y-6">
      {/* Current weather section */}
      <div className="relative rounded-2xl overflow-hidden glass-effect p-6 text-center">
        <img
          src={rainyParkImage}
          alt="Rainy park"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10">
          <div className="text-6xl mb-4">☁️</div>
          <h2 className="text-xl mb-2">Weather</h2>
          <p className="text-muted-foreground">
            Sun, {activityTime}, Mostly cloudy
          </p>
          <div className="flex items-center justify-center gap-8 mt-4">
            <div className="text-center">
              <div className="text-4xl mb-1">17°C</div>
              <div className="text-sm text-muted-foreground">63°F</div>
            </div>
            <div className="text-right space-y-1">
              <div>Precip.: 20%</div>
              <div>Humidity: 79%</div>
              <div>Wind: 16 km/h</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hourly forecast slider */}
      <HourlyWeatherSlider activityTime={activityTime} />

      {/* Best days for the activity */}
      <BestDaysCalendar activityType={activityTitle} />

      {/* Bear character message */}
      <div className="glass-effect rounded-2xl p-6 flex items-start gap-4">
        <div className="w-20 h-20 flex-shrink-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-4xl">
          🏃‍♂️🐻
        </div>
        <div className="flex-1">
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-4 relative">
            <div className="absolute -left-2 top-4 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-white/90 dark:border-r-gray-800/90"></div>
            <p className="text-foreground">
              Hello! The weather doesn't seem favorable for running right now. The clouds might bring unexpected rain. 
              How about we check the best hours of the day or the most favorable upcoming days?
            </p>
          </div>
          <p className="text-sm text-muted-foreground mt-2 ml-4">Your weather assistant 🐻</p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="glass-effect rounded-2xl p-6">
        <h3 className="font-medium mb-3">💡 Running recommendations</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-green-500">•</span>
            <span>8:00 PM - 9:00 PM would be the best hours today (0% rain)</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-500">•</span>
            <span>Consider wearing a light jacket due to wind (16 km/h)</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-orange-500">•</span>
            <span>Stay well hydrated, humidity is high (79%)</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-purple-500">•</span>
            <span>Next Wednesday and Thursday will be excellent days for running</span>
          </div>
        </div>
      </div>
    </div>
  );
}