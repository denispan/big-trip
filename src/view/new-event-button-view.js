import AbstractView from '../framework/view/abstract-view';

function createNewEventButtonTemplate() {
  return (
    '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>'
  );
}

export default class NewEventButtonView extends AbstractView {
  #onClickNewEvent = () => null;

  constructor({onClickNewEvent}) {
    super();
    this.#onClickNewEvent = onClickNewEvent;

    this.element.addEventListener('click', this.#newEventClickHandler);
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  #newEventClickHandler = (evt) => {
    evt.preventDefault();
    this.#onClickNewEvent();
  };
}
