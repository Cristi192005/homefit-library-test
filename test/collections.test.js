/**
 * Unit tests for the collection functions used by the HomeFit app.
 *
 * Tested functions (MoSCoW priority in brackets):
 * - filter (Must)  - keeps only the exercises that match the selected muscle groups and difficulty
 * - groupBy (Must) - groups all exercises by muscle group
 */
import { expect } from "chai";
import { filter, groupBy } from "../src/collections/groupCollectionUtils.js";

// Small exercise list used as test data, similar to the data in the HomeFit app
const exercises = [
  { name: "Squats", muscle: "legs", difficulty: "beginner" },
  { name: "Lunges", muscle: "legs", difficulty: "intermediate" },
  { name: "Push-ups", muscle: "chest", difficulty: "beginner" },
  { name: "Wide Push-ups", muscle: "chest", difficulty: "intermediate" },
  { name: "Diamond Push-ups", muscle: "triceps", difficulty: "intermediate" },
  { name: "Bench Dips", muscle: "triceps", difficulty: "beginner" },
];

describe("filter()", function () {
  it("keeps only the exercises for the selected muscle group", function () {
    const result = filter(exercises, (e) => e.muscle === "triceps");
    expect(result.map((e) => e.name)).to.deep.equal(["Diamond Push-ups", "Bench Dips"]);
  });

  it("keeps only the exercises that match both muscle group and difficulty", function () {
    const result = filter(exercises, (e) => e.muscle === "legs" && e.difficulty === "beginner");
    expect(result.map((e) => e.name)).to.deep.equal(["Squats"]);
  });

  it("returns an empty list when no exercise matches", function () {
    const result = filter(exercises, (e) => e.muscle === "back");
    expect(result).to.deep.equal([]);
  });

  it("returns an empty list for an empty exercise list", function () {
    expect(filter([], () => true)).to.deep.equal([]);
  });
});

describe("groupBy()", function () {
  it("puts every exercise of a muscle group into that group", function () {
    const result = groupBy(exercises, "muscle");
    expect(result.legs.map((e) => e.name)).to.deep.equal(["Squats", "Lunges"]);
  });

  it("creates one group for each muscle group", function () {
    const result = groupBy(exercises, "muscle");
    expect(Object.keys(result)).to.have.members(["legs", "chest", "triceps"]);
  });

  it("keeps all exercises, none are lost", function () {
    const result = groupBy(exercises, "muscle");
    const total = Object.values(result).reduce((sum, group) => sum + group.length, 0);
    expect(total).to.equal(exercises.length);
  });

  it("returns an empty object for an empty list", function () {
    expect(groupBy([], "muscle")).to.deep.equal({});
  });
});