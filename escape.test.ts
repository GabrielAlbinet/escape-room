import { describe, expect, it } from "vitest";
import { Door, Player, Room, Enigme } from "./escape";

describe("Player", () => {
  it("crée un joueur avec un inventaire", () => {
    const player = new Player(["red-key", "torch"]);

    expect(player.inventory).toEqual(["red-key", "torch"]);
  });
  
  it("utilise un objet qu'il possède", () => {
    const player = new Player(["torch"]);

    const used = player.useItem("torch");

    expect(used).toBe(true);
  });

  it("ne peut pas utiliser un objet qu'il ne possède pas", () => {
    const player = new Player([]);

    const used = player.useItem("torch");

    expect(used).toBe(false);
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
 
    it("ne peut être franchie sans résoudre l'énigme", () => {
      const enigme = new Enigme("Ouais ?", "ouais");
      const door = new Door(true, "red-key", enigme);

      expect(door.walkingThrough()).toBe(false);
    });

    it("peut être franchie avec l'énigme associée", () => {
      const enigme = new Enigme("Ouais ?", "ouais");
      const solved = enigme.tryToSolve("ouais");
      const door = new Door(true, "red-key", enigme);

      expect(solved).toBe(true);
      expect(door.walkingThrough()).toBe(true);
      
    });
});

describe("Room", () => {
  it("ramasse un objet, l'enlève de la salle et le met chez le joueur", () => {
    const room = new Room(["torch"]);
    const player = new Player([]);

    room.takeItem("torch", player);

    expect(room.items).toEqual([]);
    expect(player.inventory).toEqual(["torch"]);
  });

  it("ne ramasse rien si l'objet n'est plus dans la salle", () => {
    const room = new Room([]);
    const player = new Player([]);

    room.takeItem("torch", player);

    expect(room.items).toEqual([]);
    expect(player.inventory).toEqual([]);
    });

    it("ne ramasse pas deux fois le même objet", () => {
    const room = new Room(["torch"]);
    const player = new Player([]);

    room.takeItem("torch", player);
    room.takeItem("torch", player);

    expect(player.inventory).toEqual(["torch"]);
    });
});

describe("Enigme", () => {
  it("résout l'énigme avec la bonne réponse", () => {
    const enigme = new Enigme("Est-ce que l'exo 8  est long ?", "Oui");

    const solved = enigme.tryToSolve("Oui");

    expect(solved).toBe(true);
  });

  it("ne résout pas l'énigme avec une mauvaise réponse", () => {
  const enigme = new Enigme("Est-ce que l'exo 8  est long ?", "Oui");

  const solved = enigme.tryToSolve("Non c'est que 4 lignes");

  expect(solved).toBe(false);
  });

  it("comptabilise les échecs de résolution de l'énigme", () => {
  const enigme = new Enigme("Est-ce que l'exo 8  est long ?", "Oui");

  const solved = enigme.tryToSolve("Non c'est que 4 lignes");

  expect(solved).toBe(false);
  expect(badAnswers).toEqual(1);
  });
});