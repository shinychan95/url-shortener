import React, { Component } from "react";
import passion from "./passion.jpg";
import daechung from "./daechung.jpg"
import axios from "axios"; // HTTP 클라이언트 라이브러리
import './App.css';
import constants from "../config/constants";
import styled from 'styled-components';

axios.defaults.baseURL = constants.apiUrl;

export const createShortUrl = obj => {
  const requestUrl = "urlshortner";
  return axios.post(requestUrl, obj);
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      showShortenUrl: true,
      shortenUrl: "",
      originalUrl: "",
      baseUrl: "",
      clickSubmit: true,
      showError: false,
      apiError: "",
      showApiError: false,
      showLoading: false,

    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    this.setState({ clickSubmit: true, showApiError: false });

    if (this.state.clickSubmit && this.state.originalUrl) {
      this.setState({ showLoading: true, showShortenUrl: false });
      let reqObj = {
        originalUrl: this.state.originalUrl,
        shortBaseUrl: constants.baseUrl
      };
      createShortUrl(reqObj)
        .then(json => {
          setTimeout(() => {
            this.setState({
              showLoading: false,
              showShortenUrl: true,
              shortenUrl: json.data.shortUrl
            });
          }, 0);
        })
        .catch(error => {
          this.setState({
            showLoading: false,
            showApiError: true,
            showError: false,
            apiError: "Server Error"
          });
        });
    } else {
      this.setState({ showError: true });
    }
  }

  handleReset() {
    this.setState({
      showShortenUrl: true,
      shortenUrl: "",
      originalUrl: "",
      baseUrl: "",
      clickSubmit: true,
      showError: false,
      apiError: "",
      showApiError: false,
      showLoading: false,
    });
  }

  renderButton() {
    if (!this.state.shortenUrl) {
      return (
        <Button
          className="btn"
          name="action"
          onClick={this.handleSubmit}
        >
          Submit
        </Button>
      );
    } else {
      return (
        <Button
          className="btn"
          name="action"
          onClick={this.handleReset}
        >
          Reset
        </Button>
      );
    }
  }

  renderImage() {
    if(!this.state.shortenUrl) {
      return (
        <img src={daechung} className="logo" alt="logo" />
      )  
    }
    else {
      return (
        <img src={passion} className="logo" alt="logo" />
      )
    }
  }


  render() {
    return (
      <div className="container">
        {this.renderImage()}
        <Form>
          <p> Input Original URL </p>
          <Input
            name="originalUrl"
            field="originalUrl"
            value={this.state.originalUrl}
            onChange={this.handleUserInput.bind(this)}
          />
        </Form>

        {this.state.showError && (
          <div className="formError">Original Url is required</div>
        )}
        {this.renderButton()}
        {this.state.showApiError && (
          <div className="shorten-error">{this.state.apiError}</div>
        )}
        {this.state.shortenUrl && (
          <div className="shorten-title">
            Shortened URL is ->{` `}
            <a target="_blank" href={this.state.shortenUrl}>
              {this.state.shortenUrl}
            </a>
          </div>
        )}
      
      </div>

    );
  }

}

// styled-components를 이용한 CSS 적용
const Form = styled.form`
    display: flex;
    width: 30%;
    text-align: center;
    flex-direction: column;
    font-size: 1rem;
`;

const Input = styled.input`
    all: unset;
    border-bottom: 2px solid #fff;
    text-align: center;
`;

const Button = styled.button`
  background: "#ffc107";
  color: "#212529";
  font-size: 1em;
  margin-top: 2em;
  padding: 0.25em 1em;
  border-radius: 3px;
  cursor:pointer;
`;

export default App;
