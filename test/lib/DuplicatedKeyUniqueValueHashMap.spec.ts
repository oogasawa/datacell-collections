
import { expect } from 'chai';
import 'mocha';

import { DuplicatedKeyUniqueValueHashMap } from "../../src/lib/DuplicatedKeyUniqueValueHashMap";


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

    });



    context("put", () => {
        it('should accept both DataCells of different values.', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            hashmap.put("A001", "value1");
            hashmap.put("A001", "value2");
            expect(hashmap.size()).to.equal(2);
        });

    });

    context("put", () => {
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



    context("removeKey", () => {
        it('should accept both DataCells of differet keys.', () => {
            const hashmap = new DuplicatedKeyUniqueValueHashMap<string, string>();
            hashmap.put("A001", "value1");
            hashmap.put("A002", "value1");
            hashmap.put("A001", "value2");
            hashmap.put("A002", "value2");

            let result: string[] = hashmap.getValues("A001");
            expect(result[0]).to.equal("value1");
            expect(result[1]).to.equal("value2");


            hashmap.removeKey("A001");
            expect(hashmap.containsKey("A001")).to.be.false;
            expect(hashmap.containsKey("A002")).to.be.true;
            expect(hashmap.keySet().size()).to.equal(1);
        });

    });




});
