import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { ClrModalModule, ClrInputModule, ClrAlertModule, ClrLoadingState } from '@clr/angular';
import { Search } from '../../common/model/search';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from '../../route.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    standalone: true,
    imports: [ClrModalModule, FormsModule, ReactiveFormsModule, ClrInputModule, NgIf, ClrAlertModule, NgFor]
})
export class SearchComponent implements OnInit {
  private routeService = inject(RouteService);
  private apiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loadingState: ClrLoadingState = ClrLoadingState.DEFAULT;

  search: Search[] = [];
  filteredSearch: Search[] = [];
  search_query: string | null = '';

  constructor() {}

  ngOnInit(): void {
    // SE NIENTE PARAMETRO é UN PROBLEMA
    this.route.paramMap.subscribe(params => {
        this.search_query = params.get('filter');
        if (!this.search_query) {
            console.error("Search_query non valida o mancante.");
            this.loadingState = ClrLoadingState.ERROR;
            this.router.navigate(['/404']); 
        } else {
          this.getSearch();
        }
    });
  }

  getSearch(): void {
    this.loadingState = ClrLoadingState.LOADING;
    this.apiService.getSearch().subscribe(search => {
      this.search = search;
      this.filteredSearch = search;
      this.filterResult();
      console.log('Number of find results '  +this.filteredSearch.length);
      this.loadingState = ClrLoadingState.SUCCESS;
    });
  }

  filterResult(): void {
    if (!this.search_query || this.search_query.trim().length === 0) {
      // If the search query is empty, return all items or do nothing
      this.filteredSearch = [...this.search]; // Clone the array to preserve the original
    } else {
      this.filteredSearch = this.search.filter(item => 
        item.name.toLowerCase().includes(this.search_query!.toLowerCase())
      );
    }
  }

  navigateTo(path: string) {
    this.routeService.saveRoute(`/${path}`);
    this.router.navigate([`/${path}`]);
  }

  goBack(){
    this.router.navigate(['/dashboard']); 
  }

}
