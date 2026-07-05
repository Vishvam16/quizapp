import { useEffect, useState } from "react";
import {
    Container,
    CircularProgress,
    Box,
    Typography,
    Stack,
} from "@mui/material";

import Navbar from "../components/Navbar";
import WelcomeCard from "../components/WelcomeCard";
import QuizGrid from "../components/QuizGrid";
import HistoryCard from "../components/HistoryCard";
import Grid from "@mui/material/Grid";
import StatisticsCard from "../components/StatisticsCard";
import { getStatistics } from "../services/statisticsService";
import Footer from "../components/Footer";

import { getAllQuizzes } from "../services/quizService";
import { getHistory } from "../services/historyService";

const Dashboard = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const [statistics, setStatistics] = useState({
    highestScore: 0,
    averageScore: 0,
    totalAttempts: 0,
    totalQuizzesTaken: 0,
});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [quizData, historyData, statisticsData] = await Promise.all([
                    getAllQuizzes(),
                    getHistory(),
                    getStatistics(),
                ]);

                setQuizzes(quizData);
                setHistory(historyData);
                setStatistics(statisticsData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Navbar />

            <Container maxWidth="lg">
                <WelcomeCard />

                {loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 5,
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <QuizGrid quizzes={quizzes} />

                        <Box sx={{ mt: 6 }}>
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                gutterBottom
                            >
                                Statistics
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <StatisticsCard
                                        title="Highest Score"
                                        value={statistics.highestScore}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <StatisticsCard
                                        title="Average Score"
                                        value={statistics.averageScore}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <StatisticsCard
                                        title="Total Attempts"
                                        value={statistics.totalAttempts}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <StatisticsCard
                                        title="Quizzes Taken"
                                        value={statistics.totalQuizzesTaken}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ mt: 6, mb: 4 }}>
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                gutterBottom
                            >
                                Recent Attempts
                            </Typography>

                            <Stack spacing={2}>
                                {history.length === 0 ? (
                                    <Typography color="text.secondary">
                                        No attempts yet.
                                    </Typography>
                                ) : (
                                    history.slice(0, 5).map((attempt) => (
                                        <HistoryCard
                                            key={`${attempt.quizId}-${attempt.attemptedAt}`}
                                            attempt={attempt}
                                        />
                                    ))
                                )}
                            </Stack>
                        </Box>
                    </>
                )}
            </Container>
            <Footer />
        </>
    );
};

export default Dashboard;