"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var e_1, _a, e_2, _b;
Object.defineProperty(exports, "__esModule", { value: true });
// Require the necessary discord.js classes
var fs = __importStar(require("node:fs"));
var path = __importStar(require("node:path"));
var discord_js_1 = require("discord.js");
require('dotenv').config();
// Create a new client instance
var Guilds = discord_js_1.GatewayIntentBits.Guilds, GuildMessages = discord_js_1.GatewayIntentBits.GuildMessages, GuildMessageReactions = discord_js_1.GatewayIntentBits.GuildMessageReactions;
var client = new discord_js_1.Client({
    intents: [Guilds, GuildMessages, GuildMessageReactions],
});
var customClient = client;
customClient.commands = new discord_js_1.Collection();
var commandsPath = path.join(__dirname, 'commands');
var commandFiles = fs
    .readdirSync(commandsPath)
    .filter(function (file) { return file.endsWith('.ts') || file.endsWith('.js'); });
try {
    for (var commandFiles_1 = __values(commandFiles), commandFiles_1_1 = commandFiles_1.next(); !commandFiles_1_1.done; commandFiles_1_1 = commandFiles_1.next()) {
        var file = commandFiles_1_1.value;
        var filePath = path.join(commandsPath, file);
        var command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            customClient.commands.set(command.data.name, command);
        }
        else {
            console.log("[WARNING] The command at ".concat(filePath, " is missing a required \"data\" or \"execute\" property."));
        }
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (commandFiles_1_1 && !commandFiles_1_1.done && (_a = commandFiles_1.return)) _a.call(commandFiles_1);
    }
    finally { if (e_1) throw e_1.error; }
}
var eventsPath = path.join(__dirname, 'events');
var eventFiles = fs
    .readdirSync(eventsPath)
    .filter(function (file) { return file.endsWith('.ts') || file.endsWith('.js'); });
var _loop_1 = function (file) {
    var filePath = path.join(eventsPath, file);
    var event = require(filePath);
    if (event.once) {
        client.once(event.name, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return event.execute.apply(event, __spreadArray([], __read(args), false));
        });
    }
    else {
        client.on(event.name, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return event.execute.apply(event, __spreadArray([], __read(args), false));
        });
    }
};
try {
    for (var eventFiles_1 = __values(eventFiles), eventFiles_1_1 = eventFiles_1.next(); !eventFiles_1_1.done; eventFiles_1_1 = eventFiles_1.next()) {
        var file = eventFiles_1_1.value;
        _loop_1(file);
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try {
        if (eventFiles_1_1 && !eventFiles_1_1.done && (_b = eventFiles_1.return)) _b.call(eventFiles_1);
    }
    finally { if (e_2) throw e_2.error; }
}
// Log in to Discord with your client's token
client.login(process.env.token);
