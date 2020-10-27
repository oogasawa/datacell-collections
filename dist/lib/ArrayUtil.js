"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array_isSubset = void 0;
/** Check if an array a1 is a subset of an array a2, compared as unordered sets.
 *
 * @param a1
 * @param a2
 */
function array_isSubset(a1, a2) {
    var s2 = new Set();
    for (var i = 0; i < a2.length; i++) {
        s2.add(a2[i]);
    }
    for (var i = 0; i < a1.length; i++) {
        if (!s2.has(a1[i])) {
            return false;
        }
    }
    return true;
}
exports.array_isSubset = array_isSubset;
