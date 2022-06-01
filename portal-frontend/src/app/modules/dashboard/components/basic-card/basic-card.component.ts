import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-basic-card',
  templateUrl: './basic-card.component.html',
  styleUrls: ['./basic-card.component.less']
})
export class BasicCardComponent implements OnInit {
  @Input() name = '';
  @Input() skills = [];
  @Input() education = [];
  @Input() experience = [];
  @Input() matches = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
