import { Component } from '@angular/core';
import { BmiService } from '../bmi.service';
import { Router } from '@angular/router';
import { CollectionList } from '../models/restaurant.model';
import { Plugins } from '@capacitor/core';
import { CollectionService } from '../services/collection.service';
import { ZomatoApiService } from '../services/zomato/zomato-api.service';
import { LocationService } from '../services/location.service';

const { Geolocation } = Plugins;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public collectionList: CollectionList[] = [];
  public selectedTab: String = 'restaurants';
  private lats: any;
  private long: any;
  private cityId: number;

  constructor(private bmiService: BmiService,
    private router: Router,
    private zomatoApiService: ZomatoApiService,
    private collectionService: CollectionService,
    private locationService: LocationService) {
    // this.getCurrentPosition('collections');
    this.getCurrentSegment('restaurants');
  }
  public getCurrentSegment(segmentName: string) {
    this.selectedTab = segmentName;
  }
  // async getCurrentPosition(segmentName: string) {
  //   this.selectedTab = segmentName;
  //   await this.locationService.getCurrentPosition().then((coordinates) => {
  //     console.log('Current', coordinates);
  //     segmentName === 'collections' ?
  //       this.getLocation(`${coordinates.coords.latitude}, ${coordinates.coords.longitude}`)
  //       : this.getNearByRestaurants(this.lats, this.long);
  //     this.lats = coordinates.coords.latitude;
  //     this.long = coordinates.coords.longitude;
  //   }).catch(
  //     (err) => {
  //       console.error('Could not read current location', err);
  //     });
  // }
  private getNearByRestaurants(lat: number, lon: number) {
    this.zomatoApiService.getNearByRestaurants(lat.toString(), lon.toString())
      .subscribe((data: any) => {
        console.log(data);
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
      this.collectionList = data.categories;
    });
  }
  private getCollections(city_id: number) {
    this.zomatoApiService.getCollections(city_id).subscribe((data: any) => {
      console.log(data.collections);
      this.collectionList = data.collections;
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
