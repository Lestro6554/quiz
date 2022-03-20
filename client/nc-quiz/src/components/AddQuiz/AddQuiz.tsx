import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useHttp } from "../../hooks/http-request";
import './AddQuiz.css';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function AddQuiz() {

    const {loading, request, error} = useHttp();
    const [errSnackBar, setErrSnackBar] = useState<boolean>(false);
    const [successSnackBar, setSuccessSnackBar] = useState<boolean>(false);
    const [quiz, setQuiz] = useState('');

    const userId = localStorage.getItem('userId');

    const changeHandler = (newQuiz: any) => {
        setQuiz(newQuiz);
    }

    const handleCloseSnackBar = () => {
        setErrSnackBar(false);
        setSuccessSnackBar(false);
    }

    const createQuiz = async() => {
        let parseQuiz = {
            ...JSON.parse(quiz),
            userId
        }

        try {
            const data = await request('/quiz/create', 'POST', parseQuiz);
            setSuccessSnackBar(true);
        } catch (e) {
            setErrSnackBar(true)
        }
    }

    return (
        <div className="addQuiz">
            <AceEditor
                height="700px"
                width="650px"
                mode="javascript"
                theme="github"
                onChange={changeHandler}
                name="addQuiz"
                editorProps={{ $blockScrolling: true }}
                fontSize={14}
                setOptions={{
                    useWorker: false,
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true
                }}
            />
            <div className="addQuiz-btn">
                <Button
                    variant="contained"
                    onClick={createQuiz}
                >
                    Создать тест
                </Button>
            </div>
            <Snackbar
                open={errSnackBar}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
            >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity="error"
                >
                    {(error === "500 ошибка") ? (
                        "Неправильно заполнен редактор"
                    ) : "Ошибка при создании теста"}
                </Alert>
            </Snackbar>
            <Snackbar
                open={successSnackBar}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
            >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity="success"
                >
                    Тест успешно создан
                </Alert>
            </Snackbar>
        </div>
    );
}