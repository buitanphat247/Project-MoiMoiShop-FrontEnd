// RoleBasedGuard.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Alert, AlertTitle, Container } from "@mui/material"; // Assume you're using Material UI

const RoleBasedGuard = ({ children, accessibleRoles }) => {
  const { currentUser } = useSelector((state) => state.auth);
  console.log('currentUser: ', currentUser);

  if (!accessibleRoles.includes(currentUser?.role?.name)) {
    return (
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
};

export default RoleBasedGuard;
