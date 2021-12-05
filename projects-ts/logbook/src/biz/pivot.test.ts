import { expect } from 'chai';
import { pivot } from './pivot.js';

describe('pivot function',()=>{
  const rowComparer = (a:number, b: number) => (b%2)-(a%2);
  const columnComparer = (a:number, b:number) => (b%3)-(a%3);

  it('returns empty index on empty list',()=>{
    const numbers:number[] = [];
    const index = pivot(numbers,rowComparer, columnComparer);
    expect(index.columnIndex.length).eq(0);
    expect(index.rowIndex.length).eq(0);
    expect(index.groups.length).eq(0);
  });
  it('creates correct list index',()=>{
    const numbers:number[] = Array.from({length:10}).map((_,ix)=>ix);
    const index = pivot(numbers,rowComparer, columnComparer);
    expect(index.columnIndex.length).eq(3);
    expect(index.rowIndex.length).eq(2);
    expect(index.groups.length).eq(2);
  });
});
