import React, { Component } from "react";
import { Route, withRouter } from 'react-router-dom';
import { Auth0 } from './Auth/Auth';
import Public from './Components/Public/Public';
import Protected from './Components/Protected/Protected';
import Callback from './Components/Callback/Callback';
import SecuredRoute from './Components/SecuredRoute/SecuredRoute';

class App extends Component {
	state = {
		checkingSession: true,
	};

	async componentDidMount() {
		console.log('Bebebebbebeb');
		if (this.props.location.pathname === '/callback') {
			this.setState({ checkingSession: false });
			return;
		}

		try {
			await Auth0.silentAuth();
			this.forceUpdate();
		} catch(err) {
			if (err.error !== 'login_required') console.log(err.error);
		}


		this.setState({ checkingSession: false });
	}

	render() {
		return (
			<div className="h-screen bg-blue-lighter text-center pt-10">
				<Route component={Public} path='/' exact />
				<Route component={Callback} path='/callback' />
				<SecuredRoute path='/protected'
					component={Protected}
					checkingSession={this.state.checkingSession} />
			</div>
		);
	}
}

export default withRouter(App);

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
