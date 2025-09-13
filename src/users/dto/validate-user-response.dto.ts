export interface SafeUser {
  user_id: number;
  user_name: string;
  correo: string;
  country_id: number;
  image: string;
  token: string; // token dentro del user
}

export interface ValidateUserResponse {
  user: SafeUser;
}
