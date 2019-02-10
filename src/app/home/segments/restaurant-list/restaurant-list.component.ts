import { Component, OnInit, Input } from '@angular/core';
import { ZomatoApiService } from 'src/app/services/zomato/zomato-api.service';
import { LocationService } from 'src/app/services/location.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  public restaurantList: any = {};
  public loading: any;
  constructor(private zomatoApiService: ZomatoApiService,
    private locationService: LocationService,
    private loadingController: LoadingController,
    private router: Router) {
    this.getCurrentPosition();
  }

  ngOnInit() {
  }

  async getCurrentPosition() {
    this.presentLoading();
    await this.locationService.getCurrentPosition().then((coordinates) => {
      console.log('Current', coordinates);
      this.getNearByRestaurants(coordinates.coords.latitude, coordinates.coords.longitude);
    }).catch(
      (err) => {
        this.loading.dismiss();
        console.error('Could not read current location', err);
      });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      spinner: null,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await this.loading.present();
  }

  private getNearByRestaurants(lat: number, lon: number) {
    this.zomatoApiService.getNearByRestaurants(lat.toString(), lon.toString())
      .subscribe((data: any) => {
        console.log('loading ', this.loading);
        this.loading.dismiss();
        console.log(data);
        this.restaurantList = data;
      });
  }
  public goToRestaurant(restaurant: any) {
    console.log(restaurant);
    this.zomatoApiService.getRestaurantDetails(restaurant.restaurant.R.res_id).subscribe((data: any) => {
      console.log(data);
    },
      error => {
        this.router.navigate(['/home/restaurant']);
      })
  }
}
