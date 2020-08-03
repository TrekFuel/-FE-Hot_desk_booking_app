import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { OfficesDataSelectsInterface } from '../models/offices-data-selects.interface';

const offices = [
  {
    country: 'Belarus',
    city: 'Minsk',
    street: 'Lenina str. 1',
    id: '1',
  },
  {
    country: 'Belarus',
    city: 'Minsk',
    street: 'Sverdlova str. 15/1',
    id: '2',
  },
  {
    country: 'Belarus',
    city: 'Minsk',
    street: 'Kazinca str. 134',
    id: '3',
  },
  {
    country: 'Belarus',
    city: 'Grodno',
    street: 'Mira str. 13',
    id: '4',
  },
  {
    country: 'Belarus',
    city: 'Grodno',
    street: 'Repina str. 33',
    id: '5',
  },
  {
    country: 'Belarus',
    city: 'Grodno',
    street: 'Tavlaya str. 7',
    id: '6',
  },
  {
    country: 'Belarus',
    city: 'Mogilev',
    street: 'Frunze str. 5',
    id: '7',
  },
  {
    country: 'Belarus',
    city: 'Mogilev',
    street: 'Vpered str. 12',
    id: '8',
  },
  {
    country: 'Belarus',
    city: 'Mogilev',
    street: 'Glavnaya str. 5',
    id: '9',
  },
  {
    country: 'Russia',
    city: 'Moskva',
    street: 'Kr. Plochad str. 1',
    id: '10',
  },
  {
    country: 'Russia',
    city: 'Moskva',
    street: 'Gagarina str. 1-15',
    id: '11',
  },
  {
    country: 'Russia',
    city: 'St-Peterburg',
    street: '1-aya str. 1',
    id: '12',
  },
  {
    country: 'Russia',
    city: 'St-Peterburg',
    street: '2-aya str. 1',
    id: '13',
  },
  {
    country: 'Russia',
    city: 'Ufa',
    street: 'Some str. 1',
    id: '14',
  },
  {
    country: 'Russia',
    city: 'Ufa',
    street: 'D2R2 str. 1',
    id: '15',
  },
  {
    country: 'USA',
    city: 'New York',
    street: 'Cross str. 1',
    id: '16',
  },
  {
    country: 'USA',
    city: 'New York',
    street: 'Super str. 4',
    id: '17',
  },
  {
    country: 'USA',
    city: 'Atlanta',
    street: '4e5 str. 4',
    id: '18',
  },
  {
    country: 'USA',
    city: 'Atlanta',
    street: 'Obama str. 4',
    id: '19',
  },
  {
    country: 'USA',
    city: 'Las Vegas',
    street: 'Gambling str. 4',
    id: '20',
  },
  {
    country: 'USA',
    city: 'Las Vegas',
    street: 'Casino#1 str. 4',
    id: '21',
  },
];

@Injectable({
  providedIn: 'root',
})
export class OfficeChoosingServices {
  constructor(private http: HttpClient) {}

  getSelectorsData(): Observable<OfficesDataSelectsInterface[]> {
    return from([offices]).pipe(
      delay(2000),
      map((data: OfficesDataSelectsInterface[]) => {
        return data;
      })
    );
  }
}
