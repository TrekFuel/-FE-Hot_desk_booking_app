export interface GetAllUsersInterface {
  content: [
    {
      email: 'string';
      firstName: 'string';
      id: 'string';
      isActive: true;
      lastName: 'string';
      roleNames: ['string'];
      username: 'string';
    }
  ];
  empty: true;
  first: true;
  last: true;
  number: 0;
  numberOfElements: 0;
  pageable: {
    page: 0;
    size: 0;
    sort: 'string';
  };
  size: 0;
  sort: {
    empty: true;
    sorted: true;
    unsorted: true;
  };
  totalElements: 0;
  totalPages: 0;
}
