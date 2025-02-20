import Observable from '../framework/observable';
import {UpdateType} from '../const';

export default class TripModel extends Observable {
  #events = [];
  #offers = [];
  #destinations = [];
  #TripApiService = null;
  #isServerError = false;

  constructor({TripApiService}) {
    super();
    this.#TripApiService = TripApiService;
  }

  get events() {
    return this.#events;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  get serverError() {
    return this.#isServerError;
  }

  set events(updatedEvents) {
    this.#events = {...updatedEvents};
  }

  async init() {
    try {
      const events = await this.#TripApiService.events;
      this.#events = events.map(this.#adaptToClient);
      this.#offers = await this.#TripApiService.offers;
      this.#destinations = await this.#TripApiService.destinations;
    } catch (err) {
      this.#events = [];
      this.#offers = [];
      this.#destinations = [];

      this.#isServerError = true;
    }


    this._notify(UpdateType.INIT);
  }

  async updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#TripApiService.updateEvent(update);
      const updatedEvent = this.#adaptToClient(response);
      this.#events = this.#events.map((event) => event.id === updatedEvent.id ? updatedEvent : event);
      this._notify(updateType, updatedEvent);
    } catch(err) {
      throw new Error('Can\'t update event');
    }
  }

  async addEvent(updateType, update) {
    try {
      const response = await this.#TripApiService.addEvent(update);
      const newEvent = this.#adaptToClient(response);
      this.#events = [newEvent, ...this.#events];
      this._notify(updateType, newEvent);
    } catch(err) {
      throw new Error('Can\'t add event');
    }
  }

  async deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#TripApiService.deleteEvent(update);
      this.#events = this.#events.filter((event) => event.id !== update.id);
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete event');
    }
  }

  #adaptToClient(event) {
    const adaptedEvent = {...event,
      basePrice: event['base_price'],
      dateFrom: event['date_from'] !== null ? new Date(event['date_from']) : event['date_from'],
      dateTo: event['date_to'] !== null ? new Date(event['date_to']) : event['date_to'],
      isFavorite: event['is_favorite'],
    };

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }
}
