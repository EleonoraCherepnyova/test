import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  @Input() step!: number;
  @Input() noValidation: boolean = false;
  @Output() changeStepEmitter = new EventEmitter();
  @Output() stepBackEmitter = new EventEmitter();

  constructor(private srv: ManagerService) { }

  ngOnInit(): void {}

  stepForvard() {
    this.changeStepEmitter.emit();
  }

  stepBack() {
    this.stepBackEmitter.emit();
  }

}
