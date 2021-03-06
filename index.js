// const electron = require("electron");
const { app, BrowserWindow, Tray, Notification } = require("electron");
const path = require("path");
const nativeImage = require("electron").nativeImage;

let win = null;
function createWindow() {
    // Create the browser window.
    const imagePath = path.join(__dirname, `/icons/icon_1024x1024.png.icns`);
    let image = nativeImage.createFromPath(imagePath);

    // console.log(path.join(__dirname, `/icons/png/icon_1024x1024.png`));
    // console.log(image);

    const options = {
        width: 800,
        height: 600,
        icon: imagePath,
        title: "Android Messages",
        fullScreen: true,
        frame: false,
        enableRemoteModule: true
    };

    win = new BrowserWindow(options);
    win.setIcon(image);
    win.loadURL("https://messages.android.com");
    let myNotification = new Notification("Title", {
        body: "Lorem Ipsum Dolor Sit Amet"
    });
    myNotification.show();
    // Open the DevTools.
    // win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.dock.setIcon(path.join(__dirname, `/icons/png/icon_1024x1024.png`));

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
