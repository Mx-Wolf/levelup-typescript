// Будем требовать от обработчиков событий соответствия 
// этому интерфейсу
export interface PropertyChangedHandler<T> {
  // контекст - это объект, свойство которого изменилось
  // property - это имя свойства, которое изменилось
  (context: T, property: keyof T): void;
}