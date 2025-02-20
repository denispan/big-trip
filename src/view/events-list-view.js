import AbstractView from '../framework/view/abstract-view';

function createEventsListTemplate() {
  return '<div class="trip-events__list"></div>';
}

export default class EventsListView extends AbstractView {
  get template() {
    return createEventsListTemplate();
  }
}
