"use strict";
const message = `${new Date().toISOString()} TypeScript compiled`;
document.title = message;
document.body.appendChild(document.createTextNode(message));
