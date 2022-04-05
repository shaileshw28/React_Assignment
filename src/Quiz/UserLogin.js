import React, { useState } from "react";
import Quiz from "./Quiz";

const UserLogin = () => {
  const [isLoggined, setLoginSession] = useState(false);
  const setSession = () => {
    setLoginSession(true);
  };
  return (
    <>
      {isLoggined ? (
        <Quiz />
      ) : (
        <form>
          <span className={"label"}>Username</span>&nbsp;&nbsp;<input type="text" name="username" /><br/>
          <span className={"label"}>Password</span>&nbsp;&nbsp;<input type="password" name="pass" /><br/><br/>
          <button className={"login-button"} type="button" value="submit" onClick={setSession}>
            Submit
          </button>
        </form>
      )}
    </>
  );
};
export default UserLogin;
