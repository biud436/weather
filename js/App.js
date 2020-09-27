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
        $("#loading, #darken").show();
        this.initWithArticle();
    }

    initWithCharts(temperatures) {
        this._chart = new ChartComponent(this);
        this._chart.emit("ready", {
            strokeStyle: "#489AED",
            lineWidth: 8,
            font: "1em Arial",
            padding: 10, // 캔버스의 폭을 10등분한 값입니다.
            textAlign: "center",
            lineCap: "round",
            temperatureSymbol: "\u00B0",
            smooth: true,
            fillChart: true,
            pattern: {
                valid: true,
                src: './images/background2.webp'
            },
            fillStyle: "rgb(255, 0, 0, 0.5)",
            textColor: "white",
            temperatures: temperatures,
            maxTemperature: 50,
        });
    }

    initWithArticle() {
        this._weatherComponent = new WeatherComponent();
        this._weatherComponent.emit("added");        

        const lat = 126;
        const lon = 37;
        const API = `f5f963901bc7a7df56b73323ca00ae47`;
        const lang = navigator.language.slice(-2, 2);
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API}&lang=${lang}`;

        // JSON 파일을 로드합니다.
        const loader = new JsonLoader(url);
        loader.on("load", data => {
            this._weatherComponent.emit("ready", data);  

            const temperatures = [];
            const {daily} = data;
            for(let i = 0; i < 5; i++) {
                temperatures.push(this._weatherComponent.getDegreeCelsius(daily[i].temp.day));
            }

            this.initWithCharts(temperatures);
            this.on("update", (dt) => this.update(dt));                

            $("#loading, #darken").hide();

        });
        loader.on("error", err => {
            console.log("error");
            console.warn(err);
        });

        // navigator.geolocation.getCurrentPosition(position => {
        //     const lat = position.coords.latitude;
        //     const lon = position.coords.longitude;
        //     const API = `f5f963901bc7a7df56b73323ca00ae47`;
        //     const lang = navigator.language.slice(-2, 2);
        //     const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API}&lang=${lang}`;

        //     // JSON 파일을 로드합니다.
        //     const loader = new JsonLoader(url);
        //     loader.on("load", data => {
        //         this._weatherComponent.emit("ready", data);  

        //         const temperatures = [];
        //         const {daily} = data;
        //         for(let i = 0; i < 5; i++) {
        //             temperatures.push(this._weatherComponent.getDegreeCelsius(daily[i].temp.day));
        //         }

        //         this.initWithCharts(temperatures);
        //         this.on("update", (dt) => this.update(dt));                

        //         $("#loading, #darken").hide();

        //     });
        //     loader.on("error", err => {
        //         console.log("error");
        //         console.warn(err);
        //     });

        // }, error => {
        //     this._weatherComponent.emit("error", error);
        // });

    }

    update(dt) {
        this._chart.emit("update", dt);
    }
};

