import { Component, OnInit, Input } from '@angular/core';
import { ZomatoApiService } from 'src/app/services/zomato/zomato-api.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  public restaurantList: any = {};
  constructor(private zomatoApiService: ZomatoApiService,
    private locationService: LocationService) {
    this.getCurrentPosition();
  }

  ngOnInit() {
  }

  async getCurrentPosition() {
    await this.locationService.getCurrentPosition().then((coordinates) => {
      console.log('Current', coordinates);
      this.getNearByRestaurants(coordinates.coords.latitude, coordinates.coords.longitude);
    }).catch(
      (err) => {
        console.error('Could not read current location', err);
      });
  }

  private getNearByRestaurants(lat: number, lon: number) {
    this.zomatoApiService.getNearByRestaurants(lat.toString(), lon.toString())
      .subscribe((data: any) => {
        console.log(data);
        this.restaurantList = data;
      });
  }
  public goToRestaurant(restaurant: any) {

  }
}
