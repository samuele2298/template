import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Chain } from '../../common/model/chain';
import { MessageService } from '../../message.service';
import { ClrInputModule, ClrTextareaModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ToastService } from '../../toast.service';

@Component({
    selector: 'app-chain-form',
    templateUrl: './chain-form.component.html',
    styleUrls: ['./chain-form.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule, ClrInputModule, ClrTextareaModule]
})
export class ChainFormComponent implements OnInit {
  chain: Chain = {} as Chain;
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

    if (!this.isAddMode && this.id) {
      this.fetchingData = true;
      this.apiService.getChain(this.id).subscribe(chain => {
        this.chain = chain;
        this.fetchingData = false;
      });
    }
  }

  onSubmit() {
    this.apiService.setChain(this.chain).subscribe(response => {
      if (response.success) {
        this.toast.showSuccess('Set Chain');
        this.messageService.add({message:'Successfully Inserted/Updated', type: 'success'});
        if (this.isAddMode) {
          this.router.navigate(['../'], {relativeTo: this.route});
        }
        else {
          this.router.navigate(['../../'], {relativeTo: this.route});
        }
      }
      else {
        this.toast.showError(response.error, 'Set Chain');
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
