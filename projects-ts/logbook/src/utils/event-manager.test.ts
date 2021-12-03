import { EventHandler, createEventManager } from './event-manager.js';
import { expect, use } from 'chai';
import spies from 'chai-spies';

const factory = use(spies);

describe('EventManager class', () => {
  it('notifies single subscriber', () => {
    const spy: EventHandler<number> = factory.spy();
    const manager = createEventManager<number>();
    const context = 42;
    manager.subscribe(spy);
    manager.fireEvent(context);
    expect(spy).to.be.called.with(context);
  });
  it('notifies multiple subscribers', () => {
    const spy1: EventHandler<number> = factory.spy();
    const spy2: EventHandler<number> = factory.spy();
    const manager = createEventManager<number>();
    const context = 42;
    manager.subscribe(spy1);
    manager.subscribe(spy2);
    manager.fireEvent(context);
    expect(spy2).to.be.called.with(context);
  });
  it('unsubscribes handle', () => {
    const spy: EventHandler<number> = factory.spy();
    const manager = createEventManager<number>();
    const context = 42;
    manager.subscribe(spy);
    manager.unsubscribe(spy);
    manager.fireEvent(context);
    expect(spy).not.to.be.called();
  });
});
