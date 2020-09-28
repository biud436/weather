import {
    Component
} from "./Component.js";

/**
 * @author Uh jinseok
 */
class ChartComponent extends Component {
    /**
     * 
     * @param {App} app 
     */
    constructor(app) {
        super(app);
    }

    initMembers() {
        super.initMembers();

        this._backgroundPositionX = 0;
        this._patternImageWidth = 1;

        /**
         * 차트를 직접 그리기 위해 캔버스를 선언합니다.
         * @type {HTMLCanvasElement}
         */
        this._canvas = document.getElementById("main-canvas");
        this._canvas.width = $(".temperature-field").outerWidth();
        this._canvas.height = $(".temperature-field").outerHeight();

        // 화면 크기가 변할 때 캔버스의 사이즈도 변경합니다.
        $(window).on("resize", (ev) => {
            this._canvas.width = $(".temperature-field").outerWidth();
            this._canvas.height = $(".temperature-field").outerHeight();
        });

        // 초기화 코드로 설정값을 받아오고 스크롤링 필 패턴을 생성합니다.
        this.on("ready", (...args) => {
            this._config = {...args[0]};

            if(this._config.pattern.valid) {
                this.drawChartPattern(this._config.pattern).then(img => {
                    const ctx = this._canvas.getContext("2d");
                    this._fillPattern = ctx.createPattern(img, 'repeat');                       
                });            
            }

            // 프레임 업데이트 메서드를 이벤트 콜백에 등록합니다.
            this.on("update", (dt) => {
                const {temperatures} = this._config;
                this.drawLines(temperatures);            
            });                 
    
        });

    }

    /**
     * 캔버스의 가로 축을 정확히 기온 배열의 최대값만큼 나눠 나란히 전개합니다.
     * 
     * @param {Number} days 
     */
    getLinePositionX(days) {
        const canvasWidth = this._canvas.width;
        const thod = Math.floor(canvasWidth / this._config.temperatures.length);
        const x = thod * days;

        return x;
    }

    /**
     * 캔버스의 세로 축을 정확히 50등분하여 나란히 전개합니다.
     * 
     * @param {Number} temperature 
     */    
    getLinePositionY(temperature) {
        const maxTemperature = this._config.maxTemperature;
        const canvasHeight = this._canvas.height;
        const thod = Math.floor(canvasHeight/maxTemperature);
        const y = Math.floor(thod * (maxTemperature - temperature));

        return y;
    }

    /**
     * 기온 배열을 캔버스에 대한 벡터로 변환합니다.
     * 
     * @param {Number[]} temperatures 
     * 
     * @return {Array<{x: 0, y: 0}>} lines 
     */    
    getLines(temperatures) {
        const lines = temperatures.map((temperature, day) => {
            return {
                x: this.getLinePositionX(day), 
                y: this.getLinePositionY(temperature)
            };
        });

        return lines;
    }

    /**
     * 무한 스크롤링을 위한 캔버스 이미지 패턴을 생성합니다.
     * 
     * @param {{valid: Boolean, src: String}} pattern 
     */
    drawChartPattern(pattern) {
        return new Promise((resolve, reject) => {
            if(!this._img) {
                const img = new Image();
                img.src = pattern.src;
                img.onload = (ev) => {
                    resolve(img);
                    this._patternImageWidth = img.width;
                };  
                img.onerror = (err) => {
                    reject(ev);
                };
            }
        });
    }

    /**
     * 기온을 막대 차트 형식으로 그립니다.
     * 
     * @param {Number[]} temperatures 
     */
    drawLines(temperatures) {

        const ctx = this._canvas.getContext("2d");
        const {strokeStyle, lineWidth, font, 
            padding, textAlign, temperatureSymbol, 
            lineCap, smooth, fillChart, fillStyle, pattern, textColor} = this._config;

        // 화면을 모두 지웁니다.
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        // 배경 이미지 스크롤링 구현
        this._backgroundPositionX = (this._backgroundPositionX + 1) % this._patternImageWidth;

        // 요일 별 기온을 백분율에 따라 라인화합니다.
        const lines = this.getLines(temperatures);

        ctx.save();
        ctx.beginPath();

        // 종횡비 보정
        const aspectRatio = this._canvas.width / this._canvas.height;

        // 이동 행렬을 통해 패딩 값을 설정합니다.
        // 이 값은 캔버스의 가로 길이를 10등분한 값입니다.
        ctx.setTransform(1, 0, 0, 1, this._canvas.width / padding, 0);

        // 안티 앨리어싱을 설정합니다.
        if(smooth) {
            ctx.translate(0.5, 0.5);
        }

        // 라인을 연결합니다. 
        for (let i = 0; i < lines.length; i++) {
            const cur = lines[i];
            const prev = lines[i - 1];

            // 차트를 색으로 채우지 않으려면 선 이동 처리를 해야 합니다.
            if(!fillChart) {
                if (prev) {
                    ctx.moveTo(prev.x, prev.y);
                } else {
                    ctx.moveTo(cur.x, cur.y);
                }
            }

            // \u00B0는 각도 심볼입니다.
            const text = temperatures[i] + temperatureSymbol;
            const tw = ctx.measureText(text).width;
            const pad = tw;
            
            // 라인의 각종 속성을 설정합니다.
            ctx.lineWidth = lineWidth;
            ctx.lineCap = lineCap;  
            ctx.lineTo(cur.x, cur.y);        
            
            // 라인을 긋습니다.
            ctx.stroke();

            // 폰트를 설정합니다.
            ctx.font = font;
            ctx.textAlign = textAlign;

            // tw는 텍스트의 폭이며 두 배를 하지 않을 경우, 첫 번째 텍스트의 폭이 축소됩니다.
            ctx.lineWidth = lineWidth / 2;
            ctx.strokeStyle = strokeStyle;            
            ctx.strokeText(text, cur.x, (cur.y - pad), tw * 2);
            ctx.fillStyle = textColor;
            ctx.fillText(text, cur.x, (cur.y - pad), tw * 2); 
     
        }

        // 마지막 라인을 찾습니다.
        const lastLine = [...lines].pop();

        // 마지막 라인의 끝점으로부터 캔버스 하단까지 연결하여 도형을 완성합니다.
        if(fillChart) {
            
            ctx.lineTo(lastLine.x, this._canvas.height);
            ctx.lineTo(0, this._canvas.height);
            ctx.closePath();   

            // 이 값이 활성화되어있으면 스크롤링 패턴을 사용하여 반복 루프 효과를 구현합니다.
            if(pattern.valid) {
                ctx.translate(this._backgroundPositionX, 0);
                ctx.fillStyle = this._fillPattern;
            } else {
                ctx.fillStyle = fillStyle;
            }

            ctx.fill();    
        }

        ctx.restore();
    }
}

export {
    ChartComponent
};