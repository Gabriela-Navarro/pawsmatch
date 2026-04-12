import { useState, useCallback, useEffect } from 'react';
import { Pet } from '../types';
import { pets as allPetsData } from '../data/pets';
import { filterPets } from '../services/petService';
import { FilterState } from '../types';

export function usePetStack(filters: FilterState) {
  const [stack, setStack] = useState<Pet[]>([]);
  const [liked, setLiked] = useState<Pet[]>([]);
  const [passed, setPassed] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    setLoading(true);
    const filtered = filterPets(allPetsData, filters.type, filters.location);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setStack(shuffled); // <-- ya no es solo 3, son TODAS
    setLiked([]);
    setPassed([]);
    setLoading(false);
  }, [filters]);

  const swipeRight = useCallback(() => {
    if (stack.length === 0) return;
    const [current, ...rest] = stack;
    setLiked((prev) => [...prev, current]);
    setStack(rest);
  }, [stack]);

  const swipeLeft = useCallback(() => {
    if (stack.length === 0) return;
    const [current, ...rest] = stack;
    setPassed((prev) => [...prev, current]);
    setStack(rest);
  }, [stack]);

  const currentPet = stack[0] || null;

  return { currentPet, stack, liked, passed, swipeRight, swipeLeft, loading };
}