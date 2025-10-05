import { useState, useEffect } from 'react';
import { BottomNavigation } from './components/BottomNavigation';
import { HomeSection } from './components/HomeSection';
import { ScheduleSection } from './components/ScheduleSection';
import { ActivityDetailSection } from './components/ActivityDetailSection';
import { ProfileSection } from './components/ProfileSection';
import { OnboardingChatbot, UserProfile } from './components/OnboardingChatbot';
import { Activity } from './components/ActivityCard';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Verificar si el usuario ya completó el onboarding (simulando localStorage)
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    const savedOnboardingStatus = localStorage.getItem('onboardingComplete');
    
    if (savedProfile && savedOnboardingStatus === 'true') {
      setUserProfile(JSON.parse(savedProfile));
      setIsOnboardingComplete(true);
    }
  }, []);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setIsOnboardingComplete(true);
    // Guardar en localStorage (en producción usarías tu backend)
    localStorage.setItem('userProfile', JSON.stringify(profile));
    localStorage.setItem('onboardingComplete', 'true');
  };

  const handleActivitySelect = (activity: Activity) => {
    setSelectedActivity(activity);
    setActiveSection('activity-detail');
  };

  const handleBackToSchedule = () => {
    setSelectedActivity(null);
    setActiveSection('schedule');
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection userProfile={userProfile} />;
      case 'schedule':
        return <ScheduleSection onActivitySelect={handleActivitySelect} />;
      case 'activity-detail':
        return selectedActivity ? (
          <ActivityDetailSection 
            activity={selectedActivity} 
            onBack={handleBackToSchedule}
          />
        ) : null;
      case 'profile':
        return <ProfileSection userProfile={userProfile} />;
      case 'settings':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <h1 className="text-2xl mb-4">Configuración</h1>
            <p className="text-muted-foreground">
              Sección de configuración en desarrollo
            </p>
          </div>
        );
      default:
        return <HomeSection userProfile={userProfile} />;
    }
  };

  // Si no ha completado el onboarding, mostrar el chatbot
  if (!isOnboardingComplete) {
    return <OnboardingChatbot onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="h-screen weather-gradient flex flex-col">
      {/* Main content */}
      <div className="flex-1 pb-20 overflow-hidden">
        {renderActiveSection()}
      </div>

      {/* Bottom navigation */}
      <BottomNavigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
    </div>
  );
}