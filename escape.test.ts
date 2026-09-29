import { describe, expect, it } from "vitest";
import { Door } from "./escape";

describe("Door", () => {
  it("ne peut pas être franchie si elle est fermée", () => {
    const door = new Door(false);

    expect(door.walkingThrough()).toBe(false);
  });

  it("peut être franchie si elle est ouverte", () => {
  const door = new Door(true);

  expect(door.walkingThrough()).toBe(true);
  });
});