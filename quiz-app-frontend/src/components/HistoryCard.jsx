import {
    Card,
    CardContent,
    Typography,
    Stack,
    Chip,
} from "@mui/material";

const HistoryCard = ({ attempt }) => {

    const percentage = Math.round(
        (attempt.score / attempt.totalQuestions) * 100
    );

    return (
        <Card elevation={2}>
            <CardContent>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <div>
                        <Typography variant="h6">
                            {attempt.quizTitle}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {new Date(
                                attempt.attemptedAt
                            ).toLocaleString()}
                        </Typography>
                    </div>

                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >
                        <Chip
                            color="primary"
                            label={`${attempt.score}/${attempt.totalQuestions}`}
                        />

                        <Chip
                            color="success"
                            label={`${percentage}%`}
                        />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default HistoryCard;