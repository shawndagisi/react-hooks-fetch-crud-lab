import React, { useState, useEffect } from 'react';
import QuestionItem from './QuestionItem';

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions when the component mounts
    fetch('http://localhost:4000/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching questions: ', error));
  }, []);

  const handleCorrectAnswerChange = (id, newCorrectIndex) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        return { ...question, correctIndex: newCorrectIndex };
      }
      return question;
    });

    setQuestions(updatedQuestions);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    }).catch((error) =>
      console.error('Error updating correct answer on the server: ', error)
    );
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}</ul>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onCorrectAnswerChange={handleCorrectAnswerChange}
          />
        ))}
      </ul>
    </section>
  );
}
