import { TopBar } from "./topBar";
import styled from "styled-components";
import { SearchBar } from "./searchBar";

const Nav = styled.div`
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  position: fixed;
  z-index: 2;
  background: rgb(255, 255, 255);
`;

const Container = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
`;

export function NavBar() {
  return (
    <Nav>
      <TopBar />
      <Container>
        <SearchBar />
      </Container>
    </Nav>
  );
}
