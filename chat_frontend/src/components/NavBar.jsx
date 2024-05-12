import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import Notifications from "./Chat/Notifications";
import '../main.css';

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <h1 className="title_header_chat">
            MARKETCHAT - UPTC
          </h1>
        </h2>
        <Nav>
          <Stack direction="horizontal" gap={1}>
            <Notifications />
            {user && <span className="current_user">{user.name}</span>}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
