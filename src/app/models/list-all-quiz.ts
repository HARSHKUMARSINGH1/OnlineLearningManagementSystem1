export interface ListAllQuiz {
    quizID: number; // Represents the primary key for the quiz
    title: string; // Title of the quiz
    questionList: string; // List of questions in the quiz
    totalMarks: number; // Total marks assigned to the quiz
    courseID: number; // Foreign key linking to a course
    course?: {
      courseID: number;
    }}