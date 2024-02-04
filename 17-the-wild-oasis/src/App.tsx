import styled from "styled-components";
import Button from "./components/Button";
import Input from "./components/Input";
import GlobalStyles from "./styles/GlobalStyles";
import Heading from "./components/Heading";
import Row from "./components/Row";

// * if we want style the component itself like in this case the App component we can style the div element and then the convention give it a name with the Styled as prefix
// * so like this
// * and of course because this App component wrap by div so if it's main or some thing we can use styled.main or something right
const StyledApp = styled.div`
  background-color: green;
  padding: 2rem;
`;

function App() {
  return (
    <>
      {/* This is how we can apply the global style, so because this GlobalStyles cannot accept the child components so therefore we need to use like this so sibling with App component like this */}
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row $type="horizontal">
            <Heading as="h1" $responsive={true}>
              Hello world
            </Heading>
            <Heading as="h2">Hello world</Heading>
            <Heading as="h3">Hello world</Heading>
            <Heading as="h4">Hello world</Heading>
          </Row>
          <Row>
            <Button $size="small" $variation="danger">
              Check in
            </Button>
            <Button $size="small" $variation="primary">
              Check out
            </Button>
            <Button>Default button</Button>
          </Row>
          <Row>
            <Input type="text" placeholder="Your name" />
            <Input type="text" placeholder="Your address" />
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
