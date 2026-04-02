import { create } from 'zustand';

export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat';
  avatar: string;
  cuteness: number;
  appearanceScore: number;
  activityScore: number;
  weightRecords: { date: string; weight: number }[];
}

export interface User {
  id: string;
  nickname: string;
  avatar: string;
  isLoggedIn: boolean;
}

interface AppState {
  user: User | null;
  pets: Pet[];
  activePetId: string | null;
  login: () => void;
  logout: () => void;
  addPet: (pet: Pet) => void;
  setActivePet: (id: string) => void;
  checkIn: () => void;
  addWeightRecord: (petId: string, record: { date: string; weight: number }) => void;
  playWithPet: () => void;
}

const mockPets: Pet[] = [
  {
    id: '1',
    name: '布丁',
    type: 'dog',
    avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&auto=format&fit=crop',
    cuteness: 1250,
    appearanceScore: 92,
    activityScore: 85,
    weightRecords: [
      { date: '03-01', weight: 4.5 },
      { date: '03-08', weight: 4.6 },
      { date: '03-15', weight: 4.8 },
      { date: '03-22', weight: 5.0 },
      { date: '03-29', weight: 5.1 },
    ],
  },
  {
    id: '2',
    name: '雪球',
    type: 'cat',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&auto=format&fit=crop',
    cuteness: 1420,
    appearanceScore: 98,
    activityScore: 60,
    weightRecords: [
      { date: '03-01', weight: 3.2 },
      { date: '03-15', weight: 3.3 },
      { date: '03-29', weight: 3.5 },
    ],
  },
  {
    id: '3',
    name: '奥利奥',
    type: 'cat',
    avatar: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=200&auto=format&fit=crop',
    cuteness: 1100,
    appearanceScore: 88,
    activityScore: 75,
    weightRecords: [
      { date: '03-05', weight: 4.1 },
      { date: '03-20', weight: 4.2 },
    ],
  },
  {
    id: '4',
    name: '旺财',
    type: 'dog',
    avatar: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200&auto=format&fit=crop',
    cuteness: 950,
    appearanceScore: 85,
    activityScore: 95,
    weightRecords: [
      { date: '02-15', weight: 12.5 },
      { date: '03-10', weight: 12.8 },
      { date: '03-30', weight: 13.0 },
    ],
  }
];

export const useStore = create<AppState>((set) => ({
  user: null,
  pets: mockPets,
  activePetId: mockPets[0].id,
  
  login: () => set({ 
    user: { 
      id: 'u1', 
      nickname: '铲屎官小明', 
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      isLoggedIn: true 
    } 
  }),
  
  logout: () => set({ user: null }),
  
  addPet: (pet) => set((state) => ({ 
    pets: [...state.pets, pet],
    activePetId: state.activePetId || pet.id
  })),

  setActivePet: (id) => set({ activePetId: id }),
  
  checkIn: () => set((state) => {
    if (!state.activePetId) return state;
    return {
      pets: state.pets.map(p => 
        p.id === state.activePetId 
          ? { ...p, cuteness: p.cuteness + 10, activityScore: p.activityScore + 5 }
          : p
      )
    };
  }),

  playWithPet: () => set((state) => {
    if (!state.activePetId) return state;
    return {
      pets: state.pets.map(p => 
        p.id === state.activePetId 
          ? { ...p, cuteness: p.cuteness + 2 }
          : p
      )
    };
  }),
  
  addWeightRecord: (petId, record) => set((state) => ({
    pets: state.pets.map(p => 
      p.id === petId 
        ? { ...p, weightRecords: [...p.weightRecords, record] }
        : p
    )
  })),
}));