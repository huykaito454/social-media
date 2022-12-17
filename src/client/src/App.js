import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/loading";
import AuthenticationRoute from "./route/AuthenticationRoute";
import UserRouter from "./route/UserRouter";
import { authRefreshToken, authUpdateUser } from "./sagas/auth/auth-slice";
import { getToken, logOut } from "./utils/auth";
function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(authUpdateUser(user));
    } else {
      const { refresh_token } = getToken();
      if (refresh_token) {
        dispatch(authRefreshToken({ refreshToken: refresh_token }));
      } else {
        logOut();
      }
    }
  }, [dispatch]);
  return (
    <>
      <Suspense fallback={<Loading></Loading>}>
        {user ? (
          <UserRouter></UserRouter>
        ) : (
          <AuthenticationRoute></AuthenticationRoute>
        )}
      </Suspense>
    </>
  );
}
export default App;
