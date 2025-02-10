import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-chain-home',
    templateUrl: './chain-home.component.html',
    styleUrls: ['./chain-home.component.css'],
    standalone: true,
    imports: [RouterOutlet]
})
export class ChainHomeComponent {
}