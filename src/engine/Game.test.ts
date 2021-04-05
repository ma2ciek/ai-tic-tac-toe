import Game from './Game';

describe( 'Game', () => {
	describe( 'constructor()', () => {
		it( 'should create a game instance', () => {
			expect( new Game() ).toBeInstanceOf( Game );
		} );

		it( 'should create empty board', () => {
			const currentGame = new Game();

			expect( currentGame.currentBoard ).toHaveLength( 9 );
			for ( let i = 0; i < currentGame.currentBoard.length; i++ ) {
				expect( currentGame.currentBoard[ i ] ).toEqual( 0 );
			}
		} );

		it( 'should create empty history', () => {
			const currentGame = new Game();

			expect( currentGame.getHistory() ).toEqual( [] );
		} );
	} );

	describe( 'applyMove()', () => {
		it( 'should apply the move of the player onto current board', () => {
			const currentGame = new Game();

			currentGame.applyMove( 1, 3 );

			expect( currentGame.currentBoard[ 3 ] ).toEqual( 1 );
			expect( currentGame.currentBoard[ 0 ] ).toEqual( 0 );
		} );
	} )

	describe( 'getAvailableMoves()', () => {
		it( 'should return an array with all of the possible moves', () => {
			const currentGame = new Game();

			expect( currentGame.getAvailableMoves() ).toHaveLength( 9 );

			currentGame.applyMove( 1, 3 );

			expect( currentGame.getAvailableMoves() ).toHaveLength( 8 );
			expect( currentGame.getAvailableMoves() ).not.toContain( 3 );
		} );
	} );

	describe( 'getResult()', () => {
		it( 'should return PENDING, while there are still empty fields on board', () => {
			const currentGame = new Game();

			currentGame.applyMove( 1, 3 );

			expect( currentGame.getResult() ).toEqual( 3 );
		} );

		it( 'should return DRAW, when all of the fields are occupied and there is no winner', () => {
			const currentGame = new Game();

			currentGame.applyMove( 1, 0 );
			currentGame.applyMove( 1, 1 );
			currentGame.applyMove( 2, 2 );
			currentGame.applyMove( 2, 3 );
			currentGame.applyMove( 2, 4 );
			currentGame.applyMove( 1, 5 );
			currentGame.applyMove( 1, 6 );
			currentGame.applyMove( 2, 7 );
			currentGame.applyMove( 1, 8 );

			expect( currentGame.getResult() ).toEqual( 2 );
		} );

		it( 'should return FIRST_PLAYER_WIN, when player 1 wins', () => {
			const currentGame = new Game();

			currentGame.applyMove( 1, 0 );
			currentGame.applyMove( 1, 1 );
			currentGame.applyMove( 1, 2 );
			currentGame.applyMove( 2, 3 );
			currentGame.applyMove( 2, 4 );
			currentGame.applyMove( 1, 5 );
			currentGame.applyMove( 2, 7 );

			expect( currentGame.getResult() ).toEqual( 0 );
		} );

		it( 'should return SECOND_PLAYER_WIN, when player 1 wins', () => {
			const currentGame = new Game();

			currentGame.applyMove( 2, 0 );
			currentGame.applyMove( 2, 1 );
			currentGame.applyMove( 2, 2 );
			currentGame.applyMove( 1, 3 );
			currentGame.applyMove( 1, 4 );
			currentGame.applyMove( 2, 5 );
			currentGame.applyMove( 1, 7 );

			expect( currentGame.getResult() ).toEqual( 1 );
		} );
	} );
} );
