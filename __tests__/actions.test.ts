import {describe, expect, test} from '@jest/globals';
import {Turnover} from "../src/state/actions/Turnover"
import {Assist} from "../src/state/actions/Assist"
import {Block} from "../src/state/actions/Block"
import {Rebound} from "../src/state/actions/Rebound"
import {FreeThrow} from "../src/state/actions/FreeThrow"
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
        const newRebound = new Rebound(player);
        const newPlayer = new Player("000001", 1, "Adam", "Apple", Team.home);
        newRebound.editPlayer(newPlayer);
        expect(player.rebounds).toBe(0);
        expect(newPlayer.rebounds).toBe(1);
        expect(newRebound.reboundingPlayer).toBe(newPlayer);
    })

    test("Remove rebound stats", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        const newRebound = new Rebound(player);
        newRebound.removeStats();
        expect(player.rebounds).toBe(0);
    })

})

describe("Free throw class tests", () => {
    test("Made free throw and editing made", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        const ft = new FreeThrow(player, true);
        expect(ft.shootingPlayer).toBe(player)
        expect(player.freeThrowsAttempted).toBe(1);
        expect(player.freeThrowsMade).toBe(1);
        ft.editMade(false);
        expect(player.freeThrowsAttempted).toBe(1);
        expect(player.freeThrowsMade).toBe(0);
    })

    test("Miessed free throw editing player", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        const newPlayer = new Player("000001", 1, "Adam", "Davis", Team.home);
        const ft = new FreeThrow(player, false);
        expect(ft.shootingPlayer.freeThrowsMade).toBe(0);
        expect(ft.shootingPlayer.freeThrowsAttempted).toBe(1);
        ft.editShootingPlayer(newPlayer);
        expect(player.freeThrowsMade).toBe(0);
        expect(player.freeThrowsAttempted).toBe(0);
        expect(ft.shootingPlayer.freeThrowsMade).toBe(0);
        expect(ft.shootingPlayer.freeThrowsAttempted).toBe(1);

    })

    test("Rebound attaching", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        const rebPlayer = new Player("000001", 1, "Adam", "Davis", Team.home);
        const ft = new FreeThrow(player, true);
        ft.addRebound(rebPlayer);
        expect(ft.rebound).toBe(null);
        ft.editMade(false);
        ft.addRebound(rebPlayer);
        expect(ft.rebound).not.toBe(null);
        ft.editMade(true);
        expect(ft.rebound).toBe(null);
    })

    test("Remove stats", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        const rebPlayer = new Player("000001", 1, "Adam", "Davis", Team.home);
        const ft = new FreeThrow(player, false);
        ft.addRebound(rebPlayer)
        //checks to ensure that a second rebound isn't added to stats
        ft.addRebound(rebPlayer);
        expect(player.freeThrowsMade).toBe(0);
        expect(player.freeThrowsAttempted).toBe(1);
        expect(rebPlayer.rebounds).toBe(1);
        ft.removeStats();
        expect(player.freeThrowsMade).toBe(0);
        expect(player.freeThrowsAttempted).toBe(0);
        expect(rebPlayer.rebounds).toBe(0);


    })
})