export default function Welcome({ children }) {
  return (
    <div className="welcome">
      <h3 className="heading-tertiary">Welcome to The React Quiz!</h3>
      <p>15 questions to test your React mastery</p>
      {children}
    </div>
  );
}
