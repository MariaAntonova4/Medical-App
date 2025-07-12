import { app } from "electron";
import { Menu } from "electron/main";

export function createMenu(){
    Menu.setApplicationMenu(Menu.buildFromTemplate([{
        label:"App",
        type:"submenu",
        submenu:[{
            label:"Quit",
            click:app.quit
        }]
    }]));
}