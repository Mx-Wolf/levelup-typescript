import { expect } from 'chai';
import { formatTime } from './utils';

describe('formatDate in utils',()=>{
  it('formats date',()=>{
    expect(formatTime(new Date(2015, 9, 25))).to.eq('10/25/2015');
  });
});
