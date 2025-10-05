import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, MessageCircle, Mic, MicOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

export interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  diseases: string[];
  activityLevel: string;
  goals: string[];
}

interface OnboardingChatbotProps {
  onComplete: (profile: UserProfile) => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

export function OnboardingChatbot({ onComplete }: OnboardingChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const questions = [
    {
      id: 'welcome',
      text: '¡Hola! 👋 Soy tu asistente personal. Me encantaría conocerte mejor para poder ayudarte de la mejor manera. ¿Cuál es tu nombre?',
      field: 'name',
      type: 'text'
    },
    {
      id: 'age',
      text: 'Encantado de conocerte, {name}! 😊 ¿Qué edad tienes?',
      field: 'age',
      type: 'number'
    },
    {
      id: 'weight',
      text: 'Perfecto. ¿Cuál es tu peso actual en kg? (Esta información me ayuda a personalizar mejor tus recomendaciones)',
      field: 'weight',
      type: 'number'
    },
    {
      id: 'height',
      text: 'Gracias. ¿Y tu altura en cm?',
      field: 'height',
      type: 'number'
    },
    {
      id: 'diseases',
      text: '¿Tienes alguna condición médica o enfermedad que deba tener en cuenta? Si no tienes ninguna, simplemente escribe "ninguna".',
      field: 'diseases',
      type: 'text'
    },
    {
      id: 'activity',
      text: '¿Cómo describirías tu nivel de actividad física actual? (sedentario, ligero, moderado, activo, muy activo)',
      field: 'activityLevel',
      type: 'text'
    },
    {
      id: 'goals',
      text: 'Por último, ¿cuáles son tus principales objetivos? Por ejemplo: perder peso, ganar músculo, mantenerse saludable, etc.',
      field: 'goals',
      type: 'text'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Mensaje inicial
    addBotMessage(questions[0].text);
  }, []);

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const formattedText = text.replace('{name}', userProfile.name || '');
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: formattedText,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
      
      // Si está en modo voz, reproducir texto automáticamente
      if (isVoiceMode && 'speechSynthesis' in window) {
        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(formattedText);
          utterance.lang = 'es-ES';
          utterance.rate = 0.8;
          utterance.pitch = 1.1;
          utterance.volume = 0.9;
          speechSynthesis.speak(utterance);
          
          // Después de que termine de hablar, activar automáticamente el micrófono
          utterance.onend = () => {
            if (isVoiceMode && currentStep < questions.length - 1) {
              setTimeout(startListening, 500);
            }
          };
        }, 500);
      }
    }, 1000);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    }]);
  };

  const handleSubmit = () => {
    if (!input.trim()) return;

    const currentQuestion = questions[currentStep];
    addUserMessage(input);

    // Procesar la respuesta
    let processedValue: any = input.trim();
    
    if (currentQuestion.type === 'number') {
      processedValue = parseInt(input);
      if (isNaN(processedValue)) {
        setTimeout(() => {
          addBotMessage('Por favor, ingresa un número válido.');
        }, 500);
        setInput('');
        return;
      }
    }

    // Guardar en el perfil
    const updatedProfile = { ...userProfile };
    
    if (currentQuestion.field === 'diseases') {
      updatedProfile.diseases = processedValue.toLowerCase() === 'ninguna' ? [] : [processedValue];
    } else if (currentQuestion.field === 'goals') {
      updatedProfile.goals = [processedValue];
    } else {
      (updatedProfile as any)[currentQuestion.field] = processedValue;
    }
    
    setUserProfile(updatedProfile);
    setInput('');

    // Siguiente pregunta o finalizar
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimeout(() => {
        addBotMessage(questions[currentStep + 1].text);
      }, 1500);
    } else {
      // Onboarding completado
      setTimeout(() => {
        addBotMessage(`¡Perfecto, ${updatedProfile.name}! 🎉 Ya tengo toda la información que necesito. Ahora voy a personalizar tu experiencia. ¡Comencemos!`);
        setTimeout(() => {
          onComplete(updatedProfile as UserProfile);
        }, 3000);
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'es-ES';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      console.log('Speech recognition not supported');
    }
  };

  return (
    <div className="h-screen weather-gradient flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border glass-effect">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot size={20} />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-medium">Asistente de Configuración</h1>
              <p className="text-sm text-muted-foreground">Te ayudo a configurar tu perfil</p>
            </div>
          </div>
          
          {/* Voice/Chat toggle */}
          <div className="flex items-center gap-2">
            <MessageCircle size={16} className={!isVoiceMode ? 'text-primary' : 'text-muted-foreground'} />
            <Switch
              checked={isVoiceMode}
              onCheckedChange={setIsVoiceMode}
              className="data-[state=checked]:bg-primary"
            />
            <Mic size={16} className={isVoiceMode ? 'text-primary' : 'text-muted-foreground'} />
          </div>
        </div>
        
        {isVoiceMode && (
          <div className="mt-2 text-xs text-muted-foreground text-center">
            🎙️ Conversación por voz - El asistente hablará y activará el micrófono automáticamente
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot size={16} />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'glass-effect border-0'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>

              {message.sender === 'user' && (
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    <User size={16} />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot size={16} />
                </AvatarFallback>
              </Avatar>
              <div className="glass-effect border-0 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-border glass-effect">
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isVoiceMode ? "Toca el micrófono para hablar..." : "Escribe tu respuesta..."}
            className="flex-1 rounded-full glass-effect border-0"
            disabled={isTyping || isListening}
          />
          
          {isVoiceMode && (
            <Button
              onClick={startListening}
              disabled={isTyping || isListening}
              size="icon"
              className={`rounded-full flex-shrink-0 ${
                isListening ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'
              }`}
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </Button>
          )}
          
          <Button
            onClick={handleSubmit}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="rounded-full flex-shrink-0 bg-primary hover:bg-primary/90"
          >
            <Send size={16} />
          </Button>
        </div>
        
        {isListening && (
          <div className="mt-3 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-destructive">
              <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
              Escuchando...
            </div>
          </div>
        )}
      </div>

      {/* Progress indicator */}
      <div className="px-6 py-2">
        <div className="w-full bg-muted rounded-full h-1">
          <div
            className="bg-primary h-1 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / (questions.length - 1)) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-1">
          Paso {currentStep + 1} de {questions.length}
        </p>
      </div>
    </div>
  );
}