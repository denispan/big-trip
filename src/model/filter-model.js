import Observable from '../framework/observable';
import {DEFAULT_FILTER_TYPE} from '../const';


export default class FilterModel extends Observable {
  #filter = DEFAULT_FILTER_TYPE;

  get filter() {
    return this.#filter;
  }

  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType);
  }
}
