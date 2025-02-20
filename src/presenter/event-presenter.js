import EventView from '../view/event-view';
import EditEventView from '../view/edit-event-view';
import {remove, render, replace} from '../framework/render';
import {Mode, UpdateType, UserAction} from '../const';
import {isEscKey} from '../utils/common';

export default class EventPresenter {
  #eventsList = null;
  #event = null;
  #eventComponent = null;
  #editEventComponent = null;
  #mode = Mode.DEFAULT;
  #offers = [];
  #destinations = [];

  #onClickFormEdit = () => null;
  #onDataChange = () => null;

  constructor({eventsList, offers, destinations, onClickEdit, onDataChange,}) {
    this.#eventsList = eventsList;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onClickFormEdit = onClickEdit;
    this.#onDataChange = onDataChange;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEditEventComponent = this.#editEventComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations,
      onClickEdit: () => {
        this.#openEditEventHandler();
      },
      onClickFavorite: this.#clickFavoriteHandler,
    });

    this.#editEventComponent = new EditEventView({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#submitFormHandler,
      onFormClose: () => {
        this.closeEditEvent();
      },
      onDeleteClick: this.#deleteClickHandler,
    });
    if (prevEventComponent === null || prevEditEventComponent === null) {
      render(this.#eventComponent, this.#eventsList);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editEventComponent, prevEditEventComponent);
    }

    remove(prevEventComponent);
    remove(prevEditEventComponent);
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editEventComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editEventComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#eventComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editEventComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#editEventComponent.shake(resetFormState);
  }

  closeEditEvent = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editEventComponent.reset(this.#event);
      this.#closeEditEventHandler();
    }
  };

  destroy() {
    remove(this.#eventComponent);
    remove(this.#editEventComponent);
  }

  #deleteClickHandler = (event) => {
    this.#onDataChange(UserAction.DELETE_EVENT, UpdateType.MINOR, event);
  };

  #clickFavoriteHandler = () => {
    this.#onDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      {...this.#event, isFavorite: !this.#event.isFavorite}
    );
  };

  #escKeyDownHandler = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      this.closeEditEvent();
    }
  };

  #replaceCardToForm() {
    replace(this.#editEventComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToCard() {
    replace(this.#eventComponent, this.#editEventComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #openEditEventHandler() {
    this.#onClickFormEdit();
    this.#replaceCardToForm();
    this.#mode = Mode.EDITING;
  }

  #closeEditEventHandler() {
    this.#replaceFormToCard();
    this.#mode = Mode.DEFAULT;
  }

  #submitFormHandler = (event) => {
    this.#onDataChange(UserAction.UPDATE_EVENT, UpdateType.MINOR, event);
  };
}
