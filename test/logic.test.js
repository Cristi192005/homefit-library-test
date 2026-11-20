/**
 * Unit tests for the logic functions used by the HomeFit app.
 *
 * Tested function (MoSCoW priority in brackets):
 * - clamp (Must) - keeps the recommended intensity level between 1 (Low) and 3 (High)
 */
import { expect } from "chai";
import { clamp } from "../src/logic/rangeUtils.js";

describe("clamp()", function () {
  it("keeps a value that is already inside the range", function () {
    expect(clamp(2, 1, 3)).to.equal(2);
  });

  it("returns the minimum when the value is below the range", function () {
    // e.g. a child with beginner difficulty gets a calculated level of 0 -> should be Low (1)
    expect(clamp(0, 1, 3)).to.equal(1);
  });

  it("returns the maximum when the value is above the range", function () {
    // e.g. a calculated level of 5 -> should be High (3), never more
    expect(clamp(5, 1, 3)).to.equal(3);
  });

  it("keeps the exact minimum and maximum values", function () {
    expect(clamp(1, 1, 3)).to.equal(1);
    expect(clamp(3, 1, 3)).to.equal(3);
  });
});