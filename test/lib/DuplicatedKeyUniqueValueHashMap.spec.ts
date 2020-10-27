
import { expect } from 'chai';
import 'mocha';

import { DuplicatedKeyUniqueValueHashMap } from "../../src/lib/DuplicatedKeyUniqueValueHashMap";
import { array_isSubset } from "../../src/lib/ArrayUtil";

import * as log4js from "log4js";
const logger = log4js.getLogger();





describe('DuplicatedKeyUniqueValueHashMap', () => {

    context("constructor", () => {
        it('should create an empty hashmap.', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            expect(hashmap.isEmpty()).to.equal(true);
            expect(hashmap.size()).to.equal(0);
        });

    });


    context("put", () => {
        it('should accept both DataCells of differet keys.', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            hashmap.put("A001", "value1");
            hashmap.put("A002", "value1");
            expect(hashmap.size()).to.equal(2);
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
            expect(hashmap.size()).to.equal(2);
        });

        it('should reject DataCells with the same key / value.', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            hashmap.put("A001", "value1");
            expect(hashmap.size()).to.equal(1);
            hashmap.put("A001", "value2");
            expect(hashmap.size()).to.equal(2);
            hashmap.put("A001", "value1");
            expect(hashmap.size()).to.equal(2);
            hashmap.put("A001", "value2");
            expect(hashmap.size()).to.equal(2);
        });

    });



    context("clear", () => {
        it('should remove all key-values from the hashmap.', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            hashmap.put("A001", "value1");
            hashmap.put("A002", "value1");
            hashmap.put("A001", "value2");
            hashmap.put("A002", "value2");

            expect(hashmap.size()).to.equal(4);

            hashmap.clear();
            expect(hashmap.size()).to.equal(0);

            hashmap.put("A001", "value1");
            hashmap.put("A002", "value1");
            hashmap.put("A001", "value2");

            expect(hashmap.size()).to.equal(3);

        });

    });


    context("containsKey", () => {
        it('should return if given key is contained in the hashmap.', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            hashmap.put("A001", "value1");
            hashmap.put("A002", "value1");
            hashmap.put("A001", "value2");
            hashmap.put("A002", "value2");

            expect(hashmap.containsKey("A001")).to.be.true;
            expect(hashmap.containsKey("A002")).to.be.true;
            expect(hashmap.containsKey("A003")).to.be.false;

        });

    });

    context("getValues", () => {
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

            expect(array_isSubset(ans, ["value1", "value2"])).to.be.true;
            expect(array_isSubset(["value1", "value2"], ans)).to.be.true;


        });

    });

    context("isEmpty", () => {
        it('should return if the hash map is empty.', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            hashmap.put("A001", "value1");
            hashmap.put("A002", "value1");
            hashmap.put("A001", "value2");
            hashmap.put("A002", "value2");

            expect(hashmap.size()).to.equal(4);
            expect(hashmap.isEmpty()).to.be.false;

            hashmap.clear();
            expect(hashmap.size()).to.equal(0);
            expect(hashmap.isEmpty()).to.be.true;
        });

    });



    context("keySet", () => {
        it('should return a Set object of keys.', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            hashmap.put("A001", "value1");
            hashmap.put("A001", "value2");
            hashmap.put("A002", "value1");
            hashmap.put("A002", "value2");

            const set: Set<string> = hashmap.keySet();
            expect(set.has("A001")).to.be.true;
            expect(set.has("A002")).to.be.true;

            // logger.level = "debug";
            // logger.debug(Array.from(set));
            // logger.level = "error";

            expect(array_isSubset(Array.from(set), ["A001", "A002"])).to.be.true;
            expect(array_isSubset(["A001", "A002"], Array.from(set))).to.be.true;

        });

    });


    context("removeKey", () => {
        it('should removes a key and corresponding values', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            hashmap.put("A001", "value1");
            hashmap.put("A002", "value1");
            hashmap.put("A001", "value2");
            hashmap.put("A002", "value2");

            expect(hashmap.size()).to.equal(4);

            hashmap.removeKey("A001");
            expect(hashmap.size()).to.equal(2);

            hashmap.removeKey("A002");
            expect(hashmap.size()).to.equal(0);
            expect(hashmap.isEmpty()).to.be.true;
        });

        it('should ignore nonexistent keys.', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            hashmap.removeKey("A000");
            expect(hashmap.size()).to.equal(0);
            expect(hashmap.isEmpty()).to.be.true;

            hashmap.put("A001", "value1");
            hashmap.put("A002", "value1");
            hashmap.put("A001", "value2");
            hashmap.put("A002", "value2");

            expect(hashmap.size()).to.equal(4);

            hashmap.removeKey("A000");
            expect(hashmap.size()).to.equal(4);
        });


    });





});
