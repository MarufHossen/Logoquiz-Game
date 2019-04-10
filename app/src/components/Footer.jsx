class Footer extends React.Component {

  
  renderRows() {

    let firstRow = [];
    let secondRow = [];

    this.props.suggestions.forEach((v,i)=>{
      if( i < 7 ) {
        firstRow.push( <SuggestButton value={v} used={this.props.suggestionsUsed.includes(i)} onClick={()=>this.props.onClick(i)} /> )
      } else {
        secondRow.push( <SuggestButton value={v} used={this.props.suggestionsUsed.includes(i)} onClick={()=>this.props.onClick(i)} /> )
      }
    });

    return (
      <footer>
        <div>{firstRow}</div>
        <div>{secondRow}</div>
      </footer>
    )

  }


  render() {
    return this.renderRows()
  }


}