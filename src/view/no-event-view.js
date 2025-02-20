import AbstractView from '../framework/view/abstract-view';
import {DEFAULT_FILTER_TYPE, NoEventMessage} from '../const';

function createNoEventTemplate({filterType = DEFAULT_FILTER_TYPE}) {
  return `<p class="trip-events__msg">${NoEventMessage[filterType]}</p>`;
}

export default class NoEventView extends AbstractView {
  #filterType = DEFAULT_FILTER_TYPE;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoEventTemplate(this.#filterType);
  }
}
