//import { pivot } from '../biz/pivot.js';
import { RowData } from '../models/row-data.js';
import { createHtmlElement } from './parser.js';

interface PivotFrameProps {
  rows: RowData[],
}

export const  createPivotFrame = (props:PivotFrameProps)=> {
  const {rows}=props;
  //const pivoted = pivot(data,);
  return createHtmlElement(
    'div',
    {
      'class':'table-pivot'
    },
    [
      createHtmlElement(
        'div',
        {
          'class':'table-pivot__values table-pivot__values--left'
        },
        [

        ]
      ),
      createHtmlElement(
        'div',
        {
          'class':'table-pivot__values table-pivot__values--left'
        },
        [

        ]
      )
    ]
  );
};
