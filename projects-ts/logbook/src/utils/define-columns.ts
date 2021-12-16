import { ColumnSettings } from '../models/app-state.js';

export const defineColumns = <T>(columns:Omit<ColumnSettings<T>,'columnId'>[]):ColumnSettings<T>[] => columns.map((e,ix)=>({...e, columnId:ix}));
