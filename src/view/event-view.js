import {capitalizeFirstLetter, getItemById} from '../utils/common';
import dayjs from 'dayjs';
import {DATE_FORMAT_DATE, DATE_FORMAT_TAG, DATE_FORMAT_TAG_FULL, DATE_FORMAT_TIME} from '../const';
import {getDurationTime} from '../utils/time';
import {getOffersChecked} from '../utils/offers';
import AbstractView from '../framework/view/abstract-view';

function createOffersTemplate({title, price}) {
  return (`<li class="event__offer">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </li>`);
}

function createOffersListTemplate(offersChecked) {
  if (offersChecked.length === 0) {
    return '';
  }
  return (`<ul class="event__selected-offers">
          ${offersChecked.map((offer) => createOffersTemplate(offer)).join('')}
          </ul>`);
}

function createEventTemplate(event, allOffers, allDestinations) {
  const {
    dateFrom,
    dateTo,
    type,
    destination,
    basePrice,
    offers,
    isFavorite,
  } = event;

  const destinationData = getItemById(destination, allDestinations);

  const {
    name: nameDest,
  } = destinationData;

  const offersChecked = getOffersChecked(type, allOffers, offers);

  return (
    `<div class="event trip-events__item">
      <time class="event__date" datetime=${dayjs(dateFrom).format(DATE_FORMAT_TAG)}>${dayjs(dateFrom).format(DATE_FORMAT_DATE)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${capitalizeFirstLetter(type)} ${nameDest}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime=${dayjs(dateFrom).format(DATE_FORMAT_TAG_FULL)}>${dayjs(dateFrom).format(DATE_FORMAT_TIME)}</time>
          &mdash;
          <time class="event__end-time" datetime=${dayjs(dateTo).format(DATE_FORMAT_TAG_FULL)}>${dayjs(dateTo).format(DATE_FORMAT_TIME)}</time>
        </p>
        <p class="event__duration">${getDurationTime(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      ${createOffersListTemplate(offersChecked)}
      <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`
  );
}

export default class EventView extends AbstractView {
  #event = null;
  #offers = [];
  #destinations = [];
  #onClickEdit = () => null;
  #onClickFavorite = () => null;

  constructor({event, offers, destinations, onClickEdit, onClickFavorite}) {
    super();
    this.#event = event;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onClickEdit = onClickEdit;
    this.#onClickFavorite = onClickFavorite;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createEventTemplate(this.#event, this.#offers, this.#destinations);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#onClickEdit();
  };

  #favoriteClickHandler = async (evt) => {
    evt.preventDefault();
    await this.#onClickFavorite();
  };
}
