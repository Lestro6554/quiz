import { createSlice } from "@reduxjs/toolkit";
import Quiz from "../../models/quiz";

export interface State {
    quiz: Quiz
}
const initialState: State = {
    quiz: {
        _id: undefined,
        title: undefined,
        description: undefined,
        private: undefined,
        open: undefined,
        userID: undefined,
        timer: undefined,
        questions: undefined
    }
};
const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setQuiz(state, action) {
            state.quiz._id = action.payload._id;
            state.quiz.title = action.payload.title;
            state.quiz.description = action.payload.description;
            state.quiz.private = action.payload.private;
            state.quiz.open = action.payload.open;
            state.quiz.userID = action.payload.userID;
            state.quiz.timer = action.payload.timer;
            state.quiz.questions = action.payload.questions;
        },
        removeQuiz(state) {
            state.quiz._id = undefined;
            state.quiz.title = undefined;
            state.quiz.description = undefined;
            state.quiz.private = undefined;
            state.quiz.open = undefined;
            state.quiz.userID = undefined;
            state.quiz.timer = undefined;
            state.quiz.questions = undefined;
        },
    },
});
export const {setQuiz,removeQuiz} = quizSlice.actions;
export default quizSlice.reducer;