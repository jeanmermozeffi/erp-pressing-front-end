export class AuthModel {
  authToken: string|null;
  refreshToken: string;
  expiresIn: Date|null;

  setAuth(auth: AuthModel) {
    this.authToken = auth.authToken;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
  }
}

export class AuthModelApi {
  access: string|null;
  refresh: string|null;
  expiresIn: Date|null;

  setAuth(auth: AuthModelApi) {
    this.access = auth.access;
    this.refresh = auth.refresh;
    this.expiresIn = auth.expiresIn;
  }
}

export type LoginForm = {
  email: string;
  password: string;
}

export type LoginApiResponse = {
  access: string;
  refresh: string;
}
