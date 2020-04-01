import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  favoritesKey = 'weatherFavoritesCities';

  getList() {
    const storedValue = localStorage.getItem(this.favoritesKey);
    return storedValue ? JSON.parse(storedValue) : [];
  }

  setList(favoritesArr) {
    localStorage.setItem(this.favoritesKey, JSON.stringify(favoritesArr));
  }

}


