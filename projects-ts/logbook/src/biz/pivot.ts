import { Comparer } from './types.js';
import { createValueIndexer } from './value-indexer.js';

interface Index<T> {
  columnIndex:T[];
  rowIndex: T[];
  groups:  T[][][];
}

const initializeAccumulator =<T>():Index<T>=>({
  columnIndex:[] as T[],
  rowIndex:[] as T[],
  groups: [] as T[][][],
});

const getOrCreate = <T>(items:T[], index:number, factory:()=>T)=>{
  const found = items[index];
  if(typeof found !== 'undefined'){
    return found;
  }
  const created = factory();
  items[index] = created;
  return created;
};

const createReducer = <T>(rowComparer:Comparer<T>, columnComparer:Comparer<T>)=>{
  const indexRowValue = createValueIndexer(rowComparer);
  const indexColumnValue = createValueIndexer(columnComparer);

  return (a:Index<T>, item:T)=>{
    const row = indexRowValue(a.rowIndex,item);
    const column = indexColumnValue(a.columnIndex, item);
    const columns = getOrCreate(a.groups, row,()=>[]);
    const group = getOrCreate(columns, column, ()=>[]);
    group.push(item);
    return a;
  };
};

export const pivot = <T>(items:T[],rowComparer:Comparer<T>, columnComparer:Comparer<T>):Index<T>=>{

  const index = initializeAccumulator<T>();
  if(items.length <=0){
    return index;
  }

  return items.reduce(createReducer(rowComparer, columnComparer),index);
};
