import React, { Component } from "react";
import Transcations from "./components/transcations/Transcations"
import Operations from "./components/operations/Operations";
import Breakdown from "./components/breakdown/Breakdown";
import Header from "./components/header/Header"

import axios from "axios";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      transcations: [],
      totalBalance: 0,
    };
  }

  componentDidMount = () => {
    this.renderTransactions();
  };

  renderTransactions = () => {
    axios
      .get("http://localhost:3000/transactions")
      .then((fetchedTranscations) => [...fetchedTranscations.data])
      .then((Transactions) =>
        this.setState(
          {
            transcations: Transactions,
          },
          () => this.totalBalance()
        )
      )
      .catch((e) => console.log(e));
  };

  deleteTransaction = async (id) => {
    await axios.delete("http://localhost:3000/transaction/" + id);
    this.renderTransactions();
  };

  totalBalance = () => {
    const AllTransactions = [...this.state.transcations];
    const sum = AllTransactions.reduce(
      (partialSum, t) => partialSum + t.amount, 0
    );
    this.setState({
      totalBalance: sum,
    });
  };

  operation = async (transaction) => {
    await axios.post("http://localhost:3000/transaction/", transaction);
    this.renderTransactions();
    <Redirect to="/" />
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Route
            path="/"
            exact
            render={() => (
              [
                <Header Balance={this.state.totalBalance}/>,
                <Transcations
                  transcations={this.state.transcations}
                  deleteTransaction={this.deleteTransaction}
                  totalBalance={this.totalBalance}
                />
              ]
            )}
          />
          <Route
            path="/operation"
            exact
            render={() => <Operations operation={this.operation} />}
          />
          <Route
            path="/breakdown"
            exact
            render={() => <Breakdown transcations={this.state.transcations} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
