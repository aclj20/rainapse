import { useState, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import bearAvatar from 'figma:asset/5daf49f525847c138e0d204eab1450f954ee921f.png';

export interface UserProfile {
  name: string;
  city: string;
  healthConditions: string[];
  medications: string;
  climateAffects: string;
  outdoorActivities: string[];
  climateInfluence: string;
  alertTypes: string[];
  notificationFrequency: string;
  favoriteClimate: string;
}

interface OnboardingChatbotProps {
  onComplete: (profile: UserProfile) => void;
}

interface QuestionConfig {
  id: string;
  title: string;
  description: string;
  field: keyof UserProfile;
  type: 'text' | 'select' | 'multiselect';
  options?: string[];
  section: string;
}

const QUESTIONS: QuestionConfig[] = [
  // 1️⃣ BASIC PROFILE
  {
    id: 'name',
    title: 'What is your name?',
    description: 'Helps us personalize your experience in RAINUP',
    field: 'name',
    type: 'text',
    section: 'Basic Profile'
  },
  {
    id: 'city',
    title: 'Which city do you live in?',
    description: 'To provide you with accurate weather information for your location',
    field: 'city',
    type: 'text',
    section: 'Basic Profile'
  },
  
  // 2️⃣ HEALTH AND MEDICAL CONDITIONS
  {
    id: 'health_conditions',
    title: 'Health conditions affected by weather',
    description: 'Select all conditions that apply to you',
    field: 'healthConditions',
    type: 'multiselect',
    section: 'Health',
    options: [
      'None',
      'Allergies (pollen, dust, mold)',
      'Asthma or COPD',
      'Cardiovascular problems',
      'Skin problems',
      'Joint or muscle pain',
      'Sensitivity to heat or cold'
    ]
  },
  {
    id: 'medications',
    title: 'Do you take weather-sensitive medications?',
    description: 'Medications that increase sensitivity to sun, heat or cold',
    field: 'medications',
    type: 'select',
    section: 'Health',
    options: ['Yes', 'No', 'Not sure']
  },
  {
    id: 'climate_affects',
    title: 'What type of weather affects you most?',
    description: 'Select the type of weather that has the most impact on your wellbeing',
    field: 'climateAffects',
    type: 'select',
    section: 'Health',
    options: [
      'Extreme heat ☀️',
      'High humidity or rain 🌧️',
      'Strong wind or dust 💨',
      'Intense cold ❄️',
      'Pollution or dry air 🌫️'
    ]
  },
  
  // 3️⃣ LIFESTYLE AND ACTIVITIES
  {
    id: 'outdoor_activities',
    title: 'Outdoor activities you do',
    description: 'Select all activities you do frequently',
    field: 'outdoorActivities',
    type: 'multiselect',
    section: 'Lifestyle',
    options: [
      'None or very few',
      'Physical exercise or sports',
      'Gardening or agriculture',
      'Walks or hiking',
      'Outdoor work',
      'Social or recreational events'
    ]
  },
  {
    id: 'climate_influence',
    title: 'Weather influence on your activities',
    description: 'How much do you adapt your plans according to weather conditions?',
    field: 'climateInfluence',
    type: 'select',
    section: 'Lifestyle',
    options: [
      'A lot, I usually adapt my plans',
      'Sometimes, depending on the type of activity',
      'Little or none'
    ]
  },
  
  // 4️⃣ ALERT PREFERENCES
  {
    id: 'alert_types',
    title: 'Types of alerts you want to receive',
    description: 'Select the alerts that are most useful to you',
    field: 'alertTypes',
    type: 'multiselect',
    section: 'Alerts',
    options: [
      'Riesgos para la salud según mi perfil',
      'Recomendaciones para planificar actividades',
      'Alertas sobre radiación UV y calidad del aire',
      'Sugerencias de prevención o cuidado diario'
    ]
  },
  {
    id: 'notification_frequency',
    title: 'Frecuencia de notificaciones',
    description: '¿Con qué frecuencia prefieres recibir actualizaciones?',
    field: 'notificationFrequency',
    type: 'select',
    section: 'Alertas',
    options: [
      'Solo cuando haya alertas importantes',
      'Cada mañana con el pronóstico personalizado',
      'Semanalmente con un resumen y sugerencias'
    ]
  },
  
  // 5️⃣ PERFIL CLIMÁTICO EMOCIONAL
  {
    id: 'favorite_climate',
    title: 'Tu clima favorito',
    description: '¿Qué tipo de clima te hace sentir más cómodo y feliz?',
    field: 'favoriteClimate',
    type: 'select',
    section: 'Perfil Emocional',
    options: [
      'Soleado y cálido ☀️',
      'Fresco o lluvioso 🌧️',
      'Ventoso y nublado 🌬️',
      'Frío y seco ❄️'
    ]
  }
];

// Componente del chatbot flotante
function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const tips = [
    "¡Hola! 👋 Estoy aquí para ayudarte durante el proceso",
    "Tómate tu tiempo para responder cada pregunta",
    "Todas tus respuestas nos ayudarán a personalizar tu experiencia",
    "Si tienes dudas sobre alguna pregunta, ¡pregúntame!",
    "Tu privacidad es importante, mantenemos tus datos seguros 🔒"
  ];

  useEffect(() => {
    if (isOpen && !message) {
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      setMessage(randomTip);
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 mr-2 max-w-xs">
          <div className="glass-effect rounded-2xl p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                🐻
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium mb-1">Asistente RAINAPSE</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-14 h-14 shadow-lg"
        size="icon"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </Button>
    </div>
  );
}

// Vista de bienvenida
function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="h-screen weather-gradient flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-8 max-w-md">
        {/* Logo - Oso */}
        <div className="flex justify-center">
          <div className="w-48 h-48 flex items-center justify-center">
            <img
              src={bearAvatar}
              alt="RAINAPSE Bear Mascot"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Título */}
        <div className="space-y-4">
          <h1 className="text-4xl font-medium tracking-tight">RAINAPSE</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Tu asistente climático inteligente que te ayuda a planificar cada día según el clima
          </p>
        </div>

        {/* Características */}
        <div className="space-y-3 text-left">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span>Recomendaciones personalizadas según tu salud</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span>Alertas inteligentes para cuidar tu bienestar</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span>Planificación de actividades basada en el clima</span>
          </div>
        </div>

        {/* Botón de empezar */}
        <Button 
          onClick={onStart}
          className="w-full rounded-full h-12 text-base"
          size="lg"
        >
          Empezar
        </Button>
      </div>
    </div>
  );
}

// Vista de encuesta
function SurveyScreen({ onComplete }: { onComplete: (profile: UserProfile) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<UserProfile>>({});
  const [textInput, setTextInput] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  const handleNext = () => {
    let value: any;
    
    if (currentQuestion.type === 'text') {
      if (!textInput.trim()) return;
      value = textInput.trim();
    } else if (currentQuestion.type === 'multiselect') {
      if (selectedOptions.length === 0) return;
      value = selectedOptions.includes('Ninguna') ? [] : selectedOptions;
    } else {
      if (selectedOptions.length === 0) return;
      value = selectedOptions[0];
    }

    const newAnswers = {
      ...answers,
      [currentQuestion.field]: value
    };
    
    setAnswers(newAnswers);
    setTextInput('');
    setSelectedOptions([]);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Completar encuesta
      const finalProfile: UserProfile = {
        name: newAnswers.name || '',
        city: newAnswers.city || '',
        healthConditions: newAnswers.healthConditions || [],
        medications: newAnswers.medications || '',
        climateAffects: newAnswers.climateAffects || '',
        outdoorActivities: newAnswers.outdoorActivities || [],
        climateInfluence: newAnswers.climateInfluence || '',
        alertTypes: newAnswers.alertTypes || [],
        notificationFrequency: newAnswers.notificationFrequency || '',
        favoriteClimate: newAnswers.favoriteClimate || ''
      };
      onComplete(finalProfile);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Restaurar respuesta anterior
      const previousValue = answers[QUESTIONS[currentStep - 1].field];
      if (typeof previousValue === 'string') {
        if (QUESTIONS[currentStep - 1].type === 'text') {
          setTextInput(previousValue);
        } else {
          setSelectedOptions([previousValue]);
        }
      } else if (Array.isArray(previousValue)) {
        setSelectedOptions(previousValue);
      }
    }
  };

  const handleOptionToggle = (option: string) => {
    if (currentQuestion.type === 'multiselect') {
      setSelectedOptions(prev => {
        if (option === 'Ninguna') {
          return ['Ninguna'];
        }
        
        const newSelected = prev.includes(option) 
          ? prev.filter(o => o !== option)
          : [...prev.filter(o => o !== 'Ninguna'), option];
        
        return newSelected;
      });
    } else {
      setSelectedOptions([option]);
    }
  };

  const canProceed = () => {
    if (currentQuestion.type === 'text') {
      return textInput.trim().length > 0;
    }
    return selectedOptions.length > 0;
  };

  return (
    <div className="h-screen weather-gradient flex flex-col">
      {/* Header con progreso */}
      <div className="px-6 py-6 glass-effect border-b border-border">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium">RAINAPSE</h1>
            <Badge variant="secondary" className="text-xs">
              {currentStep + 1} de {QUESTIONS.length}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{currentQuestion.section}</span>
              <span className="text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-8">
          {/* Pregunta */}
          <div className="space-y-3">
            <h2 className="text-2xl font-medium leading-tight">
              {currentQuestion.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {currentQuestion.description}
            </p>
          </div>

          {/* Input de texto */}
          {currentQuestion.type === 'text' && (
            <div className="space-y-4">
              <Input
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Escribe tu respuesta..."
                className="h-12 rounded-xl glass-effect border-0 text-base"
                onKeyPress={(e) => e.key === 'Enter' && canProceed() && handleNext()}
              />
            </div>
          )}

          {/* Opciones de selección */}
          {(currentQuestion.type === 'select' || currentQuestion.type === 'multiselect') && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionToggle(option)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    selectedOptions.includes(option)
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'glass-effect hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">{option}</span>
                    {selectedOptions.includes(option) && (
                      <div className="w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
              
              {currentQuestion.type === 'multiselect' && selectedOptions.length > 0 && (
                <div className="mt-4 p-3 glass-effect rounded-xl">
                  <p className="text-sm text-muted-foreground mb-2">Seleccionado:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedOptions.map((option, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {option}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Botones de navegación */}
      <div className="px-6 py-6 glass-effect border-t border-border">
        <div className="flex gap-3 max-w-md mx-auto">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex-1 h-12 rounded-xl"
          >
            <ChevronLeft size={16} className="mr-2" />
            Anterior
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 h-12 rounded-xl"
          >
            {currentStep === QUESTIONS.length - 1 ? 'Finalizar' : 'Siguiente'}
            {currentStep < QUESTIONS.length - 1 && (
              <ChevronRight size={16} className="ml-2" />
            )}
          </Button>
        </div>
      </div>

      {/* Chatbot flotante */}
      <FloatingChatbot />
    </div>
  );
}

export function OnboardingChatbot({ onComplete }: OnboardingChatbotProps) {
  const [currentView, setCurrentView] = useState<'welcome' | 'survey'>('welcome');

  const handleStart = () => {
    setCurrentView('survey');
  };

  const handleSurveyComplete = (profile: UserProfile) => {
    onComplete(profile);
  };

  if (currentView === 'welcome') {
    return <WelcomeScreen onStart={handleStart} />;
  }

  return <SurveyScreen onComplete={handleSurveyComplete} />;
}