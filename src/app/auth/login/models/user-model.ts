export class User {
  constructor(
    public username: string,
    // tslint:disable-next-line:variable-name
    private _token: string,
  ) {
  }

  get userToken() {
    return this._token;
  }
}
