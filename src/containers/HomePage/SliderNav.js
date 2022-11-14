import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class SliderNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: "",
    };
  }

  async componentDidMount() {
    this.setState({
      isShow: this.props.isShowNavBar,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isShowNavBar !== this.props.isShowNavBar) {
      this.setState({
        isShow: this.props.isShowNavBar,
      });
    }
  }

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

  hideNavBar = () => {
    this.props.handleShowNav(false);
  };

  render() {
    let { isShow } = this.state;
    return (
      <>
        {isShow === true ? (
          <div className="slider-nav">
            <i
              className="fas fa-times close"
              onClick={() => this.hideNavBar()}
            ></i>
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
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SliderNav)
);
