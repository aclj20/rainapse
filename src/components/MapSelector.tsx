import { useState } from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface MapSelectorProps {
  onLocationSelect: (location: Location) => void;
  selectedLocation?: Location;
}

export function MapSelector({ onLocationSelect, selectedLocation }: MapSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Mock locations - aquí integrarías con Google Places API
  const mockLocations = [
    { lat: -12.0464, lng: -77.0428, address: 'Lima, Perú' },
    { lat: -33.4489, lng: -70.6693, address: 'Santiago, Chile' },
    { lat: -34.6037, lng: -58.3816, address: 'Buenos Aires, Argentina' },
    { lat: 4.7110, lng: -74.0721, address: 'Bogotá, Colombia' },
  ];

  const handleLocationClick = (location: Location) => {
    onLocationSelect(location);
    setIsOpen(false);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Mi ubicación actual'
          };
          handleLocationClick(location);
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
        }
      );
    }
  };

  const filteredLocations = mockLocations.filter(location =>
    location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start glass-effect border-0">
          <MapPin size={16} className="mr-2" />
          {selectedLocation ? selectedLocation.address : 'Seleccionar ubicación en el mapa'}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Seleccionar ubicación</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search input */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar ubicación..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Current location button */}
          <Button
            variant="outline"
            onClick={handleCurrentLocation}
            className="w-full justify-start"
          >
            <Navigation size={16} className="mr-2" />
            Usar mi ubicación actual
          </Button>

          {/* Mock map area */}
          <div className="h-48 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center text-muted-foreground">
              <MapPin size={32} className="mx-auto mb-2" />
              <p className="text-sm">Aquí iría el mapa de Google Maps</p>
              <p className="text-xs">API Key requerida para mostrar el mapa</p>
            </div>
          </div>

          {/* Location suggestions */}
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {filteredLocations.map((location, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => handleLocationClick(location)}
                className="w-full justify-start text-left h-auto py-2"
              >
                <MapPin size={14} className="mr-2 flex-shrink-0" />
                <span className="truncate">{location.address}</span>
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}