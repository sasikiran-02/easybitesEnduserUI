import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { DishComponent } from './dish/dish.component';
import { PaymentComponent } from './payament/payament.component';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'restaurants', component: RestaurantComponent },
  { path: 'restaurant/:id/dishes', component: DishComponent },
  { path: 'payment', component: PaymentComponent },
];
