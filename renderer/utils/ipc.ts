export default {
	get renderer() {
		const { ipcRenderer } = require('electron-better-ipc')

		return ipcRenderer
	}
}
