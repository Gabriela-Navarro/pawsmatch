import { Pet, PetProfile } from '../types';
import { pets } from '../data/pets';

const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random';

export const fetchRandomPetProfile = async (): Promise<PetProfile> => {
  const randomPet = pets[Math.floor(Math.random() * pets.length)];

  if (randomPet.type === 'dog') {
    try {
      const response = await fetch(DOG_API_URL);
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success') {
          return { ...randomPet, imageUrl: data.message };
        }
      }
    } catch {
      console.error('Using fallback image');
    }
  }

  return { ...randomPet };
};

export const filterPets = (allPets: Pet[], type: string, location: string): Pet[] => {
  return allPets.filter((pet) => {
    const typeMatch = type === 'Todos' || type === '' || pet.type === type;
    const locationMatch = location === 'Todas' || location === '' || pet.location === location;
    return typeMatch && locationMatch;
  });
};
