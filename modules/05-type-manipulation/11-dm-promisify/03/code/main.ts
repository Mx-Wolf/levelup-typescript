import { createGameBoard } from "./original";
import { createStatistics } from "./statistics-view";

const statistics = createStatistics();
const start = ()=>{
  const game = createGameBoard();
  let evil = false;
  let mate = false;
  let device = false;
  const check =()=>{
    if(evil && mate && device){
      statistics.show()
    }
  }
  game.disarmDevice(()=>{device=true; check();});
  game.neutralizeEvil(()=>{evil=true; check();});
  game.encourageMate(()=>{mate=true; check();});
  
};

statistics.onClosing(()=>start());

start();
