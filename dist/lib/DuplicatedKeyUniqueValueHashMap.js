"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicatedKeyUniqueValueHashMap = void 0;
var DuplicatedKeyUniqueValueHashMap = /** @class */ (function () {
    function DuplicatedKeyUniqueValueHashMap() {
        this.entity = new Map();
    }
    DuplicatedKeyUniqueValueHashMap.prototype.get = function (key) {
        return this.entity.get(key);
    };
    DuplicatedKeyUniqueValueHashMap.prototype.put = function (key, value) {
        if (this.entity.has(key)) {
            var vs = this.entity.get(key);
            if (vs.has(value)) {
                return;
            }
            else {
                this.entity.get(key).add(value);
            }
        }
        else { // this map does not have the given key.
            var valList = new Set();
            valList.add(value);
            this.entity.set(key, valList);
        }
    };
    DuplicatedKeyUniqueValueHashMap.prototype.clear = function () {
        this.entity.clear();
    };
    DuplicatedKeyUniqueValueHashMap.prototype.containsKey = function (key) {
        return this.entity.has(key);
    };
    DuplicatedKeyUniqueValueHashMap.prototype.getValues = function (key) {
        var result = [];
        var set = this.get(key);
        set.forEach(function (elem) {
            result.push(elem);
        });
        return result;
    };
    DuplicatedKeyUniqueValueHashMap.prototype.isEmpty = function () {
        return this.entity.size === 0;
    };
    DuplicatedKeyUniqueValueHashMap.prototype.keySet = function () {
        var result = new Set();
        var iter = this.entity.keys();
        var obj = iter.next();
        while (!obj.done) {
            result.add(obj.value);
            obj = iter.next();
        }
        return result;
    };
    DuplicatedKeyUniqueValueHashMap.prototype.removeKey = function (key) {
        this.entity.delete(key);
    };
    /** Returns a number of (key, value) pairs in this map.
     */
    DuplicatedKeyUniqueValueHashMap.prototype.size = function () {
        var _this = this;
        var counter = 0;
        this.entity.forEach(function (v, k, m) {
            _this.entity.get(k).forEach(function (val) {
                counter++;
            });
        });
        return counter;
    };
    return DuplicatedKeyUniqueValueHashMap;
}());
exports.DuplicatedKeyUniqueValueHashMap = DuplicatedKeyUniqueValueHashMap;
