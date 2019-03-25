

class App extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        isCheckingOut: false,
        isAccountInfoSubmitted: false,
        visitTimeStamp: new Date(),
        username: '',
        email: '',
        password: '',
        addrline1: '',
        addrline2: '',
        city: '',
        state: '',
        shipzip: '',
        phone: '',
        ccnum: '',
        expdate: '',
        cvv: '',
        billzip: '',
      }
    } // closes constructor
    
    handleCheckoutClick() {
      this.setState({ isCheckingOut: true });
      console.log(this.state);
    }
  
    handleAccountSubmit() {
      this.setState({ isAccountInfoSubmitted: true });
      console.log(this.state);
    }
  
    handleConfirmClick() {
      this.setState({ isCheckingOut: false });
      this.setState({ isAccountInfoSubmitted: false });
      console.log(this.state);
  
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({ [name]: value });
    }
  
    render() {
      if (!this.state.isCheckingOut) {
        return (
          <div>
            <h2>React Store</h2>
            <span>
              <input type='submit' className='checkout' value='Checkout' onClick={this.handleCheckoutClick.bind(this)}/>
            </span>
          </div>
        )
      } else if (!this.state.isAccountInfoSubmitted) {
        return (
          <div>
            <h3><em>Checking Out</em></h3>
            <h4>Account Info</h4>
            <div>
              <label>Username:</label><br></br>
              <input name="username" type='text' value={this.state.username} onChange={this.handleInputChange.bind(this)}/>
            </div>
            <div>
              <label>email:</label><br></br>
              <input name="email" type='text' value={this.state.email} onChange={this.handleInputChange.bind(this)} />
            </div>
            <div>
              <label>password:</label><br></br>
              <input name="password" type='password' value={this.state.password} onChange={this.handleInputChange.bind(this)} />
              <input type='submit' className='AccountSubmit' value='Next' onClick={this.handleAccountSubmit.bind(this)}/>
            </div>
          </div>
        )
      } 
      return (
        <div>
          <h3><em>Checking Out</em></h3>
          <h4>Please confirm your order information below.</h4>
          <input type='submit' className='OrderSubmit' value='Confirm Order' onClick={this.handleConfirmClick.bind(this)} />
        </div>
      )
    }
  }
  console.log('app was run')
  
  ReactDOM.render(<App />, document.getElementById('app'));