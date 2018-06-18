import { Component, Input, OnInit } from '@angular/core';
import { CalcService } from '../_services/calc.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() value: any;

  constructor(private caService: CalcService) { }

  ngOnInit(): void {
    // this.caService.login('david', 'tin')
    // .pipe(first())
    // .subscribe(
    //     data => {
    //         console.log(data);
    //     },
    //     error => {
    //         console.log('button error call service', error);
    //     });
  }

  onClick(): void {
    this.caService.defineClick(this.value);
  }

}
