const { ipcMain: ipc } = require('electron-better-ipc')
const window = require('./window')

ipc.answerRenderer('createMainWin', async emojiName => {
	await window.createMainWin()
	return true
})
