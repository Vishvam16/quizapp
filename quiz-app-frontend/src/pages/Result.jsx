import {
    Container,
    Paper,
    Typography,
    Button,
    Stack,
    Box,
    CircularProgress,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Result = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { score = 0, totalQuestions = 0 } = location.state || {};

    const percentage =
        totalQuestions > 0
            ? Math.round((score / totalQuestions) * 100)
            : 0;

    let message = "";
    let color = "success.main";

    if (percentage >= 90) {
        message = "Excellent Work! 🎉";
        color = "success.main";
    } else if (percentage >= 70) {
        message = "Great Job! 👏";
        color = "primary.main";
    } else if (percentage >= 50) {
        message = "Good Effort! 👍";
        color = "warning.main";
    } else {
        message = "Keep Practicing! 💪";
        color = "error.main";
    }

return (
    <>
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper
                elevation={4}
                sx={{
                    p: 5,
                    borderRadius: 4,
                    textAlign: "center",
                }}
            >
                <CheckCircleRoundedIcon
                    color="success"
                    sx={{
                        fontSize: 70,
                        mb: 2,
                    }}
                />

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                >
                    Quiz Completed
                </Typography>

                <Box
                    sx={{
                        position: "relative",
                        display: "inline-flex",
                        my: 4,
                    }}
                >
                    <CircularProgress
                        variant="determinate"
                        value={percentage}
                        size={140}
                        thickness={5}
                    />

                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: "absolute",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                        >
                            {percentage}%
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="h3" fontWeight="bold">
                    {score} / {totalQuestions}
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        mt: 2,
                        mb: 4,
                        color,
                        fontWeight: "bold",
                    }}
                >
                    {message}
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/dashboard")}
                    >
                        Dashboard
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => navigate("/dashboard")}
                    >
                        Attempt Another
                    </Button>
                </Stack>
            </Paper>
        </Container>

        <Footer />
    </>
);
};

export default Result;