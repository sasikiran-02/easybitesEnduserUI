import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RestaurantService } from '../restaurant.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css',
})
export class RestaurantComponent implements OnInit {
  restaurants: any[] = [];
  filteredRestaurants: any[] = [];
  searchQuery: string = '';
  https: any;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['search'] || '';
      this.loadRestaurants();
    });
  }

  loadRestaurants() {
    this.restaurantService.getAllRestaurants().then((response) => {
      this.restaurants = response.data;
      this.applySearchFilter();
    });
  }

  applySearchFilter() {
    if (this.searchQuery.trim()) {
      this.filteredRestaurants = this.restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredRestaurants = [...this.restaurants];
    }
  }
}
