import { Component, Input, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IData, ITransaction, ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit, DoCheck {

  // Inputs
  @Input() data: IData = {
    accountList: [],
    noteBookList: []
  };
  @Input() step: number = 1;

  // Variabels
  creditor: string = '';
  form!: FormGroup;
  showError: boolean = false;
  amount: number = 0;
  checkOnce: boolean = true;

  constructor(private srv: ManagerService) { }

  // Form creation
  ngOnInit() {
    this.form = new FormGroup({
      account: new FormControl('', [Validators.required]),
      creditor: new FormControl('', [Validators.required]),
      sum: new FormControl(0, [Validators.required])
    });
  }

  // Form values
  ngDoCheck() {
    if(this.data.accountList.length > 1 && this.data.noteBookList.length > 1 && this.checkOnce) {
      this.checkOnce = false;
      this.form = new FormGroup({
        account: new FormControl(this.data.accountList[0].accountNumber, [Validators.required]),
        creditor: new FormControl(this.data.noteBookList[0].creditorNumber, [Validators.required]),
        sum: new FormControl(0, [Validators.required])
      });
      this.findAmount();
    }
  }

  // Go to step 2
  changeStep() {
    this.srv.loading.next(true);
    if (+this.form.value.sum < this.amount && +this.form.value.sum > 0) {
      let data: ITransaction = {
        account: this.form.value.account,
        creditor: this.form.value.creditor,
        sum: +this.form.value.sum
      }
      this.srv.transactionValidate(data).subscribe({
        next: (val) => {
          this.srv.newTransaction.next(val);
          this.srv.loading.next(false);
          this.srv.step.next(this.step + 1);
        }, 
        error: (error) => {
          this.srv.step.next(this.step + 3);
        }
      });
    } else {
      this.showError = true;
      this.srv.loading.next(false);
    }
  }

  // Account select
  accountChange() {
    this.findAmount();
  }

  // Find amount from account
  findAmount() {
    for (let el in this.data.accountList) {
      if (this.data.accountList[el].accountNumber == this.form.value.account) {
        this.amount = this.data.accountList[el].amount;
      }
    }
  }

}
