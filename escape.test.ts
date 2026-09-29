import { describe, expect, it } from "vitest";
import { Door } from "./escape";

describe("Door", () => {
  it("ne peut pas être franchie si elle est fermée", () => {
    const door = new Door();

    expect(door.walkingThrough()).toBe(false);
  });
});