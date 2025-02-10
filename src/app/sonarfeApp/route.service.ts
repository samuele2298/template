import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  saveRoute(route: string) {
    localStorage.setItem('screenState', JSON.stringify(route));
  }

  loadRoute() {
    return JSON.parse(localStorage.getItem('screenState') || 'null');
  }
}
