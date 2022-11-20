import { Component, Input, OnInit } from '@angular/core';
import { ITransaction, ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {
  @Input() step:number=1;
  @Input() currentTransaction!: ITransaction;

  constructor(private srv: ManagerService) { }

  ngOnInit() {}

  changeStep() {
    this.srv.loading.next(true);
    this.srv.transactionConfirm(this.currentTransaction).subscribe(val => {
      this.srv.loading.next(false);
      this.srv.step.next(this.step + 1);
    });
  }

  stepBack() {

    if(this.step > 1){
      this.srv.step.next(this.step - 1);
    }
  }

}
