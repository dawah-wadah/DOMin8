import Snake from './snake.js';
import Coord from './coord.js';
import Ration from './ration.js';

class Board {
  constructor(highScore) {
    this.snake = new Snake(this);
    this.score = 0;
    if (highScore) {
      this.highScore = highScore;
    } else {
      this.highScore = 0;
    }
    this.dimension = 25;
    this.ration = new Ration(this);
  }

  isValidPosition(coord) {
    return (coord.x >= 0 && coord.x < this.dimension &&
            coord.y >= 0 && coord.y < this.dimension);
  }

}

export default Board;
