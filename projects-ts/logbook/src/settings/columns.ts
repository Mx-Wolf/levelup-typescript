import { RowData } from '../models/row-data.js';
import { defineColumns } from '../utils/define-columns.js';

const dateFormatter = new Intl.DateTimeFormat('ru-RU');

export const columns=defineColumns<RowData>([
  {
    format:(a)=>dateFormatter.format(new Date(a.date as string)),
    label: 'Дата',
    size: 'small',
  },
  {
    format: (r)=>`${r.vehicleMake} ${r.vehicleModel}, ${r.vehicleYear}, ${r.vehicleNumberPlate}`,
    label: ' 	Автомобиль (марка, модель, гос.номер)',
    size: 'large',
  },
  {
    format:(r)=>`${r.driverName}`,
    label: 'Водитель',
    size: 'large',
  },
  {
    format: (r)=>`${r.serviceStationName}`,
    label: 'Тех-центр',
    size: 'middle',
  },
  {
    format:(r)=>`${r.serviceRendered}`,
    label: 'Операция',
    size: 'large'
  }
]);
