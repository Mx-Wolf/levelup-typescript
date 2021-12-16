//import { pivot } from '../biz/pivot.js';
import { pivot } from '../biz/pivot.js';
import { createTable } from '../components/table/table.js';
import { ColumnSettings, PivotConfiguration } from '../models/app-state.js';
import { RowData } from '../models/row-data.js';
import { aggregateFunctions, groupingFunctions } from '../settings/grouping-functions.js';
import { fieldLabels } from '../settings/labels.js';
import { defineColumns } from '../utils/define-columns.js';
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

const prepareColumnDefinition = (order:number, label:string)=> <ColumnSettings<Record<string,string>>>{
  format: (r)=>r[order],
  label,
  size: 'middle',
  orderBy: undefined,
  columnId: order,
};

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
  const columnFormatter = columnConfig.createFormatter(columnGroup[0]);
  const aggregateReducer = aggregate.createReducer<number>(aggregator[0]);
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

          createDivTable([
            createTable({
              columns:defineColumns([{
                format:rowConfig.createFormatter(rowGroup[0]),
                label: '',
                size: 'middle',
                orderBy: undefined,
              }]),
              dataRowCellClass: 'table__cell',
              dataRowClass: 'table__row table__row--blue',
              headerClass: 'table__header',
              headerRowCellClass: 'table__cell table__cell--empty',
              headerRowClass: 'table__row',
              rows: pivotedResult.rowOrder.map((order)=> pivotedResult.rowIndex[order]),
              tableClass: 'table__table',
              tbodyClass: '',
            }),
          ]),

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
            createTable<Record<string,string>>({
              columns: pivotedResult.columnOrder.map((order)=>prepareColumnDefinition(order,columnFormatter(pivotedResult.columnIndex[order]))),
              dataRowCellClass: 'table__cell',
              dataRowClass: 'table__row',
              headerClass: 'table__header table__header--blue',
              headerRowCellClass: 'table__cell',
              headerRowClass:'table__row',
              rows: pivotedResult.rowOrder.map((rowOrder,ix)=>pivotedResult.columnOrder.reduce((r,columnOrder)=>{
                r[`${ix}`] = `${aggregated[rowOrder][columnOrder]}`;
                return r;
              },{}as Record<string,string>)),
              tableClass: 'table__table',
              tbodyClass: '',
            })
          ]),

        ]
      )
    ]
  );
};
