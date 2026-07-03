/**
 * Generates the Fibonacci sequence up to n terms.
 * @param n - The number of terms to generate
 * @returns An array containing the Fibonacci sequence
 * @throws Error if n is negative
 */
export function fibonacci(n: number): number[] {
  if (n < 0) {
    throw new Error('Number of terms must be non-negative');
  }

  if (n === 0) {
    return [];
  }

  if (n === 1) {
    return [0];
  }

  const sequence: number[] = [0, 1];

  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }

  return sequence;
}

/**
 * Gets the nth Fibonacci number (0-indexed).
 * @param n - The index of the Fibonacci number to retrieve
 * @returns The nth Fibonacci number
 * @throws Error if n is negative
 */
export function fibonacciAt(n: number): number {
  if (n < 0) {
    throw new Error('Index must be non-negative');
  }

  if (n === 0) {
    return 0;
  }

  if (n === 1) {
    return 1;
  }

  let prev = 0;
  let curr = 1;

  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }

  return curr;
}

/**
 * Generates Fibonacci numbers using a generator function.
 * Useful for iterating over large sequences without memory overhead.
 * @param limit - Optional maximum number of terms to generate
 */
export function* fibonacciGenerator(limit?: number): Generator<number> {
  let prev = 0;
  let curr = 1;
  let count = 0;

  while (limit === undefined || count < limit) {
    if (count === 0) {
      yield prev;
    } else if (count === 1) {
      yield curr;
    } else {
      const next = prev + curr;
      prev = curr;
      curr = next;
      yield curr;
    }
    count++;
  }
}
