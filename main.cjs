const {app,BrowserWindow,ipcMain,Notification,powerMonitor,shell}=require('electron');const path=require('path'),fs=require('fs');let win,mini,latestMini,closingAll=false,positionTimer,rendererReady=false,firstPaint=false,miniLayoutApplied,trayControls;const startInTray=process.argv.includes('--startup');
const radioHost=require('./radio.cjs')({getWindow:()=>win,ipcMain});
app.setName('Tomatito Estudio Work');app.setPath('userData',path.join(app.getPath('appData'),'Tomatito-Estudio-Work'));app.setAppUserModelId('com.jazmin.tomatito.studiowork');const defaultRadio='rFZHOHl-L8A';const validId=id=>typeof id==='string'&&/^[A-Za-z0-9_-]{11}$/.test(id);
const ownsInstance=app.requestSingleInstanceLock();if(!ownsInstance){app.quit()}else{
app.on('second-instance',(_event,args)=>{if(!args.includes('--startup'))trayControls?.open()});
app.on('before-quit',()=>{closingAll=true});
app.on('will-quit',()=>trayControls?.destroy());
app.whenReady().then(()=>{win=new BrowserWindow({show:false,width:860,height:900,minWidth:720,minHeight:650,icon:path.join(__dirname,'icon.png'),backgroundColor:'#fff6e8',autoHideMenuBar:true,title:'Tomatito · Normal, Estudio & Work',webPreferences:{preload:path.join(__dirname,'preload.cjs'),contextIsolation:true,nodeIntegration:false,sandbox:true,autoplayPolicy:'no-user-gesture-required',backgroundThrottling:false}});if(process.platform==='win32')win.setAppDetails({appId:'com.jazmin.tomatito.studiowork',appIconPath:process.execPath,appIconIndex:0,relaunchCommand:'"'+process.execPath+'"',relaunchDisplayName:'Tomatito'});trayControls=require('./tray.cjs')({getWindow:()=>win,getMini:()=>mini,onQuit:()=>app.quit()});win.on('close',event=>{if(!closingAll){event.preventDefault();mini?.hide();win.hide()}});win.once('ready-to-show',()=>{firstPaint=true;showReadyWindow()});win.loadFile('index.html');win.webContents.setWindowOpenHandler(()=>({action:'deny'}));win.webContents.on('will-navigate',e=>e.preventDefault());powerMonitor.on('resume',()=>win?.webContents.send('resume'));win.on('minimize',showMini);win.on('restore',()=>mini?.hide());win.on('closed',()=>{closingAll=true;mini?.destroy();radioHost.close();win=null;});});
ipcMain.handle('pin',(_,value)=>win?.setAlwaysOnTop(Boolean(value)));
ipcMain.handle('notify',(_,body)=>{if(Notification.isSupported())new Notification({title:'Tomatito 🍅',body:String(body)}).show();});
ipcMain.handle('youtube',(_,id=defaultRadio)=>{if(!validId(id))throw new Error('Invalid video');return shell.openExternal('https://www.youtube.com/watch?v='+id);});
app.on('window-all-closed',()=>app.quit());

function showMini(){if(!win)return;if(mini&&!mini.isDestroyed()){mini.showInactive();return}const {screen}=require('electron');const area=screen.getDisplayMatching(win.getBounds()).workArea;let bounds;try{bounds=JSON.parse(fs.readFileSync(path.join(app.getPath('userData'),'mini-position.json'),'utf8'))}catch{}const [width,height]=miniDimensions(latestMini?.miniScale,latestMini?.phase);let x=Number.isFinite(bounds?.x)?bounds.x:area.x+area.width-width-24,y=Number.isFinite(bounds?.y)?bounds.y:area.y+area.height-height-24;const display=screen.getDisplayMatching({x,y,width,height}).workArea;x=Math.max(display.x,Math.min(x,display.x+display.width-width));y=Math.max(display.y,Math.min(y,display.y+display.height-height));miniLayoutApplied=miniLayoutKey(latestMini);mini=new BrowserWindow({width,height,x,y,useContentSize:true,frame:false,transparent:true,thickFrame:false,hasShadow:false,resizable:false,maximizable:false,minimizable:false,alwaysOnTop:true,skipTaskbar:true,show:false,backgroundColor:'#00000000',title:'Tomatito mini',webPreferences:{preload:path.join(__dirname,'preload.cjs'),contextIsolation:true,nodeIntegration:false,sandbox:true,backgroundThrottling:false}});mini.loadFile('mini.html');mini.webContents.setWindowOpenHandler(()=>({action:'deny'}));mini.webContents.on('will-navigate',e=>e.preventDefault());mini.once('ready-to-show',()=>{mini.setOpacity(Math.max(.45,Math.min(1,Number(latestMini?.miniOpacity||100)/100)));if(latestMini)mini.webContents.send('mini-state',latestMini);if(win?.isMinimized())mini.showInactive()});mini.on('moved',()=>{clearTimeout(positionTimer);positionTimer=setTimeout(()=>{if(mini&&!mini.isDestroyed()){const {x,y}=mini.getBounds();fs.writeFileSync(path.join(app.getPath('userData'),'mini-position.json'),JSON.stringify({x,y}))}},200)});mini.on('closed',()=>{mini=null;if(!closingAll&&win?.isMinimized())win.restore()})}
ipcMain.on('mini-state',(event,state)=>{if(event.sender!==win?.webContents)return;latestMini=state;if(mini&&!mini.isDestroyed()){const layout=miniLayoutKey(state);if(layout!==miniLayoutApplied){miniLayoutApplied=layout;const [width,height]=miniDimensions(state.miniScale,state.phase);mini.setContentSize(width,height);const {screen}=require('electron'),b=mini.getBounds(),area=screen.getDisplayMatching(b).workArea;mini.setPosition(Math.max(area.x,Math.min(b.x,area.x+area.width-b.width)),Math.max(area.y,Math.min(b.y,area.y+area.height-b.height)))}const opacity=Math.max(.45,Math.min(1,Number(state.miniOpacity||100)/100));if(mini.getOpacity()!==opacity)mini.setOpacity(opacity);mini.webContents.send('mini-state',state)}});
ipcMain.handle('mini-action',(event,action)=>{if(event.sender!==mini?.webContents)return;if(action==='restore'){win?.restore();win?.show();win?.focus();mini?.hide()}else if(action==='toggle')win?.webContents.send('mini-action','toggle')});

ipcMain.handle('alert-fallback',event=>{if(event.sender===win?.webContents)shell.beep()});

function miniDimensions(scale,phase){const [width,height]=scale==='small'?[226,52]:scale==='large'?[290,70]:[250,60];return [width,height+(['short','long'].includes(phase)?34:0)]}






function showReadyWindow(){if(rendererReady&&firstPaint&&win&&!win.isDestroyed()&&!startInTray)win.show()}
ipcMain.on('app-ready',event=>{if(event.sender!==win?.webContents)return;rendererReady=true;showReadyWindow()});

function normalizeMiniScale(scale){return scale==='small'||scale==='large'?scale:'normal'}

function miniLayoutKey(state){return normalizeMiniScale(state?.miniScale)+'-'+(['short','long'].includes(state?.phase)?'rest':'focus')}

}
