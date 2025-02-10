import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClrComboboxModule, ClrInputModule } from '@clr/angular';
import { NgIf } from '@angular/common';
import { Exchange } from '../../common/model/exchange';
import { emptyObjectValidator } from '../../common/validators/empty-object-validator';
import { ApiService } from '../../api.service';
import { MessageService } from '../../message.service';
import { Chain } from '../../common/model/chain';
import { Chainref } from '../../common/model/chainref';
import { ToastService } from '../../toast.service';

@Component({
    selector: 'app-chainref-form',
    templateUrl: './chainref-form.component.html',
    styleUrls: ['./chainref-form.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule, ClrComboboxModule, ClrInputModule, RouterLink]
})
export class ChainrefFormComponent implements OnInit {
  formChainref = new FormGroup({
    exch: new FormControl({} as Exchange,[Validators.required, emptyObjectValidator()]),
    name: new FormControl('', [Validators.required]),
    chain: new FormControl({} as Chain ,[Validators.required, emptyObjectValidator()]),
  });
  fetchingData: boolean = false;
  id: string | undefined;
  isAddMode: boolean = false;
  exchanges: Exchange[] = [];
  chains: Chain[] = [];
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
    this.formChainref.disable();
    if (!this.isAddMode && this.id) {
      this.fetchingData = true;
      this.apiService.getChainref(this.id).subscribe(chainref => {
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
    
          this.apiService.getChainList().subscribe(chains => {
            this.chains = chains.sort((a, b) => {
              const valA = a.Kchain_desc.toUpperCase();
              const valB = b.Kchain_desc.toUpperCase();
              if (valA < valB) {
                return -1;
              }
              if (valA > valB) {
                return 1;
              }
              return 0;
            });

            this.formChainref.enable();
            this.fetchingData = false;

            this.formChainref.controls.chain.setValue(this.chains.find(c => c.id === Number(chainref.Kchainref_Kchain_id)) || {} as Chain);
          });
          this.formChainref.controls.exch.setValue(exchanges.find(o => o.id === chainref.Kchainref_Kexch_id) || {} as Exchange);
          this.formChainref.controls.name.setValue(chainref.Kchainref_name);
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
        this.apiService.getChainList().subscribe(chains => {
          this.chains = chains.sort((a, b) => {
            const valA = a.Kchain_desc.toUpperCase();
            const valB = b.Kchain_desc.toUpperCase();
            if (valA < valB) {
              return -1;
            }
            if (valA > valB) {
              return 1;
            }
            return 0;
          });
          this.formChainref.enable();
          this.fetchingData = false;
        });
      });
    }
  }

  onSubmit() {
    const chainref = {
      Kchainref_name: this.formChainref.value.name,
      Kchainref_Kexch_id: this.formChainref.value.exch?.id,
      Kchainref_Kchain_id: this.formChainref.value.chain?.id.toString()
    } as Chainref;

    if (!this.isAddMode && this.id !== null && this.id !== undefined) {
      chainref.id = parseInt(this.id);
    }
    
    this.apiService.setChainref(chainref).subscribe(response => {
      if (response.success) {
        this.toast.showSuccess('Set Chainref');
        this.messageService.add({message:'Successfully Inserted/Updated', type: 'success'});
        if (this.isAddMode) {
          this.router.navigate(['../'], {relativeTo: this.route});
        }
        else {
          this.router.navigate(['../../'], {relativeTo: this.route});
        }
      }
      else {
        this.toast.showError(response.error, 'Set Chainref');
        this.messageService.add({message: response.error, type: 'danger'});
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