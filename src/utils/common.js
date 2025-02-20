function capitalizeFirstLetter(string) {
  const lowerCaseString = string.toLowerCase();
  return lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1);
}

function getItemById(id, array) {
  return array.find((item) => item.id === id);
}

function isNotInput(evt) {
  return evt.target.tagName !== 'INPUT';
}

function isEscKey(evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

export {capitalizeFirstLetter, getItemById, isNotInput, isEscKey};
