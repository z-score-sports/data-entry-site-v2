import {describe, expect, test} from '@jest/globals';
import { GameState } from '../src/state/GameState';
import { Team } from '../src/state/Player';


describe('Quarter tests', () => {
    test("Increment quarter", () => {
        const gameState = new GameState(Team.home);
        expect(gameState.quarter).toBe(1);
        gameState.increaseQuarter();
        expect(gameState.quarter).toBe(2);
    })

    test("decrement quarter from 3", () => {
        const gameState = new GameState(Team.home);
        expect(gameState.quarter).toBe(1);
        gameState.increaseQuarter();
        gameState.increaseQuarter();
        gameState.decreaseQuarter();
        expect(gameState.quarter).toBe(2);
    })

    test("decrement quarter from 1", () => {
        const gameState = new GameState(Team.home);
        expect(gameState.quarter).toBe(1);
        gameState.decreaseQuarter();
        expect(gameState.quarter).toBe(1);
    })

})

describe("Possession arrow tests", () => {
    test("Home arrow to away arrow", () => {
        const gameState = new GameState(Team.away);
        expect(gameState.possessionArrow).toBe(Team.home);
        gameState.changePossessionArrow();
        expect(gameState.possessionArrow).toBe(Team.away);
    })

    test("Away arrow to home arrow", () => {
        const gameState = new GameState(Team.home);
        expect(gameState.possessionArrow).toBe(Team.away);
        gameState.changePossessionArrow();
        expect(gameState.possessionArrow).toBe(Team.home);
    })
    
})

describe("Timeout Tests", () => {
    test("Call home and away timeout", () => {
        const gameState = new GameState(Team.home);
        let homeStartTimeouts : number = gameState.homeTimeouts;
        let awayStartTimeouts : number = gameState.awayTimeouts;
        gameState.callTimeout(Team.home);
        expect(gameState.homeTimeouts).toBe(Math.max(homeStartTimeouts-1, 0));
        gameState.callTimeout(Team.away);
        expect(gameState.awayTimeouts).toBe(Math.max(awayStartTimeouts-1, 0));
    })

    test("Call timeout with 0 remaining", () => {
        const gameState = new GameState(Team.home);
        let homeStartTimeouts : number = gameState.homeTimeouts;
        for(let i:number = 1; i <= homeStartTimeouts; i++) {
            gameState.callTimeout(Team.home);
        }
        expect(gameState.homeTimeouts).toBe(0);
    })
})
