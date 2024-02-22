import styled, { css } from "styled-components";

const state = "error";

// ! with this way we can't set the conditional and return the css code and the conditional ${state === 'error' && `color: red`} will not work
// * and so that why we should use css helper function when we have some kind of code like this so outside the styled function and we need to do some conditional with return CSS code and works
// * so always use css function for that
const heading_mobile = `
   font-size: 3rem
   ${state === "error" && `color: red`}
`;

// * so this way we will get this nice css highlighting
// * and also it allows us to do some conditional to return some CSS code
// * https://styled-components.com/docs/api#css
// * and now it works really nice
const heading_mobile_css_highlighting = css`
  font-size: 3rem;
  ${state === "error" && `color: red`}
`;

//* Heading for h1,h2,h3,h4

interface HeadingProps {
  // *https://styled-components.com/docs/api#transient-props
  // * we should use $ notation if we declare the interface or type for props from styled component
  //   <Comp $draggable="red" draggable="true">
  //     Drag me!
  //   </Comp>
  // * for example we have code like this we pass in draggable for our component prop and $draggable for styled components because in this styled components we also need this prop to do some styling right
  //  * and therefore if we use draggable so this name it will create conflict between react props component and the styled components props right
  // * so the convention is use $ for styled components props of course we can use normal name prop but in the case we don't have the component pass in the same prp like that ok
  // ? https://chat.openai.com/c/776b85de-2461-4fbd-837a-31d25ed08076

  $responsive?: boolean;
}

const Heading = styled.h1<HeadingProps>`
  /* color: yellow; */
  /* ${heading_mobile} */
  color: var(--color-grey-700);

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 6rem;
      font-weight: 700;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 4rem;
      font-weight: 700;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 3rem;
      font-weight: 700;
    `}
  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 700;
      text-align: center;
    `}

  ${(props) => props.$responsive && heading_mobile_css_highlighting}
`;

export default Heading;
