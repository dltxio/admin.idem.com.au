import React from "react";
import FooterPanel from "./FooterPanel";
import "./Footer.scss";
const panels = [
  {
    heading: "About",
    className: "col-sm-6 col-md-4",
    items: [
      { icon: "home", text: "PO Box 1234" },
      {
        icon: "briefcase",
        text: ["ABN 00 000 000 000", "ACN 000 000 000"]
      }
    ]
  },
  {
    heading: "Connect With Us",
    className: "col-sm-6 col-md-4",

    items: [
      {
        icon: "logo-facebook",
        text: "Facebook",
        link: "https://www.facebook.com/"
      },
      {
        icon: "logo-twitter",
        text: "Twitter",
        link: "https://www.twitter.com/"
      },
      {
        icon: "mail",
        text: "info@",
        link: "mailto:info@"
      },
      {
        icon: "lock-closed",
        jsx: (
          <a
            href="http://keys.gnupg.net/pks/lookup?"
            children="PGP PubKey (000000)"
            download
          >
            PGP Public Key
          </a>
        )
      }
    ]
  }
];

const Footer = () => (
  <div className="footer">
    <div className="row">
      {panels.map((panel, i) => (
        <FooterPanel key={i} panel={panel} />
      ))}
    </div>
  </div>
);

export default Footer;
