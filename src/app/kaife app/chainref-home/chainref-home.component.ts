import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-chainref-home',
    templateUrl: './chainref-home.component.html',
    styleUrls: ['./chainref-home.component.css'],
    standalone: true,
    imports: [RouterOutlet]
})
export class ChainrefHomeComponent {
}