"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.db = exports.firebaseConfig = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
exports.firebaseConfig = {
    apiKey: "AIzaSyBVKECxc5lOkJLBl_Siv7MjBY7TiwFMeu0",
    authDomain: "tasks-app-b53c1.firebaseapp.com",
    projectId: "tasks-app-b53c1",
    storageBucket: "tasks-app-b53c1.appspot.com",
    messagingSenderId: "837347397183",
    appId: "1:837347397183:web:7459af4a625032b543b28a",
    measurementId: "G-TYQ8Z7H17C",
};
(0, app_1.initializeApp)(exports.firebaseConfig);
exports.db = (0, firestore_1.getFirestore)();
var routes_1 = require("./infrastructure/routes");
Object.defineProperty(exports, "api", { enumerable: true, get: function () { return routes_1.api; } });
//# sourceMappingURL=index.js.map