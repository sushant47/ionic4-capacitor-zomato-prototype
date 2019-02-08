import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { CollectionComponent } from './collection/collection.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { CollectionListComponent } from './segments/collection-list/collection-list.component';
import { RestaurantListComponent } from './segments/restaurant-list/restaurant-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      },
      {
        path: 'collection',
        component: CollectionComponent
      }
    ])
  ],
  declarations: [HomePage, CollectionComponent, RestaurantComponent, CollectionListComponent, RestaurantListComponent]
})
export class HomePageModule { }
