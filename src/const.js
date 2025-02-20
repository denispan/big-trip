const AUTHORIZATION = 'Basic 11dcsd2cvsdvscl1sa2j';
const END_POINT = 'https://denpan.ru/api/big-trip';
const DATE_FORMAT_DATE = 'MMM D';
const DATE_FORMAT_TIME = 'HH:mm';
const DATE_FORMAT_TAG = 'YYYY-MM-DD';
const DATE_FORMAT_TAG_FULL = 'YYYY-MM-DDTHH:MM';
const DATE_FORMAT_INPUT_DATE = 'DD/MM/YY';
const DATE_FORMAT_INPUT_TIME = 'HH:mm';

const MS_IN_MIN = 60000;
const MIN_IN_HOUR = 60;
const MIN_IN_DAY = 1440;

const EVENT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const DEFAULT_FILTER_TYPE = FilterTypes.EVERYTHING;

const NoEventMessage = {
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FilterTypes.PAST]: 'There are no past events now',
  [FilterTypes.PRESENT]: 'There are no present events now',
  [FilterTypes.FUTURE]: 'There are no future events now',
  'SERVER_ERROR': 'Failed to load latest route information'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const DEFAULT_SORT_TYPE = SortType.DAY;

const Sorts = [
  {
    sortType: SortType.DAY,
    isDisabled: false
  },
  {
    sortType: SortType.EVENT,
    isDisabled: true
  },
  {
    sortType: SortType.TIME,
    isDisabled: false
  },
  {
    sortType: SortType.PRICE,
    isDisabled: false
  },
  {
    sortType: SortType.OFFERS,
    isDisabled: true
  }
];

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const DEFAULT_EVENT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight'
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};

export {
  END_POINT,
  AUTHORIZATION,
  DATE_FORMAT_DATE,
  DATE_FORMAT_TIME,
  DATE_FORMAT_TAG,
  DATE_FORMAT_TAG_FULL,
  DATE_FORMAT_INPUT_DATE,
  DATE_FORMAT_INPUT_TIME,
  MS_IN_MIN,
  MIN_IN_HOUR,
  MIN_IN_DAY,
  EVENT_TYPES,
  FilterTypes,
  DEFAULT_FILTER_TYPE,
  NoEventMessage,
  Mode,
  SortType,
  DEFAULT_SORT_TYPE,
  Sorts,
  UserAction,
  UpdateType,
  DEFAULT_EVENT,
  TimeLimit
};
