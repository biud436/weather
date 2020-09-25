function getApiSrc(loc) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=f5f963901bc7a7df56b73323ca00ae47`
};

function loadKR() {
    $.getJSON("data/kr.json", (data) => {

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

function loadJson(url) {
    try {
        $.getJSON(url,
            /**
             * @param {type} */
            (data) => {
                var sys = data.sys;
                var city = data.name;
                var main = data.main;
                var wmain = data.weather[0].main;
                var w_id = data.weather[0].id;
                var icon = data.weather[0].icon;
                var country = sys.country;
                var temp = main.temp;
                var temp_min = main.temp_min;
                var temp_max = main.temp_max;

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

navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=f5f963901bc7a7df56b73323ca00ae47`;
    loadJson(url);
    loadKR();

}, (error) => {
    document.write("<h1>위치 정보 권한을 허용하여 주시기 바랍니다.</h1>");
});

function update(dt) {
    $("#weather_info").css("background-position", (dt * 0.007) + "px");

    window.requestAnimationFrame(update);
}

update();
