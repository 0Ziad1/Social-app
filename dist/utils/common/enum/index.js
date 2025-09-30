"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REACTION = exports.GENDER = exports.SYS_ROLES = exports.USER_AGENT = void 0;
var USER_AGENT;
(function (USER_AGENT) {
    USER_AGENT["local"] = "local";
    USER_AGENT["google"] = "google";
})(USER_AGENT || (exports.USER_AGENT = USER_AGENT = {}));
var SYS_ROLES;
(function (SYS_ROLES) {
    SYS_ROLES["user"] = "user";
    SYS_ROLES["admin"] = "admin";
    SYS_ROLES["superAdmin"] = "superAdmin";
})(SYS_ROLES || (exports.SYS_ROLES = SYS_ROLES = {}));
var GENDER;
(function (GENDER) {
    GENDER["male"] = "male";
    GENDER["female"] = "female";
})(GENDER || (exports.GENDER = GENDER = {}));
var REACTION;
(function (REACTION) {
    REACTION[REACTION["like"] = 0] = "like";
    REACTION[REACTION["care"] = 1] = "care";
    REACTION[REACTION["love"] = 2] = "love";
    REACTION[REACTION["angry"] = 3] = "angry";
    REACTION[REACTION["sad"] = 4] = "sad";
})(REACTION || (exports.REACTION = REACTION = {}));
//# sourceMappingURL=index.js.map