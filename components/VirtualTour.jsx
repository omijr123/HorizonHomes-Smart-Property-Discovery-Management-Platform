import React, { useState } from 'react';
import { 
  XMarkIcon, 
  PlayIcon, 
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  EyeIcon,
  CubeIcon,
  HomeIcon,
  MapIcon,
  CameraIcon
} from '@heroicons/react/24/outline';

const VirtualTour = ({ property, isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState('living-room');
  const [viewMode, setViewMode] = useState('360'); // '360', '3d', 'photos'

  if (!isOpen || !property) return null;

  const rooms = [
    { id: 'living-room', name: 'Living Room', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800' },
    { id: 'kitchen', name: 'Kitchen', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800' },
    { id: 'bedroom', name: 'Master Bedroom', image: 'https://images.unsplash.com/photo-1560448075-bb485b067938?w=800' },
    { id: 'bathroom', name: 'Bathroom', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800' },
    { id: 'exterior', name: 'Exterior', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800' }
  ];

  const photoGallery = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
    'https://images.unsplash.com/photo-1560448075-bb485b067938?w=800',
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 ${isFullscreen ? 'p-0' : 'p-4'}`}>
      <div className={`bg-white rounded-2xl w-full h-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col ${isFullscreen ? 'rounded-none max-w-none max-h-none' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{property.title}</h2>
            <p className="text-gray-600">{property.location}</p>
          </div>
          
          {/* View Mode Tabs */}
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('360')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === '360' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <EyeIcon className="h-4 w-4 mr-1 inline" />
                360° View
              </button>
              <button
                onClick={() => setViewMode('3d')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === '3d' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <CubeIcon className="h-4 w-4 mr-1 inline" />
                3D Model
              </button>
              <button
                onClick={() => setViewMode('photos')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'photos' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <CameraIcon className="h-4 w-4 mr-1 inline" />
                Photos
              </button>
            </div>
            
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - Room Navigation */}
          {(viewMode === '360' || viewMode === '3d') && (
            <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <HomeIcon className="h-5 w-5 mr-2" />
                Explore Rooms
              </h3>
              <div className="space-y-2">
                {rooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setCurrentRoom(room.id)}
                    className={`w-full text-left p-3 rounded-xl transition-colors ${
                      currentRoom === room.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium">{room.name}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Property Info */}
              <div className="mt-8 p-4 bg-white rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-3">Property Details</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Bedrooms:</span>
                    <span className="font-medium">{property.bedrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bathrooms:</span>
                    <span className="font-medium">{property.bathrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Square Feet:</span>
                    <span className="font-medium">{property.sqft} sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium capitalize">For {property.type}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 relative bg-black">
            {viewMode === '360' && (
              <div className="relative w-full h-full">
                {/* 360° View Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-full h-full bg-cover bg-center relative"
                    style={{ 
                      backgroundImage: `url(${rooms.find(r => r.id === currentRoom)?.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                          <EyeIcon className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">360° Virtual Tour</h3>
                        <p className="text-white/80 mb-4">Click and drag to look around</p>
                        <div className="text-sm text-white/60">
                          Currently viewing: {rooms.find(r => r.id === currentRoom)?.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Hotspots */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                    Click hotspots to navigate between rooms
                  </div>
                </div>
              </div>
            )}

            {viewMode === '3d' && (
              <div className="relative w-full h-full">
                {/* 3D Model Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                      <CubeIcon className="h-12 w-12" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Interactive 3D Model</h3>
                    <p className="text-white/80 mb-6 max-w-md">
                      Explore the property in full 3D. Click and drag to rotate, scroll to zoom.
                    </p>
                    <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto text-sm">
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="font-semibold">Mouse Controls</div>
                        <div className="text-white/70">Drag to rotate</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="font-semibold">Scroll</div>
                        <div className="text-white/70">Zoom in/out</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {viewMode === 'photos' && (
              <div className="w-full h-full overflow-y-auto p-6">
                <div className="max-w-6xl mx-auto">
                  <h3 className="text-xl font-bold text-white mb-6">Property Photos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {photoGallery.map((photo, index) => (
                      <div key={index} className="aspect-square rounded-xl overflow-hidden group cursor-pointer">
                        <img
                          src={photo}
                          alt={`Property photo ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Control Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {(viewMode === '360' || viewMode === '3d') && (
                    <>
                      <button
                        onClick={togglePlay}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-colors"
                      >
                        {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
                      </button>
                      
                      <button
                        onClick={toggleMute}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-colors"
                      >
                        {isMuted ? <SpeakerXMarkIcon className="h-5 w-5" /> : <SpeakerWaveIcon className="h-5 w-5" />}
                      </button>
                    </>
                  )}
                  
                  <div className="text-white">
                    <div className="font-semibold">{property.title}</div>
                    <div className="text-sm text-white/80">{property.location}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full transition-colors flex items-center space-x-2">
                    <MapIcon className="h-4 w-4" />
                    <span>Floor Plan</span>
                  </button>
                  
                  <button
                    onClick={toggleFullscreen}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-colors"
                  >
                    {isFullscreen ? <ArrowsPointingInIcon className="h-5 w-5" /> : <ArrowsPointingOutIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;
