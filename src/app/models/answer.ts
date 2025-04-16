export interface Answer {
        answerID: number; // Primary Key
        response: string; // Response to a question
        marks: number; // Marks awarded
        quizID: number; // Foreign Key to QuizAndAssessment
        userID: number; // Foreign Key to User
}
