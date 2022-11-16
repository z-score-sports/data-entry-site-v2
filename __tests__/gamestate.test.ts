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