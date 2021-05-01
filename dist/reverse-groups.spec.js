"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const reverse_groups_1 = require("./reverse-groups");
describe(`reverse`, () => {
    const dl = [
        {
            id: "dl-id1",
            users: ["user-id1"],
            childs: ["dl-id2"],
        },
        {
            id: "dl-id2",
            users: ["user-id2"],
            childs: ["dl-id3"],
        },
        {
            id: "dl-id3",
            users: ["user-id3"],
            childs: [],
        },
        {
            id: "dl-id4",
            users: ["user-id4"],
            childs: ["dl-id1"],
        },
    ];
    beforeEach(function () { });
    afterEach(function () { });
    it("basic reverse", () => __awaiter(void 0, void 0, void 0, function* () {
        const reverse = new reverse_groups_1.ReverseGroups(dl).getReversedGroups();
        chai_1.expect(reverse.get("dl-id1")).to.have.same.members([]);
        chai_1.expect(reverse.get("dl-id2")).to.have.same.members(["dl-id1"]);
        chai_1.expect(reverse.get("dl-id3")).to.have.same.members(["dl-id2"]);
    }));
});
//# sourceMappingURL=reverse-groups.spec.js.map