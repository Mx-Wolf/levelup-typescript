import { expect } from 'chai';
import { createRoundDown } from './grouping-functions.js';

describe('round down function',()=>{
  it('round down to zero to zero',()=>{
    const factor = 1000;
    const roundDown = createRoundDown(factor);
    const result = roundDown(0);
    expect(result).eq(0);
  });
  it('round down to factor itself',()=>{
    const factor = 1000;
    const roundDown = createRoundDown(factor);
    const result = roundDown(factor);
    expect(result).eq(factor);
  });
  it('round down to last multiple of factor',()=>{
    const factor = 1000;
    const roundDown = createRoundDown(factor);
    const result = roundDown(3*factor-1);
    expect(result).eq(2*factor);
  });
});
