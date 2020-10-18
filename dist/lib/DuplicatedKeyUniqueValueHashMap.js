"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicatedKeyUniqueValueHashMap = void 0;
var typescriptcollectionsframework_1 = require("typescriptcollectionsframework");
var StringComparator_1 = require("./StringComparator");
var DuplicatedKeyUniqueValueHashMap = /** @class */ (function () {
    function DuplicatedKeyUniqueValueHashMap() {
        this.entity = new typescriptcollectionsframework_1.HashMap();
    }
    DuplicatedKeyUniqueValueHashMap.prototype.get = function (key) {
        return this.entity.get(key);
    };
    DuplicatedKeyUniqueValueHashMap.prototype.set = function (key, value) {
        var valList = new typescriptcollectionsframework_1.TreeSet(new StringComparator_1.StringComparator());
        valList.add(value);
        // preexisting values are removed and the new value is put.
        this.entity.put(key, valList);
    };
    DuplicatedKeyUniqueValueHashMap.prototype.put = function (key, value) {
        if (this.entity.containsKey(key)) {
            var vs = this.entity.get(key);
            if (vs.contains(value)) {
                return;
            }
            else {
                this.entity.get(key).add(value);
            }
        }
        else { // this map does not have the given key.
            var valList = new typescriptcollectionsframework_1.TreeSet(new StringComparator_1.StringComparator());
            valList.add(value);
            this.entity.put(key, valList);
        }
    };
    DuplicatedKeyUniqueValueHashMap.prototype.clear = function () {
        this.entity.clear();
    };
    DuplicatedKeyUniqueValueHashMap.prototype.containsKey = function (key) {
        return this.entity.containsKey(key);
    };
    DuplicatedKeyUniqueValueHashMap.prototype.getValues = function (key) {
        var result = [];
        var set = this.get(key);
        for (var iter = set.iterator(); iter.hasNext();) {
            result.push(iter.next());
        }
        return result;
    };
    DuplicatedKeyUniqueValueHashMap.prototype.isEmpty = function () {
        return this.entity.isEmpty();
    };
    DuplicatedKeyUniqueValueHashMap.prototype.keySet = function () {
        return this.entity.keySet();
    };
    DuplicatedKeyUniqueValueHashMap.prototype.size = function () {
        var result = 0;
        var ks = this.entity.keySet();
        for (var iter = ks.iterator(); iter.hasNext();) {
            var key = iter.next();
            var vs = this.entity.get(key);
            for (var iter2 = vs.iterator(); iter2.hasNext(); iter2.next()) {
                result++;
            }
        }
        return result;
    };
    return DuplicatedKeyUniqueValueHashMap;
}());
exports.DuplicatedKeyUniqueValueHashMap = DuplicatedKeyUniqueValueHashMap;
