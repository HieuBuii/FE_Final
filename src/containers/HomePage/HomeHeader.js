import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LENGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import mainLogo from "../../assets/images/Logo.png";
import { withRouter } from "react-router";
import SliderNav from "./SliderNav";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowNavBar: false };
  }
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  goToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  handleViewMore = (id) => {
    if (this.props.history) {
      if (id === "specialist") this.props.history.push(`/view-more-specialty`);
    }
    if (this.props.history) {
      if (id === "doctor") this.props.history.push(`/view-more-doctor`);
    }
    if (this.props.history) {
      if (id === "handbook") this.props.history.push(`/view-more-handbook`);
    }
    if (this.props.history) {
      if (id === "facilities") this.props.history.push(`/view-more-clinic`);
    }
  };

  changeStateShowNav = () => {
    this.setState({
      isShowNavBar: !this.state.isShowNavBar,
    });
  };

  handleShowNav = (boolean) => {
    this.setState({
      isShowNavBar: boolean,
    });
  };

  render() {
    let language = this.props.language;
    return (
      <>
        <SliderNav
          handleShowNav={this.handleShowNav}
          isShowNavBar={this.state.isShowNavBar}
        />
        <div className="home-header-container">
          <div className="home-header-content container">
            <div className="content-left">
              <i
                className="fas fa-bars icon"
                onClick={() => this.changeStateShowNav()}
              ></i>
              <div className="header-logo">
                <img
                  src={mainLogo}
                  alt="logo"
                  onClick={() => this.goToHome()}
                ></img>
              </div>
            </div>
            <ul className="content-center">
              <li
                className="content-child"
                onClick={() => this.handleViewMore("specialist")}
              >
                <div className="child-title">
                  <FormattedMessage id="homeheader.specialist" />
                </div>
                <div className="child-subtitle">
                  <FormattedMessage id="homeheader.find-doctor" />
                </div>
              </li>
              <li
                className="content-child"
                onClick={() => this.handleViewMore("facilities")}
              >
                <div className="child-title">
                  <FormattedMessage id="homeheader.health-facilities" />
                </div>
                <div className="child-subtitle">
                  <FormattedMessage id="homeheader.select-clinic" />
                </div>
              </li>
              <li
                className="content-child"
                onClick={() => this.handleViewMore("doctor")}
              >
                <div className="child-title">
                  {" "}
                  <FormattedMessage id="homeheader.doctor" />
                </div>
                <div className="child-subtitle">
                  {" "}
                  <FormattedMessage id="homeheader.choose-doctor" />
                </div>
              </li>
              <li
                className="content-child"
                onClick={() => this.handleViewMore("handbook")}
              >
                <div className="child-title">
                  <FormattedMessage id="homeheader.fee" />
                </div>
                <div className="child-subtitle">
                  <FormattedMessage id="homeheader.check-health" />
                </div>
              </li>
            </ul>
            <div className="content-right">
              {/* <div className="content-support">
                <i className="fas fa-question question"></i>
                <span className="content-question">
                  <FormattedMessage id="homeheader.support" />
                </span>
              </div> */}
              <div className="content-lang">
                <span
                  className={
                    language === LENGUAGES.VI
                      ? "content-lang-vi isActive"
                      : "content-lang-vi"
                  }
                  onClick={() => this.changeLanguage(LENGUAGES.VI)}
                >
                  VI
                </span>
                <span>/</span>
                <span
                  className={
                    language === LENGUAGES.EN
                      ? "content-lang-en isActive"
                      : "content-lang-en"
                  }
                  onClick={() => this.changeLanguage(LENGUAGES.EN)}
                >
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (languages) =>
      dispatch(changeLanguageApp(languages)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
