// logoutStore.js
let isLogoutInProgress = false;

const setLogoutInProgress = () => {
isLogoutInProgress = true;
};

const resetLogoutInProgress = () => {
isLogoutInProgress = false;
};

export { isLogoutInProgress, setLogoutInProgress, resetLogoutInProgress };