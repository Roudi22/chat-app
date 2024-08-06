import { User } from '@/db/dummy';
import {create} from 'zustand';

type SelectedUser = { selectedUser: User | null, setSelectedUser: (user: User | null) => void }

export const useSelectedUser  = create<SelectedUser>((set) => ({ 
    selectedUser: null,
    setSelectedUser: (user:User | null ) => set({ selectedUser: user })
}));