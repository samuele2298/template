import { Component, OnInit, inject } from '@angular/core';
import { ClrDatagridModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState, ClrComboboxModule, ClarityModule} from '@clr/angular';
import { ApiService } from '../../api.service';
import { Category, getSafeCategoryList } from '../../common/model/category';
import { FormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { formatNumber } from '../../utils';  // Import the function
import { AuthService } from '../../auth.service';
import { RouteService } from '../../route.service';

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [ClrDatagridModule, ClrLoadingModule, ClrLoadingButtonModule, FormsModule, DatePipe, ClrInputModule, ClrComboboxModule, ClarityModule, CommonModule],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
    private apiService = inject(ApiService);
    private authService = inject(AuthService);
    private router = inject(Router);
    private routeService = inject(RouteService);

    formatNumber: (value: number) => string;  // Declare the formatNumber function as a property of the class

    categories: Category[] = [];
    publics: Category[] = [];
    privates: Category[] = [];
    loadingState: ClrLoadingState = ClrLoadingState.DEFAULT;

    isCreateOpen: boolean = false; 
    categoryName: string = ''; 

    selectedMetric: number = 0; 

    constructor() {
        this.formatNumber = formatNumber;  
    }

    ngOnInit(): void {
        this.getCategories();
    }

    getCategories() {
        this.loadingState = ClrLoadingState.LOADING;   
        this.apiService.getCategoryList().subscribe(categories => {
            this.categories = getSafeCategoryList(categories);
            this.publics =  this.categories.filter(cat => cat.public === true)
            this.privates =  this.categories.filter(cat => cat.public !== true)
            this.loadingState = ClrLoadingState.SUCCESS;
        }); 
    }

    navigateToCategory(category: string) {
        this.routeService.saveRoute(`/category/${category}`);
        this.router.navigate([`/category/${category}`]);
    }

    openCreateModal() {
        this.categoryName = ''; // Clear any previous input
        this.isCreateOpen = true; // Open the modal
    }

    addCategory(name: string) {
        this.loadingState = ClrLoadingState.LOADING;   
        this.apiService.addCategory(name).subscribe(Response => {
            this.isCreateOpen = false; 
            this.getCategories();
            this.loadingState = ClrLoadingState.SUCCESS;
        }); 
    }

    isPro(){
        return this.authService.isPro();
    }

    giveMetric(cat: Category, n: number): string {
        switch (n) {
            case 1:
                return this.selectedMetric === 0 ? cat.f!.toFixed(2)  : this.selectedMetric === 1 ? cat.f_volu!.toFixed(2) : cat.f_vol!.toFixed(2) 
            case 2:
                return this.selectedMetric === 0 ? cat.s!.toFixed(2)  : this.selectedMetric === 1 ? cat.s_volu!.toFixed(2)  : cat.s_vol!.toFixed(2) 
            case 3:
                return this.selectedMetric === 0 ? cat.t!.toFixed(2)  : this.selectedMetric === 1 ? cat.t_volu!.toFixed(2)  : cat.t_vol!.toFixed(2) 
            case 4:
                return this.selectedMetric === 0 ? cat.d!.toFixed(2)  : this.selectedMetric === 1 ? cat.d_volu!.toFixed(2) : cat.d_vol!.toFixed(2) 
            case 5:
                return this.selectedMetric === 0 ? cat.w!.toFixed(2)  : this.selectedMetric === 1 ? cat.w_volu!.toFixed(2)  : cat.w_vol!.toFixed(2) 
            default:
                return this.selectedMetric === 0 ? cat.m!.toFixed(2)  : this.selectedMetric === 1 ? cat.m_volu!.toFixed(2)  : cat.m_vol!.toFixed(2) 
        } 
    }

    number(value: string): number {
        return Number(value);
    }

    isLoading() {
        return this.loadingState != ClrLoadingState.SUCCESS;
    }
}
