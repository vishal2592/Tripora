import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const auth = useSelector((state) => state.auth);
  const adminAuth = useSelector((state) => state.admin);

  const currentPath = window.location.pathname;

  // ================= ADMIN =================

  if (currentPath.startsWith("/admin")) {
    // Wait until admin authentication check is completed
    if (!adminAuth.authInitialized) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Checking admin authentication...
        </div>
      );
    }

    if (
      adminAuth.isAuthenticated &&
      adminAuth.admin
    ) {
      return <Outlet />;
    }

    return (
      <Navigate
        to="/admin/adminlogin"
        replace
      />
    );
  }

  // ================= USER =================

  if (!auth.authInitialized) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Checking authentication...
      </div>
    );
  }

  if (
    auth.isAuthenticated &&
    auth.user
  ) {
    return <Outlet />;
  }

  // ================= NOT LOGIN =================

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;