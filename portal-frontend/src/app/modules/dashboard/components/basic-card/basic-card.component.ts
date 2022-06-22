import { Component, OnInit, Input } from '@angular/core';
import { input } from 'aws-amplify';
import { NzSizeDSType } from 'ng-zorro-antd/core/types/size';

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
  @Input() template_id = '';

  small: NzSizeDSType = 'small';
  constructor() { }

  ngOnInit(): void {

  }

}
