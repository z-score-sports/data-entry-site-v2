import {describe, expect, test} from '@jest/globals';
import { GameState } from '../state/GameState';
import { Team } from '../state/Player';


describe('Gamestate Class', () => {
    test("Increment quarter", () => {
        const gameState = new GameState(Team.home);
        expect(gameState.quarter).toBe(1);
        gameState.increaseQuarter();
        expect(gameState.quarter).toBe(2);
    })

    test("decrement quarter", () => {
        const gameState = new GameState(Team.home);
        expect(gameState.quarter).toBe(1);
        gameState.decreaseQuarter();
        expect(gameState.quarter).toBe(1);
        gameState.increaseQuarter();
        gameState.increaseQuarter();
        gameState.decreaseQuarter();
        expect(gameState.quarter).toBe(2);
    })

    
 })