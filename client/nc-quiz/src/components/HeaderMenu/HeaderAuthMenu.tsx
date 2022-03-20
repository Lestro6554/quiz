import Divider from '@mui/material/Divider';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

import './HeaderMenu.css';
import { Link, useLocation } from 'react-router-dom';

export default function HeaderAuthMenu() {
    const PATHNAME = {
        auth: '/user/authorization',
        reg: '/user/registration'
    };

    const location = useLocation();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                className="header-menu"
                sx={{ background: '#f5f5f5' }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, color: '#212121', ml: 3 }}
                    >
                        NC FS Quiz
                    </Typography>
                    {(location.pathname !== PATHNAME.auth) && (location.pathname !== PATHNAME.reg) ? (
                        <Button variant="outlined" size="medium">
                            <Link className='header-menu__link' to="/user/authorization">Войти / Регистрация</Link>
                        </Button>
                    ) : null}
                    <Divider />
                </Toolbar>
            </AppBar>
        </Box>

    )
}