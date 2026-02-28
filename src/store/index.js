import { createStore } from "vuex";

const store = createStore({
  state: {
    modalInvoice: false,
    modalPatient: false,
    modalLogout: false,
    modalLoader: true,
    modalAppointment: false,
    modalService: false,
    services: [],
    servicesSize: 0,
    servicesLoaded: false,
    patients: [],
    patientsSize: 0,
    patientsLoaded: false,
    username: "",
    userrole: "",
  },
  mutations: {
    TOGGLE_INVOICE(state) {
      if (state.modalPatient == true) {
        state.modalPatient = false;
        state.modalInvoice = !state.modalInvoice;
      } else {
        state.modalInvoice = !state.modalInvoice;
      }
    },
    TOGGLE_PATIENT(state) {
      if (state.modalInvoice == true) {
        state.modalInvoice = false;
        state.modalPatient = !state.modalPatient;
      } else {
        state.modalPatient = !state.modalPatient;
      }
    },
    TOGGLE_APPOINTMENT(state) {
      if (state.modalAppointment == true) {
        state.modalInvoice = false;
        state.modalPatient = false;
        state.modalService = false;
        state.modalAppointment = !state.modalAppointment;
      } else {
        state.modalAppointment = !state.modalAppointment;
      }
    },
    TOGGLE_SERVICE(state) {
      if (state.modalService == true) {
        state.modalInvoice = false;
        state.modalPatient = false;
        state.modalAppointment = false;
        state.modalService = !state.modalService;
      } else {
        state.modalService = !state.modalService;
      }
    },
    TOGGLE_LOGOUT(state) {
      if (state.modalLogout == true) {
        state.modalLogout = !state.modalLogout;
        console.log("Modal Logout", state.modalLogout);
      } else {
        state.modalLogout = !state.modalLogout;
        console.log("Modal Logout 1", state.modalLogout);
      }
    },
    TOGGLE_LOADER(state) {
      if (state.modalLoader == true) {
        state.modalLoader = !state.modalLoader;
        state.modalInvoice = false;
        state.modalPatient = false;
        state.modalAppointment = false;
      } else {
        state.modalLoader = !state.modalLoader;
      }
    },
    SET_SERVICES(state, services) {
      state.services = Array.isArray(services) ? services : [];
      state.servicesSize = state.services.length;
      state.servicesLoaded = true;
    },
    SET_PATIENTS(state, patients) {
      state.patients = Array.isArray(patients) ? patients : [];
      state.patientsSize = state.patients.length;
      state.patientsLoaded = true;
    },
    SET_USERDATA(state, user) {
      state.username = user.name
      state.userrole = user.role
    },

  },
  actions: {},
  modules: {},
});

export default store;
