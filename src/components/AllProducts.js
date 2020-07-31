import React, { Component } from "react";
import "./AllProducts.css";
import * as d3 from "d3";
import data from "../data.csv";

import ProductCard from "./ProdCard";
import Pagination from "./Pagination";

import Cart from "../pages/Cart";


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datacsv: [],
      cart: [],
    };

    this.onChangePage = this.onChangePage.bind(this);
  }

  //Getting Data from local file
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
    this.setState({ datacsv: datacsv });
  }


  //Add to Cart
  handleAddFunc(product) {
    const existingProduct = this.state.cart.filter((p) => p.id === product.id);

    if (existingProduct.length > 0) {
      const withoutExistingProduct = this.state.cart.filter(
        (p) => p.id !== product.id
      );
      const updatedUnitsProduct = {
        ...existingProduct[0],
        units: existingProduct[0].units + product.units,
      };

      this.setState({
        cart: [...withoutExistingProduct, updatedUnitsProduct],
      });
    } else {
      this.setState({
        cart: [...this.state.cart, product],
      });
    }
  }



  render() {
    return (
      <div style={{ marginTop: "80px" }}>
          
        {
          this.state.cart.map((addedEle)=>(
            <Cart
                key={addedEle.id}
                {...addedEle}
                addFunc={this.handleAddFunc.bind(this)}
              />
          ))
        }
        {/* {
          <ul>
            {this.state.cart.map((c) => (
              <li>
                {c.name} | units {c.units}
              </li>
            ))}
          </ul>
        } */}
        <div className="container">
          <div className="elements">
            {this.state.datacsv.slice(0, 10).map((item) => (
              <ProductCard
                key={item.id}
                {...item}
                addFunc={this.handleAddFunc.bind(this)}
              />
            ))}
          </div>

          <Pagination
            items={this.state.datacsv}
            onChangePage={this.onChangePage}
          />
        </div>
        <hr />
        <div className="credits text-center">
          <p>
            <a
              href="http://jasonwatmore.com/post/2017/03/14/react-pagination-example-with-logic-like-google"
              target="_top"
            >
              Please Contact Us for your any of the Query
            </a>
          </p>
          <p>
            <a href="http://jasonwatmore.com" target="_top">
              aravindhalahalli.81@gmail.com
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
