/* import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClrFormsModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule } from '@clr/angular';

import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import {NgIf} from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ClrInputModule, ClrFormsModule, ClrLoadingModule, ClrLoadingButtonModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  loading = false;
  submitted = false;
  error = '';

  constructor() {
    if (this.authService.userValue) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.error = 'Invalid data';
      return;
    }
    this.error = '';
    this.loading = true;
    if (this.form.value.email === undefined || this.form.value.email === null) {
      this.error = 'email required';
      this.loading = false;
      return;
    }
    if (this.form.value.password === undefined || this.form.value.password === null) {
      this.error = 'password required';
      this.loading = false;
      return;
    }
    const email = this.form.value.email?.trim();
    const password = this.form.value.password?.trim();
    this.authService.login(email, password)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/opportunity';
          this.router.navigate([returnUrl]);
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      })
  }
}
 */