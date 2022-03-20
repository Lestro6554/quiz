
import { Box, Button, CircularProgress, FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http-request";
import Quiz from "../../models/quiz";
import CurrentQuestion from "./Question";
import {useNavigate, useParams} from "react-router-dom";
import './Quiz.css';
import Answer from "../../models/answer";
import Result from "../../models/result";
import Timer from "../Timer/Timer";

const CurrentQuiz = () => {
   let navigate = useNavigate();
   const { request, loading } = useHttp()
   const [quiz, setQuiz] = useState<Quiz>({})
   const [dataMsg, setDataMsg] = useState()

   let params = useParams()

   const getQuiz = async () => {
      try {
         const data = await request(`/quiz/${params.id}`, 'GET')
         console.log(data.quiz)
         setQuiz(data.quiz)
      } catch (e) { }
   }

   const listquestions = quiz.questions

   useEffect(() => {
      getQuiz()
   }, [params.id])

   const [result, setResult] = useState<Result>({
      quizId: `${params.id}`,
      userId: `${localStorage.getItem('userId')}`,
      answers: []
   })

   const handleAnswer = (answer: Answer) => {
      let newAnswers: Answer[] = result.answers
      for (let item of result.answers) {
         if (answer.questionId == item.questionId) {
            newAnswers = result.answers.filter((item) => item.questionId !== answer.questionId)
         }
      }
      setResult((prevState: Result) => ({
         ...prevState,
         answers: [...newAnswers, answer]
      })
      )
   }

   const setTime = () => {
      return Number(quiz.timer)
   }

   const handleResult = async () => {
      localStorage.removeItem("currentProgress");
      localStorage.removeItem("hours");
      localStorage.removeItem("minutes");
      localStorage.removeItem("seconds");
      localStorage.removeItem("end");
      try {
         const data = await request(`/quiz/${params.id}/result`, 'POST', { ...result })
         navigate('/myquiz');
         setDataMsg(data.message);
      } catch (e) { }
   }

   if (loading) {
      return <CircularProgress />
   }

   return (
       <div className="Wrapper">
         <div className="quiz">

            <FormControl sx={{maxWidth: '1000px'}}>
               <div className="quiz-heading">
                  <div className="quiz-heading-title"> {quiz.title} </div>
                  <h3 > {quiz.description} </h3>
               </div>
               {listquestions?.map(question =>
                  <CurrentQuestion question={question} key={question._id}
                     onSelectAnswer={handleAnswer}
                  />
               )}
               <Box textAlign='center'>
                  <Button
                     variant="contained"
                     sx={{ mt: 3, bgcolor: '#1a237e', width: '350px', }}
                     onClick={handleResult}
                  >
                     Отправить
                  </Button>
               </Box>
            </FormControl>
         </div>
          { setTime()>0? <Timer time={setTime()} answers={result}/>:<p>Не ограниченное время</p> }
      </div>
   )

}
export default CurrentQuiz;
