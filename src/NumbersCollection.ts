import { Sorter } from "./Sorter.js";

export class NumbersCollection extends Sorter {
  data: number[];
  constructor(data: number[]) {
    super();
    this.data = data;
  }

  get length(): number {
    return this.data.length;
  }

  compare(idxLeft: number, idxRight: number): boolean {
    return this.data[idxLeft] > this.data[idxRight];
  }
  swap(idxLeft: number, idxRight: number): void {
    [this.data[idxLeft], this.data[idxRight]] = [
      this.data[idxRight],
      this.data[idxLeft],
    ];
  }
}

/*
Side note about swapping logic
the left side can be existing variables or assignable locations,
such as array elements or object properties.
For example, if the pair is [8, 3], it becomes [3, 8]. The temporary-variable version does the same thing; destructuring is just more concise.

let a = 8;
let b = 3;

[a, b] = [b, a]; // swaps them

const values = [8, 3];
[values[0], values[1]] = [values[1], values[0]]; // swaps array elements

*/
