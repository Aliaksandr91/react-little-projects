import {FC} from "react";

interface ResultProps {
    correct: number
    questionsLength: number
}

export const Result: FC<ResultProps> = ({correct, questionsLength}) => {
    return (
        <div className="result">
            <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt='Result'/>
            <h2>You guessed {correct} out of {questionsLength} questions</h2>
            <a href="/">
                <button>Try again</button>
            </a>
        </div>
    );
}