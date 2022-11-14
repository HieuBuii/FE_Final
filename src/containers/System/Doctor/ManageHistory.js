import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getHistoryDoctorService,
  confirmAppointmentSucceed,
} from "../../../services/userService";
import { LENGUAGES } from "../../../utils";
import { toast } from "react-toastify";

class ManageHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      idDoctor: "",
      data: [],
      isShowModal: false,
      dataForModal: [],
    };
  }

  async componentDidMount() {
    let date = new Date().setHours(0, 0, 0, 0);
    let res = await getHistoryDoctorService(this.props.userInfo.id, date);
    if (res && res.errCode === 0) {
      this.setState({
        data: res.data,
      });
    }
  }

  componentDidUpdate() {}

  handleOnchangeDatePicker = async (date) => {
    this.setState({
      currentDate: date[0],
    });
    let res = await getHistoryDoctorService(
      this.props.userInfo.id,
      date[0].getTime()
    );
    if (res && res.errCode === 0) {
      this.setState({
        data: res.data,
      });
    }
  };

  handleSucceed = async (item) => {
    this.setState({
      isLoading: true,
    });
    let res = await confirmAppointmentSucceed({
      doctorId: item.doctorId,
      patientId: item.patientId,
      date: item.date,
      timeType: item.timeType,
    });
    this.setState({
      isLoading: false,
    });
    if (res && res.errCode === 0) {
      toast.success("Xác nhận thành công !!");
      let response = await getHistoryDoctorService(
        this.props.userInfo.id,
        this.state.currentDate.getTime()
      );
      if (response && response.errCode === 0) {
        this.setState({
          data: response.data,
        });
      }
    } else {
      toast.error("Có lỗi xảy ra, vui lòng thử lại !!");
    }
  };

  changeShowLoading = (boolean) => {
    this.setState({
      isLoading: boolean,
    });
  };

  render() {
    let { data } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="title mt-5">
          <FormattedMessage id="menu.doctor.history-appointment" />
        </div>
        <div className="col-6 form-group content-top-right container">
          <label>
            <FormattedMessage id="menu.doctor.choose-date" />
          </label>
          <DatePicker
            className="form-control"
            onChange={this.handleOnchangeDatePicker}
            value={this.state.currentDate}
          />
        </div>
        <div className="users-container container my-5">
          <table id="customers">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Giới tính</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Thời gian đặt lịch</th>
                <th>Lý do khám bệnh</th>
                <th>Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              {data &&
                data.length > 0 &&
                data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.bookingData.firstName}</td>
                      <td>
                        {language === LENGUAGES.VI
                          ? item.bookingData.genderData.valueVi
                          : item.bookingData.genderData.valueEn}
                      </td>
                      <td>{item.bookingData.phonenumber}</td>
                      <td>{item.bookingData.email}</td>
                      <td>
                        {language === LENGUAGES.VI
                          ? item.timeBookingData.valueVi
                          : item.timeBookingData.valueEn}
                      </td>
                      <td>{item.reason}</td>
                      <td>
                        {item.statusId === "S4" ? (
                          <span style={{ color: "red" }}>
                            {language === LENGUAGES.VI
                              ? item.statusData.valueVi
                              : item.statusData.valueEn}
                          </span>
                        ) : (
                          <span style={{ color: "green" }}>
                            {language === LENGUAGES.VI
                              ? item.statusData.valueVi
                              : item.statusData.valueEn}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ManageHistory)
);
