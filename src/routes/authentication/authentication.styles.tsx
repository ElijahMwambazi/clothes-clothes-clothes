import styled from "styled-components";

export const AuthenticationContainer = styled.div`
  display: flex;
  width: 900px;
  justify-content: space-between;
  margin: 30px auto;

  h2 {
    margin: 10px 0;
  }

  .sign-in-container,
  .sign-up-container {
    display: flex;
    flex-direction: column;
    width: 380px;
  }
`;
