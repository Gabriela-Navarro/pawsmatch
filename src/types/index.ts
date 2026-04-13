export type PetType = 'dog' | 'cat' | 'rabbit' | 'bird';

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  type: PetType;
  location: string;
  bio: string;
  imageUrl: string;
  liked?: boolean;
}

export interface PetProfile extends Pet {
  imageUrl: string;
}

export type SwipeDirection = 'left' | 'right';

export interface FilterState {
  type: PetType | 'Todos';
  location: string;
}