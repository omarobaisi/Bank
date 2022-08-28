import React, { Component } from "react";
import Transcations from "./components/transcations/Transcations"
import Operations from "./components/operations/Operations";
import Breakdown from "./components/breakdown/Breakdown";
import Header from "./components/header/Header"
import Flash from "./components/flash/Flash";

import axios from "axios";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      transcations: [],
      totalBalance: 0,
      redirect: false,
      flash: {
        message: '',
        color: "",
        display: "none"
      }
    };
  }

  flash = (message, color) => {
    this.setState({
      flash: {
        message: message,
        color: color,
        display: "block"
      },
      redirect: false
    }, () => {
      setTimeout(() => {
        this.setState({
          flash: {
            message: '',
            color: "",
            display: "none"
          }
        })
      }, 2000)
    })
  }

  componentDidMount = () => {
    this.renderTransactions();
  };

  renderTransactions = () => {
    axios
      .get("http://localhost:3000/transactions")
      .then((fetchedTranscations) => [...fetchedTranscations.data])
      .then((Transactions) =>
        this.setState({
            transcations: Transactions,
            totalBalance: this.totalBalance(Transactions)
        })
      )
      .catch((e) => console.log(e));
  };

  deleteTransaction = async (id) => {
    await axios.delete("http://localhost:3000/transaction/" + id);
    this.renderTransactions();
    this.flash("Transaction Deleted", "green ");
  };

  totalBalance = (Transactions) => {
    const sum = Transactions.reduce(
      (partialSum, t) => partialSum + t.amount, 0
    );
    return sum
  };

  operation = async (transaction) => {
    await axios.post("http://localhost:3000/transaction/", transaction);
    this.setState({
      redirect: true
    }, () => this.renderTransactions())
  };

  turnOffRedirectAndFlash = (message, color) => {
    this.setState({
      redirect: false
    }, () => {
      this.flash(message, color);
    })
  }

  render() {

    return (
      <Router>
        <div className="App">
          <Route
            path="/"
            render={() => <Flash flash={this.state.flash} />}
          />
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
          
          {this.state.redirect ? (
              [
                <Redirect to="/" />,
                this.turnOffRedirectAndFlash('Transaction Created', 'green'),
              ]
          ) : ('')}
        </div>
      </Router>
    );
  }
}

export default App;