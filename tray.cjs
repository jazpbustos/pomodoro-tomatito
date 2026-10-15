const {app,Tray,Menu}=require('electron');const fs=require('fs'),path=require('path');
module.exports=({getWindow,getMini,onQuit})=>{
 const tray=new Tray(path.join(__dirname,'icon.ico'));
 const loginArgs=['--startup'],loginOptions={path:process.execPath,args:loginArgs};
 const preferenceFile=path.join(app.getPath('userData'),'startup-settings.json');
 if(process.platform==='win32'&&app.isPackaged&&!fs.existsSync(preferenceFile)){app.setLoginItemSettings({...loginOptions,openAtLogin:true});fs.writeFileSync(preferenceFile,JSON.stringify({configured:true}))}
 const open=()=>{const win=getWindow();if(!win||win.isDestroyed())return;if(win.isMinimized())win.restore();win.show();win.focus();getMini()?.hide()};
 function refresh(){const win=getWindow();tray.setContextMenu(Menu.buildFromTemplate([
  {label:'Abrir Tomatito',click:open},
  {label:'Mostrar mini',click:()=>{if(win&&!win.isDestroyed())win.minimize()}},
  {label:'Pausar / reanudar',click:()=>win?.webContents.send('mini-action','toggle')},
  {type:'separator'},
  {label:'Iniciar con Windows',type:'checkbox',enabled:process.platform==='win32'&&app.isPackaged,checked:process.platform==='win32'&&app.isPackaged?app.getLoginItemSettings(loginOptions).openAtLogin:false,click:item=>app.setLoginItemSettings({...loginOptions,openAtLogin:item.checked})},
  {type:'separator'},
  {label:'Salir de Tomatito',click:onQuit}
 ]))}
 tray.setToolTip('Tomatito · Normal, Estudio y Work');tray.on('click',open);tray.on('double-click',open);tray.on('right-click',refresh);refresh();
 return {open,destroy:()=>tray.destroy()}
};
