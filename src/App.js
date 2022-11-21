import React, { Suspense } from "react";
import AuthenticationRoute from "./route/AuthenticationRoute";
import UserRouter from "./route/UserRouter";
function App() {
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
