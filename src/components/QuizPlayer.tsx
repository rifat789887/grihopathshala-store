import React, { useState } from 'react';
import { QuizData } from '@/src/contexts/CourseContext';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw } from 'lucide-react';
import { Button } from './ui/Button';

interface QuizPlayerProps {
  quizData: QuizData;
  onComplete?: (score: number, total: number) => void;
}

export function QuizPlayer({ quizData, onComplete }: QuizPlayerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500">
        No questions available for this quiz.
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    
    setIsAnswered(true);
    if (selectedOptionId === currentQuestion.correctOptionId) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      if (onComplete) {
        onComplete(score, quizData.questions.length);
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((score / quizData.questions.length) * 100);
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-white rounded-xl shadow-sm border border-slate-200 max-w-2xl mx-auto my-8">
        <div className="w-24 h-24 rounded-full bg-brand-50 flex items-center justify-center mb-6">
          <CheckCircle2 className="h-12 w-12 text-brand-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Quiz Completed!</h2>
        <p className="text-lg text-slate-600 mb-8">
          You scored <span className="font-bold text-brand-600">{score}</span> out of <span className="font-bold">{quizData.questions.length}</span> ({percentage}%)
        </p>
        <Button onClick={handleRetry} className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4" /> Retake Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full p-4 lg:p-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Progress Bar */}
        <div className="h-2 bg-slate-100 w-full">
          <div 
            className="h-full bg-brand-500 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex) / quizData.questions.length) * 100}%` }}
          />
        </div>
        
        <div className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Question {currentQuestionIndex + 1} of {quizData.questions.length}
            </span>
            <span className="text-sm font-medium text-slate-500">
              Score: {score}
            </span>
          </div>

          <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-8 leading-snug">
            {currentQuestion.question}
          </h3>

          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isCorrect = option.id === currentQuestion.correctOptionId;
              
              let optionClass = "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ";
              
              if (!isAnswered) {
                optionClass += isSelected 
                  ? "border-brand-500 bg-brand-50 text-brand-900" 
                  : "border-slate-200 hover:border-brand-300 hover:bg-slate-50 text-slate-700";
              } else {
                if (isCorrect) {
                  optionClass += "border-emerald-500 bg-emerald-50 text-emerald-900";
                } else if (isSelected && !isCorrect) {
                  optionClass += "border-red-500 bg-red-50 text-red-900";
                } else {
                  optionClass += "border-slate-200 opacity-50 text-slate-500";
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={isAnswered}
                  className={optionClass}
                >
                  <span className="font-medium">{option.text}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {isAnswered && currentQuestion.explanation && (
            <div className={`p-4 rounded-xl mb-8 ${selectedOptionId === currentQuestion.correctOptionId ? 'bg-emerald-50 border border-emerald-100' : 'bg-slate-50 border border-slate-200'}`}>
              <h4 className="font-bold text-slate-900 mb-1">Explanation:</h4>
              <p className="text-slate-700">{currentQuestion.explanation}</p>
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-slate-100">
            {!isAnswered ? (
              <Button 
                onClick={handleSubmit} 
                disabled={!selectedOptionId}
                size="lg"
              >
                Submit Answer
              </Button>
            ) : (
              <Button 
                onClick={handleNext} 
                size="lg"
                className="flex items-center gap-2"
              >
                {currentQuestionIndex < quizData.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
