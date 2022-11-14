import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { LENGUAGES } from "../../../../utils/constant";
import HomeHeader from "../../HomeHeader";
import "./DetailDoctor.scss";
import DoctorSchedule from "./DoctorSchedule";
import DoctorMore from "./DoctorMore";
import Footer from "../../Section/Footer";
import LoadingOverlay from "react-loading-overlay";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoDoctor: [],
      isLoading: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.infoDoctor !== this.props.infoDoctor) {
      this.setState({
        infoDoctor: this.props.infoDoctor,
      });
    }
  }

  componentDidMount() {
    this.props.getInfoDoctor(this.props.match.params.id);
  }

  handleShowLoading = (boolean) => {
    this.setState({
      isLoading: boolean,
    });
  };

  render() {
    let { infoDoctor } = this.state;
    let language = this.props.language;
    let valueVi = "",
      valueEn = "";
    if (infoDoctor && infoDoctor.positionData) {
      valueVi = `${infoDoctor.positionData.valueVi}, ${infoDoctor.lastName} ${infoDoctor.firstName}`;
      valueEn = `${infoDoctor.positionData.valueEn}, ${infoDoctor.firstName} ${infoDoctor.lastName}`;
    }
    let dataContent =
      infoDoctor && infoDoctor.Doctor_Intro
        ? infoDoctor.Doctor_Intro.contentHTML
        : "";
    return (
      <>
        <LoadingOverlay active={this.state.isLoading} spinner text="Loading...">
          <HomeHeader />

          <div className="container detail-doctor-top">
            <div className="content-detail-top">
              <div className="detail-doctor-top-left">
                <div
                  className="avatar-doctor"
                  style={{
                    backgroundImage:
                      infoDoctor && infoDoctor.image
                        ? `url(${infoDoctor.image})`
                        : "",
                  }}
                ></div>
              </div>
              <div className="detail-doctor-top-right">
                <p className="detail-doctor-title">
                  {language === LENGUAGES.VI ? valueVi : valueEn}
                </p>
                <p className="detail-doctor-des">
                  {infoDoctor && infoDoctor.Doctor_Intro
                    ? infoDoctor.Doctor_Intro.description
                    : ""}
                </p>
              </div>
            </div>
            <div className="schedule-doctor-container">
              <div className="schedule-left">
                <DoctorSchedule
                  idDoctor={
                    this.state.infoDoctor && this.state.infoDoctor.id
                      ? this.state.infoDoctor.id
                      : -1
                  }
                  handleShowLoadingFromParent={this.handleShowLoading}
                />
              </div>
              <div className="schedule-right">
                <DoctorMore
                  idDoctor={
                    this.state.infoDoctor && this.state.infoDoctor.id
                      ? this.state.infoDoctor.id
                      : -1
                  }
                />
              </div>
            </div>
          </div>
          <div className="detail-doctor-content">
            <div className="container detail-content">
              <div dangerouslySetInnerHTML={{ __html: dataContent }} />
            </div>
          </div>
          <div className="detail-doctor-comments"></div>
          <Footer />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    infoDoctor: state.admin.infoDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInfoDoctor: (id) => dispatch(actions.getInfoDoctor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
