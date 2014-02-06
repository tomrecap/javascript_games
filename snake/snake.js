function Snake() {
  this.direction = "E";
  this.segments = [[26,25], [25,25]];
};

Snake.STEPS = {
  'E': [1,0]
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


  var board = new Board();


$(document).ready( function() {

  board.drawGrid();

  $('body').on('click', function() {
    board.snake.move();
    board.render();
  })
});