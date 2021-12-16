export const getOrCreate = <Key,Value>(map:Map<Key,Value>, key:Key, factory:()=>Value):Value =>{
  if(map.has(key)){
    const stored = map.get(key);
    if(typeof stored !== 'undefined'){
      return stored;
    }
  }
  const value = factory();
  map.set(key,value);
  return value;
};
