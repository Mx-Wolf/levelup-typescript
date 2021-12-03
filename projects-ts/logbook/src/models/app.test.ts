import { expect } from 'chai';
import { KnownLocations } from './app-state';
import {App} from './app.js';

describe('App model',()=>{
  it('default location is logbook',()=>{
    const defaultLocation:KnownLocations = 'logbook';
    expect(new App().location).to.be.eq(defaultLocation);
  });
});
