import { KnownLocations, MethodFactoryArguments } from '../models/app-state.js';
import { mergeState } from './merge-state.js';

export const createSetLocation = <T>(
  {eventManager,getState,setState}:MethodFactoryArguments<T>
)=>async ( location: KnownLocations)=>{
    const current = getState();
    if(current.location === location){
      return;
    }
    const next = await mergeState(current, {location});
    setState(next);
    eventManager.fireEvent(next);
  };
