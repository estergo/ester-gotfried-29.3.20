import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../shared/local-storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: Array<string>;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.favorites = this.localStorageService.getList();
  }

}
