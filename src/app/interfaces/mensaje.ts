import { Position } from "@capacitor/geolocation";

export interface Mensaje {
    text: String | null;
    user: String | null;
    date: String;
    location: String | null;
  }