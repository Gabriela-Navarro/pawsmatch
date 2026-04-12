export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  type: 'dog' | 'cat' | 'rabbit' | 'bird';
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
  type: string;
  location: string;
}
