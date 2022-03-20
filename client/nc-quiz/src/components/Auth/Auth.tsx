import React, { useEffect } from "react";
import { useState } from "react";
import User from "../../models/user";
import { useHttp } from "../../hooks/http-request";
import Button from '@mui/material/Button';
import { Alert, Snackbar, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/userSlice";
import jwt from 'jwt-decode';
import { Link, Navigate, useSearchParams } from "react-router-dom";
import './Auth.css';

const Auth = () => {
    const dispatch = useDispatch();
    const [userSearchParams, setUserSearchParams] = useSearchParams();

    const { loading, request, error } = useHttp()
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
    const [openNoticeReg, setOpenNoticeReg] = useState<boolean>(false);
    const [form, setForm] = useState<User>({
        login: '',
        password: '',
    })
    const [authOk, setAuthOk] = useState<boolean>(false)
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }
    useEffect(() => {
        if (userSearchParams.get("successfullyRegistered")) {
            setOpenNoticeReg(true);
            setTimeout(() => {
                setUserSearchParams("");
            }, 6000);
        } else {
            setOpenNoticeReg(false);
        }
    });

    const handleCloseSnackBar = () => {
        setOpenSnackBar(false);
    }
    const authHandler = async () => {
        try {
            const data = await request('/user/authorization', 'POST', { ...form })
            const token = data.token;
            localStorage.setItem('userId', data.userId);
            const user: User = jwt(token);
            localStorage.name = user.name;
            localStorage.fullname = user.fullname;
            dispatch(login({
                login: user.login,
                userId: user.userId,
                name: user.name,
                fullname: user.fullname
            }))
            setAuthOk(true)
        } catch (e) {
            setOpenSnackBar(true)
        }
    }

    if (authOk) {
        return <Navigate to='/myquiz' />
    }

    return (
        <div className="auth">
            <Snackbar open={openNoticeReg} autoHideDuration={4000}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Регистрация прошла успешно!
                </Alert>
            </Snackbar>
            <Typography variant="h4">
                Авторизация
            </Typography>
            <form className="auth_form">
                <TextField
                    margin="dense"
                    label="Логин"
                    variant="outlined"
                    type="login"
                    name="login"
                    value={form.login}
                    onChange={changeHandler} />
                <TextField
                    margin="dense"
                    label="Пароль"
                    variant="outlined"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={changeHandler} />
                <Button
                    variant="contained"
                    onClick={authHandler}
                    disabled={loading} >
                    ВОЙТИ
                </Button>
                <Typography>
                    Не зарегистрированы?
                    <Button variant="text">
                        <Link className='auth-form__link' to="/user/registration">ПРОЙТИ РЕГИСТРАЦИЮ</Link>
                    </Button>
                    <Snackbar
                        open={openSnackBar}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackBar}
                    >
                        <Alert
                            onClose={handleCloseSnackBar}
                            severity="error"
                        >
                            {error}
                        </Alert>
                    </Snackbar>
                </Typography>
            </form>
        </div>
    )
}
export default Auth;


function componentDidMount() {
    throw new Error("Function not implemented.");
}

