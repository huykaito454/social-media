import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetUserInfo, handleRefreshToken } from "./actions/authAction";
import { authUpdateUser } from "./reducers/authSlice";
import AuthenticationRoute from "./route/AuthenticationRoute";
import UserRouter from "./route/UserRouter";
import { getToken } from "./utils/auth";
function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(authUpdateUser(user));
    } else {
      const { refresh_token } = getToken();
      if (refresh_token) {
        dispatch(handleRefreshToken(refresh_token));
      }
    }
  }, []);
  return (
    <>
      <Suspense fallback={<></>}>
        <AuthenticationRoute></AuthenticationRoute>
        <UserRouter></UserRouter>
      </Suspense>
    </>
  );
}
export default App;
