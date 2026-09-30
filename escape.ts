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
  keyLockOpen: boolean;
  key: string;
  enigme?: Enigme;
  isAlarmOn?: boolean;
  alarmCode?: string;

  constructor(
    keyLockOpen: boolean,
    key: string,
    options?: { enigme?: Enigme; isAlarmOn?: boolean; alarmCode?: string },
  ) {
    this.keyLockOpen = keyLockOpen;
    this.key = key;
    this.enigme = options?.enigme;
    this.isAlarmOn = options?.isAlarmOn ?? false;
    this.alarmCode = options?.alarmCode;
  }

  walkingThrough(): boolean {
    if (this.enigme && !this.enigme.solved) {
      return false;
    }
    if (this.isAlarmOn) {
      return false;
    }
    return this.keyLockOpen;
  }

  openWithKey(player: Player): boolean {
    if (!player.IsItemInInventory(this.key)) {
      return false;
    }

    player.removeItem(this.key);
    this.keyLockOpen = true;
    return true;
  }

  desactivateAlarm(player: Player): boolean {
    if (!player.IsItemInInventory(this.alarmCode)) {
      return false;
    }
    player.removeItem(this.alarmCode);
    this.isAlarmOn = false;
    return true;
  }

  activateAlarm(): boolean {
    return this.isAlarmOn = true;
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