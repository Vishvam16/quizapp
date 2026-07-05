import api from "./api";

export const submitQuiz = async (quizId, responses) => {
    const response = await api.post(
        `/quiz/${quizId}/submit`,
        responses
    );

    return response.data;
};