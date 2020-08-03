export interface ChooseOffice {
  isNewObject: boolean,
  data: OfficeData
}

export interface OfficeData {
  country: string,
  city: string,
  address: string,
  addressID?: string
}
