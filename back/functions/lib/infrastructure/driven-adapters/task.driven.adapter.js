"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDrivenAdapter = void 0;
const index_1 = require("../../index");
class TaskDrivenAdapter {
    async create(userId, task) {
        await index_1.db.collection("users").doc(userId).collection("tasks").add(task);
    }
    async findAll(userId) {
        const querySnapshot = await index_1.db
            .collection("users")
            .doc(userId)
            .collection("tasks")
            .get();
        return querySnapshot.docs.map((doc) => {
            return Object.assign(Object.assign({}, doc.data()), { id: doc.id });
        });
    }
    async findOne(userId, id) {
        const querySnapshot = await index_1.db
            .collection("users")
            .doc(userId)
            .collection("tasks")
            .doc(id)
            .get();
        return querySnapshot.data();
    }
    async update(userId, id, task) {
        await index_1.db
            .collection("users")
            .doc(userId)
            .collection("tasks")
            .doc(id)
            .update(Object.assign({}, task));
    }
    async remove(userId, id) {
        await index_1.db
            .collection("users")
            .doc(userId)
            .collection("tasks")
            .doc(id)
            .delete();
    }
    async removeAll(userId) {
        const querySnapshot = await index_1.db
            .collection("users")
            .doc(userId)
            .collection("tasks")
            .get();
        querySnapshot.docs.forEach((doc) => doc.ref.delete());
    }
}
exports.TaskDrivenAdapter = TaskDrivenAdapter;
//# sourceMappingURL=task.driven.adapter.js.map