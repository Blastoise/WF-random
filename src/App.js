import './App.css';
import { useEffect, useState } from 'react';
import Alphabet from './Alphabet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgressBar from './ProgressBar';
import data from './data.json';

function App() {
  let totalAttempts = 6;
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index].question);
  let [answer, setAnswer] = useState(data[index].answer.toUpperCase());
  let [attempts, setAttempts] = useState(totalAttempts);
  let [score, setScore] = useState(0);

  useEffect(() => {
    setQuestion(data[index].question);
    setAnswer(data[index].answer.toUpperCase());
    setAttempts(totalAttempts);
  }, [index])

  useEffect(() => {
    if (attempts === 0)
      toast.error('You messed up!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  }, [attempts])

  return (
    <>
      <div className='quiz-container'>
        {/* <div>Score: {score}</div> */}
        <ProgressBar bgcolor={'rgb(11, 211, 24)'} completed={attempts * 100 / totalAttempts} attempts={`Attempts left: ${attempts}`} />
        <p className='question'>{index + 1}. {question}</p>
        <Alphabet answer={answer} attempts={attempts} updateAttempts={() => { setAttempts(attempts - 1) }} updateScore={() => { setScore(score + 10) }} />
        <button onClick={() => { setIndex(index + 1) }} className='next-ques'>Next Question</button>
      </div>
      <ToastContainer />
    </>

  );
}

export default App;