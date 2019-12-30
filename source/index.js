const path = require('path')
const { app, BrowserWindow, Menu } = require('electron')
const { is, enforceMacOSAppLocation } = require('electron-util')
const unhandled = require('electron-unhandled')
const debug = require('electron-debug')
const contextMenu = require('electron-context-menu')
const menu = require('./menu')
const electronDl = require('electron-dl')
const prepareNext = require('electron-next')
const window = require('./window')
require('./ipc')

electronDl()
unhandled()
debug()
contextMenu()

// Note: Must match `build.appId` in package.json
app.setAppUserModelId('com.hbfocus.implan')

// Prevent window from being garbage collected
let mainWindow

const createMainWindow = window.createLoginWin

// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
	app.quit()
}

app.on('second-instance', () => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) {
			mainWindow.restore()
		}

		mainWindow.show()
	}
})

app.on('window-all-closed', () => {
	if (!is.macos) {
		app.quit()
	}
})

app.on('activate', async () => {
	if (!mainWindow) {
		mainWindow = await createMainWindow()
	}
})

;(async () => {
	await app.whenReady()

	enforceMacOSAppLocation()

	await prepareNext('./renderer')

	Menu.setApplicationMenu(menu)
	mainWindow = await createMainWindow()

	// const favoriteAnimal = config.get('favoriteAnimal');
	// mainWindow.webContents.executeJavaScript(`document.querySelector('header p').textContent = 'Your favorite animal is ${favoriteAnimal}'`);
})()

const isDev = require('electron-is-dev')

if (isDev) {
	console.log('Running in development')
} else {
	console.log('Running in production')
}
