(function() {

  // 7. When a user clicks on a square,
    //  the app will invoke a function on the global scope called 'clickHandler'.
    //  This funnction will be invoked with the indices of the square clicked on.
    //  For example, if the user clicked on the square in the top-left corner of
    //    the board, the clickHandler will be invoked like so:
    //    clickHandler([0,0]);

    // TODO: Uncomment lines 119-121 in helperFunctions.js.
    //   (Search for the term "Note:")
    // The program will now try to invoke a clickHandler function every
    //   time the user clicks on a square on the board.

    // TODO: Uncomment the lines below and
    //  see what happens when you click on a square on the board!

  window.clickHandler = function(positionArr) {
    var row = positionArr[0];
    var column = positionArr[1];
    console.log('the user clicked on square:', gameBoard[row][column]);

    // #9 now use  see is square is occupied
    var piece = gameBoard[row][column].gamePiece;
    if (piece !== ''){
      piece.highlightSquares(row, column);
    } ;

  /* for #9 must remove this, this was # and #
    // copied from the helperFunctions.js
    var telegraphBlue1 = '#48B9C4';   // even (dark)
    var telegraphBlue2 = '#1A3D6D';   // odd  (light)

    // if clicked on square is pink, then return it back to it's orig color.
    var square = gameBoard[row][column];
    if (square.color === 'pink'){
      var isOdd = (row + column) % 2
      square.color = (isOdd ? telegraphBlue2 : telegraphBlue1);
    } else {
   */
  /* for #9 must remove this, this was # and #
    // turn all squares in clicked row pink
      _.each(gameBoard[row], function(square){
        square.color = 'pink';
      });
    // turn all squares in clicked column pink
      _.each(gameBoard, function(boardRow){
        boardRow[column].color = 'pink';
      });
    };
    */

    renderGameBoard(gameBoard);
        // IMPORTANT:
          // make sure that renderGameBoard(gameBoard)
          // always comes at the end of your clickHandler function.
          // Otherwise, your lovely UI enhancements won't show up!
  };

    // Write some logic inside of clickHandler that
      //  highlights all the squares in the row that has been clicked on
      //  by turning them pink.

    // Now expand this to include all the squares in the same column as
      //  the square that was clicked on.
      //  So if the user clicks on a square in row 3, column 4,
      //  all squares in row 3 and all squares in column 4 should become pink.

  // 8. Now let's go through and create a function to undo highlightPieces
    //  so the board returns to it's default pattern of alternating colors.
    //  There are several different approaches that will work well here.
    //  Choose whichever one you want
      //  (but do keep practicing functional programming
      //    - that will be incredibly valuable,
      //    particularly if it's still a bit painful for you).
      //  Just keep in mind that the end goal is to return the board to
      //    a "normal" looking state, where the color of the pieces alternates,
      //    as it originally did, with the gamePieces
      //    still being displayed on the relevant squares.

  //* This function is not used. I misunderstood the instructions
  var resetGameBoardColors = function(){

    // These should have been made global variables
    //  copied from the helperFunctions file
    var telegraphBlue1 = '#48B9C4';   // even (dark)
    var telegraphBlue2 = '#1A3D6D';   // odd  (light)

    _.each(gameBoard, function(row, rowIndex){
      _.each(row, function(square, colIndex){
        // if row + col is even, make dark blue, else make light blue
        if ((rowIndex + colIndex) % 2) {
          square.color = telegraphBlue2;
        } else {
          square.color = telegraphBlue1;
          console.log('hello');
        };
      });
    });
  };
  //resetGameBoardColors();

  // 9. Now let's abstract out the logic of highlighting the squares in
    //    the same row and column and
    //    put it into a function on each of our gamePieces.
    //  Our end goal here is to allow each gamePiece type to
    //    have it's own highlightSquares pattern.
    //  So some gamePiece types might move diagonally,
    //    some might move horizontally,
    //    some might jump randomly, etc.
    // To do this, we'll have to make highlightSquares a
    //    method on each gamePiece so
    //    we can customize it to that gamePiece type.

  var highlightRowCol = function(row, column){
      // turn all squares in clicked row pink
      _.each(gameBoard[row], function(square){
        square.color = 'pink';
      });
      // turn all squares in clicked column pink
      _.each(gameBoard, function(boardRow){
        boardRow[column].color = 'pink';
      });
      renderGameBoard(gameBoard);
    };

  var highlightRow = function(row, column){
          // turn all squares in clicked row pink
      _.each(gameBoard[row], function(square){
        square.color = 'pink';
      });
      renderGameBoard(gameBoard);
    };

  var highlightCol = function(row, column){
    // turn all squares in clicked column pink
      _.each(gameBoard, function(boardRow){
        boardRow[column].color = 'pink';
      });
      renderGameBoard(gameBoard);
    };

  var highlightDiagonal = function(row, column){
      renderGameBoard(gameBoard);
    // decrement r and c until c becomes -1.
    // then  add 7 to both and keep decrementing until reach starting square

    // diagonal up and left
    for (var r = row, c = column; (r >= 0 && c >= 0); r--, c--){
      gameBoard[r][c].color = 'pink';
    };
    // diagonal down and right
    for (var r = row, c = column; (r <= 7 && c <= 7); r++, c++){
      gameBoard[r][c].color = 'pink';
    };
    // diagonal up and left
    for (var r = row, c = column; (r >= 0 && c<= 7); r--, c++){
      gameBoard[r][c].color = 'pink';
    };
    // diagonal up and left
    for (var r = row, c = column; (r <= 7 && c >= 0); r++, c--){
      gameBoard[r][c].color = 'pink';
    };


  };

    // Create a function on each gamePiece called highlightSquares.
    var piecesInPlay = getPiecesInPlay();
    console.log(piecesInPlay);
    _.each(piecesInPlay, function(piece){
      piece.highlightSquares = highlightCol;// assign highlighting function
    });



    // Remove the highlightSquares from being hardcoded into our
      //  clickHandler function and
      //  put it into the highlightSquares method on each object.

    // Now, inside clickHandler, let's see if there is a gamePiece
      //  on the square that was clicked on.
      //  If there is, invoke highlightSquares as a method on that object.

  // 10. Now that highlightSquares is a method on each gamePiece object,
    //    we can change what each gamePiece's movement pattern is!
    //  Go through and change the logic of which squares on the
    //    board are highlighted for each different type of piece.

    //  For our scaredKitten example, whose movement description is
      //   "Runs to a corner and hides",
      //   we would highlight only the four corner squares.

    // Each gamePiece of the same type should have the
    //    same highlightSquares functionality.

    // See if you can highlight all the diagonal squares from a piece.
      // HINT: This is going to sound obvious,
        //  but what math do you have to do to move from square [0,0]
        //  to it's lower-right diagonal of [1,1]?
      // HINT: There are 4 potential diagonals from a given square:
        // 1. up and to the right
        // 2. down and to the right
        // 3. down and to the left
        // 4. up and to the left
        // Each one will have it's own logic and will
          //  likely have to be built out separately. Don't feel bad about this!
          //  Start by making just one of those four work.
        // This is a super valuable pattern called MVP, or
          //  "Minimum Viable Product".
          //  All it means is get the tiniest possible version of
          //    something working first,
          //    then work on expanding it out to a full feature set.
          //  In this case, make one diagonal work first,
          //    then worry about the other three afterwards.

  // 11. Now we're highlighting specific squares that represent where
     //    each piece can move to.
     //  Let's build out some logic, starting in our clickHandler,
     //    that lets us highlight squares on the board when a piece is clicked,
     //    and then un-highlight the board (return it to it's default state)
     //    when that same piece is clicked again.
     //  There are many different ways of accomplishing this
     //   - we're going to challenge you to figure out which path you want to take!

  // 12. Now we can click on a piece to highlight the available squares it
    //     can move to, and click on it again to un-highlight those squares.
    //   Let's expand the logic of the highlightPieces methods!
    //   Check each square that gets highlighted
    //     to see if it has a piece on it or not.
    //     If there is a piece on that square already,
    //       set the text property of that square to be the following two lines:
    //       "OXO
    //        XOX"
    //  This should tell the user that there is a potential collision on
    //    that square, if the piece were to move there.

  // 13. Now let's build out the ability to make each piece move on the board!
    //  While a piece is clicked
    //      (i.e., while the squares it can move to on the board are highlighted),
    //    if one of those squares is clicked on,
    //      move the piece there!
    //  For now, let's assume our user is being nice to us
    //    and will only try to move the gamePiece to a square
    //    that is eligible to be moved to.

    // When this happens, there are a few things we need to do:
      // 1. Add the piece to it's new location
      // 2. Remove the piece from it's current location
      // 3. Remove highlighting from the board
      // 4. Depending on your implementation, set that piece as inactive.

  // 14. Great!
  //  Now we can click on a piece and then click on another square to move it there.
    //  That's pretty cool.
    //  But we've been assuming that our user would be nice to us
    //    by only trying to move a piece to where it's allowed to move.
    //  What if we wanted to allow not-so-nice people to play our game too?
    //  Let's add in a logic check here.
    //    Make sure the square the user clicks on to try to move a piece to
    //    is a square that piece can actually move to.

    // How can we accomplish this?
      //  Well we've already highlighted the eligible squares on
      //  the board with a certain color, right?
      //  Let's use that to our advantage!

    // If the user-selected square isn't eligible,
      // pop up an alert for the user telling them to either:
      // A. Choose a different square that is highlighted in pink to move the piece to
      // B. Click on the same original square again to de-select that piece.

  /*

    CONGRATULATIONS!!

      You've now gotten in extensive practice on functional programming, and should be incredibly comfortable with a variety of creative ways to put functional programming to use!

      You've typed up many, many lines of code, debugged extensively, and learned some basics of making things show up on the user's screen.

      You've built out the basic functionality needed for a board game.
      From here, you can easily extend this to be whatever you want it to be!
      You can build out your own game logic from here to make it into any game you want. You can add in your own gamePieces (with their own funny images!),
        and style the board any way you want.

      We hope you've had an awesome time on these first parts of your JS Journey!
      We're honored that we got to share them with you.
      Can't wait to see the amazing things your future holds in store
        with these newfound skills :)


    Sincerely,
    The team at Telegraph Academy

    */

})();
