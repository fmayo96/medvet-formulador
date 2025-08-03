"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __importDefault(require("electron"));
electron_1.default.contextBridge.exposeInMainWorld("electron", {
    hi: (data) => ipcInvoke("hi", data),
});
function ipcInvoke(key, arg) {
    return electron_1.default.ipcRenderer.invoke(key, arg);
}
