import {Component} from "./Component.js";
import App from "./App.js";

class WaterDrop extends Component {

    constructor(config) {
        super();
        this._config = config;
    }

    /**
     * 멤버 변수를 초기화합니다.
     */
    initMembers() {
        super.initMembers();
    }

    /**
     * 캔버스를 생성합니다.
     */
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

    /**
     * 습도 이미지를 특정 색상으로 채웁니다.
     */
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

    /**
     * 마스킹을 통해 습도 이미지를 fillRate 비율에 맞게 채웁니다.
     * 
     * @param {Boolean}} fill 
     * @param {Number} rate 이 값은 0.0에서 1.0 사이의 실수입니다.
     */
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

        // 캔버스의 중심점을 중앙으로 옮깁니다.
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

class Arrow extends Component {

    constructor(config) {
        super();
        this._config = config;
    }

    start() {
        this._canvas = $("<canvas />", {width: 50, height: 50});
        this._size = 50;

        this.drawArrow(this._config.fromX, this._config.fromY, this._config.deg);

        /**
         * @type {HTMLCanvasElement}
         */
        const canvas = this._canvas.get(0);

        // 캔버스에 그려진 내용을 이미지로 내보냅니다.
        this.emit("load", canvas.toDataURL());   
    }

    drawArrow(fromX, fromY, deg) {
        /**
         * @type {HTMLCanvasElement}
         */
        const canvas = this._canvas.get(0);
        const ctx = canvas.getContext("2d");

        if(fromX === 0) fromX = canvas.width / 2;
        if(fromY === 0) fromY = canvas.height / 2;

        let r = 0;
        const toX = 50;
        const toY = 50;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
        
        ctx.lineWidth = 20;
        ctx.fillStyle = "#1E1E1E";

        ctx.beginPath();        
        r += Math.PI / 180.0 * 15;
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(Math.cos(r) * toX, Math.sin(r) * toY);

        r += Math.PI / 180.0 * 45;
        ctx.lineTo(Math.cos(r) * toX, Math.sin(r) * toY);    

        r += Math.PI / 180.0 * 45;
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(Math.cos(r) * toX, Math.sin(r) * toY);            
        ctx.fill();

        ctx.restore();
    }


}

export {WaterDrop, Arrow};