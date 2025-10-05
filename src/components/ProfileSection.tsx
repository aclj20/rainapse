import { User, Settings, Bell, Shield, HelpCircle, LogOut, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { UserProfile } from './OnboardingChatbot';

interface ProfileSectionProps {
  userProfile: UserProfile | null;
}

export function ProfileSection({ userProfile }: ProfileSectionProps) {
  const menuItems = [
    { icon: Edit, label: 'Editar perfil', onClick: () => console.log('Editar perfil') },
    { icon: Settings, label: 'Configuración', onClick: () => console.log('Configuración') },
    { icon: Bell, label: 'Notificaciones', onClick: () => console.log('Notificaciones') },
    { icon: Shield, label: 'Privacidad', onClick: () => console.log('Privacidad') },
    { icon: HelpCircle, label: 'Ayuda', onClick: () => console.log('Ayuda') },
  ];

  return (
    <div className="flex flex-col h-full weather-gradient">
      {/* Header */}
      <div className="px-6 py-8 text-center">
        <Avatar className="w-20 h-20 mx-auto mb-4 glass-effect">
          <AvatarImage src="" alt="Usuario" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : <User size={32} />}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-xl mb-1 text-foreground">{userProfile?.name || 'Mi Perfil'}</h1>
        <p className="text-foreground/70">
          {userProfile?.age ? `${userProfile.age} años` : 'usuario@ejemplo.com'}
        </p>
      </div>

      {/* Menu items */}
      <div className="flex-1 px-6">
        <div className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                onClick={item.onClick}
                className="w-full justify-start h-12 px-4 rounded-lg glass-effect border-0 hover:bg-white/20"
              >
                <Icon size={20} className="mr-3" />
                {item.label}
              </Button>
            );
          })}
        </div>

        <Separator className="my-6" />

        {/* User info */}
        {userProfile && (
          <div className="glass-effect rounded-lg p-4 mb-6">
            <h3 className="font-medium mb-3">Información Personal</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Peso:</span>
                <span>{userProfile.weight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Altura:</span>
                <span>{userProfile.height} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nivel de actividad:</span>
                <span className="capitalize">{userProfile.activityLevel}</span>
              </div>
              {userProfile.diseases && userProfile.diseases.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Condiciones médicas:</span>
                  <span>{userProfile.diseases.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* User stats */}
        <div className="glass-effect rounded-lg p-4 mb-6">
          <h3 className="font-medium mb-3">Estadísticas</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-medium">24</p>
              <p className="text-sm text-muted-foreground">Actividades completadas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-medium">5</p>
              <p className="text-sm text-muted-foreground">Días activos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logout button */}
      <div className="px-6 pb-6">
        <Button
          variant="outline"
          onClick={() => console.log('Cerrar sesión')}
          className="w-full rounded-full text-destructive glass-effect border-0 hover:bg-destructive/20"
        >
          <LogOut size={16} className="mr-2" />
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}