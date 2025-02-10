import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastr = inject(ToastrService);

  constructor() { }

  showError(message: string = 'Not added correctly!', title: string = 'Set Symref') {
    this.toastr.error(message, title, {
      positionClass: 'toast-bottom-right',
    });
  }

  showSuccess(title: string = 'Set Symref') {
    this.toastr.success('Success!', title, {
      positionClass: 'toast-bottom-right',
    });
  }
}