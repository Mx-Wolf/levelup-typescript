import { AppProps, KnownLocations } from '../models/app-state.js';

export const createSetLocation = {
  equals:<T>(getState:()=>AppProps<T>, location:KnownLocations)=>getState().location===location,
  make:(location:KnownLocations)=>({location}),
};
