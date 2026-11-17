interface Creature {
  name: string;
  useAbility(): void;
}

class Dragon implements Creature {
  constructor(public name: string) {}
  useAbility() {
    console.log(`${this.name} breathes fire`);
  }
}
class Phoenix implements Creature {
  constructor(public name: string) {}
  useAbility() {
    console.log(`${this.name} is reborn from its ashes`);
  }
}
class Unicorn implements Creature {
  constructor(public name: string) {}
  useAbility() {
    console.log(`${this.name} dances on a rainbow`);
  }
}

class SummoningCircle {
  summon(ingredient: string): Creature {
    if (ingredient == "fire") return new Dragon("Dragon");
    if (ingredient == "air") return new Phoenix("Phoenix");
    if (ingredient == "sparkles") return new Unicorn("Unicorn");
    else throw new Error(`Unknown ingredient "${ingredient}"!`);
  }
}

///------GAME------------------------------------------------
const circle = new SummoningCircle();

const ingredients: string[] = ["fire", "air", "sparkles", "plastic"];

const creatures: Creature[] = [];

for (const ingredient of ingredients) {
  try {
    let creature = circle.summon(ingredient);
    creatures.push(creature);
  } catch (e) {
    if (e instanceof Error) {
      console.log("Error: " + e.message);
    }
  }
}

creatures.forEach((creature) => {
  creature.useAbility();
});
