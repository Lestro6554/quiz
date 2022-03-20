import Box from '@mui/material/Box';
import {CircularProgress, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import Result from "../../models/result";
import {useHttp} from "../../hooks/http-request";
import {useNavigate} from "react-router-dom";

interface time {
    seconds : number,
    minutes : number,
    hours : number
}

export default function Timer(props: { time: number; answers: Result}) {
    let navigate = useNavigate();

    const { loading, request } = useHttp()
    const [end, setEnd] = useState(Date.now() + props.time + 2000);
    const [progress, setProgress] = useState(100);

    const getTime = ()=> {
        updateTime()

        const difference = end - Date.now();

        let timeLeft: time = {
            seconds : 0,
            minutes : 0,
            hours : 0
        };
        if(difference > 0){
             timeLeft = {
                seconds : Math.floor((difference/1000)%60),
                minutes : Math.floor((difference/1000/60)%60),
                hours : Math.floor((difference/(1000*60*60))%24)
            }
        }
        if( difference / (props.time/100) >= 100 ){
            setProgress(100)
        }
        else{
            setProgress(Math.floor(difference / (props.time/100)))
        }
        if(difference < 1000 ) {
            setProgress(0)
        }

        if(localStorage.getItem('end') === null){
            localStorage.setItem('end', end.toString());
        }
        localStorage.setItem('hours', time.hours.toString());
        localStorage.setItem('minutes', time.minutes.toString());
        localStorage.setItem('seconds', time.seconds.toString());
        localStorage.setItem('currentProgress', progress.toString());

        return timeLeft;
    }

    const [time, setTime] = useState({
        seconds : 1,
        minutes : 0,
        hours : 0
    });

    const updateTime = ()=>{
        if(localStorage.getItem( 'hours') !== null &&
            localStorage.getItem( 'minutes') !== null &&
            localStorage.getItem( 'seconds') !== null &&
            localStorage.getItem('currentProgress') !== null ) {

            setTime({
                seconds : Number(localStorage.getItem('seconds')),
                minutes : Number(localStorage.getItem('minutes')),
                hours : Number(localStorage.getItem('hours'))
            })
            setProgress(Number(localStorage.getItem('currentProgress')))
            setEnd(Number(localStorage.getItem('end')))
        }
    }


    const sendAnswers = async () => {
        try {
            const data = await request(`/quiz/${props.answers.quizId}/result`, 'POST', {...props.answers})
            console.log(data)
            if(data.message === 'Результаты были записаны') {
                localStorage.setItem('messageSendResult', data.message);
            }
            navigate('/myquiz');
        } catch (e) {
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const currentTime = getTime();

            if (
                currentTime.hours === 0 &&
                currentTime.minutes === 0 &&
                currentTime.seconds === 0
            ) {
                clearInterval(timer);

                localStorage.removeItem("currentProgress");
                localStorage.removeItem("hours");
                localStorage.removeItem("minutes");
                localStorage.removeItem("seconds");
                localStorage.removeItem("end");
                sendAnswers();
            }
            setTime(currentTime);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [time.seconds]);

return(
    <div className='Timer'>
        <Box sx={{ position: 'fixed', display: 'inline-flex'}}>
            <CircularProgress variant="determinate" size={110} value={progress} {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="body2"
                            component="div"
                            color="text.secondary">{`${time.hours}h:${time.minutes}m:${time.seconds}s`}
                </Typography>
            </Box>
        </Box>
    </div>
);
}