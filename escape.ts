export class Door {
  open: boolean;

  constructor(open: boolean) {
    this.open = open;
  }

  walkingThrough(): boolean {
    return this.open;
  }
}