
import { expect } from 'chai';
import 'mocha';

import { array_isSubset } from "../../src/lib/ArrayUtil";

import * as log4js from "log4js";
const logger = log4js.getLogger();




describe('ArrayUtil', () => {

    context("array_isSubset", () => {
        it('should return true, if a1 is a subset of a2.', () => {
            const a1 = ["A001", "A002"];
            const a2 = ["A001", "A002"];
            expect(array_isSubset(a1, a2)).to.be.true;
            expect(array_isSubset(a2, a1)).to.be.true;
        });

        it('should return true, if a1 is a subset of a2.', () => {
            const a1 = ["A001", "A002", "A003"];
            const a2 = ["A001", "A002"];
            expect(array_isSubset(a1, a2)).to.be.false;
            expect(array_isSubset(a2, a1)).to.be.true;
        });


    });

});
