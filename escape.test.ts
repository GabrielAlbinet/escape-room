import { describe, expect, it } from "vitest";
import { Door, Player } from "./escape";

describe("Player", () => {
  it("crée un joueur avec un inventaire", () => {
    const player = new Player(["red-key", "torch"]);

    expect(player.inventory).toEqual(["red-key", "torch"]);
  });
});

describe("Door", () => {
  it("ne peut pas être franchie si elle est fermée", () => {
    const door = new Door(false, "red-key");

    expect(door.walkingThrough()).toBe(false);
  });

  it("peut être franchie si elle est ouverte", () => {
    const door = new Door(true, "red-key");

    expect(door.walkingThrough()).toBe(true);
  });

  it("peut être ouverte avec la bonne clé", () => {
  const door = new Door(false, "red-key");
  const player = new Player(["red-key"]);

  const opened = door.openWithKey(player);

  expect(opened).toBe(true);
  expect(door.open).toBe(true);
  });

  it("retire la clé de l'inventaire du joueur quand la porte s'ouvre", () => {
    const door = new Door(false, "red-key");
    const player = new Player(["red-key", "torch"]);

    const opened = door.openWithKey(player);

    expect(opened).toBe(true);
    expect(door.open).toBe(true);
    expect(player.inventory).toEqual(["torch"]);
    })
});