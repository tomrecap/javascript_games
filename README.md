JavaScript Games
================

This is a collection of games that I built while learning JavaScript. It includes:
* Tic-tac-toe
* Towers of Hanoi
* Snake
I built it while pair-programming with  @roma198808. It was a fully collaborative effort, though his name got attached to the commits.

##Snake
We built this from scratch using HTML, CSS, and jQuery. It uses madrobby/keymaster to bind to the arrow keys for input. The snake can move in four directions and it will die by colliding with itself if it tries to turn 180˚. There are red apples that the snake can eat to grow. The HTML page includes a score tracker and a button to start a new game (using jQuery, without reloading the page). 

## Tic-tac-toe
We took existing code for a Node.js-based, command line tic-tac-to game and built a GUI for it using jQuery and CSS.

## Towers of Hanoi
Same story: we took existing code for a command line game and turned it into an interactive, web-based game. We did this by making a 'game board' in HTML using nested `div` elements, arranged into three groups of three. We then made CSS classes for each disc, giving them distinct colors and `width` values appropriate to their sizes. Then we connected the game's board model (an array of three arrays) to our graphical board. When the player clicks on one column, jQuery registers the click and looks up which disc is in the corresponding 'column' in the game's internal board. The player the clicks on another column to move the disk to, and jQuery uses a method to check whether such a move is valid for the game's internal board model. If so, it executes the move on the internal board and then re-renders the GUI to reflect the internal board's new state.
