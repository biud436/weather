import {Component} from "./Component.js";
import App from "./App.js";

class WaterDrop extends Component {

    constructor(config) {
        super();
        this._config = config;
    }

    initMembers() {
        super.initMembers();
    }

    start() {
        this._canvas = $("<canvas />", {width: 50, height: 25});
        this._size = 50;

        this.drawBackground(true, (1.0 - this._config.fillRate) || 1.0);
        this.drawShape();

        /**
         * @type {HTMLCanvasElement}
         */
        const canvas = this._canvas.get(0);

        this.emit("load", canvas.toDataURL());        
    }

    drawShape() {
        /**
         * @type {HTMLCanvasElement}
         */
        const canvas = this._canvas.get(0);
        const ctx = canvas.getContext("2d");
        const w = this._size;

        ctx.save();

        ctx.globalCompositeOperation = "source-over";

        ctx.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
        ctx.translate(0.5, 0.5);
        ctx.beginPath();
        ctx.moveTo(0 - w, 0);
        ctx.lineTo(0, 0 - (w - 2));
        ctx.lineTo(0 + w, 0);
        ctx.arc(0, 0, w, 0, Math.PI);
        ctx.lineWidth = 4;
        ctx.closePath();

        ctx.strokeStyle = "#4798E6";
        ctx.stroke();

        ctx.restore();           
    }

    drawBackground(fill, rate) {
        /**
         * @type {HTMLCanvasElement}
         */
        const canvas = this._canvas.get(0);
        const ctx = canvas.getContext("2d");
        const w = this._size;

        ctx.save();

        ctx.globalCompositeOperation = "source-over";

        ctx.fillStyle = "#4798E6";
        ctx.fillRect(0, Math.floor(canvas.height * rate), canvas.width, canvas.height);
        ctx.fill();                

        ctx.globalCompositeOperation = "source-in";

        ctx.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
        ctx.translate(0.5, 0.5);
        ctx.beginPath();
        ctx.moveTo(0 - w, 0);
        ctx.lineTo(0, 0 - (w - 2));
        ctx.lineTo(0 + w, 0);
        ctx.arc(0, 0, w, 0, Math.PI);
        ctx.lineWidth = 10;
        ctx.closePath();
        ctx.fillStyle = "#4798E6";
        ctx.fill();

        ctx.restore();        
    }
}

export {WaterDrop};