export const environment = {
  production: false,
  localStorageUser: 'user',
  databaseURL: 'https://calm-plains-62100.herokuapp.com',
  usersComponentRoute: 'user',
  officesURL: '/offices',
  places: {
    MAX_DEFAULT_QUANTITY_IN_CONFROOM: 10,
    MIN_QUANTITY_IN_CONFROOM: 2,
    MAX_QUANTITY_IN_CONFROOM: 50
  },
  zoomOptions: {
    MIN: 50,
    MAX: 200,
    STEP: 10
  },
  TEMP_ADDRESS_ID_FOR_NEW_OFFICE: 'new office',
  ERROR_ON_GETTING_ADDRESS_ID: 'error on get id'
};
