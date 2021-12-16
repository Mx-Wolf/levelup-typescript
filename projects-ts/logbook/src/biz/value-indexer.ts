import { Comparer } from './types.js';

export const createValueIndexer = <T>(comparer:Comparer<T>) => (pivoted:T[], value:T)=>{
  const index = pivoted.findIndex((seen)=> comparer(seen, value)===0);
  if(index<0){
    return pivoted.push(value) -1;
  }
  return index;
};
