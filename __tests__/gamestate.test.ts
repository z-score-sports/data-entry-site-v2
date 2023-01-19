import {describe, expect, test} from '@jest/globals';
import { GameState } from '../src/state/GameState';
import { Team } from '../src/state/Player';
import { Possession } from '../src/state/Possession';
import { generateBlankGame } from './testingUtils';


describe('Quarter tests', () => {
    test("Increment quarter", () => {
        const gameState : GameState = generateBlankGame(Team.home);
        expect(gameState.quarter).toBe(1);
        gameState.increaseQuarter();
        expect(gameState.quarter).toBe(2);
    })

    test("decrement quarter from 3", () => {
        const gameState = generateBlankGame(Team.home);
        expect(gameState.quarter).toBe(1);
        gameState.increaseQuarter();
        gameState.increaseQuarter();
        gameState.decreaseQuarter();
        expect(gameState.quarter).toBe(2);
    })

    test("decrement quarter from 1", () => {
        const gameState = generateBlankGame(Team.home);
        expect(gameState.quarter).toBe(1);
        gameState.decreaseQuarter();
        expect(gameState.quarter).toBe(1);
    })

})

describe("Possession arrow tests", () => {
    test("Home arrow to away arrow", () => {
        const gameState = generateBlankGame(Team.away);
        expect(gameState.possessionArrow).toBe(Team.home);
        gameState.changePossessionArrow();
        expect(gameState.possessionArrow).toBe(Team.away);
    })

    test("Away arrow to home arrow", () => {
        const gameState = generateBlankGame(Team.home);
        expect(gameState.possessionArrow).toBe(Team.away);
        gameState.changePossessionArrow();
        expect(gameState.possessionArrow).toBe(Team.home);
    })
    
})

describe("Timeout Tests", () => {
    test("Call home and away timeout", () => {
        const gameState = generateBlankGame(Team.home);
        let homeStartTimeouts : number = gameState.homeTimeouts;
        let awayStartTimeouts : number = gameState.awayTimeouts;
        gameState.callTimeout(Team.home);
        expect(gameState.homeTimeouts).toBe(Math.max(homeStartTimeouts-1, 0));
        gameState.callTimeout(Team.away);
        expect(gameState.awayTimeouts).toBe(Math.max(awayStartTimeouts-1, 0));
    })

    test("Call timeout with 0 remaining", () => {
        const gameState = generateBlankGame(Team.home);
        let homeStartTimeouts : number = gameState.homeTimeouts;
        for(let i:number = 1; i <= homeStartTimeouts; i++) {
            gameState.callTimeout(Team.home);
        }
        expect(gameState.homeTimeouts).toBe(0);
    })
})


describe("End possession tests", () => {
    test("End first possession", () => {
        // TODO: gamestate here is constructed with test players instead of the default players in GameState.ts
        const gameState = generateBlankGame(Team.home);
        const quarter : number = gameState.quarter;
        const curPos : Possession = gameState.currentPossession;

        gameState.endPossession();
        
        expect(curPos.quarter).toBe(quarter);
        expect(curPos.homeLineupString).not.toBeNull();
        expect(curPos.awayLineupString).not.toBeNull();
        expect(gameState.currentPossession).not.toBe(curPos);
        expect(gameState.currentPossession.offenseTeam).toBe(Team.away);
        
    })
})
