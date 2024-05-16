import { useEffect, useState } from "react";

// Send the answer from json from App.js to Alphabet as props to check
// Include the fill in the blanks in this component itself
// Remember to convert answer in upper case
// Number of attempts to be added to state of this one or App.js
// points to be added to state in App.js and then update using function passed as prop
function Alphabet({ answer, attempts, updateAttempts, updateScore }) {
    console.log("RAN HERE: ", answer, attempts);
    let alpha = [...Array(26)].map((_, i) => String.fromCharCode(i + 65));

    let [clicked, setClicked] = useState([]);
    let [maintainedAnswer, setAnswer] = useState(() => {
        console.log("YEH LOCHA", answer.split(" ").map(x => '?'.repeat(x.length)).join(" "));
        return answer.split(" ").map(x => '?'.repeat(x.length)).join(" ");
    }
    );

    useEffect(() => {
        setClicked([]);
        setAnswer(answer.split(" ").map(x => '?'.repeat(x.length)).join(" "))
    }, [answer]);

    useEffect(() => {
        if (attempts === 0) {
            setAnswer(answer);
        }
    }, [clicked]);

    useEffect(() => {
        if (maintainedAnswer === answer && attempts > 0) {
            updateScore();
        }
    }, [maintainedAnswer]);

    const action = (e, index) => {
        console.log(maintainedAnswer);
        if (answer.indexOf(String.fromCharCode(index + 65)) >= 0) {
            let newMaintain = maintainedAnswer.split("");
            for (let i = 0; i < answer.length; i++) {
                if (answer[i] == String.fromCharCode(index + 65))
                    newMaintain[i] = answer[i];
            }
            setAnswer(newMaintain.join(""));
        }
        else {
            updateAttempts();
        }
        setClicked([...clicked, index]);
    }

    const giveClass = (index) => {
        if (clicked.indexOf(index) < 0)
            return "normal";
        return answer.indexOf(String.fromCharCode(index + 65)) >= 0 ? "green" : "red";

    }
    const colorClass = (char) => {
        if (char == ' ')
            return 'space';
        else if (attempts == 0 || answer === maintainedAnswer)
            return 'filled char'
        else if (char == '?')
            return 'char';
        return 'clr char';
    }

    const getDisabledStatus = (index) => {
        if (attempts == 0 || answer === maintainedAnswer)
            return true;
        return clicked.indexOf(index) < 0 ? false : true;
    }

    return (
        <div className="alpha-container">
            <div className="f1">
                {maintainedAnswer.split("").map((char, index) =>
                    <span className={colorClass(char)} key={index}>{char}</span>
                )}
            </div>

            <div className="f2">
                {alpha.map((ele, index) => <button className={giveClass(index) + " btn"} disabled={getDisabledStatus(index)} onClick={(e) => action(e, index)}>{ele}</button>)}
            </div>

        </div>

    )
}

export default Alphabet;