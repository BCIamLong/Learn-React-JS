import logo from "../logo.svg";

export default function QuizHeader() {
  return (
    <header className="quiz-headers">
      <img className="logo" src={logo} alt="logo" />
      <h2 className="heading-secondary">The react quiz</h2>
    </header>
  );
}
