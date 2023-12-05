export default function Welcome({ numQuestions, children }) {
  return (
    <div className="welcome">
      <h3 className="heading-tertiary">Welcome to The React Quiz!</h3>
      <p>{numQuestions} questions to test your React mastery</p>
      {children}
    </div>
  );
}
