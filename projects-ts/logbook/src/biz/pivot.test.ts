import { expect } from 'chai';
import { pivot } from './pivot.js';

describe('pivot function',()=>{
  const rowComparer = (a:number, b: number) => (a%2)-(b%2);
  const columnComparer = (a:number, b:number) => (a%3)-(b%3);

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
  it('creates correct list index column count',()=>{
    const numbers:number[] = Array.from({length:10}).map((_,ix)=>9-ix);
    const index = pivot(numbers,rowComparer, columnComparer);
    expect(index.columnIndex.length).eq(3);
  });
  it('creates correct list index row count',()=>{
    const numbers:number[] = Array.from({length:10}).map((_,ix)=>9-ix);
    const index = pivot(numbers,rowComparer, columnComparer);
    expect(index.rowIndex.length).eq(2);
  });
  it('creates correct list index group row count',()=>{
    const numbers:number[] = Array.from({length:10}).map((_,ix)=>9-ix);
    const index = pivot(numbers,rowComparer, columnComparer);
    expect(index.groups.length).eq(2);
  });
  it('creates correct list index on group member',()=>{
    const numbers:number[] = Array.from({length:10}).map((_,ix)=>9-ix);
    const index = pivot(numbers,rowComparer, columnComparer);
    expect(index.groups[1][1]).include(2).length(2);
  });
  it('creates correct list index 00 group member',()=>{
    const numbers:number[] = Array.from({length:10}).map((_,ix)=>9-ix);
    const index = pivot(numbers,rowComparer, columnComparer);
    expect(index.groups[0][0]).include(9);
  });
  it('creates correct list index on 01 group member',()=>{
    const numbers:number[] = Array.from({length:10}).map((_,ix)=>9-ix);
    const index = pivot(numbers,rowComparer, columnComparer);
    expect(index.groups[0][1]).include(5).length(1);
  });
  it('creates correct list index on ordered group member',()=>{
    const numbers:number[] = Array.from({length:10}).map((_,ix)=>9-ix);
    const index = pivot(numbers,rowComparer, columnComparer);
    expect(index.groups[index.rowOrder[0]][index.columnOrder[0]]).include(0).length(2);
  });
  it('creates correct list index on ordered group member',()=>{
    const numbers:number[] = Array.from({length:10}).map((_,ix)=>9-ix);
    const index = pivot(numbers,rowComparer, columnComparer);
    expect(index.groups[index.rowOrder[1]][index.columnOrder[1]]).include(1).length(2);
  });
});
