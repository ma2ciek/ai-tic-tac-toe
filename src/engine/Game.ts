enum Results {
	FIRST_PLAYER_WIN,
	SECOND_PLAYER_WIN,
	DRAW,
	PENDING
}

export default class Game {
	currentBoard: number[];
	history: number[][];

	constructor() {
		this.history = [];
		this.currentBoard = this.createEmptyBoard();
	}

	public getAvailableMoves(): number[] {
		const availableMoves: number[] = [];

		for ( let x = 0; x < this.currentBoard.length; x++ ) {
			if ( this.currentBoard[ x ] === 0 ) {
				availableMoves.push( x );
			}
		}

		return availableMoves;
	}

	public getResult(): Results {
		if ( this.currentBoard[ 0 ] === this.currentBoard[ 1 ] && this.currentBoard[ 1 ] === this.currentBoard[ 2 ] ) {
			if ( this.currentBoard[ 0 ] === 1 ) {
				return Results.FIRST_PLAYER_WIN
			} else if ( this.currentBoard[ 0 ] === 2 ) {
				return Results.SECOND_PLAYER_WIN;
			}
		}
		if ( this.currentBoard[ 3 ] === this.currentBoard[ 4 ] && this.currentBoard[ 4 ] === this.currentBoard[ 5 ] ) {
			if ( this.currentBoard[ 3 ] === 1 ) {
				return Results.FIRST_PLAYER_WIN
			} else if ( this.currentBoard[ 0 ] === 2 ) {
				return Results.SECOND_PLAYER_WIN;
			}
		}
		if ( this.currentBoard[ 6 ] === this.currentBoard[ 7 ] && this.currentBoard[ 7 ] === this.currentBoard[ 8 ] ) {
			if ( this.currentBoard[ 6 ] === 1 ) {
				return Results.FIRST_PLAYER_WIN
			} else if ( this.currentBoard[ 0 ] === 2 ) {
				return Results.SECOND_PLAYER_WIN;
			}
		}
		if ( this.currentBoard[ 0 ] === this.currentBoard[ 3 ] && this.currentBoard[ 3 ] === this.currentBoard[ 6 ] ) {
			if ( this.currentBoard[ 0 ] === 1 ) {
				return Results.FIRST_PLAYER_WIN
			} else if ( this.currentBoard[ 0 ] === 2 ) {
				return Results.SECOND_PLAYER_WIN;
			}
		}
		if ( this.currentBoard[ 1 ] === this.currentBoard[ 4 ] && this.currentBoard[ 4 ] === this.currentBoard[ 7 ] ) {
			if ( this.currentBoard[ 1 ] === 1 ) {
				return Results.FIRST_PLAYER_WIN
			} else if ( this.currentBoard[ 0 ] === 2 ) {
				return Results.SECOND_PLAYER_WIN;
			}
		}
		if ( this.currentBoard[ 2 ] === this.currentBoard[ 5 ] && this.currentBoard[ 5 ] === this.currentBoard[ 8 ] ) {
			if ( this.currentBoard[ 2 ] === 1 ) {
				return Results.FIRST_PLAYER_WIN
			} else if ( this.currentBoard[ 0 ] === 2 ) {
				return Results.SECOND_PLAYER_WIN;
			}
		}
		if ( this.currentBoard[ 0 ] === this.currentBoard[ 4 ] && this.currentBoard[ 4 ] === this.currentBoard[ 8 ] ) {
			if ( this.currentBoard[ 0 ] === 1 ) {
				return Results.FIRST_PLAYER_WIN
			} else if ( this.currentBoard[ 0 ] === 2 ) {
				return Results.SECOND_PLAYER_WIN;
			}
		}
		if ( this.currentBoard[ 2 ] === this.currentBoard[ 4 ] && this.currentBoard[ 4 ] === this.currentBoard[ 6 ] ) {
			if ( this.currentBoard[ 2 ] === 1 ) {
				return Results.FIRST_PLAYER_WIN
			} else if ( this.currentBoard[ 0 ] === 2 ) {
				return Results.SECOND_PLAYER_WIN;
			}
		}
		if ( this.currentBoard.includes( 0 ) ) {
			return Results.PENDING;
		}

		return Results.DRAW;
	}

	public applyMove( player: 1 | 2, move: number ): void {
		this.currentBoard[ move ] = player;
		this.history.push( this.currentBoard );
	}

	public getHistory(): number[][] {
		return this.history;
	}

	public printCurrentBoard(): void {
		console.log( this.currentBoard );
	}

	private createEmptyBoard(): number[] {
		const board: number[] = [];

		for ( let x = 0; x < 9; x++ ) {
			board.push( 0 );
		}

		this.history.push( board );

		return board;
	}
}
