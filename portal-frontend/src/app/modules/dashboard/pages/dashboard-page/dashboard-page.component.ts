import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.less']
})
export class DashboardPageComponent implements OnInit {
  sizeL: NzButtonSize = 'large';
  sizeS: NzButtonSize = 'small';

  positions: any[] = [
    {
      name: 'Position 1',
      skills: ["UI", "UX", "Development"],
      education: ["Bachelor's Degree"],
      experience: ["Software Development"],
      matches: 12
    },
    {
      name: 'Position 2',
      skills: ["UI", "UX", "Development"],
      education: ["Bachelor's Degree"],
      experience: ["Software Development"],
      matches: 42
    },
    {
      name: 'Position 3',
      skills: ["UI", "UX", "Development"],
      education: ["Bachelor's Degree"],
      experience: ["Software Development"],
      matches: 9
    },
    {
      name: 'Position 4',
      skills: ["UI", "UX", "Development"],
      education: ["Bachelor's Degree"],
      experience: ["Software Development"],
      matches: 27
    },
    {
      name: 'Position 5',
      skills: ["UI", "UX", "Development"],
      education: ["Bachelor's Degree"],
      experience: ["Software Development"],
      matches: 93
    },
    {
      name: 'Position 6',
      skills: ["UI", "UX", "Development"],
      education: ["Bachelor's Degree"],
      experience: ["Software Development"],
      matches: 2
    },
    {
      name: 'Position 7',
      skills: ["UI", "UX", "Development"],
      education: ["Bachelor's Degree"],
      experience: ["Software Development"],
      matches: 2
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
