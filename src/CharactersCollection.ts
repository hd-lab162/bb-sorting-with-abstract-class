import { Sorter } from "./Sorter.js";

export class CharactersCollection extends Sorter {
  data: string;
  constructor(data: string) {
    super();
    this.data = data;
  }
  get length(): number {
    return this.data.length;
  }
  compare(idxLeft: number, idxRight: number): boolean {
    return this.data[idxLeft].toLowerCase() > this.data[idxRight].toLowerCase();
  }
  swap(idxLeft: number, idxRight: number): void {
    const chars = this.data.split("");
    [chars[idxLeft], chars[idxRight]] = [chars[idxRight], chars[idxLeft]];
    this.data = chars.join("");
  }
}
