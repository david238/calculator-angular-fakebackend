import { Component, OnInit } from '@angular/core';
import { CalcService } from '../_services/calc.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  displayedNo = 0;

  constructor(private caService: CalcService) {
    const subscription = caService.returnValue.subscribe(value => {
      this.displayedNo = value;
    });
  }

  ngOnInit(): void {
  }

}
