import React, { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { lookInSession } from "../../common/session";

const adminRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    layout: "/admin",
    icon: "dashboard",
  },
  {
    name: "Courses",
    path: "courses",
    layout: "/admin",
    icon: "course",
  },
  {
    name: "Add Course",
    path: "add-course",
    layout: "/admin",
    icon: "create",
  },
  {
    name: "Create Exam",
    path: "create-exam",
    layout: "/admin",
    icon: "course",
  },
  {
    name: "Previous Exams",
    path: "previous-exams",
    layout: "/admin",
    icon: "course",
  },
  {
    name: "Profile",
    path: "profile",
    layout: "/admin",
    icon: "course",
  },
];

const AdminLayout = (props) => {
  const { ...rest } = props;
  const location = useLocation();

  const navigate = useNavigate();
  // let {
  //   user: { accessToken },
  // } = useContext(UserContext);
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(adminRoutes);
  }, [location.pathname]);

  React.useEffect(() => {
    lookInSession("user") ? navigate("/admin/dashboard") : navigate("/");
  }, []);

  const getActiveRoute = (routes) => {
    let activeRoute = "dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"Horizon UI Tailwind React"}
              brandText={currentRoute}
              secondary={getActiveNavbar(adminRoutes)}
              {...rest}
            />
            <div className="min-h-screen">{<Outlet />}</div>
            {/* <div className="p-3">
              <div>Footer</div>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
