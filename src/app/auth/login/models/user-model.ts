export class User {
  constructor(
    public email: string,
    public id: string,
    // tslint:disable-next-line:variable-name
    private _token: string,
  ) {
  }

  get userToken() {
    return this._token;
  }

}
