import {
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
    Chip,
    Box,
} from "@mui/material";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ quiz }) => {
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        navigate(`/quiz/${quiz.id}`);
    };

    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 4,
                border: "1px solid",
                borderColor: "grey.200",
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                    borderColor: "primary.main",
                },
            }}
        >
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    p: 3,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                    }}
                >
                    <QuizRoundedIcon
                        color="primary"
                        sx={{ fontSize: 40 }}
                    />

                    <Chip
                        color="primary"
                        label={`${quiz.totalQuestions} Questions`}
                    />
                </Box>

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    gutterBottom
                >
                    {quiz.title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Test your knowledge and improve your understanding by
                    attempting this quiz.
                </Typography>

                <Stack
                    sx={{
                        mt: "auto",
                    }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<PlayArrowRoundedIcon />}
                        disabled={quiz.totalQuestions === 0}
                        onClick={handleStartQuiz}
                        sx={{
                            borderRadius: 3,
                            py: 1.3,
                            textTransform: "none",
                            fontWeight: "bold",
                            fontSize: "1rem",
                        }}
                    >
                        {quiz.totalQuestions === 0
                            ? "No Questions"
                            : "Start Quiz"}
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default QuizCard;