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
    opacity: isDragging ? 0.5 : 1,
  };

  const IconComponent = universe.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative group cursor-grab active:cursor-grabbing p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 ${isDragging ? 'z-50 scale-105' : ''}`}
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${universe.gradient} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
        <IconComponent className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-white font-semibold text-center text-lg">{universe.name}</h3>
    </div>
  );
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [universes, setUniverses] = useState(initialUniverses);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
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
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
      </div>

      <main className="relative z-10 px-6 py-8 max-w-6xl mx-auto">
        {/* Search Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-8 text-shadow-lg">
            Humanité Unie
          </h1>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/70 w-6 h-6" />
            <input
              type="text"
              placeholder="Rechercher dans l'univers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-6 text-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all duration-300"
            />
          </div>
        </div>

        {/* Apps Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Applications</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {apps.map((app) => {
              const IconComponent = app.icon;
              return (
                <div
                  key={app.id}
                  className="relative group p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.gradient} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-center text-lg">{app.name}</h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* Draggable Universes Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">Univers</h2>
          <p className="text-white/80 text-center mb-8">Glissez-déposez pour réorganiser</p>
          
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={universes} strategy={verticalListSortingStrategy}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {universes.map((universe) => (
                  <SortableUniverse key={universe.id} universe={universe} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === 0 ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;