import Answer from "./answer";

export default interface Result {
    _id?: string;
    quizId: string;
    userId?: string;
    answers: Answer[];
};