const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
// importaciones de express
const config = require('./js/config')
const express = require('express');
const exp = express()
//process.evv.PORT ----> el sistema operativo asigna el puerto de forma variable

exp.set('json spaces', 2); // Permite la generacion de Json como res de express... eso creo
exp.use(express.json())
exp.use(express.urlencoded({ extended: false }))
exp.use(require('./routes/taxes'))
exp.use(require('./routes/categories'))
exp.use(require('./routes/products'))
exp.use(require('./routes/prices'))
exp.use(require('./routes/sales'))
exp.use(require('./routes/sales_details'))
exp.use(require('./routes/stocks'))
exp.use(require('./routes/orders'))
exp.use(require('./routes/orders_details'))
exp.use(require('./routes/deliveries'))





exp.get('/', (req, res) => {
    res.send('Server Work')
})


exp.listen(config.port,() => {
    console.log('app listening at http://localhost: ' + config.port);
})
///////
//app.commandLine.appendSwitch('ignore-gpu-blacklist')
/////////
//app.commandLine.appendSwitch('--no-sandbox')
/////////
app.setAccessibilitySupportEnabled = 'enable'
app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit()
})
// app.allowRendererProcessReuse = false


function createWindow(){
    var win = new BrowserWindow({
        //'web-preferences': {'web-security': false}
        //WebPreferencia permite la integración entre los Js y Node
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true,
            //webSecurity:false
        },
        width:1024,
        height:768,
   
        minHeight:600,
        minWidth:1080,
        show: false,
        autoHideMenuBar: true, // quita la barra del OS
        icon: __dirname + '/app.ico'
        // frame: false
    });
    //win.setFullScreen(true)
    win.loadURL(url.format({
       pathname: path.join(__dirname, 'index.html'),
       protocol: 'file',
       slashes: true
    }));
    
    var splash = new BrowserWindow({
        width: 500, 
        height: 375,  
        frame: false, 
        alwaysOnTop: true 
    })
    win.hide()

    splash.center()
    splash.loadURL(url.format({
        pathname: path.join(__dirname, 'splash.html'),
        protocol: 'file',
        slashes: true
    }));
    
    setTimeout(function () {
        splash.close();
        win.maximize()
        win.show();
    }, 6000); //6000


    win.on('closed', () =>{
        win = null;
    });
}