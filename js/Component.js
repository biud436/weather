import {EventEmitter} from "./EventEmitter.js";
import App from "./App.js";

class Component extends EventEmitter {

    /**
     * @param {App} app 
     */
    constructor(app) {
        super();
        this._app = app;
        this.initMembers();
    }

    async initMembers() {
        this.on("added", (...args) => this.onAdded(...args));
    }

    onAdded() {
        this.start();
    }

    start() {
        
    }

    update() {

    }
}

export {Component};