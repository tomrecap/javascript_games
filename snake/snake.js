function Snake(board) {
  this.board = board;
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

  var applePositionPlusTwo = null;

  for (var i = 0; i < this.board.apples.length; i++) {
    if (_.isEqual(head, this.board.apples[i])) {
      applePositionPlusTwo = i + 2;
    };
  };

  if (applePositionPlusTwo) {
    this.board.apples.splice(applePositionPlusTwo - 2, 1);
    this.board.placeRandomApple();
    this.board.applesEaten += 1;
  } else {
    this.segments.pop();
  };
}

function Board() {
  // this.drawGrid();
  this.snake = new Snake(this);
  this.apples = [];
  this.applesEaten = 0
};

var drawGrid = function () {
  for (var i = 0; i < 2500; i++) {
    $('.grid').append('<li class="cell" id='+ i +'></li>');
  };
};

Board.prototype.render = function () {
  var that = this;
  var segmentCells = [];
  var appleCells = []

  // calculate segment cell ids
  for (var i = 0; i < that.snake.segments.length; i++) {
    segmentCells.push((that.snake.segments[i][1] * 50) + that.snake.segments[i][0]);
  };

  // calculate apple cell ids
  for (var i = 0; i < that.apples.length; i++) {
    appleCells.push((that.apples[i][1] * 50) + that.apples[i][0]);
  };

  $('li.cell').each(function(index, element){
    // render segments
    if (_.contains(segmentCells, index)) {
      $(element).addClass('snake');
    } else {
      $(element).removeClass('snake');
    };

    // render apples
    if (_.contains(appleCells, index)) {
      $(element).addClass('apple');
    } else {
      $(element).removeClass('apple');
    };
  });
};

Board.prototype.gameOver = function () {
  var head = this.snake.segments[0].slice();
  var tail = this.snake.segments.slice(1);

  for (var i = 0; i < tail.length; i++) {
    if (_.isEqual(head, tail[i])) { return true; };
  };

  if (head[0] < 0 ||
    head[0] > 49 ||
    head[1] < 0 ||
    head[1] > 49) {
    return true;
  };

  return false;
};

Board.prototype.playTurn = function() {
  this.snake.move();

  if (this.gameOver()) {
    // alert("You Lose!");

    clearInterval(this.intervalID);

  } else {
    $('#score').text(this.applesEaten);
    this.render();
  };
};

Board.prototype.placeRandomApple = function () {
  var position = [Math.floor(Math.random() * 49), Math.floor(Math.random() * 49)]

  this.apples.push(position);
};

var startGame = function () {
  var board = new Board();

  board.placeRandomApple();
  board.placeRandomApple();
  board.placeRandomApple();

  board.render();

  key('up', function(){ board.snake.direction = "N" });
  key('right', function(){ board.snake.direction = "E" });
  key('down', function(){ board.snake.direction = "S" });
  key('left', function(){ board.snake.direction = "W" });

  board.intervalID = setInterval(board.playTurn.bind(board), 100);

  return board;
}

// var board = new Board();

$(document).ready( function() {

  // board.drawGrid();
  // board.render();

  drawGrid();

  var board = startGame();



  // board.intervalID = setInterval(board.playTurn.bind(board), 100);

  $('#button').on('click', function(){
    clearInterval(board.intervalID);
    board = startGame();
  });

});