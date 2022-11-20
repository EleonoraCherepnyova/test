import { Component, OnInit } from '@angular/core';
import { IData, ManagerService, ITransaction } from '../services/manager.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  step: number = 0;
  loading: boolean = false;
  currentTransaction!: ITransaction;
  data: IData = {
    accountList: [],
    noteBookList: []
  };
  constructor(private srv: ManagerService) {}

  ngOnInit() {
    // Initialize app function
    this.start();
  }

  start() {

    // Step managment subsription
    this.srv.step.subscribe(step => {
      this.step = step;
    })
    this.srv.step.next(1);

    // Transaction suvscription
    this.srv.newTransaction.subscribe(transaction=> {
      this.currentTransaction = transaction;
    })

    // Loader subscription
    this.srv.loading.subscribe(loader=> {
      this.loading = loader;
    })
    this.srv.loading.next(true);

    //AccountList service
    this.srv.getAccountsList().subscribe((res) => {
      this.data.accountList = res;

      //NotebookList service
      this.srv.getNotebookList().subscribe((res) => {
        this.data.noteBookList = res;
        this.srv.loading.next(false);
      })
    });
  }

}
