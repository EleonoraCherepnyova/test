import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumps',
  templateUrl: './breadcrumps.component.html',
  styleUrls: ['./breadcrumps.component.scss']
})
export class BreadcrumpsComponent implements OnInit {
  @Input()
  step!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
