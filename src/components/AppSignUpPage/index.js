import React, { Component } from "react";
import ReactPixel from "react-facebook-pixel";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import { emailCheck, nameCheck, phoneCheck, desCheck } from "./validation";
// CSS
import "./style.css";
import { GoogleSpreadsheet } from "google-spreadsheet";
const SPREADSHEET_ID = "18CO2tgpl9EZlNxgfQuQ8tpOaSBvAj_ydd910-YNuSp4";
const SHEET_ID = "0";
const CLIENT_EMAIL =
  "work-hall@academy-registra-1605173971230.iam.gserviceaccount.com";
const PRIVATE_KEY =
  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDEHOlVYVGJOeB+\ntTj0W505Wntj4CxLpFxEWgBPhjZLL5y+qmcSbvzotqTm+U7Gsdbwb6VdtfO9lVVI\n1YdBkL8DfWOJfkGoOiyrKJH4Td7xgJ441cLF2dQ7VtxRSAlJjqwJ4+oeOakpxET0\nHhEu0KkrozOX73QOD65ycyQAnxGOMOgh6XQpayfYzh5svBiAfDmLa5+sLMSscgiw\nfGAiAOehRtF7zTpXbOp474NWIZKfkM081gS+/D0znj50XSkKFHmtC9o7bK5YXlfI\ntjy3vt41BQsyHiSoZ8HEp/nVUbHVTUA+yUAmqnNRrHFETZYSrMD67aal2Ivk4LHM\nKzN5TmUJAgMBAAECggEACOPiTFF3qQUeO8LlhKb04Gaikn3qfCOvXsDcDpQquMCn\n4M59ktdvBcdRKpBRhXkxNsqU4EPmkKj+Sf7gsrSdWCA9HNHup4c67ae5QEdFbJoU\nR3F3SCajs+ya2wttMlqySqt8j5IKbLSInK69QCug3kkicQg08Qs9xlNDu0x6twDv\ntSL1eAYRGtGHSHulELh5ZRsNzlsWwCiKTuU8/5XeT9K9vJXNu7J02KA5W46VDWOF\nUTK9GdbukE7g5xiCvi2jHpCWC9ZxqdCzd46/DJ5pwY4slJra1IFfhozmzQl6Lcso\noRF94XV93zJgK3QVwSzfjk2ugxXGnDG3B+wrb4a/NQKBgQDvTJnebjWYWm3ejb24\nImblIkpr0YzB8pvWSTWZDUaRWqUIt04dhC6tRa+b6MEeaI/jFiBBkO1MhG22HXDm\n/gnQJ8kU+ppk14kubSzFkLtoVe9069LfcLn1kp/pP7KoHSTO0OToZWT2vbuqb4Ra\njVP5noJ1VOxZ7pv26Dd7H32+NQKBgQDRzLrc7f7TPUOYyftdEZzFD+nh9zLypC7s\nv655+aWADvK0srMAdhQTyf7l+VztDflK4qr3LuN0cb3ufNDbHAPFkpW79fLouHzf\nLDnxrnlUFOcWWPSC4/LQ63VcbOWc8adXHv5+APYKEKQl+A6wJjoiD1PZgj5noiAe\nH5XD8CC2BQKBgQDLLwFfCbjcGbw8QaGbHSq813bVQWIAs9x6AENQJyOJ+6sxUWM0\nUK3JVegbu29uQF4b9QeCZGn4lGELRsg8eesfIQjtlTNO+Gt0TiK7xX46wuzFHA86\nxV5AEzVQOVOaxtQf/uK+KImnr8YOmw2ITYPF6T7gHTFp0t3+sYGaO0zrGQKBgFHy\n1T6829+pO4EvzDaTTZgP2jyAcW8jwIyLZtyQLhwyOo1oi9DvTnJYYW91Et4pqimd\nFkjNEN2IHDdOm8oqTDLdSg2MSWCrx2LpBI0pqIy2SXmKL5/85/jBMCt1Ac9m+QVn\nvuJ6/5/41hVaqmoV1Hk/YXJBlJyoUEFT9wz8+9n9AoGBAKlkyHx+WACxWOMr97fN\na+Ls03kugkvJb+PUVu0rMsNKB/i3dTPpz1mqqU7LntMShsd0h+ZoGnBwf6sk2agG\nxs02uEnWkRlmvlWBFOFtahH6bJqG3Kh9pzwN16Rzr/qIgd9bfXlETx6D3SGO3SMR\n84+jm0xK/gLtdy+jE9ViDy8O\n-----END PRIVATE KEY-----\n";

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

class AppSignUp extends Component {
  state = {
    name: "",
    occupation: "",
    email: "",
    phone: "",
    sheetLoaded: false,
    courses: [],
    errorMessage: {
      name: "",
      nameValid: false,
      occupation: "",
      occupationValid: false,
      email: "",
      emailValid: false,
      phone: "",
      phoneValid: false,
    },
    count: 0,
  };
  submitHandler = () => {
    const { nameValid, occupationValid, emailValid, phoneValid } =
      this.state.errorMessage;
    const { name, occupation, email, phone } = this.state;
    const formIsValid =
      nameValid && occupationValid && emailValid && phoneValid;
    console.log(formIsValid);

    if (!formIsValid) {
      return;
    }

    this.appendSpreadsheet({
      Name: this.state.name,
      Occupation: this.state.occupation,
      Email: this.state.email,
      Phone: this.state.phone,
    }).then(() => {
      swal({
        title: "Your from has been submitted",
        icon: "success",
      }).then(() => this.clearForm());
    });
    console.log("submitted");
  };
  toUpperCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  _handleChange = (checkValidation, validationCheck, stateKey, value) => {
    const { error, isValid } = checkValidation(value);

    if (isValid) {
      if (stateKey === "name") {
        let result = this.toUpperCase(value);
        console.log(result);
        this.setState({
          [stateKey]: result,
          errorMessage: {
            ...this.state.errorMessage,
            [stateKey]: "",
            [validationCheck]: true,
          },
        });
      } else {
        this.setState({
          [stateKey]: value,
          errorMessage: {
            ...this.state.errorMessage,
            [stateKey]: "",
            [validationCheck]: true,
          },
        });
      }
    } else {
      this.setState({
        errorMessage: {
          ...this.state.errorMessage,
          [stateKey]: error,
          [validationCheck]: false,
        },
      });
    }
  };
  clearForm = () => {
    document.getElementById("name").value = "";
    document.getElementById("occupation").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
  };

  appendSpreadsheet = async (row) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });
      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet = doc.sheetsById[SHEET_ID];
      const result = await sheet.addRow(row);
    } catch (e) {
      console.error("Error: ", e);
    }
  };
  readRows = async () => {
    try {
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });
      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet = doc.sheetsById[SHEET_ID];
      const rows = (await sheet.getRows()).length;
      console.log(rows);
      this.setState({ count: rows });
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  componentDidMount() {
    this.readRows();
  }

  render() {
    let { name, occupation, email, phone, error } = this.state;
    let {
      name: nameError,

      occupation: occError,
      email: emailError,
      phone: phoneError,
    } = this.state.errorMessage;
    let { history } = this.props;

    return (
      <div className="a-course-register-form" id="register-form">
        {/* Heading */}

        {/*Form */}
        <div className="a-c-register-heading">
          <form className="a-reg-form">
            <div class="a-upper-input">
              <div className="a-c-reg-text">
                <h1>Sign up</h1>
              </div>
              <div className="a-input-field">
                <input
                  id="name"
                  name="name"
                  onChange={(name) => {
                    this._handleChange(
                      nameCheck,
                      "nameValid",
                      "name",
                      name.target.value
                    );
                  }}
                  type="text"
                  placeholder="We need your full name"
                  className="a-r-input-box a-r-input-box-first"
                />
                {!(!name && !nameError) && (
                  <p className="a-error-message">{nameError}</p>
                )}
              </div>
              <div className="a-input-field">
                <input
                  id="occupation"
                  name="occupation"
                  onChange={(occ) => {
                    this._handleChange(
                      desCheck,
                      "occupationValid",
                      "occupation",
                      occ.target.value
                    );
                  }}
                  type="text"
                  placeholder="What do you do? Dev, Founder, Entrepreneur"
                  className="a-r-input-box"
                />
                {!(!occupation && !occError) && (
                  <p className="a-error-message">{occError}</p>
                )}
              </div>
              <div className="a-input-field">
                <input
                  id="phone"
                  name="phone"
                  onChange={(phone) => {
                    this._handleChange(
                      phoneCheck,
                      "phoneValid",
                      "phone",
                      phone.target.value
                    );
                  }}
                  type="text"
                  placeholder="Your phone number"
                  className="a-r-input-box"
                />
                {!(!phone && !phoneError) && (
                  <p className="a-error-message">{phoneError}</p>
                )}
              </div>
              <div className="a-input-field">
                <input
                  id="email"
                  name="email"
                  onChange={(email) => {
                    this._handleChange(
                      emailCheck,
                      "emailValid",
                      "email",
                      email.target.value
                    );
                  }}
                  type="email"
                  placeholder="Your email (No, we won't spam you 😅)"
                  className="a-r-input-box"
                />
                {!(!email && !emailError) && (
                  <p className="a-error-message">{emailError}</p>
                )}
              </div>
              <button
                type="button"
                class="a-reg-btn"
                onClick={this.submitHandler}
              >
                Join the waitlist
              </button>
            </div>
          </form>
        </div>

        {/* rightpanel */}
        <div className="a-side-panel">
          <img className="a-reg-img" src={require("./signup.png")} />
          <div className="a-side-text">
            <h1> Welcome to our community</h1>
            <br />
            <p className="a-c-side-para">
              We’re creating the next-gen community of storytellers, founders,
              dreamers, forward-thinkers, misfits, rebels, entrepreneurs,
              employees, investors, polyworkers, problem solvers, yay-sayers,
              coders, designers, freelancers, stargazers and storm-chasers.
            </p>
            <br />

            <div className="a-side-image-panel">
              <div className="a-side-images">
                <img
                  className="a-side-image"
                  src={require("./img/img1.png")}
                ></img>
                <img
                  className="a-side-image"
                  src={require("./img/img2.png")}
                ></img>
                <img
                  className="a-side-image"
                  src={require("./img/img3.png")}
                ></img>
              </div>

              <p>{this.state.count} members have joined.</p>
            </div>
          </div>
        </div>

        {/* <div className="a-reg-frame">
          <img className="a-reg-frame-img" src={require("./pic.png")} />
        </div> */}
      </div>
    );
  }
}
// export default ReactGoogleSheets.connect(DataComponent);
export default withRouter(AppSignUp);
