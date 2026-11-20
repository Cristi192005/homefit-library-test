/**
 * Unit tests for the math functions used by the HomeFit app.
 *
 * Tested functions (MoSCoW priority in brackets):
 * - multiply (Should) - adjusts the number of repetitions by difficulty, e.g. 10 x 1.5
 * - roundTo (Should)  - rounds the repetitions to a whole number, e.g. 13.5 -> 14
 */
import { expect } from "chai";
import { multiply } from "../src/math/basicMathUtils.js";
import { roundTo } from "../src/math/roundingUtils.js";

describe("multiply()", function () {
  it("multiplies two whole numbers", function () {
    // 3 sets x 12 reps = 36 reps in total
    expect(multiply(3, 12)).to.equal(36);
  });

  it("multiplies by a difficulty factor", function () {
    // advanced: 10 reps x 1.5 = 15 reps
    expect(multiply(10, 1.5)).to.equal(15);
  });

  it("returns 0 when one of the numbers is 0", function () {
    expect(multiply(0, 12)).to.equal(0);
  });
});

describe("roundTo()", function () {
  it("rounds half up to a whole number", function () {
    // 9 reps x 1.5 = 13.5 reps -> 14
    expect(roundTo(13.5, 0)).to.equal(14);
  });

  it("rounds down when the decimal part is below .5", function () {
    expect(roundTo(13.4, 0)).to.equal(13);
  });

  it("rounds to the given number of decimals", function () {
    expect(roundTo(1.256, 2)).to.equal(1.26);
  });

  it("keeps a whole number unchanged", function () {
    expect(roundTo(12, 0)).to.equal(12);
  });
});