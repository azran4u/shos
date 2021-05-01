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
const convert_1 = require("./convert");
describe(`convert`, () => {
    const users = [
        {
            id: "user-id1",
            upn: "upn1",
        },
        {
            id: "user-id2",
            upn: "upn2",
        },
        {
            id: "user-id3",
            upn: "upn3",
        },
    ];
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
    ];
    beforeEach(function () { });
    afterEach(function () { });
    it("basic conversion", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = convert_1.convert(dl, users);
        chai_1.expect(res.get("upn1")).to.eq(["dl-id1"]);
        chai_1.expect(res.get("upn2")).to.eq(["dl-id1", "dl-id2"]);
        chai_1.expect(res.get("upn3")).to.eq(["dl-id1", "dl-id2", "dl-id3"]);
    }));
});
//# sourceMappingURL=convert.spec.js.map