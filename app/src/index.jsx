// main component
class Game extends React.Component {

  constructor(props) {

    super(props);

    // level config
    this.levelContent = [
      {}, // dummy for level 0
      {
        solution:    ["real","madrid"], // two array elements for two rows (space is possible too)
        suggestions: ["a","l","m","d","a","r","i","d","r","f","m","r","m","e"], // always 14 chars to choose from
        image:       "01.svg", // in logos folder
        imageSolved: "01s.svg", // in logos folder
      },
      {
        solution:    ["chelsea"],
        suggestions: ["l","e","a","l","c","s","e","h","o","h","r","b","v","c"],
        image:       "02.svg",
        imageSolved: "02s.svg",
      },
      {
        solution:    ["inter"],
        suggestions: ["n","r","m","g","i","g","h","u","i","t","e","r","a","k"],
        image:       "03.svg",
        imageSolved: "03s.svg",
      },
      // ...
    ]

    this.state = {
      level: 1,
      suggestionsUsed: [],
      helper: 2,
      correntAnswer: null
    };

    this.checkForCookie();
    this.initStateVars();

  }


  // load level from browser cookie
  checkForCookie() {
    if( document.cookie ) {
      let c = document.cookie;
      let match = c.match(/level=([0-9]*)/);
      if( match && match[1] ) {
        let levelFromCookie = match[1]*1;
        if( levelFromCookie <= this.levelContent.length ) {
          this.state.level = levelFromCookie;
        }
      }
    }
  }


  // calculate solution variables
  initStateVars() {
    if( this.state.level >= 1 ) {
      this.state.solutionClean = this.levelContent[ this.state.level ].solution.join("").replace(" ","");
      this.state.solutionSlots = this.state.solutionClean.length;
    }
  }


  // click on solution button
  handleSolutionClick() {
    if( this.state.suggestionsUsed.length >= 1 ) {
      var newState = this.state;
      newState.suggestionsUsed.pop();
      newState.correntAnswer = null;
      this.setState(newState);
    }
  }


  // click in suggestion button
  handleSuggestionClick(i) {
    if(
      !this.state.suggestionsUsed.includes(i) &&
      this.state.suggestionsUsed.length < this.state.solutionSlots
    ) {

      var newState = this.state;
      newState.suggestionsUsed.push(i);
      this.setState(newState);

      if( this.state.suggestionsUsed.length == this.state.solutionSlots ) {
        this.checkAnswer();
      }

    }
  }


  // click on help button
  handleHelperClick() {
    if(
      this.state.helper >= 1 &&
      this.state.suggestionsUsed.length < this.state.solutionSlots
    ) {

      var newState = this.state;
      newState.suggestionsUsed = [];

      var hint = this.state.solutionClean.split("");

      // first click: show half the answer
      // second click: show almost the entire answere (just one field left)
      if( newState.helper == 1 ) {
        var count = hint.length - 1;
      } else {
        var count = Math.floor( hint.length / 2 );
      }

      hint.splice( count );

      hint.forEach((h)=>{
        this.levelContent[this.state.level].suggestions.some((s,i)=>{
          if( s == h ) {
            newState.suggestionsUsed.push(i);
            return true;
          }
        });
      });
      
      newState.helper--;
      this.setState(newState);

    }
  }


  // check if answer ist correct
  checkAnswer() {

    var suggestions = this.levelContent[this.state.level].suggestions;
    var selectedString = "";

    this.state.suggestionsUsed.forEach((v)=>{
      selectedString += suggestions[v];
    });

    if( selectedString == this.state.solutionClean ) {
      this.state.correntAnswer = "correct";
      setTimeout(() => { this.nextLevel() }, 4000);
    } else {
      this.state.correntAnswer = "incorrect";
    }

  }


  // goto next level
  nextLevel() {

    if( (this.state.level+1) < this.levelContent.length ) {

      var newState = this.state;

      newState.level++;
      newState.suggestionsUsed = [];
      newState.helper = 2;
      newState.correntAnswer = null;
  
      this.setState(newState);
  
      this.initStateVars();

    } else {

      // finished?
      var newState = this.state;
      newState.level = 0;
      this.setState(newState);

    }

    // set cookie (valid for two days)
    document.cookie = "level="+this.state.level+"; max-age=172800; path=/";

  }


  // exit game
  handleExit() {
    _exitFullScreen();
    document.body.className = document.body.className.replace(" isStarted", "");
  }


  // preload images
  componentDidMount() {
    this.levelContent.forEach((v) => {
      if( v.image ) {
        let img = new Image();
        img.src = 'logos/' + v.image;
      }
    });
  }


  render() {
    if( this.state.level >= 1) {

      // main game
      return (
        <div className="reactContainer">
  
          <Header
            level={this.state.level}
            helper={this.state.helper}
            onClick={()=>this.handleHelperClick()}
          />
  
          <Main
            image={this.levelContent[this.state.level].image}
            imageSolved={this.levelContent[this.state.level].imageSolved}
            solution={this.levelContent[this.state.level].solution}
            suggestions={this.levelContent[this.state.level].suggestions}
            suggestionsUsed={this.state.suggestionsUsed}
            correntAnswer={this.state.correntAnswer}
            onClick={()=>this.handleSolutionClick()}
          />
  
          <Footer
            suggestions={this.levelContent[this.state.level].suggestions}
            suggestionsUsed={this.state.suggestionsUsed}
            onClick={(i)=>this.handleSuggestionClick(i)}
          />
  
        </div>
      );

    } else {

      // finish
      return (
        <div className="reactContainer successInfo">
          <SuccessInfo
            onRestartClick={()=>this.nextLevel()}
            onExitClick={()=>this.handleExit()}
          />
        </div>
      );

    }
  }

  
}


// render the app
ReactDOM.render(
  <Game />,
  document.getElementById("game")
);
