export const createSetRows = {
  equals:()=>false,
  make: <T>(rows:T[])=>({ rows, message: '', rowCount: rows.length, rowsState: 'ready' as const })
};
