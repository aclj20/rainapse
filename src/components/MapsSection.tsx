import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import heatMapImage from 'figma:asset/02a391117888c49043cbb0864b9ff12d8f2325d6.png';
import precipitationMapImage from 'figma:asset/2858e74195da15fd7e2f033cd5e6bc99746755f6.png';
import locationMapImage from 'figma:asset/334b163bd0ef2463b0304db2772410587d019aea.png';

type MapType = 'heat' | 'precipitation' | 'location';

export function MapsSection() {
  const [activeMap, setActiveMap] = useState<MapType>('heat');
  const [searchLocation, setSearchLocation] = useState('');

  return (
    <div className="flex flex-col h-full bg-background-solid">
      {/* Header con tabs */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-around p-2">
          <button
            onClick={() => setActiveMap('heat')}
            className={`flex-1 py-3 px-2 text-sm transition-colors rounded-lg ${
              activeMap === 'heat'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            🔥 Heat
          </button>
          <button
            onClick={() => setActiveMap('precipitation')}
            className={`flex-1 py-3 px-2 text-sm transition-colors rounded-lg ${
              activeMap === 'precipitation'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            💧 Precipitation
          </button>
          <button
            onClick={() => setActiveMap('location')}
            className={`flex-1 py-3 px-2 text-sm transition-colors rounded-lg ${
              activeMap === 'location'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            📍 Location
          </button>
        </div>

        {/* Barra de búsqueda para el mapa de ubicación */}
        {activeMap === 'location' && (
          <div className="px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="text"
                placeholder="Search location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-10 bg-input-background"
              />
            </div>
          </div>
        )}
      </div>

      {/* Contenedor del mapa */}
      <div className="flex-1 relative">
        {activeMap === 'heat' && <HeatMapView />}
        {activeMap === 'precipitation' && <PrecipitationMapView />}
        {activeMap === 'location' && <LocationMapView searchLocation={searchLocation} />}
      </div>
    </div>
  );
}

// Componente de Mapa de Calor
function HeatMapView() {
  return (
    <div className="w-full h-full relative">
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heatMapImage})` }}
      />
      
      {/* Simulación de mapa de calor */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-sm mx-4 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-2xl">
              🌡️
            </div>
            <div>
              <h3 className="text-foreground">Heat Map</h3>
              <p className="text-sm text-muted-foreground">Current temperature</p>
            </div>
          </div>
          
          {/* Escala de temperatura */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Average temperature</span>
              <span className="font-semibold">19°C</span>
            </div>
            
            {/* Gradiente de calor */}
            <div className="h-8 rounded-lg bg-gradient-to-r from-blue-400 via-yellow-400 to-red-500 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 h-full bg-white shadow-lg"></div>
              </div>
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10°C</span>
              <span>20°C</span>
              <span>30°C</span>
            </div>

            {/* Zonas */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-500"></div>
                <span className="text-sm">High temperature zone (25-30°C)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-yellow-400"></div>
                <span className="text-sm">Medium temperature zone (18-24°C)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-400"></div>
                <span className="text-sm">Low temperature zone (10-17°C)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de Mapa de Precipitación
function PrecipitationMapView() {
  return (
    <div className="w-full h-full relative">
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${precipitationMapImage})` }}
      />
      
      {/* Simulación de mapa de precipitación */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-sm mx-4 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-2xl">
              💧
            </div>
            <div>
              <h3 className="text-foreground">Precipitation</h3>
              <p className="text-sm text-muted-foreground">Rain probability</p>
            </div>
          </div>
          
          {/* Información de precipitación */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Current probability</span>
              <span className="font-semibold">20%</span>
            </div>
            
            {/* Gradiente de precipitación */}
            <div className="h-8 rounded-lg bg-gradient-to-r from-white via-blue-300 to-blue-600 relative">
              <div className="absolute left-[20%] inset-y-0 flex items-center">
                <div className="w-1 h-full bg-white shadow-lg"></div>
              </div>
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>

            {/* Próximas horas */}
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-medium">Next hours</h4>
              <div className="flex justify-between items-center text-sm">
                <span>14:00</span>
                <div className="flex items-center gap-1">
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[15%]"></div>
                  </div>
                  <span className="text-muted-foreground">15%</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>16:00</span>
                <div className="flex items-center gap-1">
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[35%]"></div>
                  </div>
                  <span className="text-muted-foreground">35%</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>18:00</span>
                <div className="flex items-center gap-1">
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[60%]"></div>
                  </div>
                  <span className="text-muted-foreground">60%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de Mapa de Ubicación
function LocationMapView({ searchLocation }: { searchLocation: string }) {
  const [selectedLocation, setSelectedLocation] = useState('Lima, Perú');

  return (
    <div className="w-full h-full relative">
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${locationMapImage})` }}
      />
      
      {/* Simulación de mapa interactivo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-sm mx-4 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-2xl">
              📍
            </div>
            <div>
              <h3 className="text-foreground">Location</h3>
              <p className="text-sm text-muted-foreground">{selectedLocation}</p>
            </div>
          </div>
          
          {/* Información de ubicación */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Temperature</p>
                <p className="font-semibold">19°C</p>
              </div>
              <div className="text-3xl">☁️</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-muted-foreground">Humidity</p>
                <p className="font-semibold">65%</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-muted-foreground">Wind</p>
                <p className="font-semibold">12 km/h</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-muted-foreground">Precipitación</p>
                <p className="font-semibold">20%</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-muted-foreground">UV Index</p>
                <p className="font-semibold">Moderado</p>
              </div>
            </div>

            {/* Ubicaciones sugeridas */}
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Ubicaciones cercanas</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedLocation('Miraflores, Lima')}
                  className="w-full flex items-center gap-2 p-2 hover:bg-blue-50 rounded-lg transition-colors text-left"
                >
                  <MapPin size={16} className="text-primary" />
                  <span className="text-sm">Miraflores, Lima</span>
                </button>
                <button 
                  onClick={() => setSelectedLocation('San Isidro, Lima')}
                  className="w-full flex items-center gap-2 p-2 hover:bg-blue-50 rounded-lg transition-colors text-left"
                >
                  <MapPin size={16} className="text-primary" />
                  <span className="text-sm">San Isidro, Lima</span>
                </button>
                <button 
                  onClick={() => setSelectedLocation('Barranco, Lima')}
                  className="w-full flex items-center gap-2 p-2 hover:bg-blue-50 rounded-lg transition-colors text-left"
                >
                  <MapPin size={16} className="text-primary" />
                  <span className="text-sm">Barranco, Lima</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pin de ubicación central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-12">
        <MapPin size={48} className="text-red-500 drop-shadow-lg animate-bounce" />
      </div>
    </div>
  );
}
