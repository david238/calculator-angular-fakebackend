import { Component, OnInit } from '@angular/core';
import { CalcService } from '../_services/calc.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  logStr = '';

  constructor(private caService: CalcService) {
    const subscription = caService.logValue.subscribe(value => {
      this.logStr = `${this.logStr}<li>${value}</li>`;
    });
  }

  ngOnInit(): void {
  }

}
