// fire up
function _startMeUp() {

  const _element = document.documentElement;

  // only on supported devices
  if( _element.requestFullscreen || _element.mozRequestFullScreen || _element.webkitRequestFullscreen ) {

    // go fullscreen
    if (_element.requestFullscreen) {
      _element.requestFullscreen();
    } else if (_element.mozRequestFullScreen) {
      _element.mozRequestFullScreen();
    } else if (_element.webkitRequestFullscreen) {
      _element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }

    // listen for fullscreen close
    document.addEventListener("fullscreenchange", function( event ) {
      if ( !document.fullscreen ) {

        document.body.className = document.body.className.replace(" isStarted", "");

        // set new url (hash)
        if( history.pushState ) {
          history.pushState( null, null, '#/' );
        }

      }
    });

  }

  // start the game
  document.body.className += " isStarted";

  // set new url (hash)
  if( history.pushState ) {
    history.pushState( null, null, '#/start' );
  }

};


// exit fullscreen if supported
function _exitFullScreen() {

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }

  // set new url (hash)
  if( history.pushState ) {
    history.pushState( null, null, '#/' );
  }

}