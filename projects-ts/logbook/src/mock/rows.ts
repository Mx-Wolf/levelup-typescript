import { DateValue, PersonNameValue, PostalAddressValue, RowData, ServiceStationValue, VehicleMakeValue, VehicleModelValue, YearValue } from '../models/row-data.js';

const createRow = (ix:number):RowData=>({
  date: new Date((new Date().valueOf() - (25+ix) * 130)).toISOString() as DateValue,
  driverName: 'Малышев Алексей Антонович' as PersonNameValue,
  id: 8300+ix,
  serviceRendered: 'Замена ступичного подшипника ',
  serviceStationAddress: 'ул. Союзная, 20' as PostalAddressValue,
  serviceStationName: 'Тех-центр' as ServiceStationValue,
  vehicleId: ix+1000,
  vehicleMake: 'Kia' as VehicleMakeValue,
  vehicleModel: 'Ceed' as VehicleModelValue,
  vehicleNumberPlate: 'М342КТ 18',
  vehicleYear: 2012 as YearValue

});

export const createMockRowData = ():RowData[]=>Array.from({length:25},(_,ix)=>createRow(ix));
