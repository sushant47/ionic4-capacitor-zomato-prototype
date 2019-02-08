import { Component, OnInit, Input } from '@angular/core';
import { ZomatoApiService } from 'src/app/services/zomato/zomato-api.service';
import { CollectionService } from 'src/app/services/collection.service';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { CollectionList } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {
  public collectionList: CollectionList[] = [];
  private lats: any;
  private long: any;
  private cityId: number;

  constructor(private zomatoApiService: ZomatoApiService,
    private collectionService: CollectionService,
    private router: Router,
    private locationService: LocationService) {
    this.getCurrentPosition();
  }

  ngOnInit() {
  }

  async getCurrentPosition() {
    await this.locationService.getCurrentPosition().then((coordinates) => {
      console.log('Current', coordinates);
      this.getLocation(`${coordinates.coords.latitude}, ${coordinates.coords.longitude}`);
      this.lats = coordinates.coords.latitude;
      this.long = coordinates.coords.longitude;
    }).catch(
      (err) => {
        console.error('Could not read current location', err);
      });
  }

  public goToCollection(collection: any) {
    this.collectionService.setCollection(collection.collection.collection_id, this.cityId);
    this.router.navigate(['/home/collection']);
  }

  public getCollections(city_id: number) {
    this.zomatoApiService.getCollections(city_id).subscribe((data: any) => {
      console.log(data.collections);
      this.collectionList = data.collections;
    });
  }

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
  private getCityDetails(cityName: string, lat: string, lng: string, count: number) {
    this.zomatoApiService.getCityDetails(cityName, lat, lng, count).subscribe((data: any) => {
      this.cityId = (data.location_suggestions[0].id);
      this.getCollections(data.location_suggestions[0].id);
    });
  }
}
