import { useState } from 'react';
import { Send, Mic, MicOff, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { UserProfile } from './OnboardingChatbot';
import { WeatherCard } from './WeatherCard';
import { MapSelector } from './MapSelector';
import { ActivityRecommendations } from './ActivityRecommendations';

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

  return (
    <div className="flex flex-col h-full weather-gradient">
      {/* Header */}
      <div className="px-6 py-6 text-center">
        <h1 className="text-2xl mb-2 text-foreground">
          ¡Hola{userProfile?.name ? `, ${userProfile.name}` : ''}!
        </h1>
        <h2 className="text-lg text-foreground/80 mb-6">¿A dónde quieres ir hoy?</h2>
        
        {/* Weather Card */}
        <WeatherCard />
      </div>

      {/* Input Section */}
      <div className="px-6 mb-6">
        <div className="glass-effect rounded-xl p-4 shadow-lg backdrop-blur-md">
          <Textarea
            placeholder="Escribe tu destino o actividad..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[80px] border-0 bg-transparent resize-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-foreground/60"
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
                  : 'hover:bg-white/20'
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
              Enviar
            </Button>
          </div>
        </div>

        {isRecording && (
          <div className="mt-4 p-3 glass-effect rounded-lg">
            <div className="flex items-center justify-center text-destructive">
              <div className="w-2 h-2 bg-destructive rounded-full animate-pulse mr-2" />
              Grabando audio...
            </div>
          </div>
        )}

        {selectedLocation && (
          <div className="mt-3 p-3 glass-effect rounded-lg">
            <div className="flex items-center text-sm text-foreground/80">
              <MapPin size={14} className="mr-2 text-primary" />
              <span>Ubicación: {selectedLocation.address}</span>
            </div>
          </div>
        )}
      </div>

      {/* Activity Recommendations */}
      <div className="px-6 mb-4">
        <ActivityRecommendations 
          currentWeather={currentWeather}
          userProfile={userProfile}
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />
    </div>
  );
}