import { Component, OnInit, inject } from '@angular/core';
import { ClrDatagridModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState, ClrComboboxModule, ClarityModule} from '@clr/angular';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'app-marketing',
    standalone: true,
    imports: [ClrDatagridModule, ClrLoadingModule, ClrLoadingButtonModule, FormsModule, DatePipe, ClrInputModule, ClrComboboxModule, ClarityModule],
    templateUrl: './marketing.component.html',
    styleUrl: './marketing.component.css',

})
export class MarketingComponent implements OnInit {
    private apiService = inject(ApiService);
    private authService = inject(AuthService);;

    constructor() {
    }

    ngOnInit(): void {
    }

    /* signIn() {
        this.authService.login();
    } */

}
