//для удобства - определим действие
export interface Action { (): void; }

export interface GameBoardView {
  //Супермен должен уметь победить злодея
  neutralizeEvil: (done: Action) => void;
  //Супермен должен выключить творение злодея
  disarmDevice: (done: Action) => void;
  //Супермен должен воодушевить и поддержать людей
  encourageMate: (done: Action) => void;
}

export interface StatisticsView{
  //Занавеска отъезжает, игра начинается
  onClosing:(handler:Action)=>void;
  //Показать результаты
  show: Action;
}