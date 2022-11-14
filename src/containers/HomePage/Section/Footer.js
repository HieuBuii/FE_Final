import React, { Component } from "react";
import { connect } from "react-redux";

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="container text-center">
          <p>© 2022 Bui Trung Hieu_B18DCVT145.</p>
          <span>
            <a
              href="https://github.com/HieuBuii/booking-care-FE"
              target="_blank"
            >
              Click here
            </a>{" "}
            for view source code on Github.
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
