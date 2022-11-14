import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageAppointment.scss";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getAppointmenDoctorService,
  confirmAppointmentSucceed,
  cancelAppointment,
} from "../../../services/userService";
import ModalSendEmail from "./ModalSendEmail";
import { LENGUAGES } from "../../../utils";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";

class ManageAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      idDoctor: "",
      data: [],
      isShowModal: false,
      dataForModal: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    let date = new Date().setHours(0, 0, 0, 0);
    let res = await getAppointmenDoctorService(this.props.userInfo.id, date);
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
    let res = await getAppointmenDoctorService(
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
      let response = await getAppointmenDoctorService(
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

  handleSendBill = (item) => {
    this.setState({
      isShowModal: true,
      dataForModal: item,
    });
  };

  handleCancel = async (item) => {
    this.setState({
      isLoading: true,
    });
    let res = await cancelAppointment({
      doctorId: item.doctorId,
      patientId: item.patientId,
      date: item.date,
      timeType: item.timeType,
    });
    this.setState({
      isLoading: false,
    });
    if (res && res.errCode === 0) {
      toast.success("Huỷ lịch hẹn thành công !!");
      let response = await getAppointmenDoctorService(
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

  changeShowModal = () => {
    this.setState({
      isShowModal: false,
    });
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
        <LoadingOverlay active={this.state.isLoading} spinner text="Loading...">
          <div className="title mt-5">
            <FormattedMessage id="menu.doctor.manage-appointment" />
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
                  <th>Tuỳ chọn</th>
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
                          <div>
                            <button
                              className="btn btn-edit"
                              onClick={() => this.handleSucceed(item)}
                            >
                              Đã hoàn thành
                            </button>
                            <button
                              className="btn btn-send"
                              onClick={() => this.handleSendBill(item)}
                            >
                              Gửi hoá đơn
                            </button>
                            <button
                              className="btn btn-cancel"
                              onClick={() => this.handleCancel(item)}
                            >
                              Huỷ lịch hẹn
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <ModalSendEmail
            isShowModal={this.state.isShowModal}
            changeShowModal={this.changeShowModal}
            dataFromParent={this.state.dataForModal}
            changeShowLoading={this.changeShowLoading}
          />
        </LoadingOverlay>
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
  connect(mapStateToProps, mapDispatchToProps)(ManageAppointment)
);
