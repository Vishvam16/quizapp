import {
    Grid,
    Typography
} from "@mui/material";

import QuizCard from "./QuizCard";

const QuizGrid = ({ quizzes }) => {

    if (quizzes.length === 0) {
        return (
            <Typography mt={3}>
                No quizzes available.
            </Typography>
        );
    }

    return (
        <>
            <Typography
                variant="h5"
                mb={3}
            >
                Available Quizzes
            </Typography>

            <Grid container spacing={3}>
                {quizzes.map((quiz) => (
                    <Grid
                        key={quiz.id}
                        size={{ xs: 12, sm: 6, md: 4 }}
                    >
                        <QuizCard quiz={quiz} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default QuizGrid;