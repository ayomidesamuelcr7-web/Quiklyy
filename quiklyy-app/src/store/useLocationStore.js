import { create } from 'zustand';

const useLocationStore = create((set) => ({
  userLocation: null,
  setLocation: (lat, lng) => set({ userLocation: { lat, lng } }),
  clearLocation: () => set({ userLocation: null })
}));

export default useLocationStore;
