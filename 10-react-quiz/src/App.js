import "./App.css";
// import DateCounter from "./components/DateCounter";
import ReactQuiz from "./components/ReactQuiz";
import { QuizProvider } from "./context/QuizContext";

function App() {
  return (
    <QuizProvider>
      <div className="container">
        {/* <DateCounter /> */}
        <ReactQuiz />
      </div>
    </QuizProvider>
  );
}

export default App;
