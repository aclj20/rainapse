import { useState } from 'react';
import { Send, Mic, MicOff, MapPin, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { UserProfile } from './OnboardingChatbot';
import { WeatherCard } from './WeatherCard';
import { MapSelector } from './MapSelector';
import { ActivityRecommendations } from './ActivityRecommendations';
import bearAvatar from 'figma:asset/5daf49f525847c138e0d204eab1450f954ee921f.png';
import parkBackground from 'figma:asset/4dc85576111da66b68e49e29c27ad8fe70d96f8c.png';

interface HomeSectionProps {
  userProfile: UserProfile | null;
}

interface Location {
  lat: number;
  lng: number;
  address: string;
}

export function HomeSection({ userProfile }: HomeSectionProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Mock current weather data
  const currentWeather = {
    temperature: 24,
    condition: 'Parcialmente nublado',
    humidity: 65,
    windSpeed: 12
  };

  const handleSend = () => {
    if (message.trim() || selectedLocation) {
      // Aquí conectarías con tu backend
      console.log('Enviando mensaje:', message);
      console.log('Ubicación seleccionada:', selectedLocation);
      setMessage('');
      setSelectedLocation(null);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Aquí implementarías la funcionalidad de grabación de audio
    if (!isRecording) {
      console.log('Iniciando grabación...');
    } else {
      console.log('Deteniendo grabación...');
    }
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  const generateWeatherCSV = () => {
    // Weather conditions possible
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Stormy', 'Clear'];
    const uvLevels = ['Low', 'Moderate', 'High', 'Very High'];
    
    // Generate data for the next 14 days
    const weatherData = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Generate realistic random data
      const tempMax = Math.floor(Math.random() * 15) + 20; // 20-35°C
      const tempMin = tempMax - Math.floor(Math.random() * 8) - 5; // 5-13°C less than max
      const condition = conditions[Math.floor(Math.random() * conditions.length)];
      const rainProbability = condition.includes('Rain') || condition.includes('Storm') 
        ? Math.floor(Math.random() * 40) + 60 // 60-100% if rainy
        : Math.floor(Math.random() * 50); // 0-50% if not
      const humidity = Math.floor(Math.random() * 40) + 40; // 40-80%
      const windSpeed = Math.floor(Math.random() * 20) + 5; // 5-25 km/h
      const uvIndex = uvLevels[Math.floor(Math.random() * uvLevels.length)];
      
      weatherData.push({
        date: date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
        dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' }),
        tempMax,
        tempMin,
        condition: condition,
        rainProb: rainProbability,
        humidity: humidity,
        wind: windSpeed,
        uv: uvIndex
      });
    }
    
    // Create CSV content
    const headers = ['Date', 'Day', 'Max Temp (°C)', 'Min Temp (°C)', 'Condition', 'Rain Prob (%)', 'Humidity (%)', 'Wind (km/h)', 'UV Index'];
    const csvContent = [
      headers.join(','),
      ...weatherData.map(row => 
        `${row.date},${row.dayOfWeek},${row.tempMax},${row.tempMin},"${row.condition}",${row.rainProb},${row.humidity},${row.wind},${row.uv}`
      )
    ].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `weather_next_14_days_${today.toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${parkBackground})` }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
      </div>

      {/* Content with z-index */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Weather Header */}
        <div className="px-6 py-4 text-white">
          {/* Location */}
          <div className="flex items-center justify-center gap-1.5 text-xs tracking-wide mb-2">
            <MapPin size={14} />
            <span className="drop-shadow-lg">CASA</span>
          </div>
          
          {/* City */}
          <h3 className="text-center text-sm mb-3 opacity-90 drop-shadow-lg">
            Lima Department
          </h3>
          
          {/* Temperature and Weather Info - Horizontal Layout */}
          <div className="flex items-center justify-center gap-6">
            {/* Temperature */}
            <div className="text-5xl font-extralight tracking-tighter drop-shadow-2xl">19°</div>
            
            {/* Weather Details */}
            <div className="flex flex-col gap-1.5 text-sm">
              <div className="flex items-center gap-2">
                <span>☁️</span>
                <span className="drop-shadow-lg">Cloudy</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💧</span>
                <span className="drop-shadow-lg">Precipitation: 20%</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🌡️</span>
                <span className="drop-shadow-lg">Max: 20° Min: 15°</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bear Assistant Message */}
        <div className="px-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={bearAvatar}
                alt="Bear mascot"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-white drop-shadow-lg">
                Hello, {userProfile?.name || 'Diego'}!
              </h2>
              <p className="text-white drop-shadow-lg">
                Where do you want to go today?
              </p>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="px-6 mb-6">
          <div className="glass-effect rounded-xl p-4 shadow-lg backdrop-blur-md">
            <Textarea
              placeholder="Write your destination or activity..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[50px] border-0 bg-transparent resize-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-foreground/60 text-white"
            />
            
            {/* Map Selector */}
            <div className="mt-3">
              <MapSelector 
                onLocationSelect={handleLocationSelect}
                selectedLocation={selectedLocation}
              />
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleRecording}
                className={`rounded-full glass-effect border-0 ${
                  isRecording 
                    ? 'bg-destructive text-destructive-foreground' 
                    : 'hover:bg-white/20 text-white'
                }`}
              >
                {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
              </Button>
              
              <Button
                onClick={handleSend}
                disabled={!message.trim() && !selectedLocation}
                className="rounded-full px-6 bg-primary hover:bg-primary/90"
              >
                <Send size={16} className="mr-2" />
                Send
              </Button>
            </div>
          </div>

          {isRecording && (
            <div className="mt-4 p-3 glass-effect rounded-lg">
              <div className="flex items-center justify-center text-white">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2" />
                Recording audio...
              </div>
            </div>
          )}

          {selectedLocation && (
            <div className="mt-3 p-3 glass-effect rounded-lg">
              <div className="flex items-center text-sm text-white">
                <MapPin size={14} className="mr-2 text-primary" />
                <span>Location: {selectedLocation.address}</span>
              </div>
            </div>
          )}
        </div>

        {/* Activity Recommendations */}
        <div className="px-6 pb-6">
          <ActivityRecommendations 
            currentWeather={currentWeather}
            userProfile={userProfile}
          />
        </div>

        {/* Download CSV Button */}
        <div className="px-6 pb-6">
          <Button
            onClick={generateWeatherCSV}
            className="w-full rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white shadow-lg transition-all"
          >
            <Download size={20} className="mr-2" />
            Download CSV
          </Button>
        </div>
      </div>
    </div>
  );
}