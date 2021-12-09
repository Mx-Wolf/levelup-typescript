import { aggregateFunctions, groupingFunctions } from '../settings/grouping-functions.js';

export type DateValue = string & {'date-value':void};
export type VehicleMakeValue = string & {'vehicle-make-value':void};
export type VehicleModelValue = string & {'vehicle-model-value':void};
export type YearValue = number & {'year':void};
export type PersonNameValue = string & {'person-name':void};
export type ServiceStationValue = string & {'service-station':void};
export type PostalAddressValue = string & {'postal-address':void};

export interface RowData{
  id:number;
  date: DateValue;
  vehicleId:number;
  vehicleMake: VehicleMakeValue;
  vehicleModel: VehicleModelValue;
  vehicleYear: YearValue;
  vehicleNumberPlate: string;
  driverName:PersonNameValue;
  serviceStationName: ServiceStationValue;
  serviceStationAddress: PostalAddressValue;
  serviceRendered: string;
}

export interface PopupChoise  {
  row:[keyof RowData,keyof typeof groupingFunctions];
  column:[keyof RowData, keyof typeof groupingFunctions];
  aggregate:[keyof RowData,keyof typeof aggregateFunctions];
}

