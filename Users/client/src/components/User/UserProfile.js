import React, { useState, useEffect } from 'react';
import {
    useParams, useHistory,
} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DataService from "../../utils/data.service";
import FinishRoomList from "./FinishRoomList";
import isPlainObject from "react-redux/lib/utils/isPlainObject";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '50%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        overflow: 'auto',
        marginTop: '20px',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Account() {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("error");

    const ID = useParams().id;
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await DataService.getUserByUserId(ID);
                setUsername(res.data[0].username);
                setEmail(res.data[0].email);
                setFullname(res.data[0].fullname);
            }
            catch (error) {
                history.back();
            }
        }
        fetchData();
    }, [ID])

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth={false} className={classes.container}>
                <Grid container spacing={3} >
                    <Grid item xs={12} >
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <form className={classes.form} noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        {message && (
                                            <div className="form-group">
                                                <Alert severity={status}>
                                                    {message}
                                                </Alert>
                                            </div>
                                        )}
                                        <TextField
                                            autoComplete="username"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            value={username}
                                            id="username"
                                            label="Username"
                                            name="username"
                                            autoFocus
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoComplete="fname"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            value={fullname}
                                            id="fullname"
                                            label="Full Name"
                                            name="fullname"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            value={email}
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            disabled
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Grid>
                    <Grid item xs={12} >
                        <FinishRoomList />
                    </Grid>
                </Grid>
            </Container>
        </main>
    );
}