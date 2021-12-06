import { GroupingFunctionSettings } from '../biz/types.js';
import { RowData } from '../models/row-data.js';
import { compareStrings, formatString } from '../utils/string-comparer.js';

type names = 'field'|'roundYear'|'roundQuarter'|'roundMonth'|'roundHundredThousands';
const HUNDRED_THOUSAND = 1000;
export const createRoundDown = (factor:number)=>(a:number)=> factor*Math.floor(a/factor);
const roundDown5 = createRoundDown(HUNDRED_THOUSAND);

const formatter = new Intl.NumberFormat('ru-RU',{maximumFractionDigits:0,minimumFractionDigits:0,minimumIntegerDigits:1,useGrouping:true});
const formatNumber = (value:number)=>formatter.format(value);

export const roundMonth = (value:Date)=>new Date(value.getFullYear(),value.getMonth(),1);
export const roundQuarter = (value:Date)=>new Date(value.getFullYear(),Math.floor(value.getMonth()/3),1);
export const roundYear = (value:Date)=>new Date(value.getFullYear(),1,1);
const dateFormatter = new Intl.DateTimeFormat('ru-RU',{dateStyle:'short'});
const formatDate = (value:Date)=>dateFormatter.format(value);

export const groupingFunctions:Record<names,GroupingFunctionSettings<RowData>> = {
  field:{
    createComparer:(field:keyof RowData)=>(a:RowData, b:RowData)=>compareStrings(a[field].toString(),b[field].toString()),
    createFormatter:(field:keyof RowData)=>(a:RowData)=>formatString(a[field].toString()),
    label: 'По значению поля'
  },
  roundHundredThousands: {
    createComparer:(field)=>(a,b)=>(roundDown5(Number(a[field]))- roundDown5(Number(b[field]))),
    createFormatter:(field)=>(a)=>formatNumber(Number(a[field])),
    label:'Округлить до ста тысяч'
  },
  roundMonth:{
    createComparer:(field)=>(a,b)=> roundMonth(new Date(a[field])).valueOf()-roundMonth(new Date(b[field])).valueOf(),
    createFormatter: (field) => (a)=>formatDate(roundMonth(new Date(a[field]))),
    label:'Округлить до одного месяца'
  },
  roundQuarter:{
    createComparer: (field)=>(a,b)=>roundQuarter(new Date(a[field])).valueOf()-roundQuarter(new Date(b[field])).valueOf(),
    createFormatter: (field)=>(a)=>formatDate(roundQuarter(new Date(a[field]))),
    label:'Округлить до квартала'
  },
  roundYear:{
    createComparer: (field)=>(a,b)=>roundYear(new Date(a[field])).valueOf()-roundYear(new Date(b[field])).valueOf(),
    createFormatter: (field)=>(a)=>formatDate(roundYear(new Date(a[field]))),
    label:'Округлить до года'
  }
};
