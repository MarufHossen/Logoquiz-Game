function SuccessInfo(props){
  return (
    <div>

      <h2>Congratulations</h2>
      <p>You have finished the game!</p>

      <a className="button" onClick={props.onRestartClick}>Restart</a>
      <a className="button" onClick={props.onExitClick}>Quit</a>

      <div className="pyro">
        <div className="before"></div>
        <div className="after"></div>
      </div>

    </div>
  )
}