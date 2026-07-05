import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const Register = () => {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

    const handleRegister = async () => {
        if (!fullName || !email || !password || !confirmPassword) {
            showSnackbar("error", "Please fill all fields.");
            return;
        }

        if (password !== confirmPassword) {
            showSnackbar("error", "Passwords do not match.");
            return;
        }

        try {
            await api.post("/user/register", {
                fullName,
                email,
                password,
            });

            showSnackbar("success", "Registration successful!");

            setTimeout(() => {
                navigate("/");
            }, 1500);
        } catch (error) {
            console.error(error);
            showSnackbar("error", "Registration failed.");
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
                        Create Account
                    </Typography>

                    <Stack spacing={3} mt={4}>
                        <TextField
                            label="Full Name"
                            fullWidth
                            value={fullName}
                            onChange={(e) =>
                                setFullName(e.target.value)
                            }
                        />

                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                        />

                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleRegister}
                        >
                            Register
                        </Button>

                        <Typography align="center">
                            Already have an account?{" "}
                            <Link to="/">
                                Login
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

export default Register;