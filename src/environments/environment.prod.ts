export const environment = {
  production: true,
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
  ERROR_ON_GETTING_ADDRESS_ID: 'error on get id',
  ROLES_FOR_ADMINISTRATION: ['ROLE_ADMIN', 'ROLE_OFFICE_MANAGER'],
  WHO_CAN_DELETE_MAPS: ['ROLE_ADMIN'],
  TIMER_ON_BOOKING: 60
};
