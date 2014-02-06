function Snake() {
  this.direction = "E";
  this.segments = [[30,25], [29,25], [28,25], [27,25], [26,25], [25,25]];
};


Snake.STEPS = {
  'N': [ 0,-1],
  'E': [ 1, 0],
  'S': [ 0, 1],
  'W': [-1, 0]
};

Snake.prototype.move = function () {
  var head = this.segments[0].slice();
  var step = Snake.STEPS[this.direction];

  head = [head[0] + step[0], head[1] + step[1]];

  this.segments.unshift(head);
  this.segments.pop();
}

function Board() {
  // this.drawGrid();
  this.snake = new Snake();
};

Board.prototype.drawGrid = function () {
  for (var i = 0; i < 2500; i++) {
    $('.grid').append('<li class="cell" id='+ i +'></li>');
  };
};

Board.prototype.render = function () {
  var that = this;
  var segmentCells = [];

  for (var i = 0; i < that.snake.segments.length; i++) {
    segmentCells.push((that.snake.segments[i][1] * 50) + that.snake.segments[i][0]);
  };

  console.log("segmentCells:")
  console.log(segmentCells)

  $('li.cell').each(function(index, element){

    if (_.contains(segmentCells, index)) {
      $(element).addClass('snake');
    } else {
      $(element).removeClass('snake');
    };
  });
};

Board.prototype.gameOver = function () {
  var head = this.snake.segments[0].slice();

  if (head[0] < 0 || head[0] > 49 || head[1] < 0 || head[1] > 49) {
    return true;
  };

  return false;
};


var board = new Board();

$(document).ready( function() {

  board.drawGrid();
  board.render();

  $('body').on('click', function() {

    key('up', function(){ board.snake.direction = "N" });
    key('right', function(){ board.snake.direction = "E" });
    key('down', function(){ board.snake.direction = "S" });
    key('left', function(){ board.snake.direction = "W" });

    board.snake.move();


    if (board.gameOver()) {
      alert("You Lose!");
      $('body').off('click');
    } else {
      board.render();
    };
  })
});