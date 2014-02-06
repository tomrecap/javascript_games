function Game() {
  this.towers = [[3, 2, 1], [], []];
};

Game.prototype.isWon = function () {
  // move all the discs to the last tower
  return (this.towers[2].length == 3) || (this.towers[1].length == 3);
};

Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
  var startTower = this.towers[startTowerIdx];
  var endTower = this.towers[endTowerIdx];

  if (startTower.length === 0) {
    return false;
  } else if (endTower.length == 0) {
    return true;
  } else {
    var topStartDisc = startTower[startTower.length - 1];
    var topEndDisc = endTower[endTower.length - 1];
    return topStartDisc < topEndDisc;
  }
};

Game.prototype.move = function (startTowerIdx, endTowerIdx) {
  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
    this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
    return true;
  } else {
    return false;
  }
};

Game.prototype.run = function () {
  var game = this;

  READER.question("Enter a starting tower: ",function (start) {
    var startTowerIdx = parseInt(start);
    READER.question("Enter an ending tower: ", function (end) {
      var endTowerIdx = parseInt(end);
      game.takeTurn(startTowerIdx,endTowerIdx);
    });
  });
};

Game.prototype.takeTurn = function (start,end){
  var game = this;

  if (game.move(start,end)) {
    console.log(game.towers);
  } else {
    console.log("Invalid move!")
  }

  if (game.isWon()) {
    console.log("You win!");
    READER.close();
  } else {
    game.run();
  }
}

Game.prototype.render = function() {
  var that = this;
  var pageColumns = $('div.col');

  pageColumns.each(function(colNum, pageCol) {
    var pageCells = $(pageCol).children();

    pageCells.each(function(cellNum, cell) {
      var discWidth = ((that.towers[colNum][2 - cellNum] + "") || "0");
      // $(cell).data('size', discWidth);
      $(cell).attr('data-size', discWidth);

    });
  });
};

var game = new Game();

$(function() {

  game.columnsClicked = []

  $('.col').on('click', function(){
    // add column number to colClicked
    game.columnsClicked.push(parseInt($(this).attr('data-column')));

    $(this).toggleClass('clicked');

    // if colClicked.length == 2, game.move, colClicked = []
    if (game.columnsClicked.length == 2){
      game.move(game.columnsClicked[0], game.columnsClicked[1]);
      game.columnsClicked = [];
      $('.col').removeClass('clicked');
    };

    game.render()

    if (game.isWon()) {
      alert("You Won!");
      $('.col').off('click');
    };

  });

  game.render();
});
