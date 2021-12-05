import { expect } from 'chai';
import { createValueIndexer } from './value-indexer.js';

describe('createValueIndexer function',()=>{
  const comparer = (a:number, b:number)=> b-a;
  const indexValue = createValueIndexer(comparer);
  it('first for an empty',()=>{
    const index = indexValue([],1);
    expect(index).to.be.eq(0);
  });
  it('first for a duplicate',()=>{
    const index = indexValue([1],1);
    expect(index).to.be.eq(0);
  });
  it('extends array on new unseen value',()=>{
    const index= indexValue([2],1);
    expect(index).eq(1);
  });
});
