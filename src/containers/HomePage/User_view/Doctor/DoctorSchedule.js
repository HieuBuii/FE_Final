import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LENGUAGES } from "../../../../utils/constant";
import "./DoctorSchedule.scss";
import { getScheduleDoctorService } from "../../../../services/userService";
import moment from "moment";
import localization from "moment/locale/vi";
import BookingModal from "./BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idDoctor: "",
      listDays: [],
      availabelTime: [],
      isShowModalBooking: false,
      dataScheduleModal: {},
    };
  }

  async componentDidMount() {
    let { language } = this.props;

    let listDays = this.getArrDays(language);
    this.setState({
      listDays,
    });
    if (listDays && listDays.length > 0) {
      let res = await getScheduleDoctorService(
        this.props.idDoctor,
        listDays[0].value
      );
      if (res && res.errCode === 0) {
        this.setState({
          availabelTime: res.data ? res.data : [],
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      let listDays = this.getArrDays(this.props.language);
      this.setState({
        listDays,
      });
    }
    if (prevProps.idDoctor !== this.props.idDoctor) {
      let res = await getScheduleDoctorService(
        this.props.idDoctor,
        this.state.listDays[0].value
      );
      if (res && res.errCode === 0) {
        this.setState({
          availabelTime: res.data ? res.data : [],
        });
      }
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getArrDays = (language) => {
    let listDays = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      if (language === LENGUAGES.VI) {
        if (i === 0) {
          let formatDay = moment(new Date()).format("DD/MM");
          obj.label = `Hôm nay - ${formatDay}`;
        } else {
          let valueVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          obj.label = this.capitalizeFirstLetter(valueVi);
        }
      } else {
        if (i === 0) {
          let formatDay = moment(new Date()).format("DD/MM");
          obj.label = `Today - ${formatDay}`;
        } else {
          obj.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      listDays.push(obj);
    }
    return listDays;
  };

  handleSelectDay = async (e) => {
    if (this.props.idDoctor && this.props.idDoctor !== -1) {
      let date = e.target.value;
      let res = await getScheduleDoctorService(this.props.idDoctor, date);
      if (res && res.errCode === 0) {
        this.setState({
          availabelTime: res.data ? res.data : [],
        });
      }
    }
  };

  handleShowHideBooking = (time) => {
    this.setState({
      isShowModalBooking: true,
      dataScheduleModal: time,
    });
  };

  closeModalBooking = () => {
    this.setState({
      isShowModalBooking: false,
    });
  };

  handleLoading = (boolean) => {
    this.props.handleShowLoadingFromParent(boolean);
  };

  render() {
    let { listDays, availabelTime } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="schedule-container container">
          <div className="all-days">
            <select onChange={(e) => this.handleSelectDay(e)}>
              {listDays &&
                listDays.length > 0 &&
                listDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="select-time">
            <i className="fas fa-calendar"></i>
            <span>
              <FormattedMessage id="user-view.detail-doctor.schedule" />
            </span>
          </div>
          <div className="availabel-time">
            {availabelTime && availabelTime.length > 0 ? (
              availabelTime.map((item, index) => {
                let timeDisplay =
                  language === LENGUAGES.VI
                    ? item.timeTypeData.valueVi
                    : item.timeTypeData.valueEn;
                return (
                  <button
                    key={index}
                    className="button-time"
                    onClick={() => this.handleShowHideBooking(item)}
                  >
                    {timeDisplay}
                  </button>
                );
              })
            ) : (
              <div className="no-schedule">
                <FormattedMessage id="user-view.detail-doctor.no-schedule" />
              </div>
            )}
          </div>
          {availabelTime && availabelTime.length > 0 && (
            <div className="select-book">
              <FormattedMessage id="user-view.detail-doctor.choose" />{" "}
              <i className="far fa-hand-point-up"></i>{" "}
              <FormattedMessage id="user-view.detail-doctor.booking" />
            </div>
          )}
        </div>
        <BookingModal
          isShowModalBooking={this.state.isShowModalBooking}
          closeModalBooking={this.closeModalBooking}
          dataTime={this.state.dataScheduleModal}
          handleLoadingToChild={this.handleLoading}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
