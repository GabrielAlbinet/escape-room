export class Door {
  close = true;

  walkingThrough(): boolean {
    return !this.close;
  }
}