export default interface Question {
    _id: string;
    question: string;
    type: "single" | "string";
    proposedAnswers: string[];
    correctAnswer: string;
};
