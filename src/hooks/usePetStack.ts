import { useState, useCallback, useEffect, useRef } from 'react';
import { Pet } from '../types';
import { pets as allPetsData } from '../data/pets';
import { filterPets } from '../services/petService';
import { FilterState } from '../types';

export function usePetStack(filters: FilterState) {
  const [stack, setStack] = useState<Pet[]>([]);
  const [liked, setLiked] = useState<Pet[]>([]);
  const [passed, setPassed] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const likedRef = useRef<Pet[]>([]);
  const passedRef = useRef<Pet[]>([]);

  useEffect(() => {
    setLoading(true);
    const filtered = filterPets(allPetsData, filters.type, filters.location);
    const likedIds = likedRef.current.map((p) => p.id);
    const passedIds = passedRef.current.map((p) => p.id);
    const remaining = filtered.filter(
      (p) => !likedIds.includes(p.id) && !passedIds.includes(p.id)
    );
    const shuffled = [...remaining].sort(() => Math.random() - 0.5);
    setStack(shuffled);
    setLoading(false);
  }, [filters]);

  const swipeRight = useCallback(() => {
    if (stack.length === 0) return;
    const [current, ...rest] = stack;
    likedRef.current = [...likedRef.current, current];
    setLiked([...likedRef.current]);
    setStack(rest);
  }, [stack]);

  const swipeLeft = useCallback(() => {
    if (stack.length === 0) return;
    const [current, ...rest] = stack;
    passedRef.current = [...passedRef.current, current];
    setPassed([...passedRef.current]);
    setStack(rest);
  }, [stack]);

  const currentPet = stack[0] || null;

  return { currentPet, stack, liked, passed, swipeRight, swipeLeft, loading };
}