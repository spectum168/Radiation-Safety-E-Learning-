import { useState } from "react";
import { AppScreen, AnswerItem } from "./types";
import RegistrationScreen from "./components/RegistrationScreen";
import LearnScreen from "./components/LearnScreen";
import QuizScreen from "./components/QuizScreen";
import ScoreScreen from "./components/ScoreScreen";
import DashboardScreen from "./components/DashboardScreen";
import { Shield, BookOpen, BarChart3, LogOut, Heart } from "lucide-react";

export default function App() {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.Register);
  const [userName, setUserName] = useState("");
  const [userDept, setUserDept] = useState("");
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<AnswerItem[]>([]);

  // Callback when registration forms are completed
  const handleRegisterComplete = (name: string, department: string) => {
    setUserName(name);
    setUserDept(department);
    setScreen(AppScreen.Learn);
  };

  // Callback when a quiz is submitted
  const handleQuizComplete = async (finalScore: number, finalAnswers: AnswerItem[]) => {
    setScore(finalScore);
    setAnswers(finalAnswers);
    
    // Save to local storage first for offline / static compatibility (e.g. GitHub Pages)
    try {
      const localDataStr = localStorage.getItem("safety_ray_scores");
      let localScores = [];
      if (localDataStr) {
        try {
          localScores = JSON.parse(localDataStr);
        } catch (err) {}
      }
      
      const newRec = {
        id: `rec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: userName,
        department: userDept,
        score: finalScore,
        totalQuestions: 6,
        answers: finalAnswers,
        completedAt: new Date().toISOString()
      };
      
      if (Array.isArray(localScores)) {
        localScores.push(newRec);
        localStorage.setItem("safety_ray_scores", JSON.stringify(localScores));
      }
    } catch (err) {
      console.error("Failed to persist score to localStorage", err);
    }

    // Save to server database API
    try {
      await fetch("/api/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: userName,
          department: userDept,
          score: finalScore,
          totalQuestions: 6,
          answers: finalAnswers
        })
      });
    } catch (e) {
      console.error("Failed to persist score to backend database", e);
    }

    setScreen(AppScreen.Result);
  };

  // Log in or start clean session
  const handleLogout = () => {
    setUserName("");
    setUserDept("");
    setScore(0);
    setAnswers([]);
    setScreen(AppScreen.Register);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" id="applet-root-container">
      {/* Top Universal App Header */}
      <header className="bg-white border-b border-gray-150 sticky top-0 z-50 shadow-2xs" id="applet-navigation-bar">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-yellow-400 text-slate-900 rounded-xl flex items-center justify-center shadow-xs">
              <Shield className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-gray-900 tracking-tight leading-none">
                ระบบเรียนรู้ด้านภัยรังสี
              </h1>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider font-mono mt-0.5">
                Radiation Safety E-Learning
              </p>
            </div>
          </div>

          {/* Nav menu links */}
          <div className="flex items-center gap-2.5">
            {screen !== AppScreen.Register && (
              <>
                <button
                  id="tab-nav-learn"
                  onClick={() => setScreen(AppScreen.Learn)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    screen === AppScreen.Learn
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">บทเรียนความรู้</span>
                </button>

                <button
                  id="tab-nav-dash"
                  onClick={() => setScreen(AppScreen.Dashboard)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    screen === AppScreen.Dashboard
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>แดชบอร์ดสรุปผล</span>
                </button>

                <div className="h-4 w-px bg-gray-200" />

                <button
                  id="tab-nav-logout"
                  onClick={handleLogout}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="ออกจากระบบ"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">ลงชื่อใหม่</span>
                </button>
              </>
            )}

            {screen === AppScreen.Register && (
              <button
                id="tab-nav-dash-direct"
                onClick={() => setScreen(AppScreen.Dashboard)}
                className="px-3.5 py-1.5 border border-gray-200 hover:bg-gray-50 rounded-lg text-xs font-semibold text-gray-600 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <BarChart3 className="w-3.5 h-3.5 text-blue-500" />
                <span>รายงานภาพรวมแผนก</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container Content */}
      <main className="flex-1 py-8" id="applet-main-body">
        {screen === AppScreen.Register && (
          <RegistrationScreen 
            onRegister={handleRegisterComplete} 
            onGoToDashboardDirectly={() => setScreen(AppScreen.Dashboard)}
          />
        )}

        {screen === AppScreen.Learn && (
          <LearnScreen 
            userName={userName}
            userDept={userDept}
            onStartQuiz={() => setScreen(AppScreen.Quiz)}
          />
        )}

        {screen === AppScreen.Quiz && (
          <QuizScreen 
            userName={userName}
            userDept={userDept}
            onQuizComplete={handleQuizComplete}
            onCancel={() => setScreen(AppScreen.Learn)}
          />
        )}

        {screen === AppScreen.Result && (
          <ScoreScreen 
            score={score}
            totalQuestions={6}
            answers={answers}
            userName={userName}
            userDept={userDept}
            onRestart={() => setScreen(AppScreen.Quiz)}
            onGoToDashboard={() => setScreen(AppScreen.Dashboard)}
          />
        )}

        {screen === AppScreen.Dashboard && (
          <DashboardScreen 
            onBackToMain={() => {
              if (userName && userDept) {
                setScreen(AppScreen.Learn);
              } else {
                setScreen(AppScreen.Register);
              }
            }}
            currentUserRecord={userName ? { name: userName, department: userDept } : null}
          />
        )}
      </main>

      {/* Corporate footer */}
      <footer className="bg-white border-t border-gray-150 py-5 text-center mt-auto" id="applet-footer">
        <p className="text-xs text-gray-400 font-medium flex items-center justify-center gap-1">
          <span>พิทักษ์รักษ์ความปลอดภัยทางรังสี สรรค์สร้างตามหลักสูตรสากล ร่วมพิทักษ์ใจด้วย</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          <span>เพื่อพนักงานโรงพยาบาลและประชาชนทุกคน</span>
        </p>
        <p className="text-[10px] text-gray-300 font-mono mt-1">
          Thailand Safety Standard Board &bull; © 2026 E-Learning System
        </p>
      </footer>
    </div>
  );
}
