class ProductObserver {
    constructor() {
        this.subscribers = [];
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    unsubscribe(callback) {
        this.subscribers = this.subscribers.filter(sub => sub !== callback);
    }

    notify(data) {
        this.subscribers.forEach(callback => callback(data));
    }
}

export const productObserver = new ProductObserver();
