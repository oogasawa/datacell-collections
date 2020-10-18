"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringComparator = void 0;
var StringComparator = /** @class */ (function () {
    function StringComparator() {
    }
    StringComparator.prototype.compare = function (o1, o2) {
        var s1 = JSON.stringify(o1);
        var s2 = JSON.stringify(o2);
        if (s1 == s2) {
            return 0;
        }
        else if (s1 > s2) {
            return 1;
        }
        else {
            return -1;
        }
    };
    return StringComparator;
}());
exports.StringComparator = StringComparator;
