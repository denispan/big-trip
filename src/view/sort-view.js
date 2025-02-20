import AbstractView from '../framework/view/abstract-view';
import {DEFAULT_SORT_TYPE, Sorts} from '../const';
import {isNotInput} from '../utils/common';


function createSortElement(sortItem, currentSortType) {
  const {sortType, isDisabled} = sortItem;
  return (
    `<div class="trip-sort__item  trip-sort__item--${sortType}">
        <input
        id="sort-${sortType}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value=${sortType}
        ${isDisabled === true ? 'disabled' : ''}
        ${sortType === currentSortType ? 'checked' : ''}
        >
        <label class="trip-sort__btn" for="sort-${sortType}">${sortType}</label>
      </div>`
  );
}

function createSortTemplate(currentSortType) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${Sorts.map((sortItem) => createSortElement(sortItem, currentSortType)).join('')}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #currentSortType = DEFAULT_SORT_TYPE;
  #onChangeSortType = () => null;

  constructor({onChangeSortType, currentSortType}) {
    super();
    this.#onChangeSortType = onChangeSortType;
    this.#currentSortType = currentSortType;

    this.element.addEventListener('click', this.#changeSortTypeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #changeSortTypeHandler = (evt) => {
    if (isNotInput(evt)) {
      return;
    }

    this.#onChangeSortType(evt.target.value);
  };
}
