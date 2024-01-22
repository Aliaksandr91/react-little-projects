import './index.scss';
import {useState} from "react";
import {Game} from "./Game";
import {Result} from "./Result";

export interface QuestionType {
    title: string
    variants: string[]
    correct: number
}

const questions = [
    {
        title: 'What is JSX?',
        variants: [
            'It is simple HTML',
            'It is a function',
            'It is like HTML but with the ability to execute JS code',
        ],
        correct: 2,
    },
    {
        title: 'What is React?',
        variants: [
            'A library for building user interfaces',
            'A programming language',
            'A framework for developing mobile applications',
        ],
        correct: 0,
    },
    {
        title: 'What is a component in React?',
        variants: [
            'It is a function in JavaScript',
            'It is an HTML element',
            'It is an independent and reusable building block of the interface',
        ],
        correct: 2,
    },
    {
        title: 'How do you create a new React project?',
        variants: [
            'npm install react',
            'create-react-app my-app',
            'git init && git clone react-starter',
        ],
        correct: 1,
    },
    {
        title: 'What is "state" in React?',
        variants: [
            'It is an HTML element property',
            'It is data that controls the behavior of a component',
            'It is an event in React',
        ],
        correct: 1,
    },
    {
        title: 'What are "props" in React?',
        variants: [
            'They are properties passed to the component',
            'They are CSS styles',
            'They are built-in React methods',
        ],
        correct: 0,
    },
    {
        title: 'How does React handle events?',
        variants: [
            'Through CSS',
            'Through Redux',
            'Through event handlers',
        ],
        correct: 2,
    },
    {
        title: 'What is React Router?',
        variants: [
            'A library for working with AJAX requests',
            'A library for navigation in single-page applications',
            'A framework for creating animations in React',
        ],
        correct: 1,
    },
    {
        title: 'What is the component lifecycle in React?',
        variants: [
            'It is the period when the component is active on the page',
            'It is a sequence of methods defining the component lifecycle',
            'It is the time from the creation of the component to its destruction',
        ],
        correct: 1,
    },
    {
        title: 'How do you add styles to a React component?',
        variants: [
            'Insert styles inside the JSX file',
            'Use built-in React styles',
            'Use CSS modules or style libraries',
        ],
        correct: 2,
    },
];

function App() {
    const [step, setStep] = useState(0)
    const [correct, setCorrect] = useState(0)
    const question = questions[step]
    const percentage = Math.round(step / questions.length * 100)
    const onClickVariant = (index: number) => {
        setStep(step + 1)
        if (index === question.correct) {
            setCorrect(correct + 1)
        }
    }

    return (
        <div className="App">
            {
                step !== questions.length
                    ? <Game percentage={percentage} question={question} onClickVariant={onClickVariant}/>
                    : <Result correct={correct} questionsLength={questions.length}/>
            }
        </div>
    );
}

export default App;