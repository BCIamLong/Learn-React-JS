import Heading from "./Heading";
export default function Header({ children }) {
  return (
    <header className="header">
      <Heading />
      {children}
    </header>
  );
}
