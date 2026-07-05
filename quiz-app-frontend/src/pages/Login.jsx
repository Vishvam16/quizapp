import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Stack,
    Snackbar,
    Alert,
} from "@mui/material";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: "success",
        message: "",
    });

    const showSnackbar = (severity, message) => {
        setSnackbar({
            open: true,
            severity,
            message,
        });
    };

    const handleLogin = async () => {
        if (!email || !password) {
            showSnackbar("error", "Please fill all fields.");
            return;
        }

        try {
            const response = await api.post("/user/login", {
                email,
                password,
            });

            login(response.data.token);

            showSnackbar("success", "Login Successful!");

            setTimeout(() => {
                navigate("/dashboard");
            }, 800);

        } catch (error) {
            console.error(error);
            showSnackbar("error", "Invalid email or password.");
        }
    };

    return (
        <>
            <Container maxWidth="sm" sx={{ mt: 8 }}>
                <Paper
                    elevation={4}
                    sx={{
                        p: 5,
                        borderRadius: 4,
                    }}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        fontWeight="bold"
                        gutterBottom
                    >
                        Welcome!
                    </Typography>

                    <Stack spacing={3} mt={4}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleLogin}
                        >
                            Login
                        </Button>

                        <Typography align="center">
                            Don't have an account?{" "}
                            <Link to="/register">
                                Register
                            </Link>
                        </Typography>
                    </Stack>
                </Paper>
            </Container>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() =>
                    setSnackbar({
                        ...snackbar,
                        open: false,
                    })
                }
            >
                <Alert
                    severity={snackbar.severity}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Login;