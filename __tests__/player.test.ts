import {describe, expect, test} from '@jest/globals';
import { Player, Team } from '../src/state/Player';

describe("Getters", () => {
    test("Team string", () => {
        const homePlayer = new Player("000000", 0, "Michael", "Djorup", Team.home)
        expect(homePlayer.teamStr).toBe("home")

        const awayPlayer = new Player("000001", 1, "John", "Doe", Team.away);
        expect(awayPlayer.teamStr).toBe("away");

    })

    test("Total points", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        expect(player.totalPoints).toBe(0);
        player.addFGPoints(3);
        expect(player.totalPoints).toBe(3);
        player.addFGPoints(2);
        expect(player.totalPoints).toBe(5);
        player.addFreeThrowMade();
        expect(player.totalPoints).toBe(6);
        player.addFreeThrowMade();
        expect(player.totalPoints).toBe(7);

    })
})

describe("Substitutions", () => {
    test("Subbing in a bench player", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        expect(player.inGame).toBeFalsy();
        player.subIn();
        expect(player.inGame).toBeTruthy();
    })

    test("Subbing out a bench player", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        expect(player.inGame).toBeFalsy();
        player.subOut();
        expect(player.inGame).toBeFalsy();
    })

    test("Subbing in a player in the game", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        expect(player.inGame).toBeFalsy();
        player.subIn();
        player.subIn();
        expect(player.inGame).toBeTruthy();
    })
})

describe("Player statistics", () => {
    test("Field goal points", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        expect(player.fgPoints).toBe(0);
        player.removeFGPoints(10);
        player.addFGPoints(3);
        expect(player.fgPoints).toBe(3);
        player.removeFGPoints(2);
        expect(player.fgPoints).toBe(1);

    })

    test("Field goals made", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        expect(player.fgMade).toBe(0);
        player.removeFGMade();
        player.addFGMade();
        player.addFGMade();
        expect(player.fgMade).toBe(2);
        player.removeFGMade();
        expect(player.fgMade).toBe(1);
    })

    test("Field goal attempts", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        expect(player.fgAttempted).toBe(0);
        player.removeFGAttempt();
        player.addFGAttempt();
        player.addFGAttempt();
        expect(player.fgAttempted).toBe(2);
        player.removeFGAttempt();
        expect(player.fgAttempted).toBe(1);
    })

    test("Rebounds", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        expect(player.rebounds).toBe(0);
        player.removeRebound();
        player.addRebound();
        player.addRebound();
        expect(player.rebounds).toBe(2);
        player.removeRebound();
        expect(player.rebounds).toBe(1);
    })

    test("Assists", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        expect(player.assists).toBe(0);
        player.removeAssist();
        player.addAssist();
        player.addAssist();
        expect(player.assists).toBe(2);
        player.removeAssist();
        expect(player.assists).toBe(1);
    })

    test("Blocks", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        expect(player.blocks).toBe(0);
        player.removeBlock();
        player.addBlock();
        player.addBlock();
        expect(player.blocks).toBe(2);
        player.removeBlock();
        expect(player.blocks).toBe(1);
    })

    test("Fouls", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        expect(player.fouls).toBe(0);
        player.removeFoul();
        player.addFoul();
        player.addFoul();
        expect(player.fouls).toBe(2);
        player.removeFoul();
        expect(player.fouls).toBe(1);
    })

    test("Steals", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        expect(player.steals).toBe(0);
        player.removeSteal();
        player.addSteal();
        player.addSteal();
        expect(player.steals).toBe(2);
        player.removeSteal();
        expect(player.steals).toBe(1);
    })

    test("Free throws made", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        expect(player.freeThrowsMade).toBe(0);
        player.removeFreeThrowMade();
        player.addFreeThrowMade();
        player.addFreeThrowMade();
        expect(player.freeThrowsMade).toBe(2);
        player.removeFreeThrowMade();
        expect(player.freeThrowsMade).toBe(1);
    })

    test("Free throws attempted", () => {
        const player = new Player("000000", 0, "John", "Doe", Team.home);
        expect(player.freeThrowsAttempted).toBe(0);
        player.removeFreeThrowAttempt();
        player.addFreeThrowAttempt();
        player.addFreeThrowAttempt();
        expect(player.freeThrowsAttempted).toBe(2);
        player.removeFreeThrowAttempt();
        expect(player.freeThrowsAttempted).toBe(1);
    })




})