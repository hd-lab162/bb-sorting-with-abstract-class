## Sorting with an abstract class

This shows how an abstract class can define a shared algorithm while letting subclasses implement the parts that vary.

`Sorter` contains the working `sort()` implementation. Its abstract members—`length`, `compare()`, and `swap()`—define what a sortable collection must provide. `NumbersCollection` and `CharactersCollection` implement those members differently, while inheriting the same sorting algorithm.

```text
                 Sorter
        shared sort() algorithm
     abstract length, compare(), swap()
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
 NumbersCollection    CharactersCollection
 compares numbers      compares characters
 swaps array items     swaps string characters
```

### How `sort()` works

```ts
sort(): void {
  for (let i = 0; i < this.length; i++) {
    let swapped = false;

    for (let j = 0; j < this.length - i - 1; j++) {
      if (this.compare(j, j + 1)) {
        this.swap(j, j + 1);
        swapped = true;
      }
    }

    if (!swapped) return;
  }
}
```

- The **outer loop (`i`)** runs successive passes. Each pass puts the largest remaining item in its final position at the end.
- The **inner loop (`j`)** scans the unsorted portion, comparing neighboring items at positions `j` and `j + 1`.
- `compare()` decides whether those items are out of order; `swap()` exchanges them. Each subclass supplies its own comparison and swapping behavior.
- `this.length - i - 1` stops the inner loop before the already-sorted tail.
- `swapped` enables an **early exit**: if a full pass makes no swaps, the collection is already sorted.

![Animation showing the outer and inner loops of bubble sort](./assets/bubble-sort-loops.jpeg)

### Complexity

Bubble sort takes `O(n²)` time in the average and worst cases. With the early-exit check, an already-sorted collection takes `O(n)` time. The algorithm uses `O(1)` extra space, excluding any storage used internally by a collection’s `swap()` implementation.

### Could this use an interface instead?

An interface can describe what a sortable collection must provide:

```ts
interface Sortable {
  length: number;
  compare(idxLeft: number, idxRight: number): boolean;
  swap(idxLeft: number, idxRight: number): void;
}
```

But an interface only defines a contract—it does not provide the shared `sort()` implementation. One class-based alternative is to put the algorithm in a separate sorter class:

```ts
class BubbleSorter {
  sort(collection: Sortable): void {
    for (let i = 0; i < collection.length; i++) {
      let swapped = false;

      for (let j = 0; j < collection.length - i - 1; j++) {
        if (collection.compare(j, j + 1)) {
          collection.swap(j, j + 1);
          swapped = true;
        }
      }

      if (!swapped) return;
    }
  }
}
```

The collections would implement `Sortable`, and sorting would require a `BubbleSorter` instance:

```ts
const sorter = new BubbleSorter();

sorter.sort(myArrayOfNumbers);
sorter.sort(myCollectionOfChars);
```

You could reuse the same sorter instance, but it is still a separate object that must be created and used. With the abstract-class design in this project, each collection inherits the shared algorithm and can sort itself:

```ts
myArrayOfNumbers.sort();
myCollectionOfChars.sort();
```

An abstract class is a convenient choice here because it combines a shared sort() implementation with a contract specifying what subclasses must provide. An interface may be preferable if you want to keep sorting separate from the collections or if those classes already need to extend another class.
