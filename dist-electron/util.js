import { dialog, ipcMain } from "electron";
import { pathToFileURL } from "url";
import { getUIPath } from "./path-resolver.js";
export function isDev() {
    return process.env.NODE_ENV === "development";
}
export function ipcMainHandle(key, handler) {
    ipcMain.handle(key, (event, data) => {
        if (event.senderFrame === null) {
            throw new Error("Missing sender Frame.");
        }
        validateEventFrame(event.senderFrame);
        return handler(data);
    });
}
export function validateEventFrame(frame) {
    if (isDev() && new URL(frame.url).host === "localhost:5123") {
        return;
    }
    if (frame.url !== pathToFileURL(getUIPath()).toString()) {
        throw new Error("Malicious Event");
    }
}
export async function pickPhoto() {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [{ name: "Images", extensions: ["jpg", "png", "jpeg"] }],
    });
    if (canceled)
        return null;
    return filePaths[0];
}
