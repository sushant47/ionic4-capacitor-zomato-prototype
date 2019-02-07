export interface RestaurantTypes {
    collection_id: number;
    res_count: number;
    image_url: string;
    url: string;
    title: string;
    description: string;
    share_url: string;
}
export interface RestaurantList {
    collection: RestaurantTypes;
}
