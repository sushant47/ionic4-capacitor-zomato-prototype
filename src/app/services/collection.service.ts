import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private collectionData: any = {};
  constructor() { }

  public setCollection(collection_id: string, cityId: number) {
    this.collectionData['collection_id'] = collection_id;
    this.collectionData['cityId'] = cityId;
  }
  public getCollection() {
    return this.collectionData;
  }
}
