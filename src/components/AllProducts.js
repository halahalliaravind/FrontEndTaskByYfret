import React, { Component } from "react";
import "./AllProducts.css";
import * as d3 from "d3";
import data from "../data.csv";

import Pagination from './Paginantion'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datacsv: [],
    };
    
    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount() {
    d3.csv(data)
      .then((data) => {
        this.setState({ datacsv: data });
        console.log(this.state.datacsv);
      })
      .catch(function (err) {
        throw err;
      });
  }

  onChangePage(datacsv) {
    // update state with new page of items
    this.setState({ datacsv: datacsv });
  }

  render() {
    return (
      <div style={{ marginTop: "80px" }}>
        <div className="container">
          {/* <div className="text-center">
            <h1>All the Products</h1> */}
          <div className="elements">
            {this.state.datacsv.map((item) => (
              <div className="movie-card-container" key={item.id}>
                <img className="poster" src={item.image} alt="movie poster" />
                <div
                  className="movie-title"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{item.brand}</div>
                  <div>{item.business_unit}</div>
                </div>
                <div className="movie-details">{item.description}</div>
                <div
                  className="movie-title"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{item.category}</div>
                  <div>{item.price}</div>
                </div>
              </div>
            ))}
          </div>

          <Pagination
              items={this.state.datacsv}
              onChangePage={this.onChangePage}
            />
          {/* </div> */}
        </div>
        <hr />
        <div className="credits text-center">
          <p>
            <a
              href="http://jasonwatmore.com/post/2017/03/14/react-pagination-example-with-logic-like-google"
              target="_top"
            >
              React - Pagination Example with Logic like Google
            </a>
          </p>
          <p>
            <a href="http://jasonwatmore.com" target="_top">
              JasonWatmore.com
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
