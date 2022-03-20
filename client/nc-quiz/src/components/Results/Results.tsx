import { TableChart } from "@material-ui/icons";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http-request";
import Answer from "../../models/answer";
const Results = () => {
    const { request, loading } = useHttp()
    let params = useParams()
    let count = 0;
    const [result, setResult] = useState({})
    const [openDialog, setOpenDialog] = useState<boolean>(true);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const resultHandler = async () => {
        try {
            const data = await request(`/myquiz/${params.id}/result`, 'GET')
            const result = data.results
            console.log(result)
            result.forEach(((result: any) => {
                const count= String(countCorrectAnswers(result.answers))
                const userName = result.userName + " " + result.userFullName 
                const correctAnswers = count.concat('/',result.answers.length)
                setResult((prevState: any) => ({
                    ...prevState,
                    [userName]: correctAnswers
                }))
            }))
        } catch (e) { }
    }

    const countCorrectAnswers = (result: Answer[]) => {
        count = 0;
        result.map((item: Answer) => {
            if (item.answer === true) {
                count = count + 1
            }
        })
        return count
    }

    useEffect(() => {
        resultHandler()
    }, [params.id])

    if (loading) {
        return(
            <Box display="flex" justifyContent="center">
                <CircularProgress sx={{display: "flex"}} />
            </Box>
        );
    }

    const resultArray = Object.entries(result)

    return (
        <div>
            {resultArray.length > 0 &&
                <>
                    <h2 style={{ textAlign: 'center' }}>Таблица результатов</h2>
                    <Box
                        display="flex"
                        justifyContent="center">
                        <TableContainer
                            component={Paper}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '600px'
                            }}
                        >
                            <Table>
                                <TableHead sx={{ background: '#1565c0' }}>
                                    <TableRow>
                                        <TableCell sx={{ color: '#fafafa' }}> Имя пользователя </TableCell>
                                        <TableCell sx={{ color: '#fafafa', alignItems: 'left' }}> Количество правильных ответов </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {Object.entries(result).map((item: any) => (
                                        <TableRow key={item[0]}>
                                            <TableCell>
                                                {item[0]}
                                            </TableCell>
                                            <TableCell>
                                                {item[1]}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </>
            }
            {!resultArray.length &&
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                >
                    <DialogTitle>{"На данный квиз еще нет результатов!"}</DialogTitle>
                    <DialogActions>
                        <Button>
                            <Link className="listQuiz-dialog__link" to="/myquiz"> ОК </Link>
                        </Button>
                    </DialogActions>
                </Dialog>
            }

        </div>
    )
}
export default Results;