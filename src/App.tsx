import { useState, useEffect } from 'react';
import { FilterState } from './types';
import { usePetStack } from './hooks/usePetStack';
import { PetCard } from './components/PetCard';
import { FilterBar } from './components/FilterBar';
import { MatchPanel } from './components/MatchPanel';

export default function App() {
  const [filters, setFilters] = useState<FilterState>({ type: 'Todos', location: 'Todas' });
  const { currentPet, liked, passed, swipeRight, swipeLeft, loading } = usePetStack(filters);

  // Soporte de teclado ← →
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') swipeRight();
      if (e.key === 'ArrowLeft') swipeLeft();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [swipeRight, swipeLeft]);

  return (
    <div className="min-h-screen flex flex-col items-center" style={{
      background: 'linear-gradient(160deg, #fdfcfb 0%, #f0ede8 100%)',
    }}>
      <header className="w-full text-center py-8 px-4">
        <h1 className="text-5xl font-black tracking-tight" style={{
          fontFamily: 'Playfair Display, serif',
          color: '#1a1a1a',
        }}>
          🐾 PawsMatch
        </h1>
        <p className="text-sm mt-2" style={{
          color: '#888',
          fontFamily: 'DM Sans, sans-serif',
          letterSpacing: '0.05em',
        }}>
          Encuentra a tu compañero perfecto
        </p>
        <p className="text-xs mt-1" style={{ color: '#bbb' }}>
          Usa ← → para navegar
        </p>
        <div className="w-16 h-1 rounded-full mx-auto mt-3" style={{ background: '#f4a261' }} />
      </header>

      <main className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl px-4 pb-10 items-start justify-center">
        <div className="flex flex-col items-center gap-5 flex-1">
          <FilterBar filters={filters} onChange={setFilters} />

          {loading ? (
            <div className="flex flex-col items-center gap-3 py-20">
              <div className="w-10 h-10 border-4 border-orange-300 border-t-transparent rounded-full animate-spin" />
              <p style={{ color: '#aaa' }}>Buscando tu match perfecto...</p>
            </div>
          ) : currentPet ? (
            <PetCard pet={currentPet} onLike={swipeRight} onPass={swipeLeft} />
          ) : (
            <div className="text-center py-20 rounded-3xl px-10 bg-white shadow-sm border border-gray-100">
              <div className="text-6xl mb-4">🐾</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">¡No hay más mascotas!</h3>
              <p className="text-gray-400">Cambia los filtros para ver más</p>
            </div>
          )}
        </div>

        <div className="flex-shrink-0 w-full lg:w-72">
          <MatchPanel liked={liked} passed={passed} />
        </div>
      </main>
    </div>
  );
}