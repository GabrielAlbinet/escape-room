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

    it("a une alarme activable et désactivable", () => {
      const door = new Door(false, "red-key", true);
      expect(door.isAlarmOn).toBe(true);
      door.desactivateAlarm();
      expect(door.isAlarmOn).toBe(false);
      door.activateAlarm();
      expect(door.isAlarmOn).toBe(true);
    })
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

  it("ne peut pas résoudre une énigme déjà résolue", () => {
  const enigme = new Enigme("Est-ce que l'exo 8  est long ?", "Oui");

  const solved = enigme.tryToSolve("Oui");
  const solved2 = enigme.tryToSolve("Oui");

  expect(solved).toBe(true);
  expect(solved2).toBe(false);
  expect(enigme.solved).toBe(true);
  });

  it("comptabilise les échecs de résolution de l'énigme", () => {
  const enigme = new Enigme("Est-ce que l'exo 8  est long ?", "Oui");

  const solved = enigme.tryToSolve("Non c'est que 4 lignes");

  expect(solved).toBe(false);
  expect(enigme.badAnswers).toEqual(1);
  });

  it("peut échouer 2 fois sans être bloqué", () => {
  const enigme = new Enigme("Est-ce que l'exo 8  est long ?", "Oui");

  const solved = enigme.tryToSolve("Non c'est que 4 lignes");
  const solved2 = enigme.tryToSolve("Non franchement t'abuses");

  expect(solved).toBe(false);
  expect(solved2).toBe(false);
  expect(enigme.badAnswers).toEqual(2);

  });

  it("se fait désintégrer de l'existence à 3 échecs", () => {
  const enigme = new Enigme("Est-ce que l'exo 8  est long ?", "Oui");

  const solved = enigme.tryToSolve("Non c'est que 4 lignes");
  const solved2 = enigme.tryToSolve("Non franchement t'abuses");
  const solved3 = enigme.tryToSolve("Ouvre toi");

  expect(solved).toBe(false);
  expect(solved2).toBe(false);
  expect(solved3).toBe(false);
  expect(enigme.badAnswers).toEqual(3);
  expect(enigme.deletedFromExistence).toBe(true);

  });

  it("Résolution impossible même avec une bonne réponse après anéantissement du joueur", () => {
  const enigme = new Enigme("Est-ce que l'exo 8  est long ?", "Oui");

  const solved = enigme.tryToSolve("Non c'est que 4 lignes");
  const solved2 = enigme.tryToSolve("Non franchement t'abuses");
  const solved3 = enigme.tryToSolve("Ouvre toi");

  expect(solved).toBe(false);
  expect(solved2).toBe(false);
  expect(solved3).toBe(false);
  expect(enigme.badAnswers).toEqual(3);
  expect(enigme.deletedFromExistence).toBe(true);

  const solvedPostDelete = enigme.tryToSolve("Oui");
  expect(solvedPostDelete).toBe(false);

  });
});