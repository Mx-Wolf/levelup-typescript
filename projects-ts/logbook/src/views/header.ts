import { AppProps, KnownLocations, AppEvents } from '../models/app-state.js';

const labels:Record<KnownLocations,string>={
  'logbook':'Журнал обслуживания',
  'pivot-table':'Сводная таблица'
};

export const createHeader = (state:Pick<AppProps<unknown>,'location'>&Pick<AppEvents<unknown>,'locationChanged'>)=>{
  const {location, locationChanged} = state;
};
