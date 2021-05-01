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
exports.convert = void 0;
const reverse_groups_1 = require("./reverse-groups");
const _ = __importStar(require("lodash"));
function convert(dl, users) {
    const upnToGroups = new Map();
    const usersMap = new Map();
    const reverse = new reverse_groups_1.ReverseGroups(dl).getReversedGroups();
    users.map((user) => {
        usersMap.set(user.id, user.upn);
    });
    dl.map((dl) => {
        dl.users.map((user) => {
            const upn = usersMap.get(user);
            const currentGroups = upnToGroups.get(upn);
            upnToGroups.set(upn, _.uniq(_.concat(currentGroups, dl.id)));
        });
    });
    for (let key of upnToGroups.keys()) {
        const groups = upnToGroups.get(key);
        let temp = groups;
        for (let group of groups) {
            temp = _.uniq(_.concat(temp, reverse.get(group)));
        }
        temp = temp.filter((val) => {
            return val !== undefined && val !== null;
        });
        upnToGroups.set(key, temp);
    }
    return upnToGroups;
}
exports.convert = convert;
//# sourceMappingURL=convert.js.map