const { app, BrowserWindow, Menu } = require('electron')
const loadRoute = require('../utils/routes')

exports.createMainWin = async () => {
  const win = new BrowserWindow({
    title: 'zaku',
    show: false,
    width: 1000,
    height: 800,
    // titleBarStyle: 'hidden',
    // resizable: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })

  win.on('ready-to-show', () => {
    win.show()
  })

  loadRoute(win, 'main')

  return win
}
