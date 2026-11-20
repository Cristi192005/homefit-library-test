/**
 * Unit tests for the string functions used by the HomeFit app.
 *
 * Tested function (MoSCoW priority in brackets):
 * - lowercase (Should) - makes "Chest" from the checkbox match "chest" in the exercise list
 */
import { expect } from "chai";
import { lowercase } from "../src/strings/caseUtils.js";

describe("lowercase()", function () {
  it("converts a capitalized muscle group name to lowercase", function () {
    expect(lowercase("Chest")).to.equal("chest");
  });

  it("converts a fully uppercase name to lowercase", function () {
    expect(lowercase("TRICEPS")).to.equal("triceps");
  });

  it("keeps a lowercase name unchanged", function () {
    expect(lowercase("legs")).to.equal("legs");
  });

  it("returns an empty string for an empty string", function () {
    expect(lowercase("")).to.equal("");
  });
});