"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _HelpDeskJS_compose;
Object.defineProperty(exports, "__esModule", { value: true });
const connector_1 = __importDefault(require("$modules/connector"));
const compose_1 = __importDefault(require("$src/compose"));
const modules_1 = require("$src/enums/modules");
class HelpDeskJS {
    constructor(config) {
        _HelpDeskJS_compose.set(this, void 0);
        this.config = config;
        this.modules = new connector_1.default();
        this.initCompose();
    }
    initCompose() {
        __classPrivateFieldSet(this, _HelpDeskJS_compose, new compose_1.default(), "f");
        __classPrivateFieldGet(this, _HelpDeskJS_compose, "f").setConfig(this.config);
        this.modules.connect(modules_1.Modules.Http);
    }
}
_HelpDeskJS_compose = new WeakMap();
exports.default = HelpDeskJS;
