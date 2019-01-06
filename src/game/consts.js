/*******************************************************************************
"Tic Tac Toe" Game on JavaScript - Consts and Helpers

Copyright (c) KARPOLAN <i@karpolan.com> (https://karpolan.com)
*******************************************************************************/
export const GAME_INTELECT_DEFAULT = 5; 	// Dfault AI intelect level: 1..5 
export const GAME_DELAY_AUTO_TURNS = 500; // Delay before/between automatic turns by AI, in milli-seconds.

export const cellsDefault = [
	0, 0, 0,
	0, 0, 0,
	0, 0, 0
];

export const cellsCenter = 4;
export const cellsCorners = [0, 2, 6, 8];

export const sumsDefault = [
	0, 0, 0,
	0, 0, 0,
	0, 0
];

export const mapCellsToSum = [
	[0, 1, 2],	// Horizontal 1
	[3, 4, 5],	// Horizontal 2
	[6, 7, 8],	// Horizontal 3
	[0, 3, 6],	// Vertical 1
	[1, 4, 7],	// Vertical 2
	[2, 5, 8],	// Vertical 3
	[0, 4, 8],	// Diagonal from left up to right down
	[6, 4, 2]		// Diagonal from left down to right up
];
