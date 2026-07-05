import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { submitQuiz } from "../services/attemptService";
import Footer from "../components/Footer";

import {
    Container,
    CircularProgress,
    Typography,
    Box,
    Button,
    Stack,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";

import Navbar from "../components/Navbar";
import QuestionCard from "../components/QuestionCard";
import { getQuizQuestions } from "../services/quizService";

const QuizPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getQuizQuestions(id);
                setQuestions(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [id]);

    useEffect(() => {

    if (loading) return;

    const timer = setInterval(() => {

        setTimeLeft((prev) => {

            if (prev <= 1) {
                clearInterval(timer);
                handleSubmit();
                return 0;
            }

            return prev - 1;

        });

    }, 1000);

    return () => clearInterval(timer);

}, [loading]);

    const handleAnswerChange = (answer) => {
        const questionId = questions[currentQuestionIndex].id;

        setAnswers((prev) => ({
            ...prev,
            [questionId]: answer,
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {

        if (submitting) return;

        setSubmitting(true);

        try {

            const responses = questions.map((question) => ({
                id: question.id,
                response: answers[question.id] || ""
            }));

            const score = await submitQuiz(id, responses);

            navigate("/result", {
                replace: true,
                state: {
                    score,
                    totalQuestions: questions.length
                }
            });

        } catch (error) {

            console.error(error);
            setSubmitting(false);

        }

    };

    if (loading) {
        return (
            <>
                <Navbar />

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 5,
                    }}
                >
                    <CircularProgress />
                </Box>
            </>
        );
    }

    if (questions.length === 0) {
        return (
            <>
                <Navbar />

                <Container maxWidth="md">
                    <Typography mt={5}>
                        No questions found.
                    </Typography>
                </Container>
            </>
        );
    }

const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");

const seconds = String(timeLeft % 60).padStart(2, "0");

const answeredCount = Object.values(answers).filter(
    (answer) => answer !== ""
).length;

const unansweredCount = questions.length - answeredCount;

    return (
        <>
            <Navbar />



            <Container maxWidth="md">
                <Box
                        sx={{
                            mt: 4,
                            mb: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            gutterBottom
                        >
                            Quiz
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            color={timeLeft <= 60 ? "error" : "primary"}
                            sx={{ mt: 1 }}
                        >
                            {minutes}:{seconds}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            gap: 1,
                            mb: 4,
                        }}
                    >
                        {questions.map((question, index) => {
                            const answered = answers[question.id];

                            return (
                                <Chip
                                    key={question.id}
                                    label={index + 1}
                                    clickable
                                    onClick={() => setCurrentQuestionIndex(index)}
                                    color={
                                        currentQuestionIndex === index
                                            ? "primary"
                                            : answered
                                            ? "success"
                                            : "default"
                                    }
                                    variant={
                                        currentQuestionIndex === index
                                            ? "filled"
                                            : answered
                                            ? "filled"
                                            : "outlined"
                                    }
                                    sx={{
                                        width: 42,
                                        height: 42,
                                        fontWeight: "bold",
                                        borderRadius: "50%",
                                        fontSize: "1rem",
                                    }}
                                />
                            );
                        })}
                    </Box>

                <QuestionCard
                    question={questions[currentQuestionIndex]}
                    currentQuestion={currentQuestionIndex + 1}
                    totalQuestions={questions.length}
                    selectedAnswer={
                        answers[questions[currentQuestionIndex].id] || ""
                    }
                    onAnswerChange={handleAnswerChange}
                />

                        <Stack
                            direction="row"
                            sx={{
                                mt: 6,
                                mb: 4,
                                gap: 2,
                            }}
                        >

                            <Button
                                variant="outlined"
                                onClick={handlePrevious}
                                disabled={currentQuestionIndex === 0}
                            >
                                Previous
                            </Button>

                            {currentQuestionIndex === questions.length - 1 ? (

                                <Button
                                    variant="contained"
                                    color="success"
                                    disabled={submitting}
                                    onClick={() => setOpenSubmitDialog(true)}
                                >
                                    {submitting ? "Submitting..." : "Submit Quiz"}
                                </Button>

                            ) : (

                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                >
                                    Next
                                </Button>

                            )}

                        </Stack>

                        <Dialog
                            open={openSubmitDialog}
                            onClose={() => setOpenSubmitDialog(false)}
                        >
                            <DialogTitle>
                                Submit Quiz?
                            </DialogTitle>

                            <DialogContent>
                                <DialogContentText>
                                    Answered: <strong>{answeredCount}</strong>
                                    <br />
                                    Unanswered: <strong>{unansweredCount}</strong>
                                    <br />
                                    <br />
                                    Are you sure you want to submit your quiz?
                                </DialogContentText>
                            </DialogContent>

                            <DialogActions>
                                <Button
                                    onClick={() => setOpenSubmitDialog(false)}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    color="success"
                                    variant="contained"
                                    disabled={submitting}
                                    onClick={() => {
                                        setOpenSubmitDialog(false);
                                        handleSubmit();
                                    }}
                                >
                                    {submitting ? "Submitting..." : "Submit"}
                                </Button>
                            </DialogActions>
                        </Dialog>
            </Container>
            <Footer />
        </>
    );
};

export default QuizPage;