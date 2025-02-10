import { Component, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-search-overlay',
  standalone: false,
  
  templateUrl: './search-overlay.component.html',
  styleUrl: './search-overlay.component.scss',
  animations: [
    trigger('overlayAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class SearchOverlayComponent  {
  @Output() close = new EventEmitter<void>();
  searchQuery = '';
  recentSearches = [
    'Summer Dresses',
    'Denim Jackets',
    'Floral Prints',
    'Casual Wear'
  ];

  onClose() {
    this.close.emit();
  }

  search() {
    // Implement search functionality
    console.log('Searching for:', this.searchQuery);
  }

  clearSearch() {
    this.searchQuery = '';
  }
}
