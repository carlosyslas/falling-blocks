import { BLOCK_SIZE, BLOCK, GRID_SIZE, EMPTY } from "../../constants";

const state = {
  block: {
    name: Object.keys(BLOCK)[Math.floor(Math.random() * 7)],
    x: GRID_SIZE.width / 2 - BLOCK_SIZE.width / 2,
    y: -1,
    rotation: 0
  },
  grid: Array.from(Array(GRID_SIZE.height)).map(() =>
    Array.from(Array(GRID_SIZE.width)).map(() => EMPTY)
  ),
  rowsToRemove: [],
  isFirstGame: true,
  isGameRunning: true,
  score: 0,
  speed: 500
};

const getBlockStringIndex = ({ x, y, rotation }) => {
  switch (rotation) {
    case 1:
      return 12 - 4 * x + y;
    case 2:
      return 15 - 4 * y - x;
    case 3:
      return 3 + 4 * x - y;
    case 0:
    default:
      return 4 * y + x;
  }
};

const getters = {
  x: state => state.block.x,
  y: state => state.block.y,
  rotation: state => state.block.rotation,
  isRunning: state => state.isGameRunning,
  isFirstGame: state => state.isFirstGame,
  score: state => state.score,
  speed: state => state.speed,
  grid: (state, getters) => {
    const grid = state.grid.slice().map(row => row.slice());
    const block = getters.block;
    const { y: yOffset, x: xOffset } = state.block;

    for (let y = 0; y < BLOCK_SIZE.height; y++) {
      for (let x = 0; x < BLOCK_SIZE.width; x++) {
        if (
          x + xOffset < GRID_SIZE.width &&
          y + yOffset < GRID_SIZE.height &&
          x + xOffset >= 0 &&
          y + yOffset >= 0
        ) {
          if (block[y][x] === EMPTY) {
            continue;
          }
          grid[y + yOffset][x + xOffset] = block[y][x];
        }
      }
    }

    return grid;
  },
  block: state => {
    const block = [];
    const { name, rotation } = state.block;

    for (let y = 0; y < BLOCK_SIZE.height; y++) {
      const row = [];
      for (let x = 0; x < BLOCK_SIZE.width; x++) {
        const index = getBlockStringIndex({ x, y, rotation });

        row.push(BLOCK[name][index]);
      }
      block.push(row);
    }

    return block;
  },
  isValidMove: (state, getters) => {
    const { name } = state.block;

    // TODO: rename xOffset to xGrid
    return ({ x: xOffset = 0, y: yOffset = 0, rotation = 0 }) => {
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
          const index = getBlockStringIndex({ y, x, rotation });
          if (BLOCK[name][index] === EMPTY) {
            continue;
          }

          if (x + xOffset < 0) {
            return false;
          }
          if (x + xOffset > GRID_SIZE.width - 1) {
            return false;
          }
          if (y + yOffset > GRID_SIZE.height - 1) {
            return false;
          }
          if (state.grid[y + yOffset][x + xOffset] !== EMPTY) {
            return false;
          }
        }
      }

      return true;
    };
  },
  shouldRemoveRow: state => y => {
    if (y >= GRID_SIZE.height) {
      return false;
    }

    for (let x = 0; x < GRID_SIZE.width; x++) {
      //console.log("?", state.grid[y=);
      if (state.grid[y][x] === EMPTY) {
        return false;
      }
    }
    return true;
  },
  rowsToRemove: state => state.rowsToRemove
};

const actions = {
  fallBlock({ dispatch }) {
    dispatch("moveBlock", { yOffset: 1 });
  },
  moveBlock({ commit, getters }, { xOffset = 0, yOffset = 0 }) {
    const { x, y, rotation, block } = getters;

    commit("removeFullRows");

    if (xOffset !== 0 && getters.isValidMove({ x: x + xOffset, y, rotation })) {
      commit("setBlockX", x + xOffset);
    } else if (getters.isValidMove({ x, y: y + yOffset, rotation })) {
      commit("setBlockY", y + yOffset);

      if (!getters.isValidMove({ x, y: y + yOffset + 1, rotation })) {
        commit("copyBlockToGrid", { x, y: y + yOffset, block });
        commit("createNewBlock");
        commit("decreaseSpeed");
        for (let blockY = 0; blockY < BLOCK_SIZE.height; blockY++) {
          if (getters.shouldRemoveRow(y + blockY + 1)) {
            commit("markRowToRemove", y + blockY + 1);
          }
        }
      }
    }
  },
  rotateBlock({ commit, getters }) {
    const { x, y, rotation } = getters;

    let newRotation = rotation + 1;
    if (newRotation > 3) {
      newRotation = 0;
    }

    if (getters.isValidMove({ x, y, rotation: newRotation })) {
      commit("setBlockRotation", newRotation);
    }
  }
};

const mutations = {
  setBlockX(state, newX) {
    state.block.x = newX;
  },
  setBlockY(state, newY) {
    state.block.y = newY;
  },
  setBlockRotation(state, newRotation) {
    state.block.rotation = newRotation;
  },
  createNewBlock(state) {
    state.block.x = GRID_SIZE.width / 2 - BLOCK_SIZE.width / 2;
    state.block.y = -1;
    state.block.rotation = 0;
    state.block.name = Object.keys(BLOCK)[Math.floor(Math.random() * 7)];
  },
  copyBlockToGrid(state, { block, x: xOffset, y: yOffset }) {
    const grid = state.grid.slice().map(row => row.slice());
    for (let y = 0; y < BLOCK_SIZE.height; y++) {
      for (let x = 0; x < BLOCK_SIZE.width; x++) {
        if (block[y][x] === EMPTY) {
          continue;
        }
        grid[y + yOffset][x + xOffset] = block[y][x];
      }
    }

    state.grid = grid;
  },
  markRowToRemove(state, y) {
    state.rowsToRemove = [...state.rowsToRemove, y];
  },
  removeFullRows(state) {
    state.rowsToRemove.forEach(yStart => {
      for (let y = yStart; y > 1; y--) {
        state.grid[y] = state.grid[y - 1];
      }
    });

    state.rowsToRemove = [];
  },
  // TODO: rename this, since it's not a speed but a "tick" duration.
  decreaseSpeed(state) {
    if (state.speed > 10) {
      state.speed -= 10;
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
