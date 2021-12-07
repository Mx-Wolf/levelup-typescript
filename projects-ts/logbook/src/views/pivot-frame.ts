//import { pivot } from '../biz/pivot.js';
import { PivotConfiguration } from '../models/app-state.js';
import { RowData } from '../models/row-data.js';
import { createHtmlElement, createText } from './parser.js';

interface PivotFrameProps {
  rows: RowData[],
}

export const  createPivotFrame = (props:PivotFrameProps & PivotConfiguration)=> {
  const {rows, rowGroup, aggregator,columnGroup}=props;
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
          createText(rowGroup.join(',')),
        ]
      ),
      createHtmlElement(
        'div',
        {
          'class':'table-pivot__values table-pivot__values--left'
        },
        [
          createText(columnGroup.join(',')),
          createText(aggregator.join(',')),
          createText(rows.length.toLocaleString()),
        ]
      )
    ]
  );
};
