import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ResultService {

  private data: any;

  constructor() { }

  setData(abc: any) {
    this.data = abc;
  }

  getData() {
    return this.data;
  }
}
