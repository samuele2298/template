/* import { Component, OnInit, inject } from '@angular/core';
import { Exchange } from '../../../common/model/exchange';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { MessageService } from '../../../message.service';
import { ClrCheckboxModule, ClrInputModule, ClrSelectModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-exchange-form',
    templateUrl: './exchange-form.component.html',
    styleUrls: ['./exchange-form.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule, ClrInputModule, ClrSelectModule, ClrCheckboxModule]
})
export class ExchangeFormComponent implements OnInit {
  exchange: Exchange = {} as Exchange;
  id: string | undefined;
  isAddMode: boolean = false;
  fetchingData: boolean = false;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(ApiService);
  private messageService = inject(MessageService);

  constructor(
  ){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode && this.id) {
      this.fetchingData = true;
      this.apiService.getExchange(this.id).subscribe(exchange => {
        this.exchange = exchange;
        this.fetchingData = false;
      });
    }
  }

  onSubmit() {
    this.apiService.setExchange(this.exchange).subscribe(response => {
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
 */