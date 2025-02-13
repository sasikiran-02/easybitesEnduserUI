import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DishService } from '../dish.service';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dish',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css'],
})
export class DishComponent implements OnInit {
  restaurantId!: number;
  dishes: any[] = [];
  cartItemCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.restaurantId = +params['id']; // Get restaurant ID from route
      this.loadDishes();
    });
  }

  loadDishes() {
    this.dishService
      .getDishesByRestaurant(this.restaurantId)
      .then((response) => {
        this.dishes = response.data;
      });
  }

  addToCart(dishId: number) {
    const userId = Number(localStorage.getItem('userId')); // Assuming user ID is stored in localStorage
    if (!userId) {
      alert('Please log in to add items to the cart!');
      return;
    }

    this.cartService.addToCart(userId, dishId, 1).then(() => {
      alert('Dish added to cart!');
      this.cartItemCount++; // Update cart count
    });
  }
}
