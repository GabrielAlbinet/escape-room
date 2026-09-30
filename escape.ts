export class Player {
  inventory: string[];

  constructor(inventory: string[]) {
    this.inventory = inventory;
  }

  IsItemInInventory(item: string): boolean {
    return this.inventory.includes(item);
  }

  removeItem(item: string): void {
    this.inventory = this.inventory.filter(keptItem => keptItem !== item);
  }

  useItem(item: string): boolean {
    return this.IsItemInInventory(item);
  }
}

export class Door {
  open: boolean;
  key: string;
  enigme?: Enigme;

  constructor(open: boolean, key: string, enigme?: Enigme) {
    this.open = open;
    this.key = key;
    this.enigme = enigme;
  }

  walkingThrough(): boolean {
    if (this.enigme && !this.enigme.solved) {
      return false;
    }
    return this.open;
  }

  openWithKey(player: Player): boolean {
    if (!player.IsItemInInventory(this.key)) {
      return false;
    }

    player.removeItem(this.key);
    this.open = true;
    return true;
  }
}

export class Room {
  items: string[];

  constructor(items: string[]) {
    this.items = items;
  }

  takeItem(item: string, player: Player): void {
    if (!this.items.includes(item)) {
        return;
    }

    this.items = this.items.filter(keptItem => keptItem !== item);
    player.inventory.push(item);
  }
}

  export class Enigme {
  question: string;
  answer: string;
  solved?: boolean;
  badAnswers: number;
  deletedFromExistence?: boolean;

  constructor(question: string, answer: string) {
    this.question = question;
    this.answer = answer;
    this.solved = false;
    this.badAnswers = 0;
    this.deletedFromExistence = false;
  }

  tryToSolve(tentative: string): boolean {
    if (this.deletedFromExistence) {
      return false;
    }
    
    if (this.solved) {
      return false;
    }
    
    if (tentative !== this.answer) {
      this.badAnswers += 1;
      if (this.badAnswers == 3) {
        this.deletedFromExistence = true;
      }
      return false;
    }

    this.solved = true;
    return true;
  }
}