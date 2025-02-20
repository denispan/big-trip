import {FilterTypes} from '../const';

export const filter = {
  [FilterTypes.EVERYTHING]: (events) => events,
  [FilterTypes.FUTURE]: (events) => events.filter((event) => new Date(event.dateFrom) > new Date()),
  [FilterTypes.PRESENT]: (events) => events.filter((event) => new Date(event.dateFrom) <= new Date() && new Date(event.dateTo) >= new Date()),
  [FilterTypes.PAST]: (events) => events.filter((event) => new Date(event.dateTo) < new Date()),
};
