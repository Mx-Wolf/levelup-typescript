import { MODAL_OPEN_CSS } from '../settings/const.js';
import { attach } from '../utils/attach-event.js';
import { parseHtmlElement } from './parser.js';


const popupTemplate = `<div class="modal modal--pivot-settings">
<div class="modal__wrapper">
  <div class="modal__overlay"></div>
  <div class="modal__content">
    <div class="pivot-settins">
      <h2 class="title title--page">Настройки сводной таблицы</h2>
      <div class="pivot-settins__wrap">
        <form class="form-filter" action="/">
          <h3 class="form-filter__title">
            Значения строк
          </h3>
          <button class="form-filter__reset" type="reset">
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="m12 10.59 4.95-4.95 1.41 1.41L13.41 12l4.95 4.95-1.41 1.41L12 13.41l-4.95 4.95-1.41-1.41L10.59 12 5.64 7.05l1.41-1.41L12 10.59Z"></path>
            </svg>
            <span>Сбросить выбор</span>
          </button>
          <ul class="form-filter__list">
            <li class="form-filter__item">
              <input id="rows-filter-0" type="radio" name="list-values">
              <label for="rows-filter-0" tabindex="0">Марка</label>
            </li>
            <li class="form-filter__item">
              <input id="rows-filter-1" type="radio" name="list-values">
              <label for="rows-filter-1" tabindex="0">Модель</label>
            </li>
            <li class="form-filter__item">
              <input id="rows-filter-2" type="radio" name="list-values">
              <label for="rows-filter-2" tabindex="0">Водитель</label>
            </li>
            <li class="form-filter__item">
              <input id="rows-filter-3" type="radio" name="list-values">
              <label for="rows-filter-3" tabindex="0">Тех-центр</label>
            </li>
            <li class="form-filter__item">
              <input id="rows-filter-4" type="radio" name="list-values">
              <label for="rows-filter-4" tabindex="0">Вид обслуживания</label>
            </li>
            <li class="form-filter__item">
              <input id="rows-filter-5" type="radio" name="list-values">
              <label for="rows-filter-5" tabindex="0">Сумма, ₽</label>
            </li>
            <li class="form-filter__item">
              <input id="rows-filter-6" type="radio" name="list-values">
              <label for="rows-filter-6" tabindex="0">Пробег</label>
            </li>
          </ul>
        </form>
        <form class="form-filter" action="/">
          <h3 class="form-filter__title">
            Значения столбцов
          </h3>
          <button class="form-filter__reset" type="reset">
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="m12 10.59 4.95-4.95 1.41 1.41L13.41 12l4.95 4.95-1.41 1.41L12 13.41l-4.95 4.95-1.41-1.41L10.59 12 5.64 7.05l1.41-1.41L12 10.59Z"></path>
            </svg>
            <span>Сбросить выбор</span>
          </button>
          <ul class="form-filter__list">
            <li class="form-filter__item">
              <input id="cols-filter-0" type="radio" name="list-values">
              <label for="cols-filter-0" tabindex="0">Марка</label>
            </li>
            <li class="form-filter__item">
              <input id="cols-filter-1" type="radio" name="list-values">
              <label for="cols-filter-1" tabindex="0">Модель</label>
            </li>
            <li class="form-filter__item">
              <input id="cols-filter-2" type="radio" name="list-values">
              <label for="cols-filter-2" tabindex="0">Водитель</label>
            </li>
            <li class="form-filter__item">
              <input id="cols-filter-3" type="radio" name="list-values">
              <label for="cols-filter-3" tabindex="0">Тех-центр</label>
            </li>
            <li class="form-filter__item">
              <input id="cols-filter-4" type="radio" name="list-values">
              <label for="cols-filter-4" tabindex="0">Вид обслуживания</label>
            </li>
            <li class="form-filter__item">
              <input id="cols-filter-5" type="radio" name="list-values">
              <label for="cols-filter-5" tabindex="0">Сумма, ₽</label>
            </li>
            <li class="form-filter__item">
              <input id="cols-filter-6" type="radio" name="list-values">
              <label for="cols-filter-6" tabindex="0">Пробег</label>
            </li>
          </ul>
        </form>
        <form class="form-filter" action="/">
          <h3 class="form-filter__title">
            Группирующая функция
          </h3>
          <button class="form-filter__reset" type="reset">
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="m12 10.59 4.95-4.95 1.41 1.41L13.41 12l4.95 4.95-1.41 1.41L12 13.41l-4.95 4.95-1.41-1.41L10.59 12 5.64 7.05l1.41-1.41L12 10.59Z"></path>
            </svg>
            <span>Сбросить выбор</span>
          </button>
          <ul class="form-filter__list">
            <li class="form-filter__item form-filter__item--sublist">
              <span>
                Максимум
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="m12 13.17 4.95-4.95 1.41 1.42L12 16 5.64 9.64l1.41-1.42L12 13.17Z"></path>
                </svg>
              </span>
              <ul class="form-filter__list">
                <li class="form-filter__item">
                  <input id="func-filter-0-0" type="radio" name="list-values">
                  <label for="func-filter-0-0" tabindex="0">Марка</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-1-0" type="radio" name="list-values">
                  <label for="func-filter-1-0" tabindex="0">Модель</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-2-0" type="radio" name="list-values">
                  <label for="func-filter-2-0" tabindex="0">Водитель</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-3-0" type="radio" name="list-values">
                  <label for="func-filter-3-0" tabindex="0">Тех-центр</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-4-0" type="radio" name="list-values">
                  <label for="func-filter-4-0" tabindex="0">Вид
                    обслуживания</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-5-0" type="radio" name="list-values">
                  <label for="func-filter-5-0" tabindex="0">Сумма, ₽</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-6-0" type="radio" name="list-values">
                  <label for="func-filter-6-0" tabindex="0">Пробег</label>
                </li>
              </ul>
            </li>
            <li class="form-filter__item form-filter__item--sublist">
              <span>
                Среднее
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="m12 13.17 4.95-4.95 1.41 1.42L12 16 5.64 9.64l1.41-1.42L12 13.17Z"></path>
                </svg>
              </span>
              <ul class="form-filter__list">
                <li class="form-filter__item">
                  <input id="func-filter-0-1" type="radio" name="list-values">
                  <label for="func-filter-0-1" tabindex="0">Марка</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-1-1" type="radio" name="list-values">
                  <label for="func-filter-1-1" tabindex="0">Модель</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-2-1" type="radio" name="list-values">
                  <label for="func-filter-2-1" tabindex="0">Водитель</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-3-1" type="radio" name="list-values">
                  <label for="func-filter-3-1" tabindex="0">Тех-центр</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-4-1" type="radio" name="list-values">
                  <label for="func-filter-4-1" tabindex="0">Вид
                    обслуживания</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-5-1" type="radio" name="list-values">
                  <label for="func-filter-5-1" tabindex="0">Сумма, ₽</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-6-1" type="radio" name="list-values">
                  <label for="func-filter-6-1" tabindex="0">Пробег</label>
                </li>
              </ul>
            </li>
            <li class="form-filter__item form-filter__item--sublist">
              <span>
                Соединить список
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="m12 13.17 4.95-4.95 1.41 1.42L12 16 5.64 9.64l1.41-1.42L12 13.17Z"></path>
                </svg>
              </span>
              <ul class="form-filter__list">
                <li class="form-filter__item">
                  <input id="func-filter-0-2" type="radio" name="list-values">
                  <label for="func-filter-0-2" tabindex="0">Марка</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-1-2" type="radio" name="list-values">
                  <label for="func-filter-1-2" tabindex="0">Модель</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-2-2" type="radio" name="list-values">
                  <label for="func-filter-2-2" tabindex="0">Водитель</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-3-2" type="radio" name="list-values">
                  <label for="func-filter-3-2" tabindex="0">Тех-центр</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-4-2" type="radio" name="list-values">
                  <label for="func-filter-4-2" tabindex="0">Вид
                    обслуживания</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-5-2" type="radio" name="list-values">
                  <label for="func-filter-5-2" tabindex="0">Сумма, ₽</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-6-2" type="radio" name="list-values">
                  <label for="func-filter-6-2" tabindex="0">Пробег</label>
                </li>
              </ul>
            </li>
            <li class="form-filter__item form-filter__item--sublist">
              <span>
                Сумма
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="m12 13.17 4.95-4.95 1.41 1.42L12 16 5.64 9.64l1.41-1.42L12 13.17Z"></path>
                </svg>
              </span>
              <ul class="form-filter__list">
                <li class="form-filter__item">
                  <input id="func-filter-0-3" type="radio" name="list-values">
                  <label for="func-filter-0-3" tabindex="0">Марка</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-1-3" type="radio" name="list-values">
                  <label for="func-filter-1-3" tabindex="0">Модель</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-2-3" type="radio" name="list-values">
                  <label for="func-filter-2-3" tabindex="0">Водитель</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-3-3" type="radio" name="list-values">
                  <label for="func-filter-3-3" tabindex="0">Тех-центр</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-4-3" type="radio" name="list-values">
                  <label for="func-filter-4-3" tabindex="0">Вид
                    обслуживания</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-5-3" type="radio" name="list-values">
                  <label for="func-filter-5-3" tabindex="0">Сумма, ₽</label>
                </li>
                <li class="form-filter__item">
                  <input id="func-filter-6-3" type="radio" name="list-values">
                  <label for="func-filter-6-3" tabindex="0">Пробег</label>
                </li>
              </ul>
            </li>
          </ul>
        </form>
      </div>
      <div class="pivot-settins__footer">
        <button data-pivot="cancel" class="button button--lighter">
          <span>Отменить</span>
        </button>
        <button data-pivot="apply" class="button button--fill">
          <span>Применить</span>
        </button>
      </div>
    </div>
    <button class="modal__close-btn btn-reset" type="button" aria-label="Закрыть попап">
      <svg width="15" height="15">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </div>
</div>
</div>`;

export const createPivotPopup = ()=>{
  const item = parseHtmlElement(popupTemplate);


  const handleCancel = ()=>{
    item.classList.remove(MODAL_OPEN_CSS);
  };
  const handleApply = ()=>{
    handleCancel();
    console.log('apply');
  };

  attach(
    'click',
    item.querySelector('.modal__close-btn'),
    handleCancel,
  );

  attach(
    'click',
    item.querySelector('[data-pivot="cancel"]'),
    handleCancel
  );

  attach(
    'click',
    item.querySelector('[data-pivot="apply"]'),
    handleApply,
  );

  return item;
};
