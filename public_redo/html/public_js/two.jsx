'use strict';

class AmountBInput extends React.Component {
  constructor(props){
    super(props);
  }

  handleChange = (e) => {
    this.props.onAmountChange(e.target.value)
  } 

  render() {
    const amount = this.props.amount;
    return(
      <input type="text" id='bitcoin_currency' name='bitcoin_currency' value={amount} onChange={this.handleChange} />
    )
  }
}

class AmountUInput extends React.Component {
  constructor(props){
    super(props);
  }
  handleChange = (e) => {
    this.props.onAmountChange(e.target.value)
  } 
  render() {
    const amount = this.props.amount;
    return(
      <input type='text' id='american_currency' name='american_currency' placeholder='0.00' value={amount} onChange={this.handleChange} />
    )
  }
}

class AmountNInput extends React.Component {
  constructor(props) {
    super(props)
  }

  handleChange = (e) => {
    this.props.onAmountChange(e.target.value)
  }   

  render() {
    const amount = this.props.amount;
    return(
        <input type='text' id='rate_total' name='nigerian_currency' value={amount} onChange={this.handleChange} />
    )
  }
}

class App extends React.Component {
  constructor (props){
    super(props);
    this.state = { amount : '', scale : 'USD', rate : '471', bit : ''}
  }

  componentDidMount() {
    
  fetch('https://blockchain.info/ticker')
  .then( res => res.json())
  .then(res => res.USD.last)
  .then(b => this.setState({ bit : b}));

  }

  tryConvert(amount , convert) {

    const input = parseFloat(amount);
    if (Number.isNaN(input)) {
      return '';
    }
  
    const output = convert(input);
    return output.toString();
    
  }

  handleDollarsChange = amount => {
    this.setState({ amount , scale : 'USD'}) 
  }

  handleBitcoinChange = amount => {
    this.setState({ amount , scale : 'BTC'}) 
    } 

  handleNairaChange = amount => {
    this.setState({ amount , scale : 'NGN'}) 
} 

  toBitcoin = (Dollars) => {
    return ( this.state.bit * Dollars )
  }
   
  toDollars = (Dollars) => {
    return (Dollars / this.state.bit)
  }
  
  toNaira = (Dollars) => {
    var number = Dollars * this.state.rate;
    return number.toLocaleString();
  }
  
  toBNaira = (Dollars) => {
  
    var number = this.state.bit * Dollars * this.state.rate
    return number.toLocaleString();
  }


  render() {

    const amount = this.state.amount;
    const scale = this.state.scale;
    const BTC = scale === 'USD' ? this.tryConvert(amount, this.toDollars) : amount;
    const USD = scale === 'BTC' ? this.tryConvert(amount, this.toBitcoin) : amount;
    const NGN = scale === 'USD' ? this.tryConvert(amount, this.toNaira) : this.tryConvert(amount, this.toBNaira);

    return(
    
      <span>
      <div class='contain-convert'>
      <form method='post'>
      <div>How much bitcoin are you buying? Input below.</div>

        <div class='convert-wrapper'>

          <div class='inspan'>
          <AmountBInput scale='BTC' amount={BTC} onAmountChange={this.handleBitcoinChange}  />
              <span>BTC</span>
          </div>

          <div>
              <img src='../image/switch.svg' />
          </div>

          <div class='inspan'>
          <AmountUInput scale='USD' amount={USD} onAmountChange={this.handleDollarsChange}/>
              <span>USD</span>
          </div>

        </div>

    <div class='pay-show'>

        <div class='pay-show1'>
            <p>We'll charge you</p>
            <p>Exchange rate:  ₦{this.state.rate}</p>
        </div>

        <div class='pay-show2'>
          <AmountNInput scale='NGN' onAmountChange={this.handleNairaChange}  amount={NGN} />
        </div>
 
    </div>

      <div className="but-why">
          <input type='submit' value='Buy bitcoin' />
      </div>

</form>

</div>
      </span>
    )

  }

}
let domContainer = document.getElementById('buy');
ReactDOM.render(<App />, domContainer);