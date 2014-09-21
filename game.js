$(function() {
  // Build the Player class
  function Player(name, speed, tackleChance, tackleAvoid) {
    this.name = name;
    this.speed = speed;
    this.fieldPosition = 80;
    this.tackleChance = tackleChance;
    this.tackleAvoid = tackleAvoid;
    this.down = false;
    this.run = function() {
      this.fieldPosition += this.speed;
    };
    this.currentFieldPos = function() { // Just for reporting purposes
      return 100 - this.fieldPosition;
    };
  }

  // Utility function to generate random #'s on demand. Thanks stackoverflow!
  function random() {
    return Math.floor(Math.random() * 10);
  };

  // Function to set runner/tackler's stats randomly to keep it interesting.
  function setRandomStats(runner, tackler) {
    runner.speed = random();
    tackler.speed = random();
    runner.tackleAvoid = random();
    tackler.tackleChance = random();
  };

  function runPlay(runner, tackler) {
    // Take absolute value of difference in runner/tackler field position.
    // If less than or equal to 5, tackler will try to tackle runner.
    diff = Math.abs(runner.fieldPosition - tackler.fieldPosition);
    if (diff <= 5) {
      attemptTackle(runner,tackler);
    }
  };

  function attemptTackle(runner,tackler) {
    if (runner.tackleAvoid > tackler.tackleChance) {
      replaceText(runner.name + " breaks a tackle!");
      // Set random stats for runner and tackler here so outcome isn't
      // constantly the same.
      setRandomStats(runner, tackler);
    }
    else {
      replaceText(tackler.name + " takes down " + runner.name + " and the Seahawks lose!  Oh what a heartbreak!");
      runner.down = true;
    }
  };

  function fadeInCallback(message) {
    $("this").text(message);
    console.log(message);
    $("this").fadeIn(400);
  }

  // Helper function to replace the text in the text area and fade it back in
  function replaceText(message) {
    $("p").delay(300).fadeOut(600, function() {
      fadeInCallback(message);
    });
  }
  // Define our runner/tackler.
  var RB = new Player("Marshawn", 8, 0, 7);
  var LB = new Player("Aldon", 5, 3, 0);
  yards = 100;

  function startPlay() {
    replaceText("Looks like the handoff goes to Marshawn Lynch and linebacker Aldon Smith is hot in his tail!")

    // Start the play!
    while (RB.down === false && RB.fieldPosition < 100) {
      RB.run();

      if (RB.fieldPosition >= 100) { // Break the loop if RB is in the end zone
        replaceText(RB.name + " SCORES!! The Seahawks win and the crowd goes WILD!!");
        break;
      }

      replaceText(RB.name + " is at the " + RB.currentFieldPos() + " yard line! He's fighting hard...");
      LB.run();
      runPlay(RB,LB);
    }
  };


  $("#go").click(function() {
    startPlay();
  })
});
