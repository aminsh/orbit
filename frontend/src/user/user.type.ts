import {FormControl} from "@angular/forms";
import {Nullable} from "../core/type";

export interface User {
  id: string
  name: string
  email: string
}

export interface LoginEntry {
  email: FormControl<Nullable<string>>
  password: FormControl<Nullable<string>>
}

export interface Token {
  access_token: string
  expires_in: string
  token_type: string
}

