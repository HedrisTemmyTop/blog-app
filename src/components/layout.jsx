import { NavBar } from "./header/navBar";
import styled from "styled-components";

const Container = styled.div`
  //   margin: 0 auto;
  //   width: 100%;
  //   max-width: 100%;
  //   display: flex;
  //   flex-direction: column;
  //   position: relative;
  color: #333;
`;

const Children = styled.div`
  //   margin-top: 300px;
`;

export function Layout({ children }) {
  return (
    <Container>
      {/* <NavBar /> */}

      {children}
    </Container>
  );
}
