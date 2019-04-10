function Header(props) {

  var c = props.helper>=1 ? "available" : "";

  return (
    <header>
      <div>
        <span>Level {props.level}</span>
        <a className={c} onClick={props.onClick}>?</a>
      </div>
    </header>
  );

}