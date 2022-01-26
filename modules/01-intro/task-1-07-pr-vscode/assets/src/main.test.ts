import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import * as utils from './utils';
import sinon, { SinonStub } from 'sinon';

const createJsDocument = ()=>{
  const dom = new JSDOM(
    `<html>
         <body>           
         </body>
       </html>`,
    { url: 'http://localhost' }
  );
  return dom.window.document;
};

describe('main program',()=>{
  let createHeaderSpy:SinonStub<string[],HTMLHeadingElement>;
  beforeEach(()=>{
    global.document = createJsDocument();
    createHeaderSpy = sinon.stub(utils, 'createHeader');
  });
  it('should render result of createHeader',async ()=>{
    const d1 =document.createElement('h1');
    createHeaderSpy.returns(d1);
    await import ('./main');

    expect(global.document.body.querySelector('h1')===d1).to.eq(true);
  });
});
