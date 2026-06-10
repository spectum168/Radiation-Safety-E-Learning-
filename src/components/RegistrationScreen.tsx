import React, { useState } from "react";
import { Shield, User, Building2, BookOpen, ChevronRight, Award, Flame, Sparkles } from "lucide-react";

interface RegistrationScreenProps {
  onRegister: (name: string, department: string) => void;
  onGoToDashboardDirectly: () => void;
}

const COMMON_DEPARTMENTS = [
  "แผนกแม่บ้าน",
  "แผนกรักษาความปลอดภัย",
  "แผนกบริการผู้ป่วย",
  "แผนกสนับสนุนทั่วไป",
  "แผนกไอที",
  "บุคคลทั่วไป/บุคคลภายนอก"
];

export default function RegistrationScreen({ onRegister, onGoToDashboardDirectly }: RegistrationScreenProps) {
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [errorStr, setErrorStr] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorStr("กรุณาระบุชื่อ-นามสกุล ของท่าน");
      return;
    }
    if (!dept.trim()) {
      setErrorStr("กรุณาระบุหรือเลือกแผนกสังกัดของท่าน");
      return;
    }
    setErrorStr("");
    onRegister(name.trim(), dept.trim());
  };

  const handleSelectDept = (selected: string) => {
    setDept(selected);
  };

  return (
    <div className="max-w-5xl mx-auto py-4 px-4" id="registration-container">
      {/* Bento Grid Header */}
      <div className="mb-8 text-center sm:text-left">
        <span className="bg-yellow-105 text-yellow-850 bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest inline-block mb-2">
          SafeRay E-Learning &amp; Evaluation
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          ระบบเรียนรู้และประเมินผลความเข้าใจการป้องกันอันตรายทางรังสี
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          กรุณาลงทะเบียนข้อมูลพนักงานเพื่อเข้าสู่เนื้อหาบทเรียนและการสอบจำลองตามมาตรฐานสากล
        </p>
      </div>

      {/* Bento Grid Layout Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Bento: Main Form Panel (Col-span 7) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3.5 pb-6 mb-6 border-b border-slate-100">
              <div className="w-10 h-10 bg-yellow-400 text-slate-900 rounded-xl flex items-center justify-center font-bold">
                <Shield className="w-5.5 h-5.5 stroke-[2.2]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">กรอกข้อมูลผู้ใช้งาน</h2>
                <p className="text-xs text-slate-400">ระบุตัวตนเพื่อประมวลผลคะแนนรายพนักงาน</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block" htmlFor="fullname-input">
                  ชื่อ-นามสกุล ของท่าน
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="fullname-input"
                    type="text"
                    placeholder="พิมพ์ชื่อจริง และนามสกุล"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errorStr) setErrorStr("");
                    }}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/40 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-800 font-semibold placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Department Input */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block" htmlFor="department-input">
                  หน่วยงาน / แผนกที่คนสังกัด
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <input
                    id="department-input"
                    type="text"
                    placeholder="พิมพ์สังกัด หรือคลิกปุ่มแนะแนวด้านล่าง"
                    value={dept}
                    onChange={(e) => {
                      setDept(e.target.value);
                      if (errorStr) setErrorStr("");
                    }}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/40 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-800 font-semibold placeholder-slate-400"
                  />
                </div>

                {/* Quick select buttons */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    คลิกเลือกอย่างรวดเร็ว:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_DEPARTMENTS.map((item) => (
                      <button
                        key={item}
                        type="button"
                        id={`dept-badge-${item}`}
                        onClick={() => {
                          handleSelectDept(item);
                          if (errorStr) setErrorStr("");
                        }}
                        className={`text-xs px-3 py-2 rounded-xl border transition-all truncate ${
                          dept === item
                            ? "bg-blue-50 border-blue-400 text-blue-700 font-bold"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600 font-medium"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {errorStr && (
                <div className="text-xs text-rose-600 bg-rose-50 border border-rose-100 p-3.5 rounded-xl text-center font-bold">
                  ⚠️ {errorStr}
                </div>
              )}

              {/* Submit panel */}
              <div className="pt-4 border-t border-slate-150">
                <button
                  type="submit"
                  id="submit-register-btn"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-2xl shadow-sm text-sm flex items-center justify-center gap-2 hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
                >
                  <BookOpen className="w-4.5 h-4.5" />
                  <span>เข้าสู่บทเรียนด้านความปลอดภัย</span>
                  <ChevronRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </form>
          </div>

          <div className="text-center mt-6 pt-4 border-t border-slate-100">
            <p className="text-[11px] text-slate-400 font-medium">
              * ข้อมูลจัดเก็บเพื่อประเมินความปลอดภัยภายในโรงพยาบาลและรายงานผู้บังคับบัญชา
            </p>
          </div>
        </div>

        {/* Right Bento Modules Area (Col-span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Official Radiation Warning Sign (Thai Standard) */}
          <div className="bg-amber-400 border-[6px] border-slate-950 p-5 rounded-3xl flex flex-col items-center justify-between shadow-sm text-slate-950 text-center font-bold">
            <div className="bg-slate-950 text-amber-400 py-2.5 px-4 rounded-xl w-full mb-4">
              <h4 className="text-lg font-black tracking-wider leading-none">โปรดระวัง !</h4>
              <p className="text-xs font-black mt-1 leading-none uppercase tracking-wide">บริเวณรังสี</p>
            </div>
            
            <div className="w-24 h-24 rounded-full border-[3px] border-slate-950 flex items-center justify-center bg-amber-400 my-2">
              <svg viewBox="0 0 100 100" className="w-18 h-18 fill-slate-950">
                <path d="M50 15 A35 35 0 0 0 19.69 32.5l13 22.51A20 20 0 0 1 50 45V15zm30.31 17.5A35 35 0 0 0 50 15v30a20 20 0 0 1 17.32 10l13-22.5zM19.69 67.5A35 35 0 0 0 50 85v-30a20 20 0 0 1-17.32-10l-13 22.5z" />
                <circle cx="50" cy="50" r="8" />
              </svg>
            </div>
            
            <p className="text-base font-extrabold mt-3 tracking-tight text-slate-950">
              ผู้ไม่เกี่ยวข้องห้ามเข้า
            </p>
            
            <div className="bg-slate-950 text-amber-400 py-2 px-3 rounded-lg w-full mt-3">
              <p className="text-xs font-bold leading-tight">สตรีมีครรภ์ โปรดแจ้งเจ้าหน้าที่</p>
            </div>
          </div>

          {/* Bento Box 1: Premium Blue-Gray Info (Course standard) */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md flex-1 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            
            <div>
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-yellow-400 mb-4 border border-slate-700">
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="text-[10px] text-yellow-400 font-bold uppercase tracking-wider font-mono">
                Course Standard Overview
              </p>
              <h3 className="text-lg font-bold text-white mt-1.5 leading-snug">
                แนวทางความปลอดภัยทางรังสี สำหรับประชาชน (SafeRay®)
              </h3>
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                หลักสูตรที่รวบรวมเนื้อหาเชิงปฏิบัติจริง ครอบคลุมการหลีกเลี่ยง จุดเสี่ยง 
                ข้อปฏิบัติสำหรับสตรีมีครรภ์ และมาตรการป้องกันความปลอดภัยเมื่ออยู่ใกล้ชิดผู้ป่วยบำบัดรังสี
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-medium font-mono">
              <span>โครงสร้างเนื้อหา: 4 บทหลัก</span>
              <span>ประเมินผล: 6 ข้อสอบวัดผล</span>
            </div>
          </div>

          {/* Bento Box 2: Quick Score Tracker / Action Block */}
          <div className="bg-yellow-400 text-slate-900 rounded-3xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute bottom-[-10px] right-[-10px] w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            
            <div>
              <div className="w-10 h-10 bg-slate-900/10 rounded-xl flex items-center justify-center text-slate-950 mb-3.5">
                <Award className="w-5.5 h-5.5 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-black uppercase text-slate-900 leading-tight">
                ศูนย์รายงานและวิเคราะห์พนักงาน
              </h3>
              <p className="text-xs text-slate-800/80 mt-1.5 font-medium leading-relaxed">
                เปิดโอกาสให้เจ้าหน้าที่ฝ่ายสนับสนุนหรือพนักงานซุปเปอร์ไวเซอร์ เข้าไปตรวจสอบผลตรวจและส่งออกข้อมูล .CSV (Excel) ได้ทันทีโดยไม่เข้าเรียน
              </p>
            </div>

            <button
              type="button"
              id="dashboard-direct-btn"
              onClick={onGoToDashboardDirectly}
              className="mt-5 w-full bg-slate-950 text-white font-bold py-3 px-4 rounded-xl text-center text-xs flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-all cursor-pointer"
            >
              <span>ดูข้อมูลผลการทดสอบ &amp; แสตนการทำงานแผนก</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
