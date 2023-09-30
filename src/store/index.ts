import create from 'zustand';
import createSocketSlice, { ISocketSlice } from './slices/createSocketSlice.ts';

export type rootType = ISocketSlice;
export const useStore = create<ISocketSlice>((set, get) => ({
  ...createSocketSlice(set, get),
}));
