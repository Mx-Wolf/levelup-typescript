//import { pivot } from '../biz/pivot.js';
import { pivot } from '../biz/pivot.js';
import { PivotConfiguration } from '../models/app-state.js';
import { RowData } from '../models/row-data.js';
import { aggregateFunctions, groupingFunctions } from '../settings/grouping-functions.js';
import { fieldLabels } from '../settings/labels.js';
import { createHtmlElement, createText } from './parser.js';

interface PivotFrameProps {
  rows: RowData[],
}

const createFieldHeading = (field: keyof typeof fieldLabels) => createHtmlElement(
  'h2',
  {
    'class': 'table-pivot__title'
  },
  [
    createText(fieldLabels[field])
  ]);

const createDivTable = (children: Node[]) => createHtmlElement('div', { 'class': 'table' }, children);

const getGroupingConfig = (functionName: string) => groupingFunctions[functionName as keyof typeof groupingFunctions];
const getAggregateConfig = (functionName: string) => aggregateFunctions[functionName as keyof typeof aggregateFunctions];

export const createPivotFrame = (props: PivotFrameProps & PivotConfiguration<RowData>) => {
  const { rows, rowGroup, aggregator, columnGroup } = props;
  const rowConfig = getGroupingConfig(rowGroup[1]);
  const columnConfig = getGroupingConfig(columnGroup[1]);
  const aggregate = getAggregateConfig(aggregator[1]);
  const pivotedResult = pivot(
    rows,
    rowConfig.createComparer(rowGroup[0]),
    columnConfig.createComparer(columnGroup[0]),
  );
  const aggregateReducer = aggregate.createReducer(aggregator[0]);
  const aggregated = pivotedResult.groups.map(
    (pivotedRow)=>pivotedRow.map(
      (pivotedColumn)=>pivotedColumn.reduce(aggregateReducer,aggregate.getInitialValue())));
  //const pivoted = pivot(data,);
  return createHtmlElement(
    'div',
    {
      'class': 'table-pivot'
    },
    [
      createHtmlElement(
        'div',
        {
          'class': 'table-pivot__values table-pivot__values--left'
        },
        [
          createFieldHeading(rowGroup[0] as keyof typeof fieldLabels),

          createDivTable([createText('labels go here')]),

        ]
      ),
      createHtmlElement(
        'div',
        {
          'class': 'table-pivot__values table-pivot__values--left'
        },
        [
          createFieldHeading(columnGroup[0] as keyof typeof fieldLabels),
          createDivTable([
            createText('pivot goes here'),
            createText(columnGroup.join(',')),
            createText(aggregator.join(',')),
            createText(rows.length.toLocaleString()),
            createText(aggregated.length.toLocaleString()),
          ]),

        ]
      )
    ]
  );
};
