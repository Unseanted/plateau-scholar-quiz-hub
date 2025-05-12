
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { quizQuestions, passScore } from "@/data/quizQuestions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckIcon, XIcon } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>(Array(quizQuestions.length).fill(""));
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || null);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const handleComplete = () => {
    if (score >= passScore) {
      toast.success("Congratulations! You're eligible for the scholarship.", {
        description: `You scored ${score}/${quizQuestions.length}`,
      });
      // Store quiz score in session
      sessionStorage.setItem("quizScore", score.toString());
      // Redirect to sign in instead of application
      navigate("/signin");
    } else {
      toast.error("Unfortunately, you don't meet the eligibility criteria.", {
        description: `You scored ${score}/${quizQuestions.length}. Minimum required score is ${passScore}.`,
      });
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Eligibility Quiz</h1>
        
        {!showResults ? (
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <CardTitle className="mt-4">{quizQuestions[currentQuestion].question}</CardTitle>
              <CardDescription>Select the correct answer below</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedAnswer || ""} onValueChange={handleAnswerSelection}>
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer flex-grow py-2">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleNext} 
                disabled={!selectedAnswer}
                className="w-full"
              >
                {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Complete Quiz"}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Quiz Results</CardTitle>
              <CardDescription>
                You scored {score} out of {quizQuestions.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quizQuestions.map((q, idx) => (
                  <div key={idx} className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{q.question}</p>
                      {answers[idx] === q.correctAnswer ? (
                        <CheckIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <XIcon className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div className="mt-2 text-sm">
                      <p>Your answer: <span className={answers[idx] === q.correctAnswer ? "text-green-600 font-medium" : "text-red-600 font-medium"}>{answers[idx]}</span></p>
                      {answers[idx] !== q.correctAnswer && (
                        <p className="text-green-600">Correct answer: {q.correctAnswer}</p>
                      )}
                      {q.explanation && (
                        <p className="mt-2 text-gray-600">{q.explanation}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <p className="text-center w-full">
                {score >= passScore ? (
                  <span className="text-green-600 font-medium">Congratulations! You're eligible to apply for the scholarship.</span>
                ) : (
                  <span className="text-red-600 font-medium">Unfortunately, you don't meet the minimum eligibility criteria.</span>
                )}
              </p>
              <Button 
                onClick={handleComplete}
                className="w-full"
                variant={score >= passScore ? "default" : "outline"}
              >
                {score >= passScore ? "Continue to Sign In" : "Return to Home"}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Quiz;
