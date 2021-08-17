import React from "react";

import ContactsIcon from "@material-ui/icons/Contacts";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
//import { useSelector } from 'react-redux';

const Footer = () => {
  return (
    <footer className="bck_b_dark">
      <div className="footerContainer">
        <div className="logo">The LJ Group</div>
        <div className="wrapper">
          <div className="left">
            <h2>Contact information</h2>
            <div className="business_nfo">
              <div className="tag">
                <ContactsIcon />
                <div className="nfo">
                  <div>Address</div>
                  <div>
                    C2 Hurstwood Court
                  </div>
                  <div>
                  Duttons Way Shadsworth Business Park
                  </div>
                  <div>Blackburn BB1 2QR</div>
                </div>
              </div>
              <div className="tag">
                <TimelapseIcon />
                <div className="nfo">
                  <div>Working hours</div>
                  <div>Mon-Fri 9AM-5PM</div>
                </div>
              </div>
              <div className="tag">
                <PhoneIcon />
                <div className="nfo">
                  <div>Phone</div>
                  <div>+44 (0)1254 665104</div>
                </div>
              </div>
              <div className="tag">
                <EmailIcon />
                <div className="nfo">
                  <div>Email</div>
                  <div>enquiries@theljgroup.co.uk</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
