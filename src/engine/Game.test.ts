import Game from './Game';

describe( 'Game', () => {
	describe( 'constructor()', () => {
		it( 'should create a game instance', () => {
			expect( new Game() ).toBeInstanceOf( Game );
		} );
	} );
} );
