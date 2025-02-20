import dayjs from 'dayjs';

function sortByDay(eventA, eventB) {
  return dayjs(eventA.dateFrom).valueOf() - dayjs(eventB.dateFrom).valueOf();
}

function sortByPrice(eventA, eventB) {
  return eventA.basePrice - eventB.basePrice;
}

function sortByTime(eventA, eventB) {
  return durationEvent(eventA) - durationEvent(eventB);
}

function durationEvent(event) {
  return dayjs(event.dateTo).diff(event.dateFrom);
}

export {sortByDay, sortByPrice, sortByTime};
