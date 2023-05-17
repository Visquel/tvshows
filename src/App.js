import './App.css'
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import Home from './Components/Home'
import ShowDetails from './Components/Showdetails'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/show-details/:id" component={ShowDetails} />      
        </Switch>
      </Router>
    </div>
  );
}

export default withRouter(App);
