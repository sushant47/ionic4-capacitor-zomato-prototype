import { Component } from '@angular/core';
import { BmiService } from '../bmi.service';
import { BMI } from '../models/bmi.model';
import { Router } from '@angular/router';
import { RestaurantList } from '../models/restaurant.model';
import { Plugins } from '@capacitor/core';
import { CollectionService } from '../services/collection.service';
import { ZomatoApiService } from '../services/zomato/zomato-api.service';

const { Geolocation } = Plugins;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public restaurantList: RestaurantList[] = [];
  private lats: any;
  private long: any;
  private cityId: number;

  constructor(private bmiService: BmiService,
    private router: Router,
    private zomatoApiService: ZomatoApiService,
    private collectionService: CollectionService) {
    this.getCurrentPosition();
  }
  async getCurrentPosition() {
    await Geolocation.getCurrentPosition().then((coordinates) => {
      console.log('Current', coordinates);
      this.getLocation(`${coordinates.coords.latitude}, ${coordinates.coords.longitude}`);
      this.lats = coordinates.coords.latitude;
      this.long = coordinates.coords.longitude;
    });
  }
  public getLocation(latlng: string) {
    this.zomatoApiService.getCity(latlng).subscribe((data: any) => {
      console.log(data.addresses[0].address.municipality);
      this.getCityDetails(data.addresses[0].address.municipality, this.lats, this.long, 10);
    });
  }
  private getAllCategories() {
    this.zomatoApiService.getAllCategories().subscribe((data: any) => {
      console.log(data);
      this.restaurantList = data.categories;
    });
  }
  private getCollections(city_id: number) {
    this.zomatoApiService.getCollections(city_id).subscribe((data: any) => {
      console.log(data.collections);
      this.restaurantList = data.collections;
    });
  }
  private getCityDetails(cityName: string, lat: string, lng: string, count: number) {
    this.zomatoApiService.getCityDetails(cityName, lat, lng, count).subscribe((data: any) => {
      this.cityId = (data.location_suggestions[0].id);
      this.getCollections(data.location_suggestions[0].id);
    });
  }
  public goToCollection(collection: any) {
    this.collectionService.setCollection(collection.collection.collection_id, this.cityId);
    this.router.navigate(['/home/collection']);
  }
}
