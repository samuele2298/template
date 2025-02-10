import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClrComboboxModule, ClrInputModule } from '@clr/angular';
import { NgIf } from '@angular/common';
import { Exchange } from '../../common/model/exchange';
import { emptyObjectValidator } from '../../common/validators/empty-object-validator';
import { ApiService } from '../../api.service';
import { MessageService } from '../../message.service';
import { Symref } from '../../common/model/symref';
import { Symbol } from '../../common/model/symbol';
import { ToastService } from '../../toast.service';

@Component({
    selector: 'app-symref-form',
    templateUrl: './symref-form.component.html',
    styleUrls: ['./symref-form.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule, ClrComboboxModule, ClrInputModule, RouterLink]
})
export class SymrefFormComponent implements OnInit {
  formSymref = new FormGroup({
    exch: new FormControl({} as Exchange,[Validators.required, emptyObjectValidator()]),
    name: new FormControl('', [Validators.required]),
    sym_number: new FormControl({} as Symbol ,[Validators.required, emptyObjectValidator()]),
    balname: new FormControl('', [Validators.required])
  });
  fetchingData: boolean = false;
  id: string | undefined;
  isAddMode: boolean = false;
  exchanges: Exchange[] = [];
  symbols: Symbol[] = [];
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(ApiService);
  private messageService = inject(MessageService);
  private toast = inject(ToastService);

  constructor(
  ){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] || null;
    this.isAddMode = !this.id;
    this.formSymref.disable();

    if (!this.isAddMode && this.id) {
      this.fetchingData = true;
      this.apiService.getSymref(this.id).subscribe(symref => {
        this.apiService.getExchangeList().subscribe(exchanges => {
          this.exchanges = exchanges.sort((a, b) => {
            const valA = a.Kexch_name.toUpperCase();
            const valB = b.Kexch_name.toUpperCase();
            if (valA < valB) {
              return -1;
            }
            if (valA > valB) {
              return 1;
            }
            return 0;
          });
          this.formSymref.controls.exch.setValue(exchanges.find(o => o.id === symref.Ksymref_Kexch_id) || {} as Exchange);
          this.formSymref.controls.name.setValue(symref.Ksymref_name);
          this.formSymref.controls.balname.setValue(symref.Ksymref_balname);

          this.apiService.getSymbolList().subscribe(symbols => {
            this.formSymref.controls.sym_number.setValue(symbols.find(o => o.Ksym_number === symref.Ksymref_Ksym_number) || {} as Symbol);
            this.symbols = symbols.sort((a, b) => {
              const valA = a.Ksym_description.toUpperCase();
              const valB = b.Ksym_description.toUpperCase();
              if (valA < valB) {
                return -1;
              }
              if (valA > valB) {
                return 1;
              }
              return 0;
            });
            // this.sym_control = true;
            this.formSymref.enable();
            this.fetchingData = false;
          });
        });    
      });
    }
    else {
      this.apiService.getExchangeList().subscribe(exchanges => {
        this.exchanges = exchanges.sort((a, b) => {
          const valA = a.Kexch_name.toUpperCase();
          const valB = b.Kexch_name.toUpperCase();
          if (valA < valB) {
            return -1;
          }
          if (valA > valB) {
            return 1;
          }
          this.fetchingData = false;
          return 0;
        });
        this.apiService.getSymbolList().subscribe(symbols => {
          this.symbols = symbols.sort((a, b) => {
            const valA = a.Ksym_description.toUpperCase();
            const valB = b.Ksym_description.toUpperCase();
            if (valA < valB) {
              return -1;
            }
            if (valA > valB) {
              return 1;
            }
            return 0;
          });
          // this.sym_control = true;
          this.formSymref.enable();
          this.fetchingData = false;
        });
      });
    }
  }

  onSubmit() {
    const symref = {
      Ksymref_name: this.formSymref.value.name,
      Ksymref_Kexch_id: this.formSymref.value.exch?.id,
      Ksymref_Ksym_number: this.formSymref.value.sym_number?.Ksym_number,
      Ksymref_balname: this.formSymref.value.balname
    } as Symref;

    if (!this.isAddMode && this.id !== null && this.id !== undefined) {
      symref.id = parseInt(this.id);
    }
    
    this.apiService.setSymref(symref).subscribe(response => {
      if (response.success) {
        this.toast.showSuccess('Set Symref');
        this.messageService.add({message:'Successfully Inserted/Updated', type: 'success'});
        if (this.isAddMode) {
          this.router.navigate(['../'], {relativeTo: this.route});
        }
        else {
          this.router.navigate(['../../'], {relativeTo: this.route});
        }
      }
      else {
        this.toast.showError(response.error, 'Set Symref');
        this.messageService.add({message:response.error, type: 'danger'});
      }
    });
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
