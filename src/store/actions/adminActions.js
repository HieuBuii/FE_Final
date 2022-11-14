import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  addUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorForHomeService,
  getAllDoctorService,
  saveInfoDoctorService,
  getInfoDoctorService,
  getAllSpecialties,
  getAllClinic,
} from "../../services/userService";
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderStart error", e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("fetchPositionStart error", e);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetchRoleStart error", e);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const createUser = (data, token) => {
  return async (dispatch, getState) => {
    try {
      let res = await addUserService(data, token);
      if (res && res.errCode !== 0) toast.warn(res.errMessage);
      if (res && res.errCode === 0) {
        toast.success("Create new user success !!");
        dispatch(createUserSuccess());
        dispatch(fetchAllUserStart(token));
      } else {
        dispatch(createUserFailed());
      }
    } catch (e) {
      dispatch(createUserFailed());
      console.log("createUser error", e);
    }
  };
};

export const createUserSuccess = () => ({
  type: actionTypes.CREATE_USE_SUCCESS,
});

export const createUserFailed = () => ({
  type: actionTypes.CREATE_USE_FAILED,
});

export const fetchAllUserStart = (token) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL", token);
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        toast.error(res.errMessage);
        dispatch(fetchAllUserFailed());
      }
    } catch (e) {
      toast.error("Fetch all users error");
      dispatch(fetchAllUserFailed());
      console.log("fetchGenderStart error", e);
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});

export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const deleteUser = (userId, token) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId, token);
      if (res && res.errCode === 0) {
        toast.success("Delete user success!!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart(token));
      } else {
        toast.error(res.errMessage);
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error("delete user error");
      dispatch(deleteUserFailed());
      console.log("fetchGenderStart error", e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editUser = (data, token) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data, token);
      if (res && res.errCode === 0) {
        toast.success("Edit user success!!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart(token));
      } else {
        toast.error(res.errMessage);
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error("Edit user error");
      dispatch(editUserFailed());
      console.log("fetchGenderStart error", e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorForHomeService("8");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          doctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_FAILED });
      console.log("fetchTopDoctor error", e);
    }
  };
};

export const fetchAllDoctors = (token) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorService(token);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          allDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED });
      console.log("fetchAllDoctor error", e);
    }
  };
};

export const saveInfoDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveInfoDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("Save Info User Successed !!");
        dispatch({
          type: actionTypes.SAVE_INFO_DOCTORS_SUCCESS,
        });
      } else {
        toast.error("Save Info User Failed !!");
        dispatch({
          type: actionTypes.SAVE_INFO_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      toast.error("Save Info User Failed !!");
      dispatch({ type: actionTypes.SAVE_INFO_DOCTORS_FAILED });
      console.log("saveInfoDoctor error", e);
    }
  };
};

export const getInfoDoctor = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getInfoDoctorService(+id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_INFO_DOCTORS_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_INFO_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_INFO_DOCTORS_FAILED });
      console.log("fecthInfoDoctor error", e);
    }
  };
};

export const fetchAllTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_TIME_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_TIME_FAILED,
        });
      }
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_ALL_TIME_FAILED });
      console.log("fecth All time error", e);
    }
  };
};

export const fetchRequiredDoctorStart = (token) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_START });
      let priceRes = await getAllCodeService("PRICE");
      let proviceRes = await getAllCodeService("PROVINCE");
      let paymentRes = await getAllCodeService("PAYMENT");
      let specialtyRes = await getAllSpecialties(token);
      let clinicRes = await getAllClinic(token);
      if (
        priceRes &&
        priceRes.errCode === 0 &&
        proviceRes &&
        proviceRes.errCode === 0 &&
        paymentRes &&
        paymentRes.errCode === 0 &&
        specialtyRes &&
        specialtyRes.errCode === 0 &&
        clinicRes &&
        clinicRes.errCode === 0
      ) {
        let data = {
          priceId: priceRes.data,
          paymentId: paymentRes.data,
          proviceId: proviceRes.data,
          specialtyId: specialtyRes.data,
          clinicId: clinicRes.data,
        };
        dispatch(fetchRequiredDoctorSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorFailed());
      }
    } catch (e) {
      dispatch(fetchRequiredDoctorFailed());
      console.log("fetchRequiredDoctor error", e);
    }
  };
};

export const fetchRequiredDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_SUCCESS,
  data: data,
});

export const fetchRequiredDoctorFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_FAILED,
});
