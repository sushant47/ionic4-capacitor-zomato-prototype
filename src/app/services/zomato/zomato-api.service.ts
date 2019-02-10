import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
const USER_KEY = ['user-key', '2992de5d38229d6ddc7514fda07d8430'];
const TOM_KEY = ['key', 'DmZD1FmH9GSUPVt3G86dkJgWDEboiA52'];
@Injectable({
  providedIn: 'root'
})
export class ZomatoApiService {
  constructor(private http: HttpClient) { }

  public getAllCategories() {
    let headers = new HttpHeaders();
    headers = headers.append(USER_KEY[0], USER_KEY[1]);
    return this.http.get('https://developers.zomato.com/api/v2.1/categories', { headers: headers });
  }

  // public getCity(latlng: string) {
  //   const API_KEY = 'AIzaSyAgMVnmY9PSdwvuHlTE_TehFAhNrAvm2iM';
  //   return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${API_KEY}`);
  // }
  public getCity(latlng: string) {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');
    return this.http.get(`https://api.tomtom.com/search/2/reverseGeocode/${latlng}.json?key=${TOM_KEY[1]}`, { headers: headers });
  }

  public getCollections(city_id: number) {
    let headers = new HttpHeaders();
    headers = headers.append(USER_KEY[0], USER_KEY[1]);
    return this.http.get(`https://developers.zomato.com/api/v2.1/collections?city_id=${city_id}`, { headers: headers });
  }

  public getCityDetails(cityName: string, lat: string, lng: string, count: number) {
    let headers = new HttpHeaders();
    headers = headers.append(USER_KEY[0], USER_KEY[1]);
    return this.http.get(`https://developers.zomato.com/api/v2.1/cities?q=${cityName}&lat=${lat}&lon=${lng}&count=${count}`
      , { headers: headers });
  }

  public searchRestaurants(entity_id: number, collection_id: string) {
    const entity_type = 'city';
    let headers = new HttpHeaders();
    headers = headers.append(USER_KEY[0], USER_KEY[1]);
    const url = `https://developers.zomato.com/api/v2.1/search?
    entity_id=${entity_id}&entity_type=${entity_type}&collection_id=${collection_id}`;
    return this.http.get(`${url}`, { headers: headers });
  }
  public getDetailedRestaurantInformation(res_id: number) {
    const url = `https://developers.zomato.com/api/v2.1/restaurant?`;
    let headers = new HttpHeaders();
    headers = headers.append(USER_KEY[0], USER_KEY[1]);
    return this.http.get(`${url}res_id=${res_id}`, { headers: headers });
  }
  public getNearByRestaurants(lat: string, lon: string) {
    const url = `https://developers.zomato.com/api/v2.1/geocode?`;
    let headers = new HttpHeaders();
    headers = headers.append(USER_KEY[0], USER_KEY[1]);
    return this.http.get(`${url}lat=${lat}&lon=${lon}`, { headers: headers });
  }
  public getRestaurantDetails(res_id: number) {
    let headers = new HttpHeaders();
    headers = headers.append(USER_KEY[0], USER_KEY[1]);
    return this.http.get(`https://developers.zomato.com/api/v2.1/dailymenu?res_id=${res_id}`, { headers: headers });
  }
}
