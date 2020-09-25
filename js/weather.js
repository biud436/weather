function getApiSrc(loc) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=f5f963901bc7a7df56b73323ca00ae47`
};

function loadKR() {
    $.getJSON("./data/kr.json", (data) => {

        const sel = $("<select></select>", {
            name: "wow"
        });
        $("#weather_info section aside").after(sel).css("position", "relative");

        data.forEach(e => {
            console.log(e.name);
            const opt = $("<option></option")
                .val(e.name)
                .html(e.name)
                .attr("coord", JSON.stringify(e.coord));
            sel.append(opt);
        });

        sel.on("change", (ev) => {
            const coord = $("option:selected").attr("coord");

            const myCoord = JSON.parse(coord);
            const lat = myCoord.lat;
            const lng = myCoord.lon;
            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=f5f963901bc7a7df56b73323ca00ae47`;

            loadJson(url);

        });
    });
}

/**
 * Load the data from the server.
 * @param {String}} url 
 */
function loadJson(url) {
    try {
        $.getJSON(url,
            /**
             * @param {type} */
            (data) => {
                const sys = data.sys;
                const city = data.name;
                const main = data.main;
                const wmain = data.weather[0].main;
                const w_id = data.weather[0].id;
                const icon = data.weather[0].icon;
                const country = sys.country;
                const temp = main.temp;
                const temp_min = main.temp_min;
                const temp_max = main.temp_max;

                $(".city").text(`${city}/${country}`);
                $("p.icon").text(wmain);
                $("figure.icon").empty();
                $("figure.icon").append(`<img src="https://openweathermap.org/img/wn/${icon}@4x.png">`);
                $("p.temp").text((temp - 273.15 >> 0) + "°");
                $("p.temp_max").html(Math.floor(temp_max - 273.15) + "&deg max");
                $("p.temp_min").text(Math.floor(temp_min - 273.15) + "° max");

                const children = Array.from($("select").children());
                const currentIndex = $(children.filter(i => i.innerHTML.indexOf(city) >= 0)[0]).index();
                $("select")[0].selectedIndex = currentIndex;

            });
    } catch (e) {
        console.warn(e);
    }
};

// 위치 정보 획득
navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=f5f963901bc7a7df56b73323ca00ae47`;
    loadJson(url);
    loadKR();

}, (error) => {
    loadJson(getApiSrc("Seoul"));
    loadKR();
});

function update(dt) {
    $("#weather_info").css("background-position", (dt * 0.007) + "px");

    window.requestAnimationFrame(update);
}

update();


class App {
    constructor() {

    }

    load(src) {
        return new Promise((reslve, reject) => {

        });
    }

    async loadData() {
        await this.load().then(data => {

        }).catch(err => {
            console.warn(err);
        })
    }
}