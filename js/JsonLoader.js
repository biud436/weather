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
                // 로드가 완료되면 등록된 로드 콜백 함수를 호출합니다.
                this.emit("load", data);
            },
            error: err => {
                // 로드에 실패하면 등록된 오류 콜백 함수를 호출합니다.
                this.emit("error", err);
            }
        })
    }
}

export {JsonLoader};