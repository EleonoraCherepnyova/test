import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  step = new Subject<number>();
  newTransaction = new Subject<ITransaction>();
  loading = new Subject<boolean>();
  
  constructor(private http: HttpClient) {
  }

  getAccountsList() {
   return this.http.get<IAccountItem[]>(`https://money-transfer-d405b-default-rtdb.firebaseio.com/accountList.json`);
  }

  getNotebookList() {
    return this.http.get<IIbanItem[]>(`https://money-transfer-d405b-default-rtdb.firebaseio.com/noteBookList.json`);
   }

  transactionValidate(data: ITransaction){
    return this.http.put<ITransaction>('https://money-transfer-d405b-default-rtdb.firebaseio.com/transactionsToValidate.json', data);
  }
  
  transactionConfirm(data: ITransaction){
    return this.http.put<ITransaction>('https://money-transfer-d405b-default-rtdb.firebaseio.com/transactionsConfirmed.json', data);
  }

}

// Interfaces
export interface IAccountItem {
  accountType: string,
  accountNumber: string,
  amount: number,
  accountName: string
}

export interface IIbanItem {
  creditorType: string,
  creditorNumber: string,
  creditorName: string
}

export interface IData {
  accountList: IAccountItem[];
  noteBookList: IIbanItem[];
}
export interface ITransaction {
  account: string,
  creditor: string,
  sum: number
}