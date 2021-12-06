// 1. Implement Observer pattern with a problem domain of your choosing.

class Observable {
    constructor() {
        this.observers = [];
    }

    subscribe(fn) {
        this.observers.push(fn)
    }

    unsubscribe(removeFn) {
        this.observers = this.observers.filter( fn => {
            if (fn != removeFn) {
                return fn;
            }
        });
    }

    notify() {
        this.observers.forEach( fn => {
            fn.call();
        });
    }
}

const subject = new Observable();

const observer1 = () => {
    console.log("Observer 1 notified!");
}

const observer2 = () => {
    console.log("Observer 2 notified!");
}

subject.subscribe(observer1);
subject.subscribe(observer2);
subject.unsubscribe(observer1);

subject.notify();
