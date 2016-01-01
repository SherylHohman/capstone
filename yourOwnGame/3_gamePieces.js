(function() {
  // Let's return to our gameBoard now.
    // Step back up to just before we started the reduce mini-sprint to
    //  remind yourself what we were doing.

  // First, note that in this file we still have access to our gameBoard object.
    //  This is because in boardBasics.js we put it on the window object.
    //  You can test this by trying to print the gameBoard variable to the console:

  //console.log('gameBoard object in gamePieces.js is:', gameBoard);

  // Remember that we'd just used each and filter
    //  to find all the gamePieces on the board:
    //    "results after filter: [Array[0], Array[0], Array[0], Array[3], Array[0], Array[2], Array[0], Array[0]]"

    //  for a gameBoard that has
    //    three gamePieces on row 3 and
    //    two game pieces on row 5.

  // Having that information scattered throughout a bunch of different arrays
    //    seems messy.
    //    You can probably think of plenty of cases where we'd want to have
    //    all that information collected into a single array.
    //  Wait, that's starting to sound like reduce!
    //    We're taking a collection of a bunch of things,
    //    and reducing it down to a single thing.

    // Can you think of a way we could reduce
    //  an array filled with arrays to a single array
    //  filled with all the values contained in each subarray?
      // Hint: what if we tried passing in an empty array as the starting value?

var gamePiecesArray = _.reduce(gameBoard, function(accumulator, row){
  _.each(row, function(square){
    if (square.gamePiece !== ''){
      accumulator.push(square);
    }
  });
  return accumulator;
}, []);
//console.log(gamePiecesArray);

  // This ends our intro to the capstone project.
    //  By this point you should be pretty familiar with
    //  - the gameBoard,
    //  - the makePiece function, and
    //  - all four of the main functional programming tools
    //    (each, map, filter, and reduce).
    //  From here on out, we're intentionally going to give you less guidance.
    //  One of the key skills to be a successful engineer is autonomy in
    //    accomplishing tasks that are given to you.
    //  We want you to get used to that feeling with these upcoming exercises.

// ===========================================================================

// === RESET GAMEBOARD ===
window.gameBoard = makeGameBoard(8);


  // 1. Create an array called piecesToAdd that
    //  holds the names of each of the pieces we'll create for each player.
    //  For example:
    //  ['kuddlyKoala', 'babyDino','babyDino', 'babyDino', 'fierceDragon', 'lazyPanda', 'lazyPanda']

  var piecesToAdd = ['kuddlyKoala', 'babyDino','babyDino', 'babyDino', 'fierceDragon', 'lazyPanda', 'lazyPanda', 'fierceDragon'];

  // 2. Create an array of the playerNames.
    //  For example: ['hermoineGranger', 'graceHopper']

  var playerNames = ["you", "me", "computer", "octopus"]

  // 3. Now use two (nested) each loops to add these pieces to the board.
    //  Remember that we have the makePiece function!

    //* for reference:
    // makePiece(gameBoard, [3,5], 'babyDino');
    // gameBoard[3][5].gamePiece.imageURL = "http://cs307103.vk.me/v307103801/4aad/kGuRYIMoJnw.jpg";

      // Question1:
        //  How can you make sure each piece ends up
        //  on a different square on the board?

    //* push and splice pieces onto, out of this array. holds coordinates.
    var occupiedSquares = [];

      // Question2:
        //  What happens when you get to the end of a line?

    //* index of each piece must be [0..7][0..7].
    //  when col index ===7, flip to flip colindex => 0 and row index increments.

        //  How do you know to start on the first position of the next line?

    //* when column index flips from 7 -> 0, increment row by 1

        //  Think if you can use the modulus "%" operator for this.
          //  If you're not familiar with the modulus operator,
          //  it gives you the remainder from dividing two numbers.
          //  So if we divide 12 by 8, that gives us a remainder of 4
          //  (we have 4 left over after taking 8 out of 12).
          //  As always, feel free to google around for more information!

    //* ok, since we have only 8 columns and 8 rows, we can use a number where
      // squareNum = 0..63 squares numbered from 0 to 63 accross top-L to bottom-R
      // column = squareNum % 8
      // row = Math.floor(squareNum/8);
      // squareNum = row * 8 + column;

      // Question3:
        //  How can we line these pieces up on opposite sides of the board?

    //* you mean top and bottom rows, or left and right columns ?
      //  I say top and bottom rows. set row to 0 or 7 respectively.
      //  enumerate col 0->7. actually could take bottom row and flip it over
      // via mod 64. so if you have a number from 64, it starts over at 0.
      // so just keep incrementing. Not great idea though.
      // I'd say set increment columns, with row set to 0 and 7.
      // If using square numbers, inc colIndex, and use calculation for square above.

      // BEST PRACTICE:
        //  Pseudocode the specific steps you'll need to accomplish.
        //  This takes a seemingly large and complex task and
        //  breaks it down into solvable chunks.

  _.each(piecesToAdd, function(name, colIndex){

    // top row
    makePiece(gameBoard, [0,colIndex], name);
    gameBoard[0][colIndex].gamePiece.imageURL = "http://cs307103.vk.me/v307103801/4aad/kGuRYIMoJnw.jpg";

    // bottom row in mirror image
    makePiece(gameBoard, [7,7-colIndex], name);
    gameBoard[7][7-colIndex].gamePiece.imageURL = "http://cs307103.vk.me/v307103801/4aad/kGuRYIMoJnw.jpg";
  });

  //console.log(getPiecesInPlay(gameBoard));

  // 4. Great!
    //  Now we have two fierce opposing armies arranged on the board.
    //    (or two groups of friends just trying to gather together
    //    on the same square for a group hug?!)

    //  It's time to make them look intimidating, or pretty
    //    for their impending battle, or hugfest.
    //  Let's use a couple of our functional programming skills here.
    //    We'll chain them together,slowly building up
    //  to do some fairly complex operations.

      // A. Use filter to iterate through a single row,
        //  returning an arr of the squareObj (s) in that row
        //  that have a gamePiece on them.

  var singleRow = gameBoard[0];
  var piecesInRow = _.filter(singleRow, function(square, colIndex){
    return (square.gamePiece !== '');
  });
  //console.log (piecesInRow);

      // B. Use map to change each of the objects
        //  in the array returned from filter
        //  to an array of their positions.
        //  Positions are a property saved as a property on each object.
        //  Console.log each object to check it out!
var locOfPiecesInRow = _.map(piecesInRow, function(piece){
  return piece.position;
});
//console.log(locOfPiecesInRow);

      // C. Use each or map to repeat this process on each row in your gameBoard.
        //  At this point, you should have an array of subarrays.
        //  Each of those subarrays will contain the positions of
        //  the squares in a given row that have a gamePiece on them.

      // D. Now, let's use reduce to reduce this down to a single array
        //  that contains the position of all the squares we're interested in.

// Uses the getPiecesInPlay function I wrote in 1_boardBasics.js
getOccupiedPositions = function()  {
  var occupiedSquares = _.map(getPiecesInPlay(), function(piece){
    return piece.position;
    });
  return occupiedSquares;
};
//console.log(getOccupiedPositions());

// translates array of position arrays to array of square numbers for easy id
getOccupiedSquares = function(occupiedPositions){
  return _.map(occupiedPositions, function(row0Column1){
    return (row0Column1[0] * 8 + row0Column1[1]);
  });
};
//console.log(getOccupiedSquares(getOccupiedPositions()));

// That's great. But I prefer seeing the squares as coordinates
printOccupiedCoords = function(offset){
  // optionalFlag will print coordinates with a 1,1 base, instead of 0,0
  offset = offset || 0;
  occupiedCoords = _.map(getOccupiedPositions(), function(arrayRowCol){
    return ('' + (arrayRowCol[0] + offset) + (arrayRowCol[1] + offset));
  });
//console.log(occupiedCoords);
};
//printOccupiedCoords();
printOccupiedCoords(1);

  // Whew!
    // You've now used all four of
    // the canonical functional programming functions!
      //  Great job getting here.

    //  Now we have a single array that holds the position of all the gamePieces.
    //  Let's use each to go through that array
      //  and do something with each item in that array.
      //  Except we're going to use it in a slightly creative way
        //    (yay for creativity in programming!
        //    And here my momma thought I'd never be an artist.).

      //  We're going to use each item in the positionsArray as
      //    information to go find the gamePiece at that position.

      //  Then, once we have those gamePieces, let's
      //    add an imageURL to each gamePiece
      //    so we can see the gamePieces on the board.

      //  imageURL is just a property on each object.
      //    All you need to do is add a link to an image.
        //  If you haven't done this before,
        //  you can right click on any image online,
        //  and get a link to that image.
        //  Set the imageURL property equal to that string, and voila!
        //  Your image will appear on the screen.
gamePieceImageURLs = ["images/tri-down-upDiag-cutout.png",
                   "images/tri-down-upDiag-solid.png",
                   "images/tri-up-downDiag-cutout.png",
                   "images/tri-up-downDiag-solid.png"
                  ];

  // 5. Use filter to grab all gamePieces of the same type, and
    //  then use each to iterate through them and set their movement descriptions.
      //  Don't worry about building out the logic of how you'd make them move
      //  - for now just have fun coming up with moves
      //  you'd want your various pieces to do.
      //  For example, maybe scaredKitty goes and hides in the corner,
      //  and impetuousDragon frequently flies off and leaves the board entirely.



  // 6. Use reduce to create an object that has a tally of all our gamePieces.

    //  For example, the result might be:
      // { babyDino: 3,
      //   impetutousDragon: 2,
      //   scaredKitty: 4,
      //   hobblingPirate:8,
      //   groupHuggers:12 }

var getTally = function(array){
  var final = _.reduce(array, function(tallies, piece){
    var name = piece.gamePiece.typeOfPiece;
    if (!tallies[name]) {
      tallies[name] = 1;
    } else {
      tallies[name]++;
    };
    return tallies;
  }, {});
  return final;
};

var tally = getTally(getPiecesInPlay());
//console.log(tally);

var getGamePieceTypes = function(tallyObj){
  return _.map(tallyObj, function(total, propName){ return propName });
};
var gamePieceTypes = getGamePieceTypes(tally);
//console.log(gamePieceTypes);

//* loop through our game pieces
//  find index of our gamepiece in the gamePieceTypes array
//  use this index with the
//  gamePieceMovement array and gamePieceImages array
//  to obtain the values to assign this current game piece's
//  movement and url properties.

var gamePieceMovementDescriptions = ["move left and up",
                                     "move right and up",
                                     "move left and down",
                                     "move right and down"
                                     ];

var assignGamePiecePersonalities = function(piecesInPlay){
  _.each(piecesInPlay, function(piece){
    index = gamePieceTypes.indexOf(piece.gamePiece.typeOfPiece);
    if (index === -1) console.log('ERROR in assignGamePiecePersonalities');
    else {
      piece.imageURL = gamePieceImageURLs[index];
      piece.movementDescription = gamePieceMovementDescriptions[index];
    };
  });
};

var piecesInPlay = getPiecesInPlay();
assignGamePiecePersonalities(piecesInPlay);
//console.log(piecesInPlay);

    // You should be able to do this from scratch by
    // just using reduce inside of another reduce if you're feeling ambitious!

// CARRY ON...
  //  You're doing great!!!
  //  Go ahead and check out the file called
  //    '4_gamePlay.js'
  //  in the yourOwnGame folder for more fun!

})();
