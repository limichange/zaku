/**
 * updater.js
 *
 * Please use manual update only when it is really required, otherwise please use recommended non-intrusive auto update.
 *
 * Import steps:
 * 1. create `updater.js` for the code snippet
 * 2. require `updater.js` for menu implementation, and set `checkForUpdates` callback from `updater` for the click property of `Check Updates...` MenuItem.
 */
const { dialog } = require('electron')
const { autoUpdater } = require('electron-updater')
const { is } = require('electron-util')

if (!is.development) {
	const FOUR_HOURS = 1000 * 60 * 60 * 4
	
	setInterval(() => {
		autoUpdater.checkForUpdates()
	}, FOUR_HOURS)

	autoUpdater.checkForUpdates()
}

// let updater
autoUpdater.autoDownload = false

autoUpdater.setFeedURL({
	provider: 'generic',
	url: 'http://127.0.0.1:8080/'
})

autoUpdater.on('error', error => {
	dialog.showErrorBox(
		'Error: ',
		error == null ? 'unknown' : (error.stack || error).toString()
	)
})

autoUpdater.on('update-available', () => {
	dialog.showMessageBox(
		{
			type: 'info',
			title: '软件更新',
			message: '发现新的版本，需要更新吗？',
			buttons: ['好的', '取消']
		},
		buttonIndex => {
			if (buttonIndex === 0) {
				autoUpdater.downloadUpdate()
			}
		}
	)
})

autoUpdater.on('update-not-available', () => {
	dialog.showMessageBox({
		title: '暂无更新',
		message: '当前已经是最新版本'
	})
})

autoUpdater.on('update-downloaded', () => {
	dialog.showMessageBox(
		{
			title: '安装更新',
			message: '更新已经下载完毕，现在重启程序'
		},
		() => {
			setImmediate(() => autoUpdater.quitAndInstall())
		}
	)
})

// export this to MenuItem click callback
function checkForUpdates(menuItem, focusedWindow, event) {
	autoUpdater.checkForUpdates()
}

module.exports.checkForUpdates = checkForUpdates

// autoUpdater.on('checking-for-update', function () {
//     sendStatusToWindow('Checking for update...');
// });

// autoUpdater.on('update-available', function (info) {
//     sendStatusToWindow('Update available.');
// });

// autoUpdater.on('update-not-available', function (info) {
//     sendStatusToWindow('Update not available.');
// });

// autoUpdater.on('error', function (err) {
//     sendStatusToWindow('Error in auto-updater.');
// });

// autoUpdater.on('download-progress', function (progressObj) {
//     let log_message = "Download speed: " + progressObj.bytesPerSecond;
//     log_message = log_message + ' - Downloaded ' + parseInt(progressObj.percent) + '%';
//     log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
//     sendStatusToWindow(log_message);
// });

// autoUpdater.on('update-downloaded', function (info) {
//     sendStatusToWindow('Update downloaded; will install in 1 seconds');
// });

// autoUpdater.on('update-downloaded', function (info) {
//     setTimeout(function () {
//         autoUpdater.quitAndInstall();
//     }, 1000);
// });

// // autoUpdater.checkForUpdates();
// autoUpdater.checkForUpdatesAndNotify()

// function sendStatusToWindow(message) {
//     console.log(message);
// }
