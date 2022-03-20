import Question from "./question";

export default  interface Quiz {
    _id?: string;
    title?: string;
    description?: string;
    private?: boolean;
    open?: boolean;
    userID?: string;
    timer?: number;
    questions?: Question[];
};
