import { Pet } from '../types';

interface MatchPanelProps {
  liked: Pet[];
  passed: Pet[];
}

export function MatchPanel({ liked, passed }: MatchPanelProps) {
  return (
    <div className="w-full max-w-sm" data-testid="match-panel">
      <div className="rounded-2xl p-4 mb-4 bg-white" style={{
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0',
      }}>
        <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: '#e05252' }}>
          <span>❤️ Matches</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{
            background: '#fff0f0',
            color: '#e05252',
          }}>{liked.length}</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {liked.length === 0 && (
            <p className="text-xs text-gray-400">Aún no tienes matches</p>
          )}
          {liked.map((pet) => (
            <div key={pet.id} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" style={{
              background: '#fff0f0',
              color: '#e05252',
              border: '1px solid #fcc',
            }}>
              <img
                src={pet.imageUrl}
                alt={pet.name}
                className="w-5 h-5 rounded-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              {pet.name}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl p-4 bg-white" style={{
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0',
      }}>
        <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: '#aaa' }}>
          <span>✗ Pasados</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{
            background: '#f5f5f5',
            color: '#aaa',
          }}>{passed.length}</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {passed.length === 0 && (
            <p className="text-xs text-gray-400">No has pasado ninguno</p>
          )}
          {passed.map((pet) => (
            <div key={pet.id} className="px-3 py-1 rounded-full text-xs font-medium" style={{
              background: '#f5f5f5',
              color: '#888',
              border: '1px solid #e5e5e5',
            }}>
              {pet.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}