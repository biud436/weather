import {Component} from "./Component.js";
import App from "./App.js";
import {WaterDrop, Arrow} from "./DynamicImage.js";

class WeatherComponent extends Component {
    constructor(app) {
        super(app);
    }

    start() {
        this.on("ready", (config) => {

            this._config = config;

            this.initWithDate();
            this.initWithWeather();
        })
    }

    /**
     * @param {Number} unixTime 
     */
    getTimeString(unixTime) {
        const options = {"weekday": "long", "month": 'long', "day": 'numeric'};        
        const date = new Date(unixTime * 1000);

        return new Intl.DateTimeFormat("ko-KR", options).format(date);
    }

    /**
     * 절대 온도(K)에서 섭씨로 변환합니다.
     */
    getDegreeCelsius(k) {
        const c = Math.round(k - 273.15, 2);

        return c;
    }

    getFahrenheit(k) {
        const c = this.getDegreeCelsius(k);
        return (c - 32) * 0.5555555555555556;
    }

    /**
     * 향후 5일간의 날짜를 표기합니다.
     */
    initWithDate() {
        const {daily} = this._config;

        const days = [];
        const maxDays = 5;
        for(let i = 0; i < maxDays; i++) {
            days.push(daily[i].dt);
        }

        $(".city-field div").text(`${this._config.timezone}`);

        $("article").each((index, elem) => {
            $(elem)
                .text("")
                .append(`<p>${this.getTimeString(days[index])}</p>`);
        });
    }

    /**
     * 풍향 값에 따른 16방위 변환식
     * @param {Number} deg 
     */
    getWindDirection(deg) {
        const cardinalDir = Math.floor((deg + 22.5 * 0.5 ) / 22.5);
        const data = {
            0: "북",
            1: "북북동",
            2: "북동",
            3: "동북동",
            4: "동",
            5: "동남동",
            6: "남동",
            7: "남남동",
            8: "남",
            9: "남남서",
            10: "남서",
            11: "서남서",
            12: "서",
            13: "서북서",
            14: "북서",
            15: "북북서",
            16: "북"
        };

        const windDir = data[cardinalDir];

        return windDir;
    }

    /**
     * 날씨 이미지를 불러옵니다.
     */
    initWithWeather() {
        $("article").each((index, elem) => {
            const weatherImg = $("<div />", {class: "article__weather-image"});
            const {daily} = this._config;
            const data = daily[index];
            const weather = data.weather;

            let size = $(window).width() > 768 ? "@4x": "@2x";
            
            if($(window).width() < 480) {
                size = "";
            }

            const img = $(`<img src="https://openweathermap.org/img/wn/${weather[0].icon}${size}.png">`);
            $(elem).append(img);
            
            this.initWithWindSpeed(index);
        });        
    }

    /**
     * 풍속 데이터를 표기합니다.
     */
    initWithWindSpeed(index) {
        const {daily} = this._config;
        const data = daily[index];

        const windDegText = $("<p></p>", {class: "article__weather-wind-deg"})
            .html(`<span>풍향</span> ${this.getWindDirection(data.wind_deg)}`)

        const windSpeed = $("<p></p>", {class: "article__weather-wind-speed"})
            .html(`<span>풍속</span> ${Math.round(data.wind_speed / 1.944)}m/s`)

        const humidity = $("<div></div>", {class: "article__weather-humidity"})
            .html(`<span>습도</span> ${data.humidity}%`)

        const min = $("<p></p>", {class: "article__weather-temp-min"})
            .html(`<span>최저 기온</span> ${this.getDegreeCelsius(data.temp.min)}°C`);

        const max = $("<p></p>", {class: "article__weather-temp-max"})
            .html(`<span>최고 기온</span> ${this.getDegreeCelsius(data.temp.max)}°C`)

        const time = $("<p></p>", {class: "article__weather-sunrize"})
            .html(`<span>일출 시간</span> ${new Date(data.sunrise * 1000).toLocaleTimeString()}`)

        $("article img").eq(index)
            .after(windDegText, windSpeed, humidity, min, max, time);

        $(`<p>${this.getDegreeCelsius(data.temp.day)}°C</p>`)
            .addClass("temperature-text")
            .appendTo($("article").eq(index))

        try {
            // 습도 이미지를 동적으로 직접 그려냅니다.
            const waterDrop = new WaterDrop({fillRate: data.humidity * 0.01});
            waterDrop.on("load", src => {
                const img = new Image(50, 50);
                img.src = src;
                img.classList.add("fill-water-drop");
                img.title = `습도 ${data.humidity}%`;
                img.onload = () => {
                    $("article").eq(index).find(".article__weather-wind-deg").append(img);
                }
            });                
            waterDrop.start();   

            $(`<i class="fas fa-arrow-up"></i>`)
                .css("transform", `rotate(${data.wind_deg}deg)`)
                .appendTo(windDegText);

        } catch(e) {
            console.warn(e);
        }
               
    }
}

export {WeatherComponent};