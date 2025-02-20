import FilterView from '../view/filter-view';
import {remove, render, replace} from '../framework/render';
import {UpdateType} from '../const';
import {filter} from '../utils/filter';


export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #tripModel = null;
  #filterComponent = null;

  constructor({filterContainer, filterModel, tripModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#tripModel = tripModel;

    this.#tripModel.addObserver(this.#modelChangeHandler);
    this.#filterModel.addObserver(this.#modelChangeHandler);
  }

  get filters() {
    return Object.entries(filter).map(
      ([filterType, filterEvents]) => ({
        type: filterType,
        count: filterEvents(this.#tripModel.events).length,
      }),
    );
  }

  init() {
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new FilterView({
      filtersList: this.filters,
      onFilterChange: this.#filterChangeHandler,
      currentFilter: this.#filterModel.filter,
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #filterChangeHandler = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };

  #modelChangeHandler = () => {
    this.init();
  };
}
