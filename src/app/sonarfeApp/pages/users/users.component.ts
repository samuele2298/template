import { Component, OnInit, inject } from '@angular/core';
import { ClrDatagridModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState, ClrComboboxModule, ClarityModule} from '@clr/angular';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { defaultUser, getSafeUserList, User } from '../../common/model/user';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [ClrDatagridModule, ClrLoadingModule, ClrLoadingButtonModule, FormsModule, DatePipe, ClrInputModule, ClrComboboxModule, ClarityModule, CommonModule],
    templateUrl: './users.component.html',
    styleUrl: './users.component.css'
})
export class UsersComponents implements OnInit {
    private apiService = inject(ApiService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private authService = inject(AuthService);

    users: User[] = [];
    user: User = defaultUser;
    email: string = ''; 
    plan: string = ''; 

    loadingState: ClrLoadingState = ClrLoadingState.DEFAULT;
    
    isAddOpen: boolean = false;
    isDeleteOpen: boolean = false;
    isPlanOpen: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers() {
        this.loadingState = ClrLoadingState.LOADING;   
        this.apiService.getUsers().subscribe(result => {
            this.users = getSafeUserList(result);
            this.loadingState = ClrLoadingState.SUCCESS;
        }); 
    }

 
    delUser(){
        this.loadingState = ClrLoadingState.LOADING;   
        this.apiService.delUser(this.user!.id!).subscribe(result => {
            this.isDeleteOpen = false;
            this.users = [];
            this.getUsers();            
            this.user = defaultUser;
            this.loadingState = ClrLoadingState.SUCCESS;
        }); 
    }

 
    addUser() {
        this.loadingState = ClrLoadingState.LOADING;  
        this.apiService.addUser(this.email).subscribe(result => {
            this.isAddOpen = false;
            this.users = [];
            this.getUsers();
            this.loadingState = ClrLoadingState.SUCCESS;
        }); 
    }

     
    changePlan() {
        this.loadingState = ClrLoadingState.LOADING;  
        this.apiService.changePlan(this.user!.id!, this.plan).subscribe(result => {
            this.isPlanOpen = false;
            this.users = [];
            this.getUsers();
            this.plan = ''; 
            this.loadingState = ClrLoadingState.SUCCESS;
        }); 
    }


 
    isLoading() {
        return this.loadingState != ClrLoadingState.SUCCESS;
    }

    isAdmin(){
        return this.authService.isAdmin();
    }

    openDelete(user: User){
        this.user = user;
        this.plan = user.plan!; 
        this.isDeleteOpen = !this.isDeleteOpen;
    }

    openPlan(user: User){
        this.user = user;
        this.plan = user.plan!; 
        this.isPlanOpen = !this.isPlanOpen;
    }
  
}
