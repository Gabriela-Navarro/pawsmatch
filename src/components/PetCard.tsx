import { useState } from 'react';
import { Pet } from '../types';

interface PetCardProps {
  pet: Pet;
  onLike: () => void;
  onPass: () => void;
}

const typeEmoji: Record<string, string> = {
  dog: '🐕',
  cat: '🐈',
  rabbit: '🐇',
  bird: '🦜',
};

const typeLabel: Record<string, string> = {
  dog: 'Perro',
  cat: 'Gato',
  rabbit: 'Conejo',
  bird: 'Ave',
};

export function PetCard({ pet, onLike, onPass }: PetCardProps) {
  const [imgError, setImgError] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const fallbackImg = `https://placehold.co/400x500/f0e6d3/8B4513?text=${encodeURIComponent(pet.name)}`;

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStart === null) return;
    setDragOffset(e.clientX - dragStart);
  };

  const handleMouseUp = () => {
    if (dragOffset > 80) onLike();
    else if (dragOffset < -80) onPass();
    setDragOffset(0);
    setDragStart(null);
    setIsDragging(false);
  };

  const rotation = dragOffset * 0.08;
  const likeOpacity = Math.min(1, dragOffset / 80);
  const passOpacity = Math.min(1, -dragOffset / 80);

  return (
    <div
      data-testid="pet-card"
      className="relative w-full max-w-sm select-none cursor-grab active:cursor-grabbing"
      style={{
        transform: `translateX(${dragOffset}px) rotate(${rotation}deg)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Overlays */}
      {likeOpacity > 0 && (
        <div
          className="absolute top-8 left-6 z-10 border-4 border-green-500 text-green-500 font-black text-2xl px-4 py-2 rounded-xl rotate-[-20deg] bg-white"
          style={{ opacity: likeOpacity }}
        >
          ADOPTAR ❤️
        </div>
      )}
      {passOpacity > 0 && (
        <div
          className="absolute top-8 right-6 z-10 border-4 border-red-400 text-red-400 font-black text-2xl px-4 py-2 rounded-xl rotate-[20deg] bg-white"
          style={{ opacity: passOpacity }}
        >
          PASAR ✗
        </div>
      )}

      {/* Card */}
      <div className="rounded-3xl overflow-hidden bg-white" style={{
        boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
        border: '1px solid #f0f0f0',
      }}>
        <div className="relative h-96 overflow-hidden">
          <img
            src={imgError ? fallbackImg : pet.imageUrl}
            alt={pet.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            draggable={false}
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
          }} />
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-3xl font-black" style={{ fontFamily: 'Playfair Display, serif' }}>
              {pet.name}, {pet.age}a
            </h2>
            <p className="text-sm opacity-80">{pet.breed}</p>
          </div>
          <div className="absolute top-4 right-4 text-2xl bg-white rounded-full px-3 py-1 shadow-md">
            {typeEmoji[pet.type]}
          </div>
        </div>

        <div className="p-5">
          <div className="flex gap-2 mb-3">
            <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{
              background: '#fff3e8',
              color: '#f4a261',
              border: '1px solid #fdd9b5',
            }}>
              {typeLabel[pet.type]}
            </span>
            <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{
              background: '#e8f4ff',
              color: '#4a9edd',
              border: '1px solid #b5d9fd',
            }}>
              📍 {pet.location}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-gray-600" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {pet.bio}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 px-5 pb-5">
          <button
            onClick={onPass}
            className="flex-1 py-3 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95"
            style={{
              background: '#fff0f0',
              color: '#e05252',
              border: '2px solid #fcc',
            }}
            data-testid="pass-button"
          >
            ✗ Pasar
          </button>
          <button
            onClick={onLike}
            className="flex-1 py-3 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95"
            style={{
              background: '#f4a261',
              color: '#ffffff',
              border: '2px solid #f4a261',
              boxShadow: '0 4px 12px rgba(244,162,97,0.4)',
            }}
            data-testid="like-button"
          >
            ❤️ Adoptar
          </button>
        </div>
      </div>
    </div>
  );
}