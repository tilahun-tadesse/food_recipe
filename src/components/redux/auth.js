import mitt from 'mitt';
export default {
  state: {
    isLogin: false,
    PostPopup: false,
    ProfilePopup: false,
    EditPopup: false,
    EditeId: null,
    CartNum:null,
    emitter: mitt(),
    SavedNum: null,
  },
  mutations: {
    emitRefreshPostedDishes(state) {
      console.log("emitRefreshPostedDishes");
      state.emitter.emit('refreshPostedDishes'); // Emit the 'refreshPostedDishes' event
    },
    
    emitFetchPostDish(state) {
      state.emitter.emit('fetchPostDish'); // Emit the 'fetchPostDish' event
    },
    setLogin(state, value) {
      state.isLogin = value;
    },
    setPostPopup(state, value) {
      state.PostPopup = value;
    },
    setProfilePopup(state, value) {
      state.ProfilePopup = value;
    },
    setEditPopup(state, value) {
      state.EditPopup = value;
    },
    setEditeId(state, value) {
      state.EditeId = value;
    },
    setAddCartNum(state,value) {
      state.CartNum=value;
    },
    setSubCartNum(state,value) {
      state.CartNum=value;
    },
    setAddSavedNum(state,value) {
      state.SavedNum=value;
    },
    setSubSavedNum(state,value) {
      state.SavedNum=value;
    }

   
  },
  actions: {
    initLoginFromSessionStorage({ commit }) {
      const isLogin = sessionStorage.getItem('isLogin');
      if (isLogin === 'true') {
        commit('setLogin', true);
      } else {
        commit('setLogin', false);
      }
    },
    login({ commit }) {
         sessionStorage.setItem('isLogin', 'true');
        commit('setLogin', true);
    },
    logout({ commit }) {
      // Simulate logout process
      sessionStorage.setItem('isLogin', 'false');
      commit('setLogin', false);
    },
    togglePostPopup({ commit }, value) {
      commit('setPostPopup', value);
    },
    toggleProfilePopup({ commit }, value) {
      commit('setProfilePopup', value);
    },
    toggleEditPopup({ commit }, value) {
      commit('setEditPopup', value);
    },
    setEditeId({ commit }, value) {
      commit('setEditeId', value);
    },
    setAddCartNum({ commit }, value) {
        commit('setAddCartNum',value);
      },
      setSubCartNum({ commit }, value) {
        commit('setSubCartNum',value);
    },
      AddSavedNum({ commit }, value) {
        commit('setAddSavedNum',value);
    },
    SubSavedNum({ commit }, value) {
        commit('setSubSavedNum',value);
    },
     emitFetchPostDish({ commit }, value) {
      commit('emitFetchPostDish', value); // Call the mutation to emit 'fetchPostDish' event
    }
  },
  getters: {
    isLogin: state => state.isLogin,
    PostPopup: state => state.PostPopup,
    ProfilePopup: state => state.ProfilePopup,
    EditPopup: state => state.EditPopup,
    EditeId: state => state.EditeId,
    CartNum: state => state.CartNum,
    SavedNum: state => state.SavedNum
  },
};