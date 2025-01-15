import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  slides = [
    {
      image: 'assets/images/slider1.jpg',
      title: 'New Summer Collection',
      subtitle: 'Discover the latest trends'
    },
    {
      image: 'assets/images/slider2.jpg',
      title: 'Exclusive Deals',
      subtitle: 'Up to 50% off on selected items'
    },
    {
      image: 'assets/images/slider3.jpg',
      title: 'Premium Quality',
      subtitle: 'Luxury fashion at its best'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToCategory(category: string) {
    this.router.navigate(['/products'], { queryParams: { category } });
  }
}