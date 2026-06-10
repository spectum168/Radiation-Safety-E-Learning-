import { quizQuestions } from "../data/quizQuestions";
import { AnswerItem } from "../types";
import { 
  Trophy, 
  XOctagon, 
  CheckCircle2, 
  ChevronRight, 
  RefreshCw, 
  HelpCircle,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  AlertOctagon
} from "lucide-react";

interface ScoreScreenProps {
  score: number;
  totalQuestions: number;
  answers: AnswerItem[];
  userName: string;
  userDept: string;
  onRestart: () => void;
  onGoToDashboard: () => void;
}

export default function ScoreScreen({
  score,
  totalQuestions,
  answers,
  userName,
  userDept,
  onRestart,
  onGoToDashboard
}: ScoreScreenProps) {
  const passRatePercent = Math.round((score / totalQuestions) * 100);
  const isPassed = score >= 4; // Passing score: 4/6 (66%)

  return (
    <div className="max-w-5xl mx-auto py-4 px-4" id="score-screen-container">
      
      {/* Bento Grid layout for result summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
        
        {/* Left Big Bento: Score Status (Col span 7) */}
        <div className={`lg:col-span-7 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-md ${
          isPassed 
            ? "bg-gradient-to-br from-emerald-600 to-teal-800" 
            : "bg-slate-900"
        }`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.04] rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] tracking-widest font-bold font-mono uppercase bg-white/10 px-3 py-1 rounded-full border border-white/10">
                OFFICIAL SCORE REPORT
              </span>
              <span className="text-[11px] text-white/50 font-bold font-mono">
                ID: RESULT_SF_{score}
              </span>
            </div>

            <div className="flex gap-4 items-center">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white shrink-0 border border-white/10 shadow-inner">
                {isPassed ? (
                  <Trophy className="w-7 h-7 text-yellow-300 stroke-[2]" />
                ) : (
                  <XOctagon className="w-7 h-7 text-rose-300 stroke-[2]" />
                )}
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                  {isPassed ? "ผ่านการประเมินมาตรฐาน!" : "ยังไม่ผ่านเกณฑ์ทดสอบ"}
                </h1>
                <p className="text-white/80 text-xs mt-1 font-semibold">
                  ผู้ส่งคำประเมิน: <span className="text-white font-extrabold">{userName}</span> (แผนก {userDept})
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-end justify-between">
            <div>
              <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider block">สัดส่วนคำตอบถูกต้อง</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-4xl font-extrabold font-mono text-yellow-300">{score}</span>
                <span className="text-sm font-bold text-white/70">/ {totalQuestions} ข้อ</span>
              </div>
            </div>
            
            <div className="bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-xl text-center">
              <p className="text-[10px] text-white/80 font-bold uppercase tracking-wider">ร้อยละ (%)</p>
              <p className="text-base font-black font-mono text-white">{passRatePercent}%</p>
            </div>
          </div>
        </div>

        {/* Right Bento: Actions & Protocol Guidance (Col span 5) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-800 mb-4">
              <Award className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-base font-black text-slate-900 leading-snug">
              บันทึกผลเข้าระบบแล้ว
            </h3>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed mt-1.5">
              ระบบฐานข้อมูลองค์กรได้จัดทำสถิติข้อผิดพลาดรายพนักงานตามเวลา UTC เรียบร้อยแล้ว ท่านสามารถเข้าวิเคราะห์ภาพรวม และดาวน์โหลดไฟล์สถิติในรูปแบบ Excel .CSV ได้จากตัวแดชบอร์ดหลัก
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={onRestart}
              id="retake-quiz-btn"
              className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-3.5 px-4 rounded-xl border border-slate-250 text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.99]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>ทำแบบเรียน/ข้อสอบซ้ำ</span>
            </button>
            <button
              onClick={onGoToDashboard}
              id="show-dash-btn"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-xs hover:shadow-md active:scale-[0.99]"
            >
              <span>วิเคราะห์แดชบอร์ดสรุปผลทั้งหมด</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Review details with beautiful customized modular panels */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>เฉลยคำตอบพร้อมเกร็ดวิชาการ</span>
          </h3>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black font-mono">Bento Explanations</span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {quizQuestions.map((q, idx) => {
            const ansLog = answers.find(a => a.questionIndex === idx);
            const wasCorrect = ansLog?.isCorrect === true;
            const userChoice = ansLog?.selectedIndex ?? -1;

            return (
              <div 
                key={q.id}
                className={`bg-white border rounded-3xl shadow-sm overflow-hidden transition-all duration-350 ${
                  wasCorrect ? "border-emerald-250" : "border-rose-200"
                }`}
              >
                {/* Question Header banner */}
                <div className={`px-6 py-4 flex items-center justify-between border-b ${
                  wasCorrect ? "bg-emerald-50/20 border-emerald-100/70" : "bg-rose-50/20 border-rose-100"
                }`}>
                  <div className="flex items-center gap-2.5">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      wasCorrect ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="text-xs font-black text-slate-800">คำถามข้อที่ {idx + 1}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    {wasCorrect ? (
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>ตอบถูกต้อง</span>
                      </span>
                    ) : (
                      <span className="bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase flex items-center gap-1">
                        <AlertOctagon className="w-3.5 h-3.5" />
                        <span>วิเคราะห์คลาดเคลื่อน</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Question body text and options visual */}
                <div className="p-6 sm:p-8 space-y-5">
                  <p className="font-extrabold text-slate-900 text-sm sm:text-base leading-relaxed">
                    {q.text}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {q.options.map((optText, optIdx) => {
                      const isCorrectAnswer = optIdx === q.correctIndex;
                      const isUserChoice = optIdx === userChoice;
                      const optionChar = String.fromCharCode(65 + optIdx);

                      let styleClasses = "bg-slate-50 border-slate-200 text-slate-700";
                      if (isCorrectAnswer) {
                        styleClasses = "bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold ring-2 ring-emerald-50";
                      } else if (isUserChoice && !wasCorrect) {
                        styleClasses = "bg-rose-50 border-rose-200 text-rose-950 font-semibold ring-2 ring-rose-50";
                      }

                      return (
                        <div 
                          key={optIdx}
                          className={`p-4 rounded-xl border text-xs flex items-start gap-3.5 transition-colors ${styleClasses}`}
                        >
                          <div className={`w-5.5 h-5.5 rounded flex items-center justify-center font-bold text-[9px] border shrink-0 mt-0.5 ${
                            isCorrectAnswer 
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : isUserChoice && !wasCorrect
                                ? "bg-rose-600 border-rose-600 text-white" 
                                : "bg-white border-slate-300 text-slate-500"
                          }`}>
                            {optionChar}
                          </div>
                          <div className="flex-1 space-y-0.5">
                            <p className="leading-relaxed font-bold">{optText}</p>
                            {isCorrectAnswer && (
                              <span className="text-[9px] text-emerald-700 font-black block tracking-wider uppercase">
                                ★ คำตอบที่ถูกต้องอย่างเป็นทางการ
                              </span>
                            )}
                            {isUserChoice && !wasCorrect && (
                              <span className="text-[9px] text-rose-700 font-black block tracking-wider uppercase">
                                ✗ คำตอบของท่าน
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* High Quality Academic Explanation (Styled beautifully) */}
                  <div className="bg-blue-50 border border-blue-100/80 p-5 rounded-2xl flex gap-3.5 items-start mt-4">
                    <div className="p-2 bg-blue-100 text-blue-700 rounded-xl shrink-0 mt-0.5">
                      <HelpCircle className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-blue-900 block uppercase tracking-wider">
                        หลักทฤษฎีอ้างอิงและเกณฑ์วิเคราะห์:
                      </span>
                      <p className="text-xs text-blue-800 leading-relaxed font-bold mt-1">
                        {q.explanation}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
