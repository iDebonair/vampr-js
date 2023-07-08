class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/
  
  // Adds the vampire as an offspring of this vampire
  addOffspring(offsprings) {
    this.offspring.push(offsprings);
    offsprings.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let currentVampire = this;
  
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      count++;
    }
    return count;
  }
  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if(this === vampire || this.creator === null || vampire.creator.name === this.name) {
      return this; // Return the vampire itself if same vampire is used
    }
    if(vampire.creator === null || this.creator.name === vampire.name){
      return vampire;
    } 
    if(this.creator.creator === null || vampire.creator.creator === null){
      return this.creator;
    }
    const thisAncestors = this.getAncestors();
    const vampireAncestors = vampire.getAncestors();
    
    const thisAncestorsSet = new Set(thisAncestors);

    for (let ancestor of vampireAncestors) {
      if (thisAncestorsSet.has(ancestor)) {
        
        return ancestor;
      }
    }
  }

  getAncestors() {
    let ancestors = [];
    let currentVampire = this;

    while (currentVampire.creator) {
      ancestors.push(currentVampire.creator);
      currentVampire = currentVampire.creator;
    }

    return ancestors;
  }

  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }

    for (const offspring of this.offspring) {
      const foundVampire = offspring.vampireWithName(name);
      if (foundVampire !== null) {
        return foundVampire;
      }
    }

    return null;
  }


// Returns the total number of vampires that exist
get totalDescendents() {
  let count = 0;

  for (const offspring of this.offspring) {
    count += 1 + offspring.totalDescendents;
  }

  return count;
}

// Returns an array of all the vampires that were converted after 1980
get allMillennialVampires() {
  const millennialVampires = [];

  if (this.yearConverted > 1980) {
    millennialVampires.push(this);
  }

  for (const offspring of this.offspring) {
    millennialVampires.push(... offspring.allMillennialVampires);
  }

  return millennialVampires;
}
}
const Original = new Vampire("Original", 1975);
const Ansel = new Vampire("Ansel", 1985);
const Bart = new Vampire("Bart", 1990);
const Jade = new Vampire("Jade", 2000);
const Elgort = new Vampire("Elgort", 2010);
const Sarah = new Vampire("Sarah", 1982);
const Andrew = new Vampire("Andrew", 1995);
const Kitt = new Vampire("Kitt", 1987);

Original.addOffspring(Ansel);
Ansel.addOffspring(Elgort);
Ansel.addOffspring(Sarah);
Elgort.addOffspring(Andrew);
Bart.addOffspring(Kitt);

module.exports = Vampire;

