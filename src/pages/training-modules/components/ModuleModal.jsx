import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ModuleModal = ({ module, isOpen, onClose, onComplete }) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);

  if (!isOpen || !module) return null;

  const lessons = [
    {
      id: 1,
      title: "Introduction to Waste Segregation",
      content: `Proper waste segregation is the foundation of effective waste management. By separating different types of waste at the source, we can significantly improve recycling rates and reduce environmental impact.\n\nKey benefits include:\n• Reduced landfill waste by up to 60%\n• Improved recycling efficiency\n• Lower contamination rates\n• Cost savings for municipalities`,
      image: "https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=800",
      type: "content"
    },
    {
      id: 2,
      title: "Types of Waste Categories",
      content: `Understanding different waste categories is crucial for proper segregation:\n\n🟢 ORGANIC WASTE\n• Food scraps and kitchen waste\n• Garden trimmings and leaves\n• Paper towels and napkins\n\n🔵 RECYCLABLE WASTE\n• Plastic bottles and containers\n• Glass bottles and jars\n• Metal cans and aluminum\n• Clean paper and cardboard\n\n🔴 HAZARDOUS WASTE\n• Batteries and electronics\n• Chemicals and paints\n• Medical waste`,
      image: "https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=800",
      type: "content"
    },
    {
      id: 3,
      title: "Knowledge Check",
      content: "Test your understanding of waste segregation principles",
      type: "quiz",
      questions: [
        {
          id: 1,
          question: "Which bin should food scraps go into?",
          options: ["Green (Organic)", "Blue (Recyclable)", "Red (Hazardous)", "Black (General)"],
          correct: 0
        },
        {
          id: 2,
          question: "What makes plastic containers recyclable?",
          options: ["Any plastic container", "Only clean containers", "Only colored containers", "Only large containers"],
          correct: 1
        }
      ]
    }
  ];

  const currentLessonData = lessons?.[currentLesson];

  const handleNextLesson = () => {
    if (currentLesson < lessons?.length - 1) {
      setCurrentLesson(currentLesson + 1);
      if (lessons?.[currentLesson + 1]?.type === 'quiz') {
        setShowQuiz(true);
      }
    } else {
      onComplete(module);
    }
  };

  const handlePrevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
      setShowQuiz(false);
    }
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answerIndex
    });
  };

  const isQuizComplete = () => {
    if (currentLessonData?.type !== 'quiz') return true;
    return currentLessonData?.questions?.every(q => quizAnswers?.[q?.id] !== undefined);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${module.iconBg} flex items-center justify-center`}>
              <Icon name={module.icon} size={20} className={module.iconColor} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{module.title}</h2>
              <p className="text-sm text-muted-foreground">
                Lesson {currentLesson + 1} of {lessons?.length}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} iconName="X" iconSize={20}>
            <span className="sr-only">Close modal</span>
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-3 bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">{currentLessonData?.title}</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(((currentLesson + 1) / lessons?.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="h-2 bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((currentLesson + 1) / lessons?.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {currentLessonData?.type === 'content' ? (
            <div className="space-y-6">
              {currentLessonData?.image && (
                <div className="w-full h-64 rounded-lg overflow-hidden">
                  <Image
                    src={currentLessonData?.image}
                    alt={currentLessonData?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="prose prose-gray max-w-none">
                {currentLessonData?.content?.split('\n')?.map((paragraph, index) => (
                  <p key={index} className="text-foreground mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Icon name="HelpCircle" size={48} className="text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Knowledge Check</h3>
                <p className="text-muted-foreground">Answer the questions below to complete this module</p>
              </div>

              {currentLessonData?.questions?.map((question, qIndex) => (
                <div key={question?.id} className="bg-muted/50 rounded-lg p-6">
                  <h4 className="font-medium text-foreground mb-4">
                    {qIndex + 1}. {question?.question}
                  </h4>
                  <div className="space-y-3">
                    {question?.options?.map((option, oIndex) => (
                      <button
                        key={oIndex}
                        onClick={() => handleQuizAnswer(question?.id, oIndex)}
                        className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                          quizAnswers?.[question?.id] === oIndex
                            ? 'border-primary bg-primary/10 text-primary' :'border-border bg-card text-foreground hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            quizAnswers?.[question?.id] === oIndex
                              ? 'border-primary bg-primary' :'border-muted-foreground'
                          }`}>
                            {quizAnswers?.[question?.id] === oIndex && (
                              <div className="w-full h-full rounded-full bg-white scale-50" />
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handlePrevLesson}
            disabled={currentLesson === 0}
            iconName="ChevronLeft"
            iconPosition="left"
            iconSize={16}
          >
            Previous
          </Button>

          <div className="flex items-center space-x-2">
            {lessons?.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentLesson ? 'bg-primary' : index < currentLesson ? 'bg-success' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <Button
            variant="default"
            onClick={handleNextLesson}
            disabled={currentLessonData?.type === 'quiz' && !isQuizComplete()}
            iconName={currentLesson === lessons?.length - 1 ? 'Check' : 'ChevronRight'}
            iconPosition="right"
            iconSize={16}
          >
            {currentLesson === lessons?.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModuleModal;