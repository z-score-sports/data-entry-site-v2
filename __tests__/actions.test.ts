import {describe, expect, test} from '@jest/globals';
import {Turnover} from "../src/state/actions/Turnover"
import {Assist} from "../src/state/actions/Assist"
import {Block} from "../src/state/actions/Block"
import {Rebound, ReboundType} from "../src/state/actions/Rebound"
import { Player, Team } from '../src/state/Player';

describe("Assist class tests", () => {


    test("Constructor", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        const newAssist = new Assist(player);
        expect(player.assists).toBe(1)
        expect(newAssist.assistingPlayer).toBe(player)
    })

    test("Edit assisting player", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        const newAssist = new Assist(player);
        const newPlayer = new Player("000001", 1, "Adam", "Apple", Team.home);
        newAssist.editAssistingPlayer(newPlayer);
        expect(player.assists).toBe(0);
        expect(newPlayer.assists).toBe(1);
        expect(newAssist.assistingPlayer).toBe(newPlayer);

    })

    test("Remove assist stats", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        const newAssist = new Assist(player);
        newAssist.removeStats();
        expect(player.assists).toBe(0);

    })    
})

describe("Block class tests", () => {
    test("Edit blocking player", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        const newBlock = new Block(player);
        const newPlayer = new Player("000001", 1, "Adam", "Apple", Team.home);
        newBlock.editBlockingPlayer(newPlayer);
        expect(player.blocks).toBe(0);
        expect(newPlayer.blocks).toBe(1);
        expect(newBlock.blockingPlayer).toBe(newPlayer);
    })

    test("Remove block stats", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        const newBlock = new Block(player);
        newBlock.removeStats();
        expect(player.blocks).toBe(0);
    })
})

describe("Rebound class tests", () => {
    test("Edit rebounding player same team", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        const newRebound = new Rebound(player, ReboundType.offensive);
        const newPlayer = new Player("000001", 1, "Adam", "Apple", Team.home);
        newRebound.editPlayer(newPlayer);
        expect(player.rebounds).toBe(0);
        expect(newPlayer.rebounds).toBe(1);
        expect(newRebound.reboundType).toBe(ReboundType.offensive);
        expect(newRebound.reboundingPlayer).toBe(newPlayer);
    })

    test("Edit rebounding player different team", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        const newRebound = new Rebound(player, ReboundType.offensive);
        const newPlayer = new Player("000001", 1, "Adam", "Apple", Team.away);
        newRebound.editPlayer(newPlayer);
        expect(newRebound.reboundType).toBe(ReboundType.defensive);
    })

    test("Remove rebound stats", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        const newRebound = new Rebound(player, ReboundType.offensive);
        newRebound.removeStats();
        expect(player.rebounds).toBe(0);
    })

    test("Rebound type strings", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        const offRebound = new Rebound(player, ReboundType.offensive);
        expect(offRebound.reboundTypeString).toBe("offensive");
        const defRebound = new Rebound(player, ReboundType.defensive);
        expect(defRebound.reboundTypeString).toBe("defensive");

    })
})