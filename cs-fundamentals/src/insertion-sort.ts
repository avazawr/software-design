export function insertionSort(arr: number[]) {
  let comparisons = 0;
  const sortedArr = [...arr];
  for (let i = 1; i < sortedArr.length; i++) {
    let current = sortedArr[i];
    if (current === undefined) continue;

    let j = i - 1;

    while (j >= 0) {
      const previous = sortedArr[j];
      comparisons++;
      if (previous === undefined || previous <= current) break;

      sortedArr[j + 1] = previous;
      j = j - 1;
    }
    sortedArr[j + 1] = current;
  }
  return { sortedArr, comparisons };
}

const arr = [5, 2, 4, 6, 1, 3],
  sorted = insertionSort(arr).sortedArr;

console.log(arr);
console.log(sorted);

console.log(insertionSort([]).sortedArr);

//An empty array and an array with one element need no special case because we check the array bounds (s.9,s.11)

console.log(insertionSort([1, 2, 3, 4, 5]).comparisons);
//4
console.log(insertionSort([5, 4, 3, 2, 1]).comparisons);
//10
console.log(insertionSort([42]).comparisons);
//0
console.log(insertionSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]).comparisons);
//45
//In a sorted array, each element is compared only once. In a reversed array, each element is compared many times.
