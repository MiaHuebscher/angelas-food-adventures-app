import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PeopleMgmtProtectedRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!(currentUser.firstName === "Angela" && currentUser.lastName === "Todd")) {
      window.alert("Sorry, You're Not Special. Only Angela Todd Can Manage People's Access.");
      setRedirect(true);
    }
  }, [currentUser]);

  if (currentUser.firstName === "Angela" && currentUser.lastName === "Todd") {
    return children;
  }

  if (redirect) {
    return <Navigate to="/Map" />;
  }

  return null;
}