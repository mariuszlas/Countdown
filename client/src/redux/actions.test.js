import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import { addPlayer, updateGameSettings, addQuestions, updateScore, addCurrentPlayer, setError, updatePlayerResults, calcDuration, calcScoreIncrement } from "./actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('redux actions', () => {

    const store = mockStore({});

    beforeEach(() => {
        store.clearActions();
    })


    test('updateGameSettings action', () => {
        store.dispatch(updateGameSettings( 23, 'diff', 'cat'));

        expect(store.getActions()).toEqual([{ type: 'UPDATE_GAME_SETTINGS', payload: {category: 23, difficulty: 'diff', categoryName: 'cat'} }]);
    })
    
    test('addQuestions action', () => {
        store.dispatch(addQuestions(['Q1', 'Q2']));

        expect(store.getActions()).toEqual([{ type: 'ADD_QUESTIONS', payload: ['Q1', 'Q2'] }]);
    })

    test('updateScore action', () => {
        store.dispatch(updateScore(55));

        expect(store.getActions()).toEqual([{ type: 'UPDATE_SCORE', payload: 55 }]);
    })

    test('addCurrentPlayer action', () => {
        store.dispatch(addCurrentPlayer('testCurrentPlayer'));

        expect(store.getActions()).toEqual([{ type: 'CURRENT_PLAYER', payload: 'testCurrentPlayer' }]);
    })

    test('setError action', () => {
        store.dispatch(setError('testError'));

        expect(store.getActions()).toEqual([{ type: 'SET_ERROR', payload: 'testError' }]);
    })

    test('updatePlayerResults action', () => {
        store.dispatch(updatePlayerResults([2, 5, 6]));

        expect(store.getActions()).toEqual([{ type: 'UPDATE_RESULTS', payload: [2, 5, 6] }]);
    })

    test('calcDuration', () => {
        const difficulties = ['easy', 'medium', 'hard', 'missing'];
        const durations = [45, 30, 15, Error('Difficulty is missing')];

        for (let i = 0; i < difficulties.length; i++) {
            expect(calcDuration(difficulties[i])).toEqual(durations[i]);
        }
    })

    test('calcScoreIncrement', () => {
        const difficulties = ['easy', 'medium', 'hard', 'missing'];
        const increments = [1, 2, 3, Error('Difficulty is missing')];

        for (let i = 0; i < difficulties.length; i++) {
            expect(calcScoreIncrement(difficulties[i])).toEqual(increments[i]);
        }
    })
})
