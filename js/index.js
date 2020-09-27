import App from "./App.js";

const entryPoint = new App();

Object.assign(window, {
    app: entryPoint
});

function startMainLoop(dt) {
    entryPoint.emit("update", dt);
    window.requestAnimationFrame(startMainLoop);
}

entryPoint.start();
startMainLoop();