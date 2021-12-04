import { AppEvents, AppProps } from '../models/app-state.js';

interface WithActiveFlag {
    active:boolean
}

const template = `<li class="main-nav__item">
<a href="#" class="link    ">
  <span>Журнал обслуживания</span>
</a>
</li>`;

export const createNavItem = (
  state:Pick<AppProps<unknown>,'location'>&Pick<AppEvents<unknown>,'locationChanged'> &WithActiveFlag
)=>{
  const {active,location,locationChanged} = state;
  const item = 
};
