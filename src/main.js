import TripPresenter from './presenter/trip-presenter';
import TripModel from './model/trip-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import NewEventButtonView from './view/new-event-button-view';
import {render} from './framework/render';

import 'flatpickr/dist/flatpickr.min.css';
import TripApiService from './trip-api-service';
import {AUTHORIZATION, END_POINT} from './const';

const headerElement = document.querySelector('.trip-main');
const filtersElement = headerElement.querySelector('.trip-controls__filters');
const eventsBoardElement = document.querySelector('.trip-events');

const newEventButtonComponent = new NewEventButtonView({onClickNewEvent: clickNewEventHandle});
const tripModel = new TripModel({
  TripApiService: new TripApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  headerElement,
  filtersElement,
  eventsBoardElement,
  newEventButton: newEventButtonComponent,
  tripModel,
  filterModel,
  onNewEventDestroy: closeNewEventHandler,
});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersElement,
  filterModel,
  tripModel
});

function clickNewEventHandle() {
  tripPresenter.addNewEvent();
  newEventButtonComponent.element.disabled = true;
}

function closeNewEventHandler() {
  newEventButtonComponent.element.disabled = false;
  tripPresenter.renderNoEvent();
}

filterPresenter.init();
tripPresenter.init();
tripModel.init()
  .then(() => render(newEventButtonComponent, headerElement));
