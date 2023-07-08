const chai = require('chai');
const expect = chai.expect;

const Vampire = require('../vampire.js');

describe("Vampire", function() {

  let rootVampire;
  beforeEach(function() {
    rootVampire = new Vampire("root");
  });

  describe("vampireWithName", () => {

    let offspring1, offspring2, offspring3, offspring4, offspring5, offspring6, offspring7, offspring8;
    beforeEach(() => {
      offspring1 = new Vampire("a");
      offspring2 = new Vampire("b");
      offspring3 = new Vampire("c");
      offspring4 = new Vampire("d");
      offspring5 = new Vampire("e");
      offspring6 = new Vampire("f");
      offspring7 = new Vampire("g");
      offspring8 = new Vampire("h");

      rootVampire.addOffspring(offspring1);
      rootVampire.addOffspring(offspring2);
      rootVampire.addOffspring(offspring3);
      offspring3.addOffspring(offspring4);
      offspring3.addOffspring(offspring5);
      offspring5.addOffspring(offspring6);
      offspring6.addOffspring(offspring7);
      offspring2.addOffspring(offspring8);
    });

    it("should return the vampire with the provided name", () => {
      expect(rootVampire.vampireWithName("root")).to.equal(rootVampire);
      expect(rootVampire.vampireWithName("a")).to.equal(offspring1);
      expect(rootVampire.vampireWithName("b")).to.equal(offspring2);
      expect(rootVampire.vampireWithName("c")).to.equal(offspring3);
      expect(offspring3.vampireWithName("d")).to.equal(offspring4);
    });

    it("should return null if no vampire exists with the provided name", () => {
      expect(rootVampire.vampireWithName("Nonexistent")).to.be.null;
    });
  })
});
