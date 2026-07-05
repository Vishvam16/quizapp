import api from "./api";

export const getAllQuizzes = async () => {
    const response = await api.get("/quiz/all");
    return response.data;
};

export const getQuizQuestions = async (quizId) => {
    const response = await api.get(`/quiz/${quizId}/questions`);
    return response.data;
};