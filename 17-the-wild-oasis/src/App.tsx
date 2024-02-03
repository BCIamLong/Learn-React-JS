import styled from "styled-components";

const H1 = styled.h1`
  font-size: 60px;
  font-weight: 700;
  color: red;
`;

// * if we want style the component itself like in this case the App component we can style the div element and then the convention give it a name with the Styled as prefix
// * so like this
// * and of course because this App component wrap by div so if it's main or some thing we can use styled.main or something right
const StyledApp = styled.div`
  background-color: green;
  padding: 2rem;
`;

function App() {
  return (
    <StyledApp>
      <H1>Hello world</H1>
    </StyledApp>
  );
}

export default App;
