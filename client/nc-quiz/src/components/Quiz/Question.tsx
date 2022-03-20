import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React from "react";
import Answer from "../../models/answer";
import Question from "../../models/question";

const CurrentQuestion: React.FC<{ question: Question, onSelectAnswer: any }> = (props) => {

    const handleAnswer = (event: any) => {
        const currentAnswer: Answer = {
            questionId: props.question._id,
            answer: event.currentTarget.value,
        }
        props.onSelectAnswer(currentAnswer)
    }
    return (
        <div>
            <h3>{props.question.question}</h3>
            {props.question.type == 'single' &&
                <RadioGroup
                    aria-label="gender"
                    name="radio-buttons-group"
                >
                    {props.question.proposedAnswers.map(item =>
                        <FormControlLabel
                            key={item}
                            value={item}
                            control={<Radio />}
                            label={item}
                            onChange={handleAnswer}
                        />
                    )}
                </RadioGroup>
            }
            {props.question.type == 'string' &&
                <TextField
                    id="outlined-basic"
                    label="Ваш ответ"
                    variant="outlined"
                    onBlur={handleAnswer}
                />
            }
        </div>

    )
}
export default CurrentQuestion;