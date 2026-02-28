import React from 'react';
import { QuizData, QuizQuestion, QuizOption } from '@/src/contexts/CourseContext';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

interface QuizBuilderProps {
  quizData: QuizData;
  onChange: (data: QuizData) => void;
}

export function QuizBuilder({ quizData, onChange }: QuizBuilderProps) {
  const handleAddQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      question: 'New Question',
      options: [
        { id: Date.now().toString() + '-1', text: 'Option 1' },
        { id: Date.now().toString() + '-2', text: 'Option 2' },
        { id: Date.now().toString() + '-3', text: 'Option 3' },
        { id: Date.now().toString() + '-4', text: 'Option 4' },
      ],
      correctOptionId: '',
      explanation: ''
    };
    onChange({
      ...quizData,
      questions: [...(quizData.questions || []), newQuestion]
    });
  };

  const handleUpdateQuestion = (questionId: string, field: keyof QuizQuestion, value: string) => {
    onChange({
      ...quizData,
      questions: quizData.questions.map(q => 
        q.id === questionId ? { ...q, [field]: value } : q
      )
    });
  };

  const handleDeleteQuestion = (questionId: string) => {
    onChange({
      ...quizData,
      questions: quizData.questions.filter(q => q.id !== questionId)
    });
  };

  const handleUpdateOption = (questionId: string, optionId: string, text: string) => {
    onChange({
      ...quizData,
      questions: quizData.questions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            options: q.options.map(o => o.id === optionId ? { ...o, text } : o)
          };
        }
        return q;
      })
    });
  };

  const handleSetCorrectOption = (questionId: string, optionId: string) => {
    handleUpdateQuestion(questionId, 'correctOptionId', optionId);
  };

  return (
    <div className="space-y-4 mt-4 border-t border-slate-700 pt-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-slate-300">Quiz Questions</h4>
        <Button onClick={handleAddQuestion} variant="outline" size="sm" className="h-8 border-brand-500/30 text-brand-400 hover:bg-brand-500/10">
          <Plus className="h-3 w-3 mr-1.5" /> Add Question
        </Button>
      </div>

      <div className="space-y-6">
        {quizData.questions?.map((q, qIndex) => (
          <div key={q.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-xs text-slate-400 font-medium">Question {qIndex + 1}</label>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => handleUpdateQuestion(q.id, 'question', e.target.value)}
                  placeholder="Enter question text"
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none"
                />
              </div>
              <button onClick={() => handleDeleteQuestion(q.id)} className="text-slate-500 hover:text-red-400 mt-6">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 pl-4 border-l-2 border-slate-700">
              <label className="text-xs text-slate-400 font-medium">Options (Select the correct one)</label>
              {q.options.map((option) => (
                <div key={option.id} className="flex items-center gap-2">
                  <button
                    onClick={() => handleSetCorrectOption(q.id, option.id)}
                    className={`p-1 rounded-full ${q.correctOptionId === option.id ? 'text-emerald-500' : 'text-slate-600 hover:text-slate-400'}`}
                  >
                    {q.correctOptionId === option.id ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                  </button>
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => handleUpdateOption(q.id, option.id, e.target.value)}
                    placeholder="Option text"
                    className={`flex-1 bg-slate-900 border rounded px-3 py-1.5 text-sm focus:outline-none ${q.correctOptionId === option.id ? 'border-emerald-500/50 text-emerald-100' : 'border-slate-700 text-slate-300 focus:border-brand-500'}`}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-medium">Explanation (Optional)</label>
              <textarea
                value={q.explanation}
                onChange={(e) => handleUpdateQuestion(q.id, 'explanation', e.target.value)}
                placeholder="Explain why the correct answer is right..."
                rows={2}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>
        ))}
        
        {(!quizData.questions || quizData.questions.length === 0) && (
          <div className="text-center p-4 border border-dashed border-slate-700 rounded-lg text-slate-500 text-sm">
            No questions added yet. Click "Add Question" to start building your quiz.
          </div>
        )}
      </div>
    </div>
  );
}
