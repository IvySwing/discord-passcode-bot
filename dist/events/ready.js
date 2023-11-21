"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Events = require('discord.js').Events;
module.exports = {
    name: Events.ClientReady,
    once: true,
    execute: function (client) {
        console.log("Ready! Logged in as ".concat(client.user.tag));
        console.log("".concat(client.user.tag, " is ready!"));
    },
};
