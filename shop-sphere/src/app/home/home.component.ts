import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  slides = [
    {
      image: 'slider-1.jpg',
      title: 'New Summer Collection',
      subtitle: 'Discover the latest trends'
    },
    {
      image: 'slider-2.jpg',
      title: 'Exclusive Deals',
      subtitle: 'Up to 50% off on selected items'
    },
    {
      image: 'slider-3.jpg',
      title: 'Premium Quality',
      subtitle: 'Luxury fashion at its best'
    }
  ];
  partners = [
    {
      name: 'biba',
      logo: 'biba.png'
    },
    {
      name: 'Calvin-Klein-logo',
      logo: 'Calvin-Klein-logo.png'
    },
    {
      name: 'Columbia-logo',
      logo: 'Columbia-logo.jpg'
    },
    {
      name: 'US',
      logo: 'US.png'
    },
    {
      name: 'rolex 5',
      logo: 'rolex.png'
    },
    {
      name: 'iPhone 6',
      logo: 'iPhone.png'
    }
  ];
  activeTab = 'all';
  products = [
    {
      id: 1,
      name: 'Organic Fresh Vegetables Pack',
      category: 'grocery',
      image: 'organic.jpg',
      currentPrice: 24.99,
      originalPrice: 49.99,
      discount: 50,
      reviews: 128,
    },
    {
      id: 2,
      name: 'Premium Rice (5kg)',
      category: 'grocery',
      image: 'Premium-Rice.jpg',
      currentPrice: 19.99,
      originalPrice: 39.99,
      discount: 50,
      reviews: 95,
    },
    {
      id: 3,
      name: 'Household Cleaning Set',
      category: 'daily',
      image: 'Household.jpg',
      currentPrice: 29.99,
      originalPrice: 49.99,
      discount: 40,
      reviews: 156,
    },
    {
      id: 4,
      name: 'Personal Care Bundle',
      category: 'daily',
      image: 'Personal-Care.jpg',
      currentPrice: 34.99,
      originalPrice: 69.99,
      discount: 50,
      reviews: 142,
    },
    {
      id: 5,
      name: 'Running Shoes',
      category: 'shoes',
      image: 'Running-Shoes.jpg',
      currentPrice: 59.99,
      originalPrice: 119.99,
      discount: 50,
      reviews: 234,
    },
    {
      id: 6,
      name: 'Casual Sneakers',
      category: 'shoes',
      image: 'Casual-Sneakers.jpg',
      currentPrice: 44.99,
      originalPrice: 89.99,
      discount: 50,
      reviews: 187,
    }
  ];
  get filteredProducts() {
    return this.activeTab === 'all' 
      ? this.products 
      : this.products.filter(p => p.category === this.activeTab);
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const mainSwiperEl: any = document.querySelector('.hero-slider');
    if (mainSwiperEl) {
      const mainSwiperParams = {
        slidesPerView: 1,
        navigation: true,
        pagination: {
          clickable: true
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        }
      };

      Object.assign(mainSwiperEl, mainSwiperParams);
      mainSwiperEl.initialize();
    }

    // Initialize partners slider
    const partnersSwiperEl: any = document.querySelector('.partners-slider');
    if (partnersSwiperEl) {
      const partnersSwiperParams = {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30
          }
        }
      };

      Object.assign(partnersSwiperEl, partnersSwiperParams);
      partnersSwiperEl.initialize();
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  navigateToCategory(category: string) {
    this.router.navigate(['/products'], { queryParams: { category } });
  }
}