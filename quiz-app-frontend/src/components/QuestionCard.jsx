import {
    Card,
    CardContent,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    LinearProgress,
    Paper,
} from "@mui/material";

const QuestionCard = ({
    question,
    currentQuestion,
    totalQuestions,
    selectedAnswer,
    onAnswerChange,
}) => {
    const progress = (currentQuestion / totalQuestions) * 100;

    const options = [
        question.option1,
        question.option2,
        question.option3,
        question.option4,
    ];

    return (
        <Card
            elevation={0}
            sx={{
                mt: 4,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "grey.200",
            }}
        >
            <CardContent sx={{ p: 4 }}>
                <Typography
                    variant="h6"
                    color="text.secondary"
                    gutterBottom
                >
                    Question {currentQuestion} of {totalQuestions}
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        mt: 2,
                        mb: 4,
                        height: 10,
                        borderRadius: 5,
                    }}
                />

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{
                        mb: 5,
                    }}
                >
                    {question.questionTitle}
                </Typography>

                <FormControl fullWidth>
                    <RadioGroup
                        value={selectedAnswer}
                        onChange={(e) => onAnswerChange(e.target.value)}
                    >
                        {options.map((option) => (
                            <Paper
                                key={option}
                                elevation={selectedAnswer === option ? 4 : 0}
                                sx={{
                                    mb: 2,
                                    borderRadius: 3,
                                    border: "2px solid",
                                    borderColor:
                                        selectedAnswer === option
                                            ? "primary.main"
                                            : "grey.300",
                                    transition: "all 0.25s ease",
                                    "&:hover": {
                                        borderColor: "primary.main",
                                        transform: "translateX(4px)",
                                    },
                                }}
                            >
                                <FormControlLabel
                                    value={option}
                                    control={
                                        <Radio
                                            color="primary"
                                            size="medium"
                                        />
                                    }
                                    label={
                                        <Typography
                                            sx={{
                                                py: 1,
                                                fontSize: "1rem",
                                            }}
                                        >
                                            {option}
                                        </Typography>
                                    }
                                    sx={{
                                        width: "100%",
                                        m: 0,
                                        px: 2,
                                        py: 1,
                                    }}
                                />
                            </Paper>
                        ))}
                    </RadioGroup>
                </FormControl>
            </CardContent>
        </Card>
    );
};

export default QuestionCard;