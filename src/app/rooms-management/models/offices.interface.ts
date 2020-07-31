export interface OfficesInterface {
  addressId: 'string';
  floor: [
    {
      id: 'string';
      map: 'string';
      number: 0;
      officeId: 'string';
      room: [
        {
          floorId: 'string';
          id: 'string';
          number: 0;
          place: [
            {
              bookings: [
                {
                  bookingDate: '2020-07-31T11:52:18.073Z';
                  dueDate: '2020-07-31T11:52:18.073Z';
                  id: 'string';
                  user: {
                    bookings: [null];
                    created: '2020-07-31T11:52:18.073Z';
                    email: 'string';
                    firstName: 'string';
                    id: 'string';
                    isActive: true;
                    lastName: 'string';
                    password: 'string';
                    queues: [null];
                    roles: [
                      {
                        authorities: [
                          {
                            id: 'string';
                            name: 'string';
                          }
                        ];
                        id: 'string';
                        name: 'string';
                        users: [null];
                      }
                    ];
                    updated: '2020-07-31T11:52:18.073Z';
                    username: 'string';
                  };
                }
              ];
              id: 'string';
              number: 0;
              queue: {
                id: 'string';
                users: [
                  {
                    bookings: [null];
                    created: '2020-07-31T11:52:18.073Z';
                    email: 'string';
                    firstName: 'string';
                    id: 'string';
                    isActive: true;
                    lastName: 'string';
                    password: 'string';
                    queues: [null];
                    roles: [
                      {
                        authorities: [
                          {
                            id: 'string';
                            name: 'string';
                          }
                        ];
                        id: 'string';
                        name: 'string';
                        users: [null];
                      }
                    ];
                    updated: '2020-07-31T11:52:18.073Z';
                    username: 'string';
                  }
                ];
              };
              roomId: 'string';
            }
          ];
        }
      ];
    }
  ];
  id: 'string';
  number: 0;
}
