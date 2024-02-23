import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  /* background-color: var(--color-brand-700); */
  border: none;
  color: inherit;
  /* display: none; */
  /* font-weight: 500; */
  width: 55%;

  &::-webkit-file-upload-button {
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    border: none;
    padding: 0.8rem 1.6rem;
    border-radius: var(--border-radius-md);
    font-size: 1.6rem;
    font-weight: 500;
    margin-right: 1.2rem;
    cursor: pointer;
  }

  &::-webkit-file-upload-button:hover {
    background-color: var(--color-brand-700);
  }
`;

export default FileInput;
