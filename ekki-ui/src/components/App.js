import React, { Fragment } from "react";
import Alert from "./Alert";
import Sidebar from "./Sidebar";

export default ({ children }) => {
    // pegar a rota para nao renderizar o layout padrao
    const excludeRoutes = ["/login", "/register", "/logout", "/changePassword", "/forgotPassword"];
  return (
    <Fragment>
        {excludeRoutes.includes(window.location.pathname) ? 
            <Fragment>
                <Alert />
                {children}
            </Fragment>
        : <Sidebar>
            <Alert />
            {children}
        </Sidebar>}
    </Fragment>
  );
};
