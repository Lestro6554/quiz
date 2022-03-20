import mongoose from "mongoose";
const { Types } = mongoose;
const { Schema } = mongoose;

const QuizSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    privateQuiz: {type: Boolean, required: true},
    open: {type: Boolean, required: true},
    userId: {type: Types.ObjectId, ref: 'Users'},
    questions: [{
        questionId: mongoose.Schema.Types.ObjectId,
        question: {type: String, required: true},
        type: {type: String, required: true},
        proposedAnswers: [String],
        correctAnswer: {type: String, required: true}
    }],
    timer: {type: Number, required: true}
})

const QuizModel = mongoose.model("Quiz", QuizSchema, "Quiz");
export default QuizModel