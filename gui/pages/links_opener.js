const shell = require('electron').shell;
  
// assuming $ is jQuery
$(document).on('click', 'a[href^="http"]', function(event) {
    event.preventDefault();
    shell.openExternal(this.href);
});

const { remote } = require("electron");
var win = remote.BrowserWindow.getFocusedWindow();

var title = document.querySelector("title").innerHTML;
document.querySelector("#titleshown").innerHTML = title;

var minimize = document.querySelector("#minimize");
var maximize = document.querySelector("#maximize");
var quit = document.querySelector("#quit");

minimize.addEventListener("click", () => {
  win.minimize();
});

maximize.addEventListener("click", () => {
  win.setFullScreen(!win.isFullScreen());
});

quit.addEventListener("click", () => {
  win.close();
});