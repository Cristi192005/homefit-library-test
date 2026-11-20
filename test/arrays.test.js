/**
 * Unit tests for the array functions used by the HomeFit app.
 *
 * Tested functions (MoSCoW priority in brackets):
 * - flattenOneLevel (Must)  - joins the exercise lists of the selected muscle groups into one workout list
 * - contains (Must)         - checks whether a muscle group is in the list of selected muscle groups
 * - removeDuplicates (Should) - removes exercises that appear more than once in the workout
 * - isEmpty (Should)        - checks whether the user has selected any muscle groups
 */
import { expect } from "chai";
import { flattenOneLevel } from "../src/arrays/transformArrayUtils.js";
import { contains } from "../src/arrays/searchArrayUtils.js";
import { removeDuplicates } from "../src/arrays/filterArrayUtils.js";
import { isEmpty } from "../src/arrays/basicArrayUtils.js";

describe("flattenOneLevel()", function () {
  it("joins the exercise lists of several muscle groups into one list", function () {
    const exercisesPerMuscle = [
      ["Wide Push-ups", "Push-ups"],
      ["Isometric Hold"],
      ["Diamond Push-ups", "Bench Dips"],
    ];
    expect(flattenOneLevel(exercisesPerMuscle)).to.deep.equal([
      "Wide Push-ups",
      "Push-ups",
      "Isometric Hold",
      "Diamond Push-ups",
      "Bench Dips",
    ]);
  });

  it("flattens only one level, deeper lists stay as they are", function () {
    expect(flattenOneLevel([["Squats"], [["Lunges"]]])).to.deep.equal(["Squats", ["Lunges"]]);
  });

  it("returns an empty list when no muscle groups are given", function () {
    expect(flattenOneLevel([])).to.deep.equal([]);
  });
});

describe("contains()", function () {
  const selectedMuscles = ["chest", "biceps", "triceps"];

  it("returns true for a muscle group in the middle of the list", function () {
    expect(contains(selectedMuscles, "biceps")).to.equal(true);
  });

  it("returns true for the last muscle group in the list", function () {
    expect(contains(selectedMuscles, "triceps")).to.equal(true);
  });

  it("returns true for the first muscle group in the list", function () {
    expect(contains(selectedMuscles, "chest")).to.equal(true);
  });

  it("returns false for a muscle group that is not selected", function () {
    expect(contains(selectedMuscles, "legs")).to.equal(false);
  });

  it("returns false for an empty list", function () {
    expect(contains([], "legs")).to.equal(false);
  });
});

describe("removeDuplicates()", function () {
  it("removes an exercise that appears twice in the workout", function () {
    const workout = ["Wide Push-ups", "Push-ups", "Bench Dips", "Push-ups"];
    expect(removeDuplicates(workout)).to.deep.equal(["Wide Push-ups", "Push-ups", "Bench Dips"]);
  });

  it("keeps the list unchanged when there are no duplicates", function () {
    expect(removeDuplicates(["Squats", "Lunges"])).to.deep.equal(["Squats", "Lunges"]);
  });

  it("does not change the original list", function () {
    const workout = ["Push-ups", "Push-ups"];
    removeDuplicates(workout);
    expect(workout).to.deep.equal(["Push-ups", "Push-ups"]);
  });

  it("returns an empty list for an empty list", function () {
    expect(removeDuplicates([])).to.deep.equal([]);
  });
});

describe("isEmpty()", function () {
  it("returns true when no muscle groups are selected", function () {
    expect(isEmpty([])).to.equal(true);
  });

  it("returns false when one muscle group is selected", function () {
    expect(isEmpty(["legs"])).to.equal(false);
  });

  it("returns false when several muscle groups are selected", function () {
    expect(isEmpty(["chest", "back", "shoulders"])).to.equal(false);
  });
});