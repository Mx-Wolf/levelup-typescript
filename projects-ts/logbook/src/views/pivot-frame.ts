//import { pivot } from '../biz/pivot.js';
import { PivotConfiguration } from '../models/app-state.js';
import { RowData } from '../models/row-data.js';
import { fieldLabels } from '../settings/labels.js';
import { createHtmlElement, createText } from './parser.js';

interface PivotFrameProps {
  rows: RowData[],
}

const createFieldHeading = (field: keyof typeof fieldLabels) => createHtmlElement(
  'h2',
  {
    'class':'table-pivot__title'
  },
  [
    createText(fieldLabels[field])
  ]);

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
          createFieldHeading(rowGroup[0] as keyof typeof fieldLabels),
        ]
      ),
      createHtmlElement(
        'div',
        {
          'class':'table-pivot__values table-pivot__values--left'
        },
        [
          createFieldHeading(columnGroup[0] as keyof typeof fieldLabels),
          createText(columnGroup.join(',')),
          createText(aggregator.join(',')),
          createText(rows.length.toLocaleString()),
        ]
      )
    ]
  );
};
