// snippet 1
function first(arr: number[]) {
return arr[0];
}
// Snippet 1: O(1), because we always access the first element, regardless of how many elements there are.

// snippet 2
function second(arr: number[]) {
let total = 0;
for (const value of arr) {
total += value;
}
return total;
}

// Snippet 2: O(N), because we iterate through the entire array once.

// snippet 3
function third(arr: number[]) {
for (const a of arr) {
for (const b of arr) {
if (a === b) console.log(a);
}
}
}
// Snippet 3: O(N^2), because we iterate through the matrix (i.e. it has two dimensions).

// snippet 4
function fourth(arr: number[]) {
for (const value of arr) {
for (let i = 0; i < 10; i++) {
console.log(value, i);
}
}
}
// Snippet 4: O(N), because we iterate through the entire array once. for (let i = 0; i < 10; i++) - doesn't depend on N, so it doesn't affect the complexity.

// snippet 5
function fifth(a: number[], b: number[]) {
return a.filter((value) => b.includes(value));
}

// Snippet 5: O(N^2), because we iterate through one array and, in each iteration, iterate through another array.

// snippet 6
function sixth(a: number[], b: number[]) {
const lookup = new Set(b);
return a.filter((value) => lookup.has(value));
}

// Snippet 6: O(N), because we iterate through the entire array once.
// Additional memory required proportional to the array size — O(N)

// snippet 7: arr is sorted in ascending order
function seventh(arr: number[], target: number) {
let low = 0;
let high = arr.length - 1;
while (low <= high) {
const mid = Math.floor((low + high) / 2);
const value = arr[mid];
if (value === undefined) return false;
if (value === target) return true;
if (value < target) {
low = mid + 1;
} else {
high = mid - 1;
}
}
return false;
}
// Snippet 7: O(log N), because it's a binary search.

// snippet 8
function eighth(arr: number[]): number[] {
if (arr.length <= 1) return arr;
const mid = Math.floor(arr.length / 2);
return [...eighth(arr.slice(0, mid)), ...eighth(arr.slice(mid))];
}

// Snippet 8: O(N log N) - recursive traversal
