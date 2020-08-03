export interface SelectorsModel {
  country: string[] | null,
  city: SelectorsCity[] | null,
  address: SelectorsAddress[] | null
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
