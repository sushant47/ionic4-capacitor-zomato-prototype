import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  public async getCurrentPosition() {
    return await Geolocation.getCurrentPosition().then((coordinates) => {
      console.log('Current', coordinates);
      return coordinates;
      // segmentName === 'collections' ?
      //   this.getLocation(`${coordinates.coords.latitude}, ${coordinates.coords.longitude}`)
      //   : this.getNearByRestaurants(this.lats, this.long);
      // this.lats = coordinates.coords.latitude;
      // this.long = coordinates.coords.longitude;
    }).catch(
      (err) => {
        console.error('Could not read current location', err);
        return err;
      });
  }
}
