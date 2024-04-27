//импорт двух модулей Electron (app и BrowserWindow)
const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");

//функция createWindow() загружает веб-страницу в новый экземпляр BrowserWindow
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

//вызов функции, когда приложение готово к работе
app.whenReady().then(() => {
  createWindow();

  //открытие окна, если ни одно не открыто (для MacOS)
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      ipcMain.handle("ping", () => "pong");
      createWindow();
    }
  });
});

//выход из приложения, если все окна закрыты (для Windows и Linux)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
