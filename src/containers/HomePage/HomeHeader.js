import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import { LENGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import mainLogo from "../../assets/images/Logo.png";
import { withRouter } from "react-router";
import SliderNav from "./SliderNav";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowNavBar: false, userInfo: "", login: false };
  }
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  componentDidMount() {
    this.setState({
      login: this.props.isLoggedIn,
    });
    if (this.props.userInfo) {
      this.setState({
        userInfo: this.props.userInfo,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
      this.setState({
        login: this.props.isLoggedIn,
      });
    }
  }

  goToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  handleViewMore = (id) => {
    let userId = this.state.userInfo.id;
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
    if (this.props.history) {
      if (id === "login") this.props.history.push(`/login`);
    }
    if (this.props.history) {
      if (id === "password") this.props.history.push(`/system/manage-password`);
    }
    if (this.props.history) {
      if (id === "account")
        this.props.history.push(`/detail-user/id=${userId}`);
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
    let { login } = this.state;
    const { processLogout } = this.props;
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
              <div className="content-support">
                <span className="content-question">
                  {login === false ? (
                    <i
                      onClick={() => this.handleViewMore("login")}
                      className="fas fa-sign-in-alt sign-in"
                      title={
                        language === LENGUAGES.VI ? "Đăng nhập" : "Sign in"
                      }
                    ></i>
                  ) : (
                    <span className="user">
                      <i className="fas fa-user sign-in"></i>
                      <ul className="list-options">
                        <li
                          className="list-item"
                          onClick={() => this.handleViewMore("account")}
                        >
                          Tài khoản của tôi
                        </li>
                        <li
                          className="list-item"
                          onClick={() => this.handleViewMore("password")}
                        >
                          Đổi mật khẩu
                        </li>
                        <li className="list-item" onClick={processLogout}>
                          Đăng xuất
                        </li>
                      </ul>
                    </span>
                  )}
                </span>
              </div>
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
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (languages) =>
      dispatch(changeLanguageApp(languages)),
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
