// prettier-ignore
export const BLOCK = {
  I: [
    "  I ", 
    "  I ", 
    "  I ", 
    "  I "
  ].join(""),
  O: [
    "    ", 
    " OO ", 
    " OO ", 
    "    "
  ].join(""),
  T: [
    "    ", 
    " TTT", 
    "  T ", 
    "    "
  ].join(""),
  J: [
    "    ", 
    "J   ", 
    "JJJ ", 
    "    "
  ].join(""),
  L: [
    "    ", 
    "   L", 
    " LLL", 
    "    "
  ].join(""),
  S: [
    "    ",
    "  SS", 
    " SS ", 
    "    ", 
  ].join(""),
  Z: [
    "    ", 
    " ZZ ", 
    "  ZZ", 
    "    "
  ].join(""),
};

export const EMPTY = " ";
export const WALL = "wall";

export const SCORE_INCREMENTS = [0, 40, 100, 300, 1200];

export const INITIAL_SPEED = 500;

export const BLOCK_SIZE = {
  width: 4,
  height: 4
};

export const GRID_SIZE = {
  width: 12,
  height: 22
};

export const KEY_CODE = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  space: 32
};
