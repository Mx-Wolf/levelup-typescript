import { createFailRows } from './fail-rows.js';
import {expect, use} from 'chai';
import spies from 'chai-spies';
import { AppProps, MethodFactoryArguments } from '../models/app-state.js';

const factory = use(spies);

describe('createFailRows function factory',()=>{
  const resultValue: AppProps<number> = {} as AppProps<number>;
  const makeArgs = (current:AppProps<number>):MethodFactoryArguments<number>=>(
    {
      fireEvent:factory.spy(),
      getState: factory.spy.returns(current),
      setState: factory.spy(),
    });
  it('does not change state when messages is the same',async ()=>{
    const message = 'test';
    const args = makeArgs({...resultValue,message});
    const result = createFailRows(args);
    await result(message);
    expect(args.setState).not.to.be.called();
  });
  it('sets next state when message differs',async ()=>{
    const message = 'current';
    const args = makeArgs({...resultValue, message});
    const message2 = 'next';
    const result = createFailRows(args);
    await result(message2);
    expect(args.setState).to.be.called();
  });
});
