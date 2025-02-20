import AbstractView from '../framework/view/abstract-view';
import {capitalizeFirstLetter} from '../utils/common';
import {DEFAULT_FILTER_TYPE} from '../const';

function createFilterTemplate(filter, currentFilter) {
  const {type, count} = filter;
  return (`
  <div class="trip-filters__filter">
    <input
    id="filter-${type}"
    class="trip-filters__filter-input
    visually-hidden"
    type="radio"
    name="trip-filter"
    value="${type}"
    ${count === 0 ? 'disabled' : ''}
    ${type === currentFilter ? 'checked' : ''}
    >
    <label class="trip-filters__filter-label" for="filter-${type}">${capitalizeFirstLetter(type)}</label>
  </div>
  `);
}

function createFiltersTemplate(filtersList, currentFilter) {
  return (
    `<form class="trip-filters" action="#" method="get">
        ${filtersList.map((filter) => createFilterTemplate(filter, currentFilter)).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
     </form>`
  );
}

export default class FilterView extends AbstractView {
  #filtersList = [];
  #currentFilter = '';
  #onFilterChange = () => null;

  constructor({filtersList, currentFilter = DEFAULT_FILTER_TYPE, onFilterChange}) {
    super();
    this.#filtersList = filtersList;
    this.#currentFilter = currentFilter;
    this.#onFilterChange = onFilterChange;

    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filtersList, this.#currentFilter);
  }

  #filterChangeHandler = (evt) => {
    evt.preventDefault();
    this.#onFilterChange(evt.target.value);
  };
}
