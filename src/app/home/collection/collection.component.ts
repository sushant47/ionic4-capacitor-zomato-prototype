import { Component, OnInit } from '@angular/core';
import { CollectionService } from 'src/app/services/collection.service';
import { ZomatoApiService } from 'src/app/services/zomato/zomato-api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  public collection: any;
  public collectionList: any[] = [];
  constructor(private collectionService: CollectionService,
    private zomatoApiService: ZomatoApiService,
    private router: Router) { }

  ngOnInit() {
    this.openCollection();
  }
  public openCollection() {
    this.collection = this.collectionService.getCollection();
    this.zomatoApiService.searchRestaurants(this.collection.cityId, this.collection.collection_id).subscribe((data: any) => {
      console.log(data.restaurants);
      this.collectionList = data.restaurants;
    });
  }
  public getRestaurantDetails(collection: any) {
    console.log(collection);
  }
  public goBack() {
    this.router.navigate(['/home']);
  }
}
