import {FC} from "react";
import {QuestionType} from "./App";
interface GameProps {
    question: QuestionType
    percentage: number
    onClickVariant: (index: number) => void
}
export const Game: FC<GameProps> = ({question, onClickVariant, percentage}) => {
    return (
        <>
            <div className="progress">
                <div style={{width: `${percentage}%`}} className="progress__inner"></div>
            </div>
            <h1>{question.title}</h1>
            <ul>
                {question.variants.map((variant, index) => {
                    return <li onClick={() => onClickVariant(index)} key={index}>{variant}</li>
                })}
            </ul>
        </>
    );
}