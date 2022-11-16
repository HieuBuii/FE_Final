import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLoginApi, forgotPWService } from "../../services/userService";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
      isLoading: false,
    };
  }

  redirectToSystemPage = (path) => {
    const { navigate } = this.props;
    const redirectPath = path;
    navigate(`${redirectPath}`);
  };

  handleInputUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleInputPassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  goToSignUp = () => {
    this.redirectToSystemPage("/sign-up");
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      this.setState({ isLoading: true });
      let data = await handleLoginApi(this.state.username, this.state.password);
      this.setState({ isLoading: false });
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      this.setState({ isLoading: false });
      if (data && data.errCode === 0) {
        let role = data.user.roleId;
        if (role === "R1") {
          this.redirectToSystemPage("/system/user-redux");
        } else if (role === "R2") {
          this.redirectToSystemPage("/doctor/manage-schedule");
        } else if (role === "R3") {
          this.redirectToSystemPage("/");
        }
        this.props.userLoginSuccess(data.user);
      }
    } catch (e) {
      this.setState({ isLoading: false });
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
    }
  };

  handleEnterPress = (e) => {
    if (e.key === "Enter") {
      this.handleLogin();
    }
  };

  handleForgotPW = async () => {
    if (!this.state.username) {
      this.setState({
        errMessage: "Vui lòng nhập địa chỉ Email để tiếp tục !!",
      });
    } else {
      this.setState({ isLoading: true });
      let res = await forgotPWService({ email: this.state.username });
      this.setState({ isLoading: false });
      if (res && res.errCode === 0) {
        toast.success(
          "Gửi yêu cầu thành công, vui lòng kiểm tra hộp thư Email để tiếp tục !!"
        );
      } else {
        toast.error("Địa chỉ email không đúng, vui lòng thử lại !!");
      }
    }
  };

  render() {
    return (
      <LoadingOverlay active={this.state.isLoading} spinner text="Loading...">
        <div className="login-background">
          <div className="login-container">
            <div className="login-content row">
              <div className="col-12 login-title">LOGIN</div>
              <div className="col-12 form-group login-input">
                <label className="login-label">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Username"
                  onChange={(e) => this.handleInputUsername(e)}
                  onKeyDown={(e) => this.handleEnterPress(e)}
                />
              </div>
              <div className="col-12 form-group login-input">
                <label className="login-label">Password:</label>
                <div className="login-password">
                  <input
                    type={this.state.isShowPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter Your Password"
                    onChange={(e) => this.handleInputPassword(e)}
                    onKeyDown={(e) => this.handleEnterPress(e)}
                  />
                  <div
                    className="login-password-icon"
                    onClick={() => this.handleShowHidePassword()}
                  >
                    <i
                      className={
                        this.state.isShowPassword
                          ? "far fa-eye"
                          : "far fa-eye-slash"
                      }
                    ></i>
                  </div>
                </div>
              </div>
              <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage}
              </div>
              <div className="col-12">
                <button
                  className="btn-login"
                  onClick={() => this.handleLogin()}
                >
                  Login
                </button>
              </div>
              <div
                className="col-12 login-sign-up mt-4"
                onClick={() => this.goToSignUp()}
              >
                Don't have an account? <span>Sign up</span>
              </div>
              <div
                className="col-12 login-forgot"
                onClick={() => this.handleForgotPW()}
              >
                Forgot Your Password ?
              </div>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
