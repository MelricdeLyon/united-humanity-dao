import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Search, Sparkles, Gamepad2, Globe, Music, Camera, Heart, Zap } from 'lucide-react';
import Header from '@/components/Header';

interface AppItem {
  id: string;
  name: string;
  icon: React.ElementType;
  gradient: string;
}

interface Universe {
  id: string;
  name: string;
  icon: React.ElementType;
  gradient: string;
}

const apps: AppItem[] = [
  { id: 'kidjerr', name: 'KidJerr', icon: Heart, gradient: 'from-pink-400 to-purple-600' },
  { id: 'gamejerr', name: 'GameJerr', icon: Gamepad2, gradient: 'from-blue-400 to-cyan-600' },
  { id: 'webjerr', name: 'WebJerr', icon: Globe, gradient: 'from-green-400 to-teal-600' },
  { id: 'musicjerr', name: 'MusicJerr', icon: Music, gradient: 'from-purple-400 to-pink-600' },
  { id: 'photojerr', name: 'PhotoJerr', icon: Camera, gradient: 'from-yellow-400 to-orange-600' },
  { id: 'aijerr', name: 'AIJerr', icon: Sparkles, gradient: 'from-indigo-400 to-purple-600' },
];

const initialUniverses: Universe[] = [
  { id: 'joyjerr', name: 'JoyJerr', icon: Heart, gradient: 'from-pink-500 to-rose-500' },
  { id: 'energyjerr', name: 'EnergyJerr', icon: Zap, gradient: 'from-yellow-500 to-amber-500' },
  { id: 'dreamjerr', name: 'DreamJerr', icon: Sparkles, gradient: 'from-purple-500 to-indigo-500' },
  { id: 'wildjerr', name: 'WildJerr', icon: Globe, gradient: 'from-green-500 to-emerald-500' },
];

const SortableUniverse = ({ universe }: { universe: Universe }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: universe.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  };

  const IconComponent = universe.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative group cursor-grab active:cursor-grabbing bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 transition-all duration-200 hover:bg-white/20 ${isDragging ? 'z-50 shadow-2xl' : ''}`}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${universe.gradient} flex items-center justify-center mb-3 mx-auto`}>
        <IconComponent className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-white font-medium text-center text-sm">{universe.name}</h3>
    </div>
  );
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [universes, setUniverses] = useState(initialUniverses);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setUniverses((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-400 relative overflow-hidden">
      <Header />
      
      {/* Background decorative elements - exact positioning for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/8 blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-48 h-48 rounded-full bg-white/6 blur-3xl"></div>
        <div className="absolute -bottom-20 right-1/4 w-56 h-56 rounded-full bg-white/8 blur-3xl"></div>
      </div>

      <main className="relative z-10 px-4 pb-8 pt-4">
        {/* Search Section - Mobile optimized */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-6 text-shadow-lg">
            Humanité Unie
          </h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher dans l'univers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-base bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-white/30 focus:bg-white/20 transition-all duration-200"
            />
          </div>
        </div>

        {/* Apps Grid - Fixed 2 columns for mobile */}
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-3">
            {apps.map((app) => {
              const IconComponent = app.icon;
              return (
                <div
                  key={app.id}
                  className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 transition-all duration-200 hover:bg-white/20 active:scale-95 cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.gradient} flex items-center justify-center mb-3 mx-auto`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-medium text-center text-sm">{app.name}</h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* Draggable Universes Section - Fixed 2 columns for mobile */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-1 text-center">Univers</h2>
          <p className="text-white/70 text-center text-sm mb-4">Glissez-déposez pour réorganiser</p>
          
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={universes} strategy={verticalListSortingStrategy}>
              <div className="grid grid-cols-2 gap-3">
                {universes.map((universe) => (
                  <SortableUniverse key={universe.id} universe={universe} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-2 pt-4">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === 0 ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;