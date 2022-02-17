import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Layout from './hocs/Layout';



class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Layout>
          
          </Layout>
        </Switch>
      </Router>
        
      );
    
  }

}


export default App;
