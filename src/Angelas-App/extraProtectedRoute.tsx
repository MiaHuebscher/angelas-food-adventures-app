import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ExtraProtectedRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
  if (currentUser && currentUser.access !== "FULL-POWER") {
    window.alert("Sorry, You Don't Have as Much Power as Angela Todd.");
    setRedirect(true);
    }
  }, [currentUser?.access]);

  if (currentUser.access === "FULL-POWER") {
    return children;
  }

  if (redirect) {
    return <Navigate to="/Map" />;
  }

  return null;
}