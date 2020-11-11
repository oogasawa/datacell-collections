
import { DuplicatedKeyUniqueValueHashMap } from "../../src/lib/DuplicatedKeyUniqueValueHashMap";
import * as arraylib from "datacell-arraylib";

import * as log4js from "log4js";
const logger = log4js.getLogger();




describe('DuplicatedKeyUniqueValueHashMap', () => {

    describe("constructor", () => {
        it('should create an empty hashmap.', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            expect(hashmap.isEmpty()).toEqual(true);
            expect(hashmap.size()).toEqual(0);
        });

    });


    describe("put", () => {
        it('should accept both DataCells of differet keys.', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            hashmap.put("A001", "value1");
            hashmap.put("A002", "value1");
            expect(hashmap.size()).toEqual(2);
        });



        it('should accept both DataCells of different values.', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            hashmap.put("A001", "value1");
            hashmap.put("A001", "value2");


            // logger.level = "debug";
            hashmap.keySet().forEach((k) => {
                hashmap.get(k).forEach((v) => {
                    logger.debug(k + "\t" + v);
                })
            });
            logger.level = "error";
            expect(hashmap.size()).toEqual(2);
        });

        it('should reject DataCells with the same key / value.', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            hashmap.put("A001", "value1");
            expect(hashmap.size()).toEqual(1);
            hashmap.put("A001", "value2");
            expect(hashmap.size()).toEqual(2);
            hashmap.put("A001", "value1");
            expect(hashmap.size()).toEqual(2);
            hashmap.put("A001", "value2");
            expect(hashmap.size()).toEqual(2);
        });

    });



    describe("clear", () => {
        it('should remove all key-values from the hashmap.', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            hashmap.put("A001", "value1");
            hashmap.put("A002", "value1");
            hashmap.put("A001", "value2");
            hashmap.put("A002", "value2");

            expect(hashmap.size()).toEqual(4);

            hashmap.clear();
            expect(hashmap.size()).toEqual(0);

            hashmap.put("A001", "value1");
            hashmap.put("A002", "value1");
            hashmap.put("A001", "value2");

            expect(hashmap.size()).toEqual(3);

        });

    });


    describe("containsKey", () => {
        it('should return if given key is contained in the hashmap.', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            hashmap.put("A001", "value1");
            hashmap.put("A002", "value1");
            hashmap.put("A001", "value2");
            hashmap.put("A002", "value2");

            expect(hashmap.containsKey("A001")).toBeTruthy;
            expect(hashmap.containsKey("A002")).toBeTruthy;
            expect(hashmap.containsKey("A003")).toBeFalsy;

        });

    });

    describe("getValues", () => {
        it('should return values corresponding to the given key as a string array.', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            hashmap.put("A001", "value1");
            hashmap.put("A002", "value1");
            hashmap.put("A001", "value2");
            hashmap.put("A002", "value2");

            const ans: string[] = hashmap.getValues("A001");
            // logger.level = "debug";
            // logger.debug(ans);
            // logger.level = "error";

            expect(arraylib.isSubset(ans, ["value1", "value2"])).toBeTruthy;
            expect(arraylib.isSubset(["value1", "value2"], ans)).toBeTruthy;


        });

    });

    describe("isEmpty", () => {
        it('should return if the hash map is empty.', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            hashmap.put("A001", "value1");
            hashmap.put("A002", "value1");
            hashmap.put("A001", "value2");
            hashmap.put("A002", "value2");

            expect(hashmap.size()).toEqual(4);
            expect(hashmap.isEmpty()).toBeFalsy;

            hashmap.clear();
            expect(hashmap.size()).toEqual(0);
            expect(hashmap.isEmpty()).toBeTruthy;
        });

    });



    describe("keySet", () => {
        it('should return a Set object of keys.', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            hashmap.put("A001", "value1");
            hashmap.put("A001", "value2");
            hashmap.put("A002", "value1");
            hashmap.put("A002", "value2");

            const set: Set<string> = hashmap.keySet();
            expect(set.has("A001")).toBeTruthy;
            expect(set.has("A002")).toBeTruthy;

            // logger.level = "debug";
            // logger.debug(Array.from(set));
            // logger.level = "error";

            expect(arraylib.isSubset(Array.from(set), ["A001", "A002"])).toBeTruthy;
            expect(arraylib.isSubset(["A001", "A002"], Array.from(set))).toBeTruthy;

        });

    });


    describe("removeKey", () => {
        it('should removes a key and corresponding values', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            hashmap.put("A001", "value1");
            hashmap.put("A002", "value1");
            hashmap.put("A001", "value2");
            hashmap.put("A002", "value2");

            expect(hashmap.size()).toEqual(4);

            hashmap.removeKey("A001");
            expect(hashmap.size()).toEqual(2);

            hashmap.removeKey("A002");
            expect(hashmap.size()).toEqual(0);
            expect(hashmap.isEmpty()).toBeTruthy;
        });

        it('should ignore nonexistent keys.', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            hashmap.removeKey("A000");
            expect(hashmap.size()).toEqual(0);
            expect(hashmap.isEmpty()).toBeTruthy;

            hashmap.put("A001", "value1");
            hashmap.put("A002", "value1");
            hashmap.put("A001", "value2");
            hashmap.put("A002", "value2");

            expect(hashmap.size()).toEqual(4);

            hashmap.removeKey("A000");
            expect(hashmap.size()).toEqual(4);
        });


    });





});
