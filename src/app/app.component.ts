import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from './common/model/user';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
    private authService = inject(AuthService);
    user?: User | null;

    constructor() {
        this.authService.user.subscribe(x => this.user = x);
    }

}
