class Main extends React.Component {


  getColumnCount() {
    if( !this.props.solution[1] ) {
      return this.props.solution[0].length;
    } else {
      return this.props.solution[0].length >= this.props.solution[1].length ? this.props.solution[0].length : this.props.solution[1].length;
    }
  }


  renderSolutionRows() {

    var buttonCount = 0;
    var rows = [[],[]];

    for( var i=0; i<=1; i++ ) {
      if( this.props.solution[i] ) {

        this.props.solution[i].split("").forEach((v)=>{
          if( v == " " ) {
            rows[i].push( <SolutionSpacer /> );
          } else {
            let val = this.props.suggestionsUsed[buttonCount]!=undefined ? this.props.suggestions[ this.props.suggestionsUsed[buttonCount] ] : null;
            rows[i].push( <SolutionButton value={val} onClick={()=>this.props.onClick()} /> );
            buttonCount++;
          }
        });

      }
    }

    return (
      <div id="solution" data-cols={this.getColumnCount()}>
        <div>{rows[0]}</div>
        <div>{rows[1]}</div>
      </div>
    )

  }


  render() {
    return (

      <main class={this.props.correntAnswer}>

        <div id="container">
          <div id="imgQuestion" style={{backgroundImage:'url(logos/' + this.props.image + ')'}}></div>
          <div id="imgSolution" style={{backgroundImage:'url(logos/' + this.props.imageSolved + ')'}}></div>
        </div>

        {this.renderSolutionRows()}
      
      </main>

    )
  }


}