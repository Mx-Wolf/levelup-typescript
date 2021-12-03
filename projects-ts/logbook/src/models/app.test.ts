import { expect } from 'chai';
import { KnownLocations } from './app-state';
import {App} from './app.js';
import spies from 'chai-spies';
import {use} from 'chai';

const factory = use(spies);

describe('App model',()=>{
  it('default location is logbook',()=>{
    const defaultLocation:KnownLocations = 'logbook';
    expect(new App().location).to.be.eq(defaultLocation);
  });
  it('does nothing on repeated set same location',()=>{
    const sameLocation:KnownLocations = 'logbook';
    const app = new App();
    app.changeLocation(sameLocation);
    expect(app.location).to.be.eq(sameLocation);
  });
  it('fires event on change location',()=>{
    const app = new App();
    const otherLocation:KnownLocations = 'pivot-table';
    const spy = factory.spy();
    app.attachLocationChange(spy);
    app.changeLocation(otherLocation);
    expect(app.location).to.be.eq(otherLocation);
    expect(spy).to.be.called.with(app);
  });
});
