import React, { useState, useEffect } from "react";
import { ScoreRecord, DeptStats } from "../types";
import { 
  Building2, 
  User, 
  Calendar, 
  Download, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Award,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Grid
} from "lucide-react";

interface DashboardScreenProps {
  onBackToMain: () => void;
  currentUserRecord?: { name: string; department: string } | null;
}

export default function DashboardScreen({ onBackToMain, currentUserRecord }: DashboardScreenProps) {
  const [records, setRecords] = useState<ScoreRecord[]>([]);
  const [deptStats, setDeptStats] = useState<DeptStats[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDeptFilter, setSelectedDeptFilter] = useState("ทั้งหมด");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");
  const [loading, setLoading] = useState(true);

// Sorting states
  const [sortField, setSortField] = useState<"name" | "score" | "completedAt">("completedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const SEED_RECORDS: ScoreRecord[] = [
    {
      id: "seed-1",
      name: "สมเกียรติ พรหมดี",
      department: "แผนกแม่บ้าน",
      score: 5,
      totalQuestions: 6,
      answers: [
        { questionIndex: 0, selectedIndex: 0, isCorrect: true },
        { questionIndex: 1, selectedIndex: 1, isCorrect: true },
        { questionIndex: 2, selectedIndex: 2, isCorrect: true },
        { questionIndex: 3, selectedIndex: 1, isCorrect: true },
        { questionIndex: 4, selectedIndex: 0, isCorrect: false },
        { questionIndex: 5, selectedIndex: 0, isCorrect: true }
      ],
      completedAt: "2026-06-08T08:30:00.000Z"
    },
    {
      id: "seed-2",
      name: "วิภาดา รักดี",
      department: "แผนกบริการผู้ป่วย",
      score: 6,
      totalQuestions: 6,
      answers: [
        { questionIndex: 0, selectedIndex: 0, isCorrect: true },
        { questionIndex: 1, selectedIndex: 1, isCorrect: true },
        { questionIndex: 2, selectedIndex: 2, isCorrect: true },
        { questionIndex: 3, selectedIndex: 1, isCorrect: true },
        { questionIndex: 4, selectedIndex: 1, isCorrect: true },
        { questionIndex: 5, selectedIndex: 0, isCorrect: true }
      ],
      completedAt: "2026-06-08T09:15:00.000Z"
    },
    {
      id: "seed-3",
      name: "นรากร ยอดชาย",
      department: "แผนกรักษาความปลอดภัย",
      score: 4,
      totalQuestions: 6,
      answers: [
        { questionIndex: 0, selectedIndex: 1, isCorrect: false },
        { questionIndex: 1, selectedIndex: 1, isCorrect: true },
        { questionIndex: 2, selectedIndex: 2, isCorrect: true },
        { questionIndex: 3, selectedIndex: 1, isCorrect: true },
        { questionIndex: 4, selectedIndex: 0, isCorrect: false },
        { questionIndex: 5, selectedIndex: 0, isCorrect: true }
      ],
      completedAt: "2026-06-09T10:00:00.000Z"
    },
    {
      id: "seed-4",
      name: "สุชาดา แสนงาม",
      department: "แผนกสนับสนุนทั่วไป",
      score: 5,
      totalQuestions: 6,
      answers: [
        { questionIndex: 0, selectedIndex: 0, isCorrect: true },
        { questionIndex: 1, selectedIndex: 1, isCorrect: true },
        { questionIndex: 2, selectedIndex: 2, isCorrect: true },
        { questionIndex: 3, selectedIndex: 1, isCorrect: true },
        { questionIndex: 4, selectedIndex: 0, isCorrect: false },
        { questionIndex: 5, selectedIndex: 0, isCorrect: true }
      ],
      completedAt: "2026-06-09T14:45:00.000Z"
    },
    {
      id: "seed-5",
      name: "ปกรณ์ พิสุทธิ์",
      department: "แผนกไอที",
      score: 6,
      totalQuestions: 6,
      answers: [
        { questionIndex: 0, selectedIndex: 0, isCorrect: true },
        { questionIndex: 1, selectedIndex: 1, isCorrect: true },
        { questionIndex: 2, selectedIndex: 2, isCorrect: true },
        { questionIndex: 3, selectedIndex: 1, isCorrect: true },
        { questionIndex: 4, selectedIndex: 1, isCorrect: true },
        { questionIndex: 5, selectedIndex: 0, isCorrect: true }
      ],
      completedAt: "2026-06-10T02:20:00.000Z"
    },
    {
      id: "seed-6",
      name: "สมหญิง เพียรงาน",
      department: "แผนกแม่บ้าน",
      score: 4,
      totalQuestions: 6,
      answers: [
        { questionIndex: 0, selectedIndex: 0, isCorrect: true },
        { questionIndex: 1, selectedIndex: 1, isCorrect: true },
        { questionIndex: 2, selectedIndex: 1, isCorrect: false },
        { questionIndex: 3, selectedIndex: 1, isCorrect: true },
        { questionIndex: 4, selectedIndex: 0, isCorrect: false },
        { questionIndex: 5, selectedIndex: 0, isCorrect: true }
      ],
      completedAt: "2026-06-10T05:10:00.000Z"
    }
  ];

  // Helper to calculate statistics locally
  const computeLocalDeptStats = (recordsList: ScoreRecord[]): DeptStats[] => {
    const depts: Record<string, { total: number; totalScore: number; passed: number }> = {};
    
    recordsList.forEach((rec) => {
      const dept = rec.department;
      if (!depts[dept]) {
        depts[dept] = { total: 0, totalScore: 0, passed: 0 };
      }
      depts[dept].total += 1;
      depts[dept].totalScore += rec.score;
      
      if (rec.score >= 4) {
        depts[dept].passed += 1;
      }
    });

    return Object.keys(depts).map(name => {
      const item = depts[name];
      return {
        department: name,
        count: item.total,
        averageScore: Number((item.totalScore / item.total).toFixed(2)),
        passRate: Number(((item.passed / item.total) * 100).toFixed(1)),
        passed: item.passed,
        failed: item.total - item.passed
      };
    });
  };

  // Fetch all from Server APIs with robust client fallback
  const fetchDashboardData = async () => {
    setLoading(true);
    let loadedFromApi = false;

    try {
      const responseScores = await fetch("/api/scores");
      if (responseScores.ok) {
        const scoresData = await responseScores.json();
        setRecords(scoresData);
        localStorage.setItem("safety_ray_scores", JSON.stringify(scoresData));
        loadedFromApi = true;
      }

      const responseDepts = await fetch("/api/departments");
      if (responseDepts.ok) {
        const deptsData = await responseDepts.json();
        setDeptStats(deptsData);
      }
    } catch (e) {
      console.warn("Failed to load statistics from API, checking local storage", e);
    }

    if (!loadedFromApi) {
      // Load fallback from localStorage
      const localDataStr = localStorage.getItem("safety_ray_scores");
      let localScores: ScoreRecord[] = [];
      try {
        if (localDataStr) {
          localScores = JSON.parse(localDataStr);
        }
      } catch (err) {
        console.error("Local storage parse error", err);
      }

      if (!Array.isArray(localScores) || localScores.length === 0) {
        localScores = [...SEED_RECORDS];
        localStorage.setItem("safety_ray_scores", JSON.stringify(localScores));
      }

      setRecords(localScores);
      setDeptStats(computeLocalDeptStats(localScores));
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Handler for Excel CSV Export in Thai
  const handleExportToExcel = () => {
    if (records.length === 0) return;

    // Excel CSV Headers
    const headers = [
      "ลำดับที่",
      "ชื่อ-นามสกุล",
      "แผนก/ฝ่าย สังกัด",
      "คะแนนที่ได้",
      "คะแนนเต็ม",
      "ร้อยละ (%)",
      "วันที่-เวลาที่ทำแบบสอบเสร็จ (UTC)",
      "ผลการประเมิน"
    ];

    // Map rows
    const rows = records.map((rec, idx) => {
      const isPassed = rec.score >= 4 ? "ผ่าน" : "ไม่ผ่าน";
      const percent = Math.round((rec.score / rec.totalQuestions) * 100);
      const dateLocal = new Date(rec.completedAt).toLocaleString("th-TH");
      return [
        idx + 1,
        rec.name.replace(/,/g, " "), // strip commas
        rec.department.replace(/,/g, " "),
        rec.score,
        rec.totalQuestions,
        percent,
        dateLocal.replace(/,/g, " "),
        isPassed
      ];
    });

    // Append BOM for UTF-8 Excel support in Thai
    let csvContent = "\uFEFF";
    csvContent += headers.join(",") + "\n";
    rows.forEach(row => {
      csvContent += row.join(",") + "\n";
    });

    // Create blobs for browser download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `รายงานผลการอบรม_พนักงาน_รังสีความปลอดภัย_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // List of unique departments for filter dropdown
  const filterDepartments = ["ทั้งหมด", ...Array.from(new Set(records.map(r => r.department)))];

  // Apply sorting and filtering
  const handleSort = (field: "name" | "score" | "completedAt") => {
    if (sortField === field) {
      setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const filteredRecords = records
    .filter(rec => {
      const matchSearch = rec.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          rec.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDept = selectedDeptFilter === "ทั้งหมด" || rec.department === selectedDeptFilter;
      
      const passed = rec.score >= 4;
      const matchStatus = statusFilter === "ทั้งหมด" || 
                          (statusFilter === "ผ่าน" && passed) || 
                          (statusFilter === "ไม่ผ่าน" && !passed);

      return matchSearch && matchDept && matchStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === "name") {
        comparison = a.name.localeCompare(b.name, "th");
      } else if (sortField === "score") {
        comparison = a.score - b.score;
      } else if (sortField === "completedAt") {
        comparison = new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime();
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

  // Calculate General Summary Stats
  const totalTests = records.length;
  const averageScore = totalTests > 0 
    ? (records.reduce((sum, r) => sum + r.score, 0) / totalTests).toFixed(1)
    : "0.0";
  const passedCount = records.filter(r => r.score >= 4).length;
  const overallPassRate = totalTests > 0 
    ? Math.round((passedCount / totalTests) * 100)
    : 0;

  // Let's compute a distribution of exam results to plot a stunning Bento Bar Chart!
  const scoreDistribution = Array(7).fill(0); // scores 0 to 6
  records.forEach(r => {
    if (r.score >= 0 && r.score <= 6) {
      scoreDistribution[r.score] += 1;
    }
  });
  const maxScoreCount = Math.max(...scoreDistribution, 1);

  return (
    <div className="max-w-6xl mx-auto py-4 px-4" id="dashboard-screen-container">
      
      {/* Upper Navigation & Page title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <button
            onClick={onBackToMain}
            id="dash-back-btn"
            className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-blue-600 mb-2.5 transition-colors cursor-pointer uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับสู่หน้าเนื้อหาบทเรียน</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
              <Grid className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                แผงแดชบอร์ดสรุปผลสอบแบบ Bento Grid
              </h1>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                ประเมินความปลอดภัย วิเคราะห์อัตราสอบผ่านรายกลุ่ม และจัดการพนักงานแบบเรียลไทม์
              </p>
            </div>
          </div>
        </div>

        {records.length > 0 && (
          <button
            onClick={handleExportToExcel}
            id="export-excel-btn"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-5 rounded-2xl shadow-sm text-xs flex items-center justify-center gap-2 hover:shadow-md transition-all cursor-pointer active:scale-[0.99]"
          >
            <Download className="w-4 h-4" />
            <span>ส่งออกข้อมูลพนักงาน (Excel CSV)</span>
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl shadow-sm">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">กำลังดึงข้อมูลพนักงานจากระบบประมวลผล...</p>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Column Areas: KPI metrics bento stacked (Col span 4) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Box 1: Student Total counts */}
              <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex items-center gap-4.5 relative overflow-hidden">
                <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
                  <BookOpen className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">ผู้เข้าร่วมการอบรมและสอบ</span>
                  <p className="text-3xl font-black text-slate-900 font-mono mt-0.5">{totalTests} ท่าน</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-bold">บันทึกส่งรายงานแผนกแล้ว</p>
                </div>
              </div>

              {/* Box 2: Pass Rate & Avg Score */}
              <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-md flex flex-col justify-between relative overflow-hidden flex-1 min-h-[190px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 font-mono">
                      Organization Pass Rate
                    </span>
                    <h3 className="text-lg font-black text-white mt-1 leading-tight">สัดส่วนสอบผ่านเกณฑ์</h3>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/30">
                    เกณฑ์สอบผ่าน 4/6
                  </span>
                </div>

                <div className="mt-6 flex items-baseline gap-2.5">
                  <span className="text-4xl font-extrabold text-emerald-400 font-mono">
                    {overallPassRate}%
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    ({passedCount} คนจากทั้งหมด)
                  </span>
                </div>

                <div className="mt-4 pt-3.5 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
                  <span>คะแนนเฉลี่ยกลาง:</span>
                  <span className="font-extrabold text-white font-mono">{averageScore} / 6.0</span>
                </div>
              </div>

              {/* Box 3: Quick return button (Gold/Yellow Accent Bento) */}
              <div className="bg-yellow-400 text-slate-950 p-6 rounded-3xl shadow-md flex flex-col justify-between relative overflow-hidden min-h-[180px]">
                <div className="absolute bottom-[-10px] right-[-10px] w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
                
                <div>
                  <div className="w-10 h-10 bg-slate-950/10 rounded-xl flex items-center justify-center text-slate-950 mb-3.5">
                    <Award className="w-5.5 h-5.5 stroke-[2.2]" />
                  </div>
                  <h3 className="text-base font-extrabold uppercase leading-tight text-slate-950">
                    ทบทวนบทเรียนอีกครั้ง?
                  </h3>
                  <p className="text-xs text-slate-900/80 mt-1 font-bold leading-relaxed">
                    ย้อนกลับเข้าสู่สื่อการเรียนรู้แบบ Interactive เพื่อติ๊กข้อตกลงและป้องกันระดับภัยรังสีฉุกเฉิน
                  </p>
                </div>

                <button
                  onClick={onBackToMain}
                  className="mt-5 w-full bg-slate-950 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-all cursor-pointer shadow-inner"
                >
                  <span>กลับเข้าสู่สารบัญการเรียนรู้</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Right Column Area: Graphs & Department breakdown (Col span 8) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Box 4: Interactive Score Distribution Chart (Bento visual style) */}
              <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
                <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wide flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-slate-600" />
                    <span>แผนภาพการแจกแจงระดับคะแนนพนักงาน (Score Frequency)</span>
                  </h3>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded font-black font-mono">
                    Real-time Data
                  </span>
                </div>

                {totalTests === 0 ? (
                  <p className="text-center py-10 text-xs text-slate-400 font-bold">ไม่มีข้อมูลคะแนนพนักงานสำหรับพลอตแผนภาพในขณะนี้</p>
                ) : (
                  <div>
                    <div className="grid grid-cols-7 gap-2.5 h-44 items-end pt-4 pb-2 px-1">
                      {scoreDistribution.map((count, index) => {
                        const barHeightPercent = Math.max((count / maxScoreCount) * 100, 4);
                        const isMainPassZone = index >= 4;

                        return (
                          <div key={index} className="flex flex-col items-center gap-2 group h-full justify-end">
                            {/* Bar Column tooltips count */}
                            <span className="text-[10px] font-black text-slate-700 font-mono opacity-100 transition-all">
                              {count}
                            </span>
                            
                            {/* Column block code */}
                            <div className="w-full relative rounded-t-lg overflow-hidden transition-all duration-500" style={{ height: `${barHeightPercent}%` }}>
                              <div className={`w-full h-full ${
                                isMainPassZone 
                                  ? "bg-slate-900 group-hover:bg-slate-800" 
                                  : "bg-slate-300 group-hover:bg-slate-400"
                              }`} />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Chart Labels */}
                    <div className="grid grid-cols-7 gap-2.5 text-center text-[10px] font-bold text-slate-400 pt-2 border-t border-slate-100">
                      {scoreDistribution.map((_, index) => (
                        <div key={index}>
                          <p className="text-slate-800">{index} คะแนน</p>
                          <span className={index >= 4 ? "text-emerald-600 text-[8px]" : "text-slate-350 text-[8px]"}>
                            {index >= 4 ? "โซนผ่าน" : "ทบทวน"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Box 5: Department list performance widgets */}
              <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex-1">
                <h3 className="font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wide flex items-center gap-2 mb-5">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>สถิติและร้อยละผ่านแยกจำแนกรายแผนก</span>
                </h3>

                {deptStats.length === 0 ? (
                  <p className="text-center text-xs text-slate-400 py-6 font-bold">ขณะนี้ไม่มีสถิติพนักงานในแต่ละแผนกสังกัด</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {deptStats.map(stat => (
                      <div 
                        key={stat.department} 
                        id={`dept-card-${stat.department}`}
                        className="p-4 border border-slate-150 rounded-2xl hover:bg-slate-50/50 transition-all flex flex-col justify-between bg-slate-50/20"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2.5">
                            <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{stat.department}</span>
                            <span className="bg-slate-100 text-slate-600 text-[10px] px-2.5 py-0.5 rounded-full font-bold font-mono border border-slate-200">
                              อบรมแล้ว {stat.count} ท่าน
                            </span>
                          </div>

                          {/* Stat indicators */}
                          <div className="space-y-1.5 pt-1">
                            <div className="flex justify-between text-[11px] text-slate-500 font-bold">
                              <span>คะแนนเฉลี่ยสะสม: {stat.averageScore} / 6</span>
                              <span>สอบผ่านแล้ว: {stat.passRate}%</span>
                            </div>
                            
                            {/* Beautiful bento colors progress indicators */}
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-500 ${
                                  stat.passRate >= 80 
                                    ? "bg-slate-900" 
                                    : stat.passRate >= 60 
                                      ? "bg-blue-600" 
                                      : "bg-amber-400"
                                }`}
                                style={{ width: `${stat.passRate}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 mt-3.5 pt-2.5 border-t border-slate-100 text-[10px] font-black uppercase">
                          <span className="text-emerald-700">✓ สอบผ่าน {stat.passed} คน</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-rose-600">ต้องทบทวน {stat.failed} คน</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Full Width Bento Box 6: Individual Employee Exam Records Table (Col span 12) */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            
            {/* Filter controls and searching banner wrapper */}
            <div className="p-6 border-b border-slate-150 bg-slate-50/50 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-black text-slate-900 text-base">บันทึกประวัติพนักงานละเอียด</h3>
                  <p className="text-[11px] text-slate-400 font-bold">สืบค้นสเปกตราข้อมูล ข้อผิดพลาด และผลคะแนนของพนักงานแต่ละกอง</p>
                </div>
                <span className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full font-bold">
                  พบข้อมูลประวัติ <span className="font-extrabold font-mono text-slate-900">{filteredRecords.length}</span> จาก {records.length} คน
                </span>
              </div>

              {/* Filtering Inputs styled as pristine Bento elements */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Search query input */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="พิมพ์ชื่อพนักงาน หรือฝ่ายสังกัด..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9/12 pr-4 pl-10 py-2.5 border border-slate-200 bg-white rounded-xl text-xs text-slate-700 font-extrabold focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder-slate-400"
                  />
                </div>

                {/* Dropdown filter by department */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="w-4 h-4" />
                  </span>
                  <select
                    value={selectedDeptFilter}
                    onChange={(e) => setSelectedDeptFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 bg-white rounded-xl text-xs text-slate-700 font-extrabold focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                  >
                    {filterDepartments.map(d => (
                      <option key={d} value={d}>กลุ่มแผนก: {d}</option>
                    ))}
                  </select>
                </div>

                {/* Dropdown filter by passing status */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Award className="w-4 h-4" />
                  </span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 bg-white rounded-xl text-xs text-slate-700 font-extrabold focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="ทั้งหมด">ประเมินผล: ทั้งหมด</option>
                    <option value="ผ่าน">สอบผ่านเกณฑ์มาตรฐาน (✓)</option>
                    <option value="ไม่ผ่าน">ยังไม่ผ่านเกณฑ์ (✗)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* List Table implementation with perfect style matches */}
            {filteredRecords.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-xs font-bold">
                * ขออภัย! ไม่พบบันทึกคะแนนสอบพนักงานที่ตรงกับตัวเลือกค้นหาของท่าน
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-150 text-slate-500 text-[10px] font-black uppercase tracking-wider">
                      <th className="py-3.5 px-4 w-12 text-center">ลำดับ</th>
                      <th className="py-3.5 px-4 w-48 cursor-pointer hover:bg-slate-100" onClick={() => handleSort("name")}>
                        <div className="flex items-center gap-1">
                          <span>ชื่อพนักงาน / นามสกุล</span>
                          {sortField === "name" && (sortDirection === "asc" ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />)}
                        </div>
                      </th>
                      <th className="py-3.5 px-4 w-44">แผนกสังกัดองค์กร</th>
                      <th className="py-3.5 px-4 w-28 text-center cursor-pointer hover:bg-slate-100" onClick={() => handleSort("score")}>
                        <div className="flex items-center justify-center gap-1">
                          <span>ระดับคะแนน</span>
                          {sortField === "score" && (sortDirection === "asc" ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />)}
                        </div>
                      </th>
                      <th className="py-3.5 px-4 w-36 text-center cursor-pointer hover:bg-slate-100" onClick={() => handleSort("completedAt")}>
                        <div className="flex items-center justify-center gap-1">
                          <span>เวลาอบรมสากล</span>
                          {sortField === "completedAt" && (sortDirection === "asc" ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />)}
                        </div>
                      </th>
                      <th className="py-3.5 px-4 w-24 text-center">ผลลัพธ์สุทธิ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRecords.map((rec, index) => {
                      const isPassed = rec.score >= 4;
                      const dateObj = new Date(rec.completedAt);
                      const formattedDate = dateObj.toLocaleDateString("th-TH", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      });
                      const formattedTime = dateObj.toLocaleTimeString("th-TH", {
                        hour: "2-digit",
                        minute: "2-digit"
                      });

                      return (
                        <tr 
                          key={rec.id} 
                          className="hover:bg-blue-50/10 leading-relaxed text-xs transition-colors text-slate-700 font-medium"
                        >
                          <td className="py-3 px-4 text-center font-bold text-slate-300">{index + 1}</td>
                          <td className="py-3 px-4 font-extrabold text-slate-900">{rec.name}</td>
                          <td className="py-3 px-4 text-slate-600 font-bold">{rec.department}</td>
                          <td className="py-3 px-4 text-center">
                            <span className="font-extrabold text-sm font-mono text-slate-900">{rec.score}</span>
                            <span className="text-[10px] text-slate-400 font-mono"> / 6</span>
                          </td>
                          <td className="py-3 px-4 text-center text-slate-500">
                            <div className="flex flex-col items-center justify-center">
                              <span className="font-bold">{formattedDate}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{formattedTime} น.</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">
                            {isPassed ? (
                              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-bold text-[10px] uppercase inline-flex items-center gap-1 shadow-2xs">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                <span>สอบผ่าน</span>
                              </span>
                            ) : (
                              <span className="bg-rose-50 text-rose-800 border border-rose-200 px-3 py-1 rounded-full font-bold text-[10px] uppercase inline-flex items-center gap-1 shadow-2xs">
                                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                <span>ทบทวน</span>
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
