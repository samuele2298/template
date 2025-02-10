/* import { Component, inject } from '@angular/core';
import { Validators, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Exchange } from '../../../common/model/exchange';
import { Pair } from '../../../common/model/pair';
import { SymrefPair } from '../../../common/model/symrefpair';
import { emptyObjectValidator } from '../../../common/validators/empty-object-validator';
import { MessageService } from '../../../message.service';
import { ClrCheckboxModule, ClrComboboxModule, ClrInputModule, ClrModalModule, ClrSelectModule, ClrTextareaModule } from '@clr/angular';
import { NgIf } from '@angular/common';
import { PairService } from '../pair.service';
import { ApiService } from '../../../api.service';

@Component({
    selector: 'app-pair-form',
    templateUrl: './pair-form.component.html',
    styleUrls: ['./pair-form.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, ClrComboboxModule, ClrInputModule, ClrSelectModule, NgIf, ClrCheckboxModule, ClrTextareaModule, ClrModalModule]
})
export class PairFormComponent {
  pairForm = new FormGroup({
    Kpair_Kexch: new FormControl({} as Exchange,[Validators.required, emptyObjectValidator()]),
    Kpair_sym1: new FormControl({} as SymrefPair, [Validators.required, emptyObjectValidator()]),
    Kpair_sym2: new FormControl({} as SymrefPair, [Validators.required, emptyObjectValidator()]),
    Kpair_status: new FormControl(1),
    Kpair_fee: new FormControl(),
    Kpair_statustrade: new FormControl(1),
    Kpair_qdec: new FormControl(),
    Kpair_pdec: new FormControl(),
    Kpair_watch: new FormControl(),
    Kpair_notes: new FormControl()
  });

  symrefpairs: SymrefPair[] = [];
  exchanges: Exchange[] = [];
  //form_exch: Exchange;
  id: string | undefined;
  isAddMode: boolean = false;
  fetchingData: boolean = false;
  confirmModalWithdraw = false;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pairService = inject(PairService);
  private apiService = inject(ApiService);
  private messageService = inject(MessageService);

  constructor(
  ){ }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] || null;
    this.isAddMode = !this.id;
    this.pairForm.disable();

    //this.apiService.getExchangeList().subscribe(exchanges => (this.exchanges = exchanges));
    //this.apiService.getSymRefList().subscribe(symbols => (this.symbols = symbols));

    if (!this.isAddMode && this.id) {
      this.fetchingData = true;
      this.pairService.getPair(this.id).subscribe(pair => {
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
          this.pairForm.controls.Kpair_Kexch.setValue(exchanges.find(o => o.id === pair.Kpair_Kexch_id) || {} as Exchange);
          // this.form_exchid = exchanges.find(o => o.id === pair.Kpair_Kexch_id) || {} as Exchange;
          this.apiService.getSymRefListByExch(pair.Kpair_Kexch_id.toString()).subscribe(symrefpairs => {
            this.pairForm.controls.Kpair_sym1.setValue(symrefpairs.find(o => o.Ksym_number === pair.Kpair_sym1) || {} as SymrefPair);
            this.pairForm.controls.Kpair_sym2.setValue(symrefpairs.find(o => o.Ksym_number === pair.Kpair_sym2) || {} as SymrefPair);
            this.pairForm.controls.Kpair_status.setValue(pair.Kpair_status);
            this.pairForm.controls.Kpair_fee.setValue(pair.Kpair_fee?.toString() || null);
            this.pairForm.controls.Kpair_statustrade.setValue(pair.Kpair_statustrade);
            this.pairForm.controls.Kpair_qdec.setValue(pair.Kpair_qdec);
            this.pairForm.controls.Kpair_pdec.setValue(pair.Kpair_pdec);
            this.pairForm.controls.Kpair_watch.setValue(pair.Kpair_watch);
            this.pairForm.controls.Kpair_notes.setValue(pair.Kpair_notes);
            // this.form_sym1 = symrefs.find(o => o.Ksymref_Ksym_number === pair.Kpair_sym1) || {} as Symref;
            // this.form_sym2 = symrefs.find(o => o.Ksymref_Ksym_number === pair.Kpair_sym2) || {} as Symref;
            this.symrefpairs = symrefpairs.sort((a, b) => {
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
            this.pairForm.enable();
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
          return 0;
        });
        this.pairForm.enable();
      });
    }
  }

  onChangeExchange(selection: any) {
    if (!selection.model) {
      return;
    }
    this.apiService.getSymRefListByExch(selection.model.id.toString()).subscribe(symrefpairs => {
      this.symrefpairs = symrefpairs.sort((a, b) => {
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
      this.pairForm.controls.Kpair_sym1.setValue(null);
      this.pairForm.controls.Kpair_sym2.setValue(null);
    });
  }

  onSubmit() {
    const pair = {
      Kpair_Kexch_id: this.pairForm.value.Kpair_Kexch?.id,
      Kpair_sym1: this.pairForm.value.Kpair_sym1?.Ksym_number,
      Kpair_sym2: this.pairForm.value.Kpair_sym2?.Ksym_number,
      Kpair_fee: this.pairForm.value.Kpair_fee,
      Kpair_status: this.pairForm.value.Kpair_status,
      Kpair_statustrade: this.pairForm.value.Kpair_statustrade,
      Kpair_qdec: this.pairForm.value.Kpair_qdec,
      Kpair_pdec: this.pairForm.value.Kpair_pdec,
      Kpair_watch: this.pairForm.value.Kpair_watch,
      Kpair_notes: this.pairForm.value.Kpair_notes
    } as Pair;

    if (!this.isAddMode && this.id !== null && this.id !== undefined) {
      pair.id = parseInt(this.id);
    }
    
    this.pairService.setPair(pair).subscribe(response => {
      if (response.success) {
        this.messageService.add({message:'Successfully Inserted/Updated', type: 'success'});
      }
      else {
        this.messageService.add({message:response.error, type: 'danger'});
      }
      if (this.isAddMode) {
        this.router.navigate(['../'], {relativeTo: this.route});
      }
      else {
        this.router.navigate(['../../'], {relativeTo: this.route});
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

  onDelete() {
    this.confirmModalWithdraw = true;
  }

  executeAction() {
    if (!this.isAddMode && this.id) {
      this.pairService.delPair(this.id).subscribe(response => {
        if (response.success) {
          this.messageService.add({message:'Pair deleted', type: 'success'});
        }
        else {
          this.messageService.add({message:response.error, type: 'danger'});
        }
        this.router.navigate(['../../'], {relativeTo: this.route});
      });
    }
    this.confirmModalWithdraw = false;
  }
}
 */