import React, { useState } from "react";
import { Tab, Nav } from "react-bootstrap";
const CONVERSTATION_KEY = "conversation";
const CONTACTS_KEY = "contacts";
const Sidebar = ({ id }) => {
  const [activateKey, setActiveKey] = useState(CONVERSTATION_KEY);
  return (
    <>
      <div style={{ width: "250px" }} className="d-flex flex-column">
        <Tab.Container activeKey={activateKey} onSelect={setActiveKey}>
          <Nav variant="tabs" classname="justify-content-center">
            <Nav.Item>
              <Nav.Link eventKey={CONVERSTATION_KEY}>Conversation</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
            </Nav.Item>
          </Nav>
        </Tab.Container>
      </div>
    </>
  );
};

export default Sidebar;
