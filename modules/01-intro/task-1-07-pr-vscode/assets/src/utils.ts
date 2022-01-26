const formatter = new Intl.DateTimeFormat('en-US');
export const formatTime = (date: Date) => formatter.format(date);

export const createHeader = (title: string) => {
  const h1 = document.createElement('h1');
  h1.innerText = title;
  return h1;
};

export const getDate = ()=>new Date();
