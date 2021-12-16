import { KnownLocations } from '../models/app-state.js';
import { RowData } from '../models/row-data.js';

export const labels:Record<KnownLocations,string>={
  'logbook':'Журнал обслуживания',
  'pivot-table':'Сводная таблица'
};


export const fieldLabels: Record<keyof RowData, string> = {
  date: 'Дата обслуживания',
  driverName: 'ФИО Водителя',
  id:'Номер записи',
  serviceRendered:'Выполненные работы',
  serviceStationAddress: 'Адрес станции ТО',
  serviceStationName: 'Наименование станции',
  vehicleId: 'VIN',
  vehicleMake: 'Марка автомобиля',
  vehicleModel: 'Модель автомобиля',
  vehicleNumberPlate: 'Гос. рег. номер',
  vehicleYear: 'Год выпуска',
};
