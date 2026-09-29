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
}

export class Door {
  open: boolean;
  key: string;

  constructor(open: boolean, key: string) {
    this.open = open;
    this.key = key;
  }

  walkingThrough(): boolean {
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