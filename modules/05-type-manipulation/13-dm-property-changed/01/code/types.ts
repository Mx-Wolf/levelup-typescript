// Будем требовать от обработчиков событий соответствия 
// этому интерфейсу
export interface PropertyChangedHandler<T> {
  // контекст - это объект, свойство которого изменилось
  // property - это имя свойства, которое изменилось
  (context: T, property: keyof T): void;
}

// Обозначим для себя тип действия 
interface CancelSubscription {
  (): void;
}

// Наша цель - для каждого "простого" свойства
// простого объекта предоставить программе возможность
// подписать процедуру для получения уведомления
// Определим интерфейс для оформления и отказа 
// от подсписки
export interface PropertyChangedEvent<T>{
  subscribe:(handler:PropertyChangedHandler<T>)=>CancelSubscription;
  unsubscribe:(handler: PropertyChangedHandler<T>)=>void;
}

// Мы создадим код для генерации экземпляров 
// менеджеров событий
// Для каждого наблюдаемого свойства мы подготовим 
// экземпляр с таким интерфейсом
export interface EventManager<T> {
  subscriptionManager: PropertyChangedEvent<T>;
  dispatch: PropertyChangedHandler<T>
}

