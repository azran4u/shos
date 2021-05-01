"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReverseGroups = void 0;
const _ = __importStar(require("lodash"));
class ReverseGroups {
    constructor(dl) {
        this.dl = dl;
        this.reversedGroups = new Map();
        this.all();
    }
    getReversedGroups() {
        return this.reversedGroups;
    }
    reverse() {
        this.dl.map((dl) => {
            this.reversedGroups.set(dl.id, []);
        });
        this.dl.map((dl) => {
            dl.childs.map((child) => {
                const currentFathers = this.reversedGroups.get(child);
                this.reversedGroups.set(child, _.uniq(_.concat(currentFathers, dl.id)));
            });
        });
    }
    recursive(id) {
        const currentFathers = this.reversedGroups.get(id);
        if (_.isEmpty(currentFathers)) {
            return [];
        }
        let temp = [];
        for (let id of currentFathers) {
            temp = _.uniq(_.concat(temp, id, this.recursive(id)));
        }
        return temp;
    }
    all() {
        this.reverse();
        for (let key of this.reversedGroups.keys()) {
            const currentFathers = this.reversedGroups.get(key);
            this.reversedGroups.set(key, _.uniq(_.concat(currentFathers, this.recursive(key))));
        }
    }
}
exports.ReverseGroups = ReverseGroups;
//# sourceMappingURL=reverse-groups.js.map