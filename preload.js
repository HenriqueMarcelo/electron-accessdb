const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('executeSQL', (sql) => ipcRenderer.invoke('executeSQL', sql))