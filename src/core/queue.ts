export default class Queue<T> {
    private items: T[] = [];
    private head = 0;

    // Enqueue: Add item to the end of the queue
    enqueue(item: T): void {
        this.items.push(item);
    }

    // Dequeue: Remove and return the item from the front
    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        const item = this.items[this.head];
        this.head++;

        // Compact the array when the head is more than half the array's length
        if (this.head * 2 >= this.items.length) {
            this.items = this.items.slice(this.head);
            this.head = 0;
        }

        return item;
    }

    // Peek: Get the front item without removing it
    front(): T | undefined {
        return this.isEmpty() ? undefined : this.items[this.head];
    }

    // Check if the queue is empty
    isEmpty(): boolean {
        return this.size() === 0;
    }

    // Get the size of the queue
    size(): number {
        return this.items.length - this.head;
    }

    // Clear the queue
    clear(): void {
        this.items = [];
        this.head = 0;
    }

    // Optional: Convert the queue to an array
    toArray(): T[] {
        return this.items.slice(this.head);
    }

    // Optional: Implement iterable interface
    [Symbol.iterator](): Iterator<T> {
        let index = this.head;
        const items = this.items;

        return {
            next(): IteratorResult<T> {
                return index < items.length
                    ? { value: items[index++], done: false }
                    : { done: true, value: undefined };
            }
        };
    }
}