class EventEmitter {
    constructor() {
        this._events = {};
    }

    on(type, lsn) {
        if(!this._events[type]) {
            this._events[type] = [];
        }

        this._events[type].push(lsn);

        return this;
    }

    emit(type, ...args) {
        
        if(!this._events[type]) {
            return;
        }

        if(!Array.isArray(this._events[type])) {
            return;
        }

        const events = this._events[type];
        events.forEach(lsn => lsn(...args));
    }
}

export {EventEmitter};