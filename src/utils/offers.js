function getOffersChecked(eventType, allOffers, checkedOfferIds) {
  const offersByType = allOffers.find((offer) => offer.type === eventType).offers;
  return offersByType.filter((offer) => checkedOfferIds.includes(offer.id));
}

export {getOffersChecked};
