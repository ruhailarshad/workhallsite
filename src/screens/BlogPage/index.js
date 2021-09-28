import React, { Component } from "react";
import "./assets/blog-Details.css";
import { GetOneBlog } from "../../Services/Admin-Service";
import {
  FacebookShareCount,
  FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

// Loader
import Loader from "react-loader-spinner";

import BookATourModal from "../../components/BookATourModal/index";
//Footer
import Footer from "../../components/Footer/index";
// Side Drawer
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import Backdrop from "../../components/BackDrop/BackDrop";
//Nav
import Nav from "../../components/Nav/index";
import { lazyload } from "react-lazyload";

lazyload({
  height: 200,

  offset: 100,
});

export default class BlogPage extends Component {
  state = {
    blog: [],
    bookATour: false,
    sideDrawerOpen: false,
    loader: true,
    text: "",
  };

  academyLinkPara = (para) => {
    const words = [
      "Work Hall",
      "co-space",
      "shared office space",
      "shared office spaces",
      "shared work space",
      "co-working spaces",
      "Coworking Spaces",
      "Coworking spaces",
      "coworking spaces",
      "coworking space",
      "Coworking space",
    ];
    const finalVal = [];
    if (para.includes(":")) {
      const findingIndex = para.split("").indexOf(":");
      finalVal.push([para.split(":")[0], para.slice(findingIndex)]);
    } else {
      finalVal.push(para);
    }
    // const theRegex =
    //   /\b(Work Hall|co-working spaces|co-space|shared office space|shared office space|shared work space|coworking spaces|Coworking spaces|Coworking Spaces)\b/g;
    words.forEach((values) => {
      console.log(values);
      if (finalVal[0][1].includes(":")) {
        finalVal[0][1] = finalVal[0][1].replace(
          values,
          "<a href='https://www.workhall.co'>" + values + "</a>"
        );
      } else {
        finalVal[0] = finalVal[0].replace(
          values,
          "<a href='https://www.workhall.co'>" + values + "</a>"
        );
      }
    });

    return finalVal;
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };
  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };
  componentDidMount() {
    this.FetchOneBlog();
  }
  FetchOneBlog() {
    let a = [];
    const { id } = this.props.match.params;
    GetOneBlog({ id }).then((data) => {
      a.push(data);
      this.setState({ blog: a, loader: false });
    });
  }
  render() {
    let { text } = this.state;
    let sideDrawer;
    let backdrop;
    if (this.state.sideDrawerOpen) {
      sideDrawer = <SideDrawer />;
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <div>
        {
          <BookATourModal
            open={this.state.bookATour}
            close={() => {
              this.setState({ bookATour: false });
            }}
          />
        }
        <Nav
          activeScreen=" "
          drawerClickHandler={this.drawerToggleClickHandler}
        />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        {this.state.loader ? (
          <div className="revealer-wrapper-load">
            <Loader
              type="BallTriangle"
              secondaryColor="green"
              color="#ca312b"
              height={100}
              width={100}
              // timeout={3000}
            />
          </div>
        ) : (
          <div class="blog-container">
            {this.state.blog.map((data, index) => {
              return (
                <div className="blogs-page">
                  <div class="blog-head">
                    <h1 class="blog-heading">{data.heading}</h1>
                  </div>
                  <div class="Blog-img-div">
                    <img class="blog-img" src={data.images[0]}></img>
                  </div>
                  {/* Bloger Info */}
                  <div class="Blog-blogger-box">
                    <div>
                      <img class="Blogger-img" src={data.images[1]}></img>
                    </div>
                    <div class="blogger-detail">
                      <p>Written By</p>
                      <p>{data.writtenBy}</p>
                    </div>
                  </div>
                  {/* Bloger Info */}
                  {/* Blog Para */}
                  <div class="blog-paras">
                    {data.blog.map((para, i) => {
                      const pa = this.academyLinkPara(para);
                      const index = 1;

                      if (pa[0][1]?.includes(":")) {
                        return (
                          <p>
                            <span
                              style={{ fontWeight: "bold" }}
                            >{`${pa[0][0]}`}</span>

                            {ReactHtmlParser(pa[0][1])}
                          </p>
                        );
                      } else {
                        return <p>{ReactHtmlParser(pa)}</p>;
                      }
                    })}
                  </div>
                  <div class="b-colors-div">
                    <div class="b-blue">
                      <p class="b-tags">{data.bestFor[0]}</p>
                    </div>
                    <div class="b-green">
                      <p class="b-tags">{data.bestFor[1]}</p>
                    </div>
                    <div class="b-red">
                      <p class="b-tags">{data.bestFor[2]}</p>
                    </div>
                    <div class="b-yellow">
                      <p class="b-tags">{data.bestFor[3]}</p>
                    </div>
                    <div class="b-purple">
                      <p class="b-tags">{data.bestFor[4]}</p>
                    </div>
                  </div>
                  <div class="share-div">
                    <div class="share">
                      <h3 class="share-text"> Share To: </h3>
                      <div>
                        <FacebookShareButton
                          url={`https://workhall.co/blogs/${this.props.match.params}`}
                          title="Share On Facebook"
                          class="b-social-btn"
                        >
                          <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                      </div>
                      <div>
                        <LinkedinShareButton
                          url={`https://workhall.co/blogs/${this.props.match.params}`}
                          title="Share On Linkedin"
                          class="b-social-btn"
                        >
                          <LinkedinIcon size={32} round={true} />
                        </LinkedinShareButton>
                      </div>
                      <div>
                        <TwitterShareButton
                          url={`https://workhall.co/blogs/${this.props.match.params}`}
                          title="Share On Twitter"
                          class="b-social-btn"
                        >
                          <TwitterIcon size={32} round={true} />
                        </TwitterShareButton>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <section className="module">
          <div className="want-to-know-more">
            <div className="want-to-know-more-content">
              <h3>Want to know more?</h3>
              <a
                className="button primary lg"
                onClick={() => {
                  this.setState({ bookATour: !this.state.bookATour });
                }}
              >
                BOOK A TOUR
              </a>
            </div>
          </div>
        </section>
        {/*  RAINBOW DIVIDER  */}
        <div className="rainbow-divider module"></div>
        {/* FOOTER SECTION */}
        <Footer />
      </div>
    );
  }
}
