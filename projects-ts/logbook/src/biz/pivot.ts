import { Comparer, Index } from './types.js';
import { createValueIndexer } from './value-indexer.js';

const initializeAccumulator =<T>():Index<T>=>({
  columnIndex:[] as T[],
  columnOrder: [],
  rowIndex:[] as T[],
  rowOrder: [],
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

export const pivot = <T>(items:T[],rowComparer:Comparer<T>, columnComparer:Comparer<T>):Readonly<Index<T>>=>{

  const index = initializeAccumulator<T>();
  if(items.length <=0){
    return index;
  }

  const result = items.reduce(createReducer(rowComparer, columnComparer),index);

  result.columnOrder = result.columnIndex.map((item,ix)=>({item, ix})).sort((a,b)=>columnComparer(a.item, b.item)).map((i)=>i.ix);
  result.rowOrder = result.rowIndex.map((item,ix)=>({item, ix})).sort((a,b)=>rowComparer(a.item, b.item)).map((i)=>i.ix);

  return result;
};

