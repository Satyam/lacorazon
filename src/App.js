import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { Navigation } from "./Navigation";
import "./App.css";
import Users from "./Users";
import User from "./User";
import Bookstores from "./Bookstores";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <main className="main-content col-lg-12 col-md-12 col-sm-12 p-0">
            <Navigation />
            <Container>
              <Row>
                <Col sm="12" md={{ size: 8, offset: 2 }}>
                  <ErrorBoundary>
                    <div className="main-content-container container-fluid px-4">
                      <Route path="/users" component={Users} />
                      <Route path="/user/:id?" component={User} />
                      <Route path="/bookstores" component={Bookstores} />
                    </div>
                  </ErrorBoundary>
                </Col>
              </Row>
            </Container>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
