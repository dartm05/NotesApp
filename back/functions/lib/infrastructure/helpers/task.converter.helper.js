"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskConverter = void 0;
exports.taskConverter = {
    toFirestore(task) {
        return task;
    },
    fromFirestore(snapshot) {
        const data = snapshot.data();
        return Object.assign(Object.assign({}, data), { id: snapshot.id });
    },
};
//# sourceMappingURL=task.converter.helper.js.map