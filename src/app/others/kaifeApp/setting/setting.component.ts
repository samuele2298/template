/* import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Setting } from '../common/model/setting';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { ClrModalModule, ClrInputModule, ClrAlertModule } from '@clr/angular';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.css'],
    standalone: true,
    imports: [ClrModalModule, FormsModule, ReactiveFormsModule, ClrInputModule, NgIf, ClrAlertModule, NgFor]
})
export class SettingComponent implements OnInit {
  settings: Setting[] = [];
  settingSet: boolean = false;
  alertText: string = '';
  alertType: string = '';
  isModalOpen: boolean = false;

  newSettingForm = new FormGroup({
    Ksetting_name: new FormControl('', [Validators.required]),
    Ksetting_value: new FormControl('', [Validators.required]),
    Ksetting_desc: new FormControl('', [Validators.required])
  });
  private apiService = inject(ApiService);

  constructor(
  ){}

  ngOnInit(): void {
    this.getSettingList();
  }
  
  getSettingList() {
    this.apiService.getSettingList().subscribe(settings => (this.settings = settings));
  }

  setSetting(setting: Setting) {
    this.apiService.setSetting(setting).subscribe(resp => {
      if (resp.success) {
        this.alertText = `Setting ${setting.Ksetting_name} with value: ${setting.Ksetting_value} applied`;
        this.alertType = 'success';
        this.settingSet = true;
        setTimeout(() => {
          this.settingSet = false;
        }, 5000);
      }
      else {
        this.alertText = `Setting ${setting.Ksetting_name} with value: ${setting.Ksetting_value} failed error: ${resp.error}`;
        this.alertType = 'danger';
        this.settingSet = true;
      }
    });
  }

  insertNewSetting() {
    const setting = {
      Ksetting_name: this.newSettingForm.value.Ksetting_name,
      Ksetting_value: this.newSettingForm.value.Ksetting_value,
      Ksetting_desc: this.newSettingForm.value.Ksetting_desc
    } as Setting;

    this.apiService.setSetting(setting).subscribe(resp => {
      if (resp.success) {
        this.alertText = `Setting ${setting.Ksetting_name} with value: ${setting.Ksetting_value} applied`;
        this.alertType = 'success';
        this.settingSet = true;
        setTimeout(() => {
          this.settingSet = false;
        }, 5000);
      }
      else {
        this.alertText = `Setting ${setting.Ksetting_name} with value: ${setting.Ksetting_value} failed error: ${resp.error}`;
        this.alertType = 'danger';
        this.settingSet = true;
      }
      this.getSettingList();
      this.isModalOpen = false;
    });
  }
}
 */