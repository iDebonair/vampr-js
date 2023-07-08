const chai = require('chai');
const expect = chai.expect;

const Vampire = require('../vampire.js');

describe("Vampire", function() {

  let rootVampire;
  beforeEach(function() {
    rootVampire = new Vampire("root");
  });

  describe("allMillennialVampires", () => {

    let offspring1, offspring2, offspring3, offspring4, offspring5, offspring6, offspring7, offspring8;
    beforeEach(() => {
      offspring1 = new Vampire("a", 1975);
      offspring2 = new Vampire("b", 1985);
      offspring3 = new Vampire("c", 1990);
      offspring4 = new Vampire("d", 2000);
      offspring5 = new Vampire("e", 2010);
      offspring6 = new Vampire("f", 1982);
      offspring7 = new Vampire("g", 1995);
      offspring8 = new Vampire("h", 1987);

      rootVampire.addOffspring(offspring1);
      rootVampire.addOffspring(offspring2);
      rootVampire.addOffspring(offspring3);
      offspring3.addOffspring(offspring4);
      offspring3.addOffspring(offspring5);
      offspring5.addOffspring(offspring6);
      offspring6.addOffspring(offspring7);
      offspring2.addOffspring(offspring8);
    });

    it("should return an array of all vampires converted after 1980", () => {
      expect(rootVampire.allMillennialVampires).to.deep.equal([offspring2, offspring8, offspring3, offspring4, offspring5, offspring6, offspring7]);      
    });
  });
});
