"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRepository = void 0;
class AbstractRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(item) {
        const document = await this.model.create(item);
        return await document.save();
    }
    async getOne(filter, projection, options) {
        return await this.model.findOne(filter, projection, options);
    }
    async exist(filter, projection, options) {
        return await this.model.findOne(filter, projection, options);
    }
    async updated(filter, item, options) {
        await this.model.updateOne(filter, item, options);
    }
    async delete(filter, options) {
        await this.model.deleteOne(filter, options);
    }
}
exports.AbstractRepository = AbstractRepository;
//# sourceMappingURL=abstract.repository.js.map