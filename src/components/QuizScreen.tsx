import { useState } from "react";
import { quizQuestions } from "../data/quizQuestions";
import { Question, AnswerItem } from "../types";
import { AlertTriangle, ChevronRight, HelpCircle, ShieldAlert, Award, FileText, ArrowLeft } from "lucide-react";

interface QuizScreenProps {
  userName: string;
  userDept: string;
  onQuizComplete: (score: number, answers: AnswerItem[]) => void;
  onCancel: () => void;
}

export default function QuizScreen({ userName, userDept, onQuizComplete, onCancel }: QuizScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  
  const currentQuestion: Question = quizQuestions[currentIndex];
  const totalQuestions = quizQuestions.length;

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const isSelected = (optionIndex: number) => {
    return selectedAnswers[currentIndex] === optionIndex;
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate final score & prepare answer logs
      let score = 0;
      const finalAnswers: AnswerItem[] = quizQuestions.map((q, idx) => {
        const selected = selectedAnswers[idx] ?? -1;
        const isCorrect = selected === q.correctIndex;
        if (isCorrect) score += 1;
        
        return {
          questionIndex: idx,
          selectedIndex: selected,
          isCorrect
        };
      });

      onQuizComplete(score, finalAnswers);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const activeSelectedValue = selectedAnswers[currentIndex];
  const hasAnsweredCurrent = activeSelectedValue !== undefined;

  // Calculate progress percent
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="max-w-5xl mx-auto py-4 px-4" id="quiz-screen-container">
      
      {/* Quiz Screen Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="bg-rose-100 text-rose-800 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider font-mono">
            Active Evaluation Board
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">แบบทดสอบวัดระดับความรู้นิรภัย</h1>
        </div>
        <button
          onClick={onCancel}
          id="quit-quiz-top-btn"
          className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>ออกจากการสอบ</span>
        </button>
      </div>

      {/* Bento Grid: 2 columns on large screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side Bento - Main Quiz Interface (Column span 8) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col justify-between">
          
          {/* Progress Indication Bar */}
          <div>
            <div className="w-full bg-slate-100 h-2">
              <div 
                className="bg-blue-600 h-2 transition-all duration-300 rounded-r-full" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="p-6 sm:p-8">
              {/* Question metadata badge */}
              <div className="flex items-center justify-between mb-5">
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold font-mono">
                  คำถามข้อ {currentIndex + 1} / {totalQuestions}
                </span>
                <span className="text-[11px] text-slate-400 font-bold font-mono">
                  REF: SAFE_RAY_Q{currentQuestion.id}
                </span>
              </div>

              {/* Main Question Text */}
              <div className="flex gap-3 mb-6 items-start">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-xl mt-0.5 shrink-0">
                  <HelpCircle className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-slate-900 font-extrabold text-base sm:text-lg leading-relaxed">
                  {currentQuestion.text}
                </h3>
              </div>

              {/* Radio options inside bento inner cells */}
              <div className="space-y-3">
                {currentQuestion.options.map((optionText, optionIdx) => {
                  const choiceLabel = String.fromCharCode(65 + optionIdx); // A, B, C, D
                  const chosen = isSelected(optionIdx);

                  return (
                    <button
                      key={optionIdx}
                      id={`choice-${currentIndex}-${optionIdx}`}
                      onClick={() => handleSelectOption(optionIdx)}
                      className={`w-full text-left p-4 rounded-xl border flex items-center gap-4 transition-all text-sm cursor-pointer ${
                        chosen
                          ? "bg-blue-50 border-blue-400 text-blue-900 font-bold ring-2 ring-blue-50"
                          : "bg-slate-50/70 hover:bg-slate-100/80 border-slate-200 text-slate-700"
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs border shrink-0 transition-all ${
                        chosen 
                          ? "bg-blue-600 text-white border-blue-600 font-black shadow-inner" 
                          : "bg-white text-slate-500 border-slate-300"
                      }`}>
                        {choiceLabel}
                      </div>
                      <span className="leading-relaxed flex-1 font-semibold">{optionText}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Buttons footer inside primary Bento */}
          <div className="bg-slate-50 border-t border-slate-150 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-b-3xl">
            <button
              onClick={onCancel}
              id="quit-quiz-btn"
              className="w-full sm:w-auto text-xs font-bold text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-4 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              ยกเลิกและละทิ้งคำตอบ
            </button>
            
            <div className="flex gap-3 w-full sm:w-auto">
              {currentIndex > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  id="prev-btn"
                  className="w-1/2 sm:w-auto px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white text-slate-700 hover:bg-slate-100 border border-slate-250 cursor-pointer"
                >
                  ข้อก่อนหน้า
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                disabled={!hasAnsweredCurrent}
                id="next-btn"
                className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  !hasAnsweredCurrent
                    ? "bg-slate-200 text-slate-400 border border-slate-200 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md cursor-pointer"
                }`}
              >
                <span>{currentIndex === totalQuestions - 1 ? "ส่งคำตอบและรับผล" : "ข้อถัดไป"}</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Bento Grid: Identity & Summary stats info card (Column span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Bento Panel 1: User details and state */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-xl pointer-events-none" />
            
            <div>
              <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center text-rose-400 border border-slate-700 mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">
                Candidate Information
              </p>
              <h3 className="text-base font-extrabold text-white mt-1 leading-snug">
                {userName}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 font-semibold">
                ความรับผิดชอบ: {userDept}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                ตอบคำถามแล้ว:
              </span>
              <div className="flex items-baseline gap-1 mt-1 font-mono">
                <span className="text-2xl font-black text-rose-400">{answeredCount}</span>
                <span className="text-xs text-slate-400">/ 6 ข้อ</span>
              </div>
            </div>
          </div>

          {/* Bento Panel 2: Test Protocol warning card (Gold standard) */}
          <div className="bg-amber-400 text-slate-950 rounded-3xl p-6 shadow-md flex-1 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 bg-slate-950/10 rounded-xl flex items-center justify-center text-slate-950 mb-3.5">
                <AlertTriangle className="w-5 h-5 stroke-[2]" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-wider">ข้อกำหนดและเกณฑ์ผ่าน</h3>
              <p className="text-xs text-slate-900/80 font-bold leading-relaxed mt-2">
                คำถามมีทั้งสิ้น 6 ข้อ ครอบคลุมกฎความปลอดภัยทางรังสี 4 หัวข้อสำคัญ 
                ผู้สมัครสอบต้องทำคะแนนให้ได้ 4 เต็ม 6 (65% ขึ้นไป) เพื่อบันทึกว่าผ่านเกณฑ์อย่างเป็นทางการ
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-950/10 flex items-center gap-2 text-xs font-bold text-slate-900/60">
              <ShieldAlert className="w-4 h-4 shrink-0 text-slate-950" />
              <span>Real-time Secure Engine</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
