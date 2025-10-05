import { useState } from 'react';
import { Sparkles, Clock, MapPin, Thermometer, Eye } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface RecommendedActivity {
  id: string;
  title: string;
  description: string;
  bestTime: string;
  duration: string;
  location: string;
  weatherScore: number;
  category: 'outdoor' | 'indoor' | 'exercise' | 'leisure';
  reason: string;
}

interface ActivityRecommendationsProps {
  currentWeather: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
  };
  userProfile?: {
    activityLevel: string;
    goals: string[];
  };
}

export function ActivityRecommendations({ currentWeather, userProfile }: ActivityRecommendationsProps) {
  const [showAll, setShowAll] = useState(false);

  const generateRecommendations = (): RecommendedActivity[] => {
    const baseActivities: RecommendedActivity[] = [
      {
        id: '1',
        title: 'Caminata por el parque',
        description: 'Disfruta del aire libre con una caminata relajante',
        bestTime: '07:00 - 09:00',
        duration: '45 min',
        location: 'Parque cercano',
        weatherScore: 0,
        category: 'outdoor',
        reason: ''
      },
      {
        id: '2',
        title: 'Yoga matutino',
        description: 'Sesión de yoga para comenzar el día con energía',
        bestTime: '06:30 - 07:30',
        duration: '60 min',
        location: 'En casa',
        weatherScore: 0,
        category: 'exercise',
        reason: ''
      },
      {
        id: '3',
        title: 'Lectura al aire libre',
        description: 'Momento de relajación con un buen libro',
        bestTime: '16:00 - 18:00',
        duration: '90 min',
        location: 'Jardín o balcón',
        weatherScore: 0,
        category: 'leisure',
        reason: ''
      },
      {
        id: '4',
        title: 'Entrenamiento en gimnasio',
        description: 'Rutina completa de ejercicios',
        bestTime: '18:00 - 19:30',
        duration: '90 min',
        location: 'Gimnasio',
        weatherScore: 0,
        category: 'indoor',
        reason: ''
      },
      {
        id: '5',
        title: 'Ciclismo urbano',
        description: 'Recorrido en bicicleta por la ciudad',
        bestTime: '17:00 - 19:00',
        duration: '120 min',
        location: 'Ciclovías',
        weatherScore: 0,
        category: 'outdoor',
        reason: ''
      }
    ];

    // Calcular scores y razones basadas en el clima actual
    return baseActivities.map(activity => {
      let score = 50; // Score base
      let reason = '';

      const temp = currentWeather.temperature;
      const isRainy = currentWeather.condition.toLowerCase().includes('lluvia');
      const isSunny = currentWeather.condition.toLowerCase().includes('sol');

      // Ajustar score según categoría y clima
      if (activity.category === 'outdoor') {
        if (isRainy) {
          score -= 40;
          reason = 'Clima lluvioso - considera actividades bajo techo';
        } else if (temp >= 18 && temp <= 28 && isSunny) {
          score += 35;
          reason = 'Clima perfecto para actividades al aire libre';
        } else if (temp >= 15 && temp <= 30) {
          score += 20;
          reason = 'Buenas condiciones para estar al aire libre';
        } else if (temp < 10 || temp > 35) {
          score -= 20;
          reason = 'Temperatura extrema - abrígate bien o busca sombra';
        }
      } else if (activity.category === 'indoor') {
        if (isRainy) {
          score += 25;
          reason = 'Ideal para días lluviosos';
        } else if (temp < 15 || temp > 30) {
          score += 15;
          reason = 'Perfecto para evitar el clima extremo';
        }
      }

      // Ajustar según perfil del usuario
      if (userProfile?.activityLevel === 'muy activo' && activity.category === 'exercise') {
        score += 15;
      } else if (userProfile?.activityLevel === 'sedentario' && activity.category === 'leisure') {
        score += 10;
      }

      // Ajustar por objetivos
      if (userProfile?.goals?.includes('perder peso') && activity.category === 'exercise') {
        score += 20;
      }

      return {
        ...activity,
        weatherScore: Math.max(0, Math.min(100, score)),
        reason: reason || 'Actividad recomendada para hoy'
      };
    }).sort((a, b) => b.weatherScore - a.weatherScore);
  };

  const recommendations = generateRecommendations();
  const displayedRecommendations = showAll ? recommendations : recommendations.slice(0, 3);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'outdoor': return 'bg-green-100 text-green-800';
      case 'indoor': return 'bg-blue-100 text-blue-800';
      case 'exercise': return 'bg-orange-100 text-orange-800';
      case 'leisure': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <Card className="glass-effect border-0 shadow-lg">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={20} className="text-primary" />
          <h3 className="font-medium">Actividades recomendadas para hoy</h3>
        </div>

        <div className="space-y-3">
          {displayedRecommendations.map((activity, index) => (
            <div key={activity.id} className="p-3 rounded-lg glass-effect">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <Badge variant="secondary" className={getCategoryColor(activity.category)}>
                      {activity.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{activity.description}</p>
                </div>
                <div className="text-right ml-3">
                  <p className={`font-bold text-sm ${getScoreColor(activity.weatherScore)}`}>
                    {activity.weatherScore}%
                  </p>
                  <div className="flex items-center gap-1">
                    <Eye size={10} />
                    <span className="text-xs text-muted-foreground">#{index + 1}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Clock size={10} />
                  <span>{activity.bestTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={10} />
                  <span>{activity.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Thermometer size={10} />
                  <span>{activity.duration}</span>
                </div>
              </div>

              <div className="text-xs text-primary bg-primary/10 rounded p-2">
                💡 {activity.reason}
              </div>
            </div>
          ))}
        </div>

        {recommendations.length > 3 && (
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="text-primary"
            >
              {showAll ? 'Ver menos' : `Ver ${recommendations.length - 3} más`}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}