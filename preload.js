const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('ping', () => ipcRenderer.invoke('ping'))