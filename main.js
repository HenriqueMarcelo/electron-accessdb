const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

const ADODB = require('node-adodb');

if (app.isPackaged) {
    ADODB.PATH = "./resources/adodb.js";
}

const connection = ADODB.open(
    'Provider=Microsoft.Jet.OLEDB.4.0;' +
    'Data Source=C:\\MGMobile\\Gestor\\Gestor.mdb;'
);

async function executeSQL(sql) {
    try {
        const result = await connection.query(sql);
        return result;
    } catch (err) {
        console.error('Erro ao executar SQL:', sql, err);
        throw err;
    }
}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    ipcMain.handle('executeSQL', async (_event, sql) => {
        return await executeSQL(sql);
    })

    createWindow()
})