import { FilterState } from '../types';
import { locations, petTypes } from '../data/pets';

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const typeLabels: Record<string, string> = {
  Todos: 'Todos 🐾',
  dog: 'Perros 🐕',
  cat: 'Gatos 🐈',
  rabbit: 'Conejos 🐇',
  bird: 'Aves 🦜',
};

export function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm" data-testid="filter-bar">
      <div className="flex gap-2 flex-wrap justify-center">
        {petTypes.map((type) => (
          <button
            key={type}
            onClick={() => onChange({ ...filters, type })}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
            style={{
              background: filters.type === type ? '#f4a261' : '#ffffff',
              color: filters.type === type ? '#ffffff' : '#555',
              border: filters.type === type ? '2px solid #f4a261' : '2px solid #e5e5e5',
              boxShadow: filters.type === type ? '0 4px 12px rgba(244,162,97,0.3)' : '0 2px 6px rgba(0,0,0,0.05)',
            }}
            data-testid={`filter-type-${type}`}
          >
            {typeLabels[type] || type}
          </button>
        ))}
      </div>

      <select
        value={filters.location}
        onChange={(e) => onChange({ ...filters, location: e.target.value })}
        className="px-4 py-2.5 rounded-xl text-sm font-medium outline-none"
        style={{
          background: '#ffffff',
          border: '2px solid #e5e5e5',
          color: '#555',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        }}
        data-testid="filter-location"
      >
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            📍 {loc}
          </option>
        ))}
      </select>
    </div>
  );
}