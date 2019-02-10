import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  public async getCurrentPosition() {
    return await Geolocation.getCurrentPosition({ enableHighAccuracy: true, maximumAge: 0, timeout: 60000 }).then((coordinates) => {
      console.log('Current', coordinates);
      return coordinates;
    }).catch(
      (err) => {
        console.error('Could not read current location', err);
        return err;
      });
  }
}
