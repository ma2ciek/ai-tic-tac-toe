enum Results {
	FIRST_PLAYER_WIN,
	SECOND_PLAYER_WIN,
	DRAW,
	PENDING
}

interface HistoryItem {
	board: number[];
	player: 1 | 2,
	move: number;
}

export default class Game {
	currentBoard: number[];
	history: HistoryItem[];

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
		return (
			this.checkResultForTiles( 0, 1, 2 ) ??
			this.checkResultForTiles( 3, 4, 5 ) ??
			this.checkResultForTiles( 6, 7, 8 ) ??
			this.checkResultForTiles( 0, 4, 8 ) ??
			this.checkResultForTiles( 2, 4, 6 ) ??
			this.checkResultForTiles( 0, 3, 6 ) ??
			this.checkResultForTiles( 1, 4, 7 ) ??
			this.checkResultForTiles( 2, 5, 8 ) ??
			( this.currentBoard.includes( 0 ) ? Results.PENDING : Results.DRAW )
		);
	}

	public applyMove( player: 1 | 2, move: number ): void {
		this.history.push( {
			board: [ ...this.currentBoard ],
			player,
			move
		} );
		this.currentBoard[ move ] = player;
	}

	public getHistory(): HistoryItem[] {
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

		return board;
	}

	private checkResultForTiles( tile1: number, tile2: number, tile3: number ): Results | undefined {
		if ( this.currentBoard[ tile1 ] === this.currentBoard[ tile2 ] && this.currentBoard[ tile2 ] === this.currentBoard[ tile3 ] ) {
			if ( this.currentBoard[ tile1 ] === 1 ) {
				return Results.FIRST_PLAYER_WIN
			} else if ( this.currentBoard[ tile1 ] === 2 ) {
				return Results.SECOND_PLAYER_WIN;
			}
		}
	}
}
