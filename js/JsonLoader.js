import {config} from "./config.js";
import {Component} from "./Component.js";

class JsonLoader extends Component {
    constructor(url) {
        super();

        this._url = url;
        this.emit("added");
    }

    start() {
        const END_POINT_URL = this._url;

        $.ajax({
            url: END_POINT_URL,
            dataType: "json",
            success: data => {
                this.emit("load", data);
            },
            error: err => {
                this.emit("error", err);
            }
        })
    }
}

export {JsonLoader};