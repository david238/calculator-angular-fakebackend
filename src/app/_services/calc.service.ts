import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable()
export class CalcService {

    private one: number;
    private two: number;
    private mathfunc: string;
    private total = 0;
    private buffer: string;
    returnValue: Subject <number> = new Subject <number>();
    logValue: Subject <string> = new Subject <string>();

    constructor(private http: HttpClient) {
    }

    callfunction(_one: number, _two: number, _mathfunc: string): any {
      return this.http.post<any>('/api/calculate', {one: _one, two: _two, mathfunc: _mathfunc })
      .pipe(map(result => {
          // Performed calculation on server side.
          return result;
      }));
    }

    createNumber(value: any): void {
      if (!(this.buffer.includes('.') && value === '.')) {
        this.buffer = this.buffer.toString() + value.toString();
      }
      this.outputToDisplay(this.buffer);
      console.log('You pressed number: ', value);
    }

    defineClick(value: any): void {
      switch (typeof value) {
        case 'number':
          // do not clear values if total === one, we are carried forward total for calculation
          if (this.total !== this.one && this.one !== 0 && this.two !== 0) {
            this.clearValues();
          }
          // create number
          this.createNumber(value);
          break;
        case 'string':
          // validate string command
          this.whichString(value);
          break;
        default:
      }
    }

    whichString(value: string): void {
      switch (value) {
        case 'ON':
          break;
        case 'CLEAR':
          this.clearValues();
          break;
        case '/':
          this.calculation(value); // compute
          break;
        case 'x':
          this.calculation(value); // compute
          break;
        case '-':
          this.calculation(value); // compute
          break;
        case '+':
          this.calculation(value); // compute
          break;
        case '.':
          this.createNumber(value);
          break;
        case 'ENTER':
          // this.setOneOrTwo();
          // this.calculate();
          this.calculation(value); // compute
          break;
        default:
      }
    }

    calculation(value: string): void {
      console.log('Just pressed button: ', value);

      // Assign var one or two
      this.setOneOrTwo(value);

      // if there is one and two then we call calculate
      if (this.one && this.two) {
        const logStr = `${this.one} ${this.mathfunc} ${this.two}`;
        this.outputToLog(logStr);
        this.calculate();
      }

      // assign new arithmetic operator to mathfunc variable
      this.mathfunc = value;

    }

    setOneOrTwo(value: string): void {

      // Check if previous cmd is enter and new cmd is not enter.
      // if True Then reset one and two
      if (this.mathfunc === 'ENTER' && value !== 'ENTER') {
        if (this.buffer !== '') {
          this.one = Number(parseFloat(this.buffer)
          .toFixed(8));
        } else {
          this.one = this.total;
        }
        this.two = Number();
        console.log('set var one as buffer number and reset two if prev cmd was enter and new was not enter');
      } else if (!this.one) {
        this.one = Number(parseFloat(this.buffer)
        .toFixed(8));
      } else {
        // assigned number if var one is already assigned and var two is undefined
        this.two = Number(parseFloat(this.buffer)
        .toFixed(8));
      }
      this.resetBuffer();
    }

    calculate(): void {
      this.callfunction(this.one, this.two, this.mathfunc)
      .pipe(first())
      .subscribe(
          data => {
              this.outputToDisplay(data.result);
              const logStr = `Total: ${data.result}`;
              this.outputToLog(logStr);
              this.total = data.result;
              console.log('total is ', data.result, 'and one is: ', this.one, 'and two is: ',
              this.two, 'actual function is: ', this.mathfunc);
            },
          error => {
              console.log(error);
          });
    }

    // Dispatch event to output in display component
    outputToDisplay(value: any): void {
      this.returnValue.next(value);
    }

    // Dispatch event to output in Log component
    outputToLog(value: string): void {
      this.logValue.next(value);
    }

    // Clearing values
    clearValues(): void {
      this.one = 0;
      this.two = 0;
      this.total = 0;
      this.outputToDisplay(0);
      this.resetBuffer();
      console.log('everything is being cleared');
    }

    resetBuffer(): void {
      this.buffer = '';
    }

    // setter for one
    setVariables(_one: number, _two: number, _mathfunc: string): void {
      this.one = _one;
      this.two = _two;
      this.mathfunc = _mathfunc;
    }

    // getter for one
    getOne(): number {
      return this.one;
    }

    getTwo(): number {
      return this.two;
    }

    getMathFunc(): string {
      return this.mathfunc;
    }

    getTotal(): number {
      return this.total;
    }

}
