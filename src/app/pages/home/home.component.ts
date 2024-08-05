import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentItem = 0;
  items!: HTMLElement[];

  ngOnInit() {
    this.items = Array.from(document.querySelectorAll('.carousel-item'));
    this.showItem(this.currentItem);
  }

  showItem(index: number) {
    this.items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }

  prevSlide() {
    this.currentItem = (this.currentItem - 1 + this.items.length) % this.items.length;
    this.showItem(this.currentItem);
  }

  nextSlide() {
    this.currentItem = (this.currentItem + 1) % this.items.length;
    this.showItem(this.currentItem);
  }

  goToSlide(index: number) {
    this.currentItem = index;
    this.showItem(this.currentItem);
  }
}
