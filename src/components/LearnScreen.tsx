import React, { useState } from "react";
import { 
  BookOpen, 
  AlertTriangle, 
  Shield, 
  Baby, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Award,
  CircleDot
} from "lucide-react";

interface LearnScreenProps {
  onStartQuiz: () => void;
  userName: string;
  userDept: string;
}

export default function LearnScreen({ onStartQuiz, userName, userDept }: LearnScreenProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [completedSections, setCompletedSections] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
    3: false
  });

  const sections = [
    {
      id: 0,
      title: "1. ข้อควรรู้ทั่วไป",
      subtitle: "สัญลักษณ์และพื้นที่รังสี",
      icon: AlertTriangle,
      color: "amber",
      accentBg: "bg-amber-50 text-amber-700 border-amber-200",
      content: [
        {
          title: "สังเกตป้ายเตือน 'ใบพัดสามแฉก'",
          desc: "สัญลักษณ์ใบพัดสามแฉก (Trefoil สีเหลือง/ดำ หรือแดง) เป็นเครื่องหมายเตือนสากล เพื่อแจ้งเตือนว่าบริเวณนั้นมีสารกัมมันตรังสี หรือเป็นสถานที่ปฏิบัติงานทางรังสี เช่น ห้องเอกซเรย์ หรือศูนย์รักษาด้วยนิวเคลียร์"
        },
        {
          title: "หลีกเลี่ยงการเข้าใกล้โดยไม่จำเป็น",
          desc: "ประชาชนทั่วไปและบุคคลภายนอกไม่ควรเข้าใกล้หรือเปิดประตูห้องที่ติดป้ายเตือนดังกล่าวโดยพลการ ยกเว้นจะได้รับคำแนะนำหรืออนุญาตจากเจ้าหน้าที่ผู้ควบคุมเท่านั้น"
        }
      ],
      tip: "ความรู้พื้นฐาน: ระมัดระวังเป็นพิเศษเมื่อพบเห็นสัญลักษณ์ใบพัดสามแฉกในอาคารหรือหอผู้ป่วย!"
    },
    {
      id: 1,
      title: "2. การดูแลรักษากลุ่มเปราะบาง",
      subtitle: "สตรีมีครรภ์และทารกในครรภ์",
      icon: Shield,
      color: "rose",
      accentBg: "bg-rose-50 text-rose-700 border-rose-200",
      content: [
        {
          title: "สตรีมีครรภ์ต้องระวังเป็นพิเศษ",
          desc: "สตรีมีครรภ์ควรหลีกเลี่ยงการรับรังสี เช่น ถ่าย x-ray ทุกกรณี เนื่องจากเซลล์ของตัวอ่อนกำลังเจริญเติบโตอย่างรวดเร็ว มีโอกาสได้รับอันตรายจากรังสีสูงกว่าคนทั่วไป"
        },
        {
          title: "ปรึกษาแพทย์และปฏิบัติอย่างเคร่งครัด",
          desc: "หากมีความจำเป็นสูงสุดทางการแพทย์ที่สตรีมีครรภ์ต้องรับรังสี ควรปรึกษาแพทย์รังสีเพื่อหาวิธีจำกัดรังสีให้อยู่ในระดับต่ำสุดที่เป็นไปได้ และหาวิธีสำรองที่ปลอดภัย เช่น อัลตราซาวนด์ทดแทน"
        }
      ],
      tip: "สำคัญที่สุด: ผู้หญิงที่สงสัยว่าตั้งครรภ์ ต้องแจ้งแพทย์และเจ้าหน้าที่รังสีก่อนตรวจทุกครั้ง!"
    },
    {
      id: 2,
      title: "3. การเอกซเรย์ในเด็กและข้อควรระวัง",
      subtitle: "การถ่ายเอกซเรย์ที่ปลอดภัย",
      icon: Baby,
      color: "sky",
      accentBg: "bg-sky-50 text-sky-700 border-sky-200",
      content: [
        {
          title: "หลีกเลี่ยงการถ่ายเอกซเรย์ที่ตรวจซ้ำอย่างไร้เหตุผล",
          desc: "หลีกเลี่ยงการถ่ายเอกซเรย์หลายครั้งหรือถ่ายซ้ำโดยไม่จำเป็น เพื่อป้องกันการได้รับรังสีสะสมส่วนเกินในชีวิตประจำวันโดยเปล่าประโยชน์"
        },
        {
          title: "การใช้อุปกรณ์กำบังรังสีสำหรับเด็ก",
          desc: "สำหรับผู้ป่วยเด็กที่เลี่ยงไม่ได้และจำเป็นต้องถ่ายเอกซเรย์ จะต้องมีเครื่องกำบังรังสี (Lead Apron) สวมคลุมให้เด็กเสมอ โดยเฉพาะบริเวณอวัยวะสืบพันธุ์เพื่อลดอันตรายด้านการรับส่งรังสีสู่เซลล์สืบพันธุ์"
        }
      ],
      tip: "มาตรฐานความปลอดภัย: เครื่องปิดกำบังรังสีแบบตะกั่วช่วยลดอันตรายต่อเด็กได้สูงถึง 90%+"
    },
    {
      id: 3,
      title: "4. ข้อปฏิบัติเรื่องการเยี่ยมและการรักษา",
      subtitle: "มารยาทและระยะเวลาที่ปลอดภัย",
      icon: Users,
      color: "emerald",
      accentBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      content: [
        {
          title: "ห้ามสตรีมีครรภ์และเด็กเข้าเยี่ยมผู้ได้รับการฝังแร่รังสี",
          desc: "ห้ามสัมผัสหรือเข้าใกล้ผู้ป่วยที่เพิ่งได้รับการฝังหรือสอดใส่สารกัมมันตรังสี เนื่องจากตัวผู้ป่วยสามารถแผ่รังสีออกมาสู่คนรอบข้างได้ สตรีมีครรภ์และเด็กเล็กถูกห้ามเข้าห้องเด็ดขาด"
        },
        {
          title: "การกลับบ้านต้องได้รับความเห็นพ้องจากแพทย์",
          desc: "ผู้ป่วยฝังแร่รังสีไม่ควรเดินทางกลับบ้านเองก่อนได้รับความเห็นชอบอย่างเป็นทางการจากแพทย์รังสี เพราะปริมาณแผ่รังสีอาจอยู่ในเกณฑ์คลาดเคลื่อนที่จะส่งผลต่อคนในบ้าน"
        }
      ],
      tip: "กฎความปลอดภัยสะท้อนความห่วงใย: การปกป้องครอบครัวและสังคมเป็นระเบียบทางรังสีที่ต้องปฏิบัติสูงสุด!"
    }
  ];

  const handleMarkAsRead = (id: number) => {
    setCompletedSections(prev => {
      const next = { ...prev, [id]: true };
      return next;
    });
    // Multi-tab automatically moves to next or stays
    if (id < sections.length - 1) {
      setTimeout(() => {
        setActiveTab(id + 1);
      }, 400);
    }
  };

  const allRead = Object.values(completedSections).every(Boolean);
  const completedCount = Object.values(completedSections).filter(Boolean).length;

  return (
    <div className="max-w-5xl mx-auto py-4 px-4" id="learn-screen-container">
      
      {/* Top Welcome Bento Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        {/* Box 1: Welcome message (Col span 7) */}
        <div className="md:col-span-8 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold font-mono">
              E-LEARNING ACTIVE
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
              การป้องกันอันตรายจากรังสีสำหรับคนทั่วไป
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
              ผู้เข้าเรียน: <span className="font-extrabold text-slate-800">{userName}</span> สังกัด <span className="font-extrabold text-slate-800">{userDept}</span>
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400 font-semibold">
            <CircleDot className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span>มาตรฐานความปลอดภัยทางรังสีโรงพยาบาล</span>
          </div>
        </div>

        {/* Box 2: Progress overview (Col span 4) */}
        <div className="md:col-span-4 bg-slate-900 text-white p-6 rounded-3xl shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex justify-between items-start">
            <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center text-blue-400 border border-slate-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Progress
            </span>
          </div>

          <div className="mt-4">
            <p className="text-xs text-slate-400 font-semibold">ความคืบหน้าการอ่าน</p>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-3xl font-black text-white font-mono">{completedCount}</span>
              <span className="text-sm font-semibold text-slate-400 font-mono">/ 4 หัวข้อ</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div 
                className="bg-yellow-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Pastel Infographic Chart - Recreating 'วิธีป้องกันอันตรายจากรังสี... ง่ายๆ สำหรับทุกคน' */}
      <div className="bg-gradient-to-r from-violet-50/60 via-pink-50/70 to-blue-50/60 border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs mb-8" id="infographic-interactive-panel">
        <div className="text-center mb-6">
          <span className="bg-slate-900 text-slate-100 text-[10px] px-3.5 py-1 rounded-full font-bold uppercase tracking-wider">
            PREVENTION VISUAL CHART &bull; แผนภาพอธิบายความเข้าใจสากล
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 mt-2.5 tracking-tight">
            วิธีป้องกันอันตรายจากรังสี... ง่ายๆ สำหรับทุกคน
          </h2>
          <p className="text-slate-500 text-[11px] sm:text-xs mt-1 font-bold">
            💡 คลิกเลือกหัวข้อบนแผนภาพการ์ตูนเพื่อสลับไปอ่านรายละเอียดหลักสูตรโดยละเอียดด้านล่างแบบโต้ตอบ
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {[
            {
              id: 0,
              title: "ข้อควรรู้ทั่วไป",
              badge: "สัญลักษณ์ใบพัดสามแฉก",
              desc: "เมื่อพบป้ายเตือนสีเหลือง/ดำ ให้หลีกเลี่ยงการเข้าบริเวณนั้นโดยพลการ",
              colorClass: "bg-amber-50 hover:bg-amber-100/80 border-amber-300 text-amber-900 shadow-amber-100/50",
              bubbleClass: "bg-amber-400 text-slate-950 ring-amber-200",
              icon: "⚠️"
            },
            {
              id: 1,
              title: "ดูแลพิเศษกลุ่มเปราะบาง",
              badge: "สตรีมีครรภ์/เด็กน้อย",
              desc: "สตรีมีครรภ์ต้องระวังเป็นพิเศษ หลีกเลี่ยง x-ray และต้องได้รับคำชี้แนะจากแพทย์",
              colorClass: "bg-pink-50 hover:bg-pink-100/80 border-pink-300 text-pink-900 shadow-pink-100/50",
              bubbleClass: "bg-pink-400 text-slate-950 ring-pink-200",
              icon: "🤰"
            },
            {
              id: 2,
              title: "เลี่ยงเอ็กซเรย์ไม่จำเป็นในเด็ก",
              badge: "เครื่องเอ็กซเรย์ & ชิลด์ตะกั่ว",
              desc: "หลีกเลี่ยงการถ่ายเอ็กซเรย์โดยไม่มีความเห็นแพทย์ และเด็กต้องสวมชุดกำบังตะกั่วเสมอ",
              colorClass: "bg-sky-50 hover:bg-sky-100/80 border-sky-300 text-sky-900 shadow-sky-100/50",
              bubbleClass: "bg-sky-400 text-slate-950 ring-sky-200",
              icon: "👶"
            },
            {
              id: 3,
              title: "การเยี่ยมชมและการรักษา",
              badge: "เว้นระยะผู้ป่วยฝังแร่",
              desc: "ห้ามคนท้องและเด็กเยี่ยมชมหรือใกล้ชิดผู้ฝังแร่รังสี และปฏิบัติตามวินิจฉัยแพทย์",
              colorClass: "bg-emerald-50 hover:bg-emerald-100/80 border-emerald-300 text-emerald-900 shadow-emerald-100/50",
              bubbleClass: "bg-emerald-400 text-slate-950 ring-emerald-200",
              icon: "🏥"
            }
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`infographic-card-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative p-5 rounded-2xl border-2 transition-all flex flex-col items-center text-center cursor-pointer ${
                  isActive 
                    ? `${item.colorClass} scale-[1.02] ring-4 ring-offset-1 ring-slate-200 font-extrabold shadow-sm` 
                    : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                }`}
              >
                {/* Bubble Circle with Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ring-4 mb-3 transition-transform ${item.bubbleClass} ${
                  isActive ? "scale-110" : ""
                }`}>
                  {item.icon}
                </div>

                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                  isActive ? "bg-white/75 text-slate-800" : "bg-slate-100 text-slate-400"
                }`}>
                  {item.badge}
                </span>

                <h3 className="font-extrabold text-xs sm:text-sm mt-2 text-slate-800 leading-snug">
                  {item.title}
                </h3>
                
                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed mt-1 w-full max-w-[180px]">
                  {item.desc}
                </p>

                {isActive && (
                  <span className="absolute -top-2 bg-slate-900 text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-xs animate-pulse">
                    กําลังเรียนหัวข้อนี้
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Tabs on the Left (or top in mobile), content on the Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Navigation Tabs (Col span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">สารบัญหัวข้อความรู้</p>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold">Bento Tabs</span>
          </div>
          
          <div className="flex overflow-x-auto lg:flex-col pb-2 lg:pb-0 gap-3 scrollbar-none">
            {sections.map((sect) => {
              const Icon = sect.icon;
              const isCompleted = completedSections[sect.id];
              const isActive = activeTab === sect.id;

              return (
                <button
                  key={sect.id}
                  id={`tab-btn-${sect.id}`}
                  onClick={() => setActiveTab(sect.id)}
                  className={`flex-shrink-0 flex items-center lg:w-full gap-3.5 px-4 py-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? "bg-white border-blue-500 text-slate-900 shadow-sm font-semibold ring-2 ring-blue-50"
                      : "bg-slate-50 hover:bg-slate-100/70 border-slate-200 text-slate-600"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl transition-colors ${
                    isActive ? "bg-blue-50 text-blue-600" : "bg-white text-slate-400 border border-slate-200"
                  }`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">ส่วนที่ {sect.id + 1}</p>
                    <p className="text-sm font-bold truncate text-slate-700 leading-tight mt-0.5">{sect.subtitle}</p>
                  </div>
                  {isCompleted && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display (Col span 8) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-8 min-h-[440px] flex flex-col justify-between">
          <div>
            {/* Active Content Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest font-mono">
                  RADIATION SAFETY PLATFORM
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-950 mt-1">
                  {sections[activeTab].title}
                </h2>
              </div>
              <div className={`py-1.5 px-3.5 rounded-full text-xs font-bold flex items-center gap-2 border ${sections[activeTab].accentBg}`}>
                {React.createElement(sections[activeTab].icon, { className: "w-4 h-4 stroke-[2]" })}
                <span>{sections[activeTab].subtitle}</span>
              </div>
            </div>

            {/* Content list beautifully structured as sub-bento items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections[activeTab].content.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-slate-50 hover:bg-slate-100/40 p-5 rounded-2xl border border-slate-100 transition-all flex flex-col justify-between"
                >
                  <p className="font-bold text-xs uppercase text-blue-600 tracking-wider mb-2">
                    มาตรการที่ {index + 1}
                  </p>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Practical Tip Callout (Styled nicely) */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200/65 rounded-2xl p-5 flex gap-3.5 items-start">
              <div className="p-2 bg-yellow-400 text-slate-950 rounded-xl flex-shrink-0">
                <Sparkles className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-800 block">ข้อวิเคราะห์ทางปฏิบัติงาน</span>
                <p className="text-xs text-slate-600 leading-relaxed font-bold mt-0.5">{sections[activeTab].tip}</p>
              </div>
            </div>
          </div>

          {/* Card Footer Actions */}
          <div className="border-t border-slate-100 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 font-semibold">
              * กรุณากด &quot;เข้าใจแล้ว&quot; เพื่อเปลี่ยนหรือติ๊กบันทึกรายงาน
            </p>
            <button
              id={`mark-read-btn-${activeTab}`}
              onClick={() => handleMarkAsRead(activeTab)}
              className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                completedSections[activeTab]
                  ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100/70 border border-emerald-200"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
              }`}
            >
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              <span>{completedSections[activeTab] ? "อ่านเรียบร้อยแล้ว" : "เข้าใจแล้วและทำเครื่องหมายว่าอ่าน"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Course Completion Section (Styled as custom yellow bento action card) */}
      <div className="mt-8 bg-yellow-400 text-slate-950 border border-yellow-500/30 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-2xl ${allRead ? "bg-slate-950 text-white" : "bg-slate-950/10 text-slate-800"}`}>
            <Award className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-950 text-lg">การประเมินผลและวัดระดับความเข้าใจ</h3>
            <p className="text-xs text-slate-800/90 mt-1 max-w-lg font-bold leading-relaxed">
              {allRead 
                ? "ดีมาก! คุณได้เรียนรู้ครบถ้วนทั้ง 4 หัวข้อสำคัญแล้ว คุณสามารถเริ่มทำแบบสอบถามเพื่อบันทึกประวัติทันที" 
                : "กรุณากดอ่าน 'เข้าใจแล้ว' ในทุกหน้าหัวข้อการเรียนรู้ทางด้านบนให้ครบ (4 หัวข้อ) เพื่อเปิดลิงก์เข้าสู่แบบทดสอบประเมิน"
              }
            </p>
          </div>
        </div>
        <button
          id="go-to-quiz-btn"
          disabled={!allRead}
          onClick={allRead ? onStartQuiz : undefined}
          className={`w-full md:w-auto px-7 py-4 rounded-2xl font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all shrink-0 ${
            allRead 
              ? "bg-slate-950 text-white hover:bg-slate-900 shadow-md cursor-pointer hover:-translate-y-0.5 active:translate-y-0" 
              : "bg-slate-800/10 text-slate-500/70 border border-slate-900/10 cursor-not-allowed"
          }`}
        >
          <span>เริ่มแบบทดสอบประเมินผล</span>
          <ArrowRight className="w-4.5 h-4.5 stroke-[2.2]" />
        </button>
      </div>
    </div>
  );
}
