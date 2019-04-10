function SuggestButton(props){
  var c = props.used ? "used" : "";
  return (
    <a className={c} onClick={props.onClick}>{props.value}</a>
  )
}