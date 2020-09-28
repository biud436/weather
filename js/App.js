import { EventEmitter } from "./EventEmitter.js";
import {Component} from "./Component.js";
import {ChartComponent} from "./ChartComponent.js";
import {WeatherComponent} from "./WeatherComponent.js";
import { JsonLoader } from "./JsonLoader.js";

/**
 * @link https://openweathermap.org/api/one-call-api
 */
export default class App extends EventEmitter {
    constructor() {
        super();
    }   

    start() {
        // 로딩바를 표시합니다.
        $("#loading, #darken").show();

        // 날씨 데이터를 가져와 화면을
        this.initWithArticle();
    }

    /**
     * 차트 그래프를 생성합니다.
     * @param {Number[]}} temperatures 
     */
    initWithCharts(temperatures) {
        this._chart = new ChartComponent(this);
        this._chart.emit("ready", {
            strokeStyle: "#489AED",
            lineWidth: 8, // 차트 그래프의 선 굵기를 지정합니다.
            font: "1em Arial", // 폰트를 설정합니다.
            padding: 10, // 캔버스의 폭을 10등분한 값입니다.
            textAlign: "center",
            lineCap: "round",
            temperatureSymbol: "\u00B0",
            smooth: true, // 차트의 계산 현상을 없애고 부드럽게 만듭니다.
            fillChart: true, // 차트를 채울 지 결정합니다.
            pattern: { 
                valid: true, // 차트 배경에 이미지를 지정합니다.
                src: './images/background2.webp'
            },
            fillStyle: "rgb(255, 0, 0, 0.5)",
            textColor: "white", // 차트의 텍스트 색상을 지정합니다.
            temperatures: temperatures,
            maxTemperature: 50, // 차트의 최고 기온을 설정합니다 (이 값을 이용하여 비율을 만듭니다.)
        });
    }

    initWithArticle() {
        this._weatherComponent = new WeatherComponent();
        this._weatherComponent.emit("added");        

        // 서울의 위도와 경도를 지정합니다.
        const lat = 37.532600;
        const lon = 127.024612;
        const API = `f5f963901bc7a7df56b73323ca00ae47`;
        const lang = navigator.language.slice(3).toLowerCase();
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API}&lang=${lang}`;

        // JSON 파일을 로드합니다.
        const loader = new JsonLoader(url);
        loader.on("load", data => {
            this._weatherComponent.emit("ready", data);  

            const temperatures = [];
            const {daily} = data;
            
            // 기온 값을 가져와서 배열에 추가합니다.
            for(let i = 0; i < 5; i++) {
                temperatures.push(this._weatherComponent.getDegreeCelsius(daily[i].temp.day));
            }

            // 차트 그래프를 생성합니다.
            this.initWithCharts(temperatures);

            // 프레임 업데이트 함수를 이벤트에 등록합니다.
            this.on("update", (dt) => this.update(dt));                

            // 로딩바를 숨깁니다.
            $("#loading, #darken").hide();

        });
        // JSON 파일 로딩 중에 에러가 발생하였을 경우, 디버깅 용도로 에러를 표시합니다.
        loader.on("error", err => {
            console.log("error");
            console.warn(err);
        });        

    }

    update(dt) {
        // 차트를 매 프레임마다 업데이트 합니다.
        // 이 메서드는 프레임 업데이트를 통해 이미지를 오른쪽으로 무한 스크롤링하기 위해 존재합니다.
        this._chart.emit("update", dt);
    }
};

