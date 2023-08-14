import React from "react";
import Nav from "components/layout/Nav";
import "./Layout.scss";

const Layout = ({
  header,
  children,
  noFooter,
  noHeader,
  activeTab,
  navLinks,
  ...props
}) => (
  <>
    <header>
      {noHeader || header || <Nav activeTab={activeTab} links={navLinks} />}
    </header>
    <main {...props}>{children}</main>
  </>
);

export default Layout;
