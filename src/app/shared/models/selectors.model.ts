export interface SelectorsModel {
  country: string[],
  city: SelectorsCity[],
  address: SelectorsAddress[]
}

export interface SelectorsCity {
  country: string,
  city: string
}

export interface SelectorsAddress {
  city: string,
  address: string,
  addressId: string
}
