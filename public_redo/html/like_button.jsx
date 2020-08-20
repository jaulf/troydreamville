'use strict';

class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <h1>It works!</h1>
    );
  }
}

let domContainer = document.getElementById('test');
ReactDOM.render(<Test />, domContainer);