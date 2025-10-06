import { User, Settings, Bell, Shield, HelpCircle, LogOut, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { UserProfile } from './OnboardingChatbot';
import rainupLogo from 'figma:asset/3c0dbc9916f94be9dbd359582cab8a108f63029e.png';

interface ProfileSectionProps {
  userProfile: UserProfile | null;
}

export function ProfileSection({ userProfile }: ProfileSectionProps) {
  const menuItems = [
    { icon: Edit, label: 'Edit profile', onClick: () => console.log('Edit profile') },
    { icon: Settings, label: 'Settings', onClick: () => console.log('Settings') },
    { icon: Bell, label: 'Notifications', onClick: () => console.log('Notifications') },
    { icon: Shield, label: 'Privacy', onClick: () => console.log('Privacy') },
    { icon: HelpCircle, label: 'Help', onClick: () => console.log('Help') },
  ];

  return (
    <div className="flex flex-col h-full weather-gradient">
      {/* Header */}
      <div className="px-6 py-8 text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-white shadow-lg">
          <img
            src={rainupLogo}
            alt="RAINUP Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-xl mb-1 text-foreground">{userProfile?.name || 'DIEGO'}</h1>
        <p className="text-foreground/70">
          {userProfile?.city || 'user@example.com'}
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
            <h3 className="font-medium mb-3">Personal Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">City:</span>
                <span>{userProfile.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Medications:</span>
                <span>{userProfile.medications}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Most affecting weather:</span>
                <span>{userProfile.climateAffects}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Favorite weather:</span>
                <span>{userProfile.favoriteClimate}</span>
              </div>
              {userProfile.healthConditions && userProfile.healthConditions.length > 0 && (
                <div>
                  <span className="text-muted-foreground block mb-1">Health conditions:</span>
                  <span className="text-xs">{userProfile.healthConditions.join(', ')}</span>
                </div>
              )}
              {userProfile.outdoorActivities && userProfile.outdoorActivities.length > 0 && (
                <div>
                  <span className="text-muted-foreground block mb-1">Outdoor activities:</span>
                  <span className="text-xs">{userProfile.outdoorActivities.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* User stats */}
        <div className="glass-effect rounded-lg p-4 mb-6">
          <h3 className="font-medium mb-3">Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-medium">24</p>
              <p className="text-sm text-muted-foreground">Completed activities</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-medium">5</p>
              <p className="text-sm text-muted-foreground">Active days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logout button */}
      <div className="px-6 pb-6">
        <Button
          variant="outline"
          onClick={() => console.log('Log out')}
          className="w-full rounded-full text-destructive glass-effect border-0 hover:bg-destructive/20"
        >
          <LogOut size={16} className="mr-2" />
          Log out
        </Button>
      </div>
    </div>
  );
}