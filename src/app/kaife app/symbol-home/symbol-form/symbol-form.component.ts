import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Symbol } from '../../common/model/symbol';
import { MessageService } from '../../message.service';
import { ClrInputModule, ClrTextareaModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ToastService } from '../../toast.service';

@Component({
    selector: 'app-symbol-form',
    templateUrl: './symbol-form.component.html',
    styleUrls: ['./symbol-form.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule, ClrInputModule, ClrTextareaModule]
})
export class SymbolFormComponent implements OnInit {
  symbol: Symbol = {} as Symbol;
  id: string | undefined;
  isAddMode: boolean = false;
  fetchingData: boolean = false;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(ApiService);
  private messageService = inject(MessageService);
  private toast = inject(ToastService);

  constructor(
  ){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    //Default values 0 for this fields
    this.symbol.Ksym_qtybalancer = 0; 
    this.symbol.Ksym_wdautoinprogress = 0; 

    this.fetchingData = true;
    if (!this.isAddMode && this.id) {
      this.apiService.getSymbol(this.id).subscribe(symbol => {
        this.symbol = symbol;
        this.fetchingData = false;
      });
    }
    else {
      this.apiService.getSymbolMaxNumber().subscribe(data => {
        const maxnumber = (parseInt(data.maxnumber) + 1).toString().padStart(4, '0');
        this.symbol.Ksym_number = maxnumber;
        this.fetchingData = false;
      });
    }
  }

  onSubmit() {
    this.apiService.setSymbol(this.symbol).subscribe(response => {
      if (response.success) {
        this.toast.showSuccess('Set Sym');
        this.messageService.add({message:'Successfully Inserted/Updated', type: 'success'});
        if (this.isAddMode) {
          this.router.navigate(['../'], {relativeTo: this.route});
        }
        else {
          this.router.navigate(['../../'], {relativeTo: this.route});
        }
      }
      else {
        this.toast.showError(response.error, 'Set Sym');
        this.messageService.add({message:response.error, type: 'danger'});
      }
    })
  }

  onCancel() {
    if (this.isAddMode) {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
    else {
      this.router.navigate(['../../'], {relativeTo: this.route});
    }
  }
}
