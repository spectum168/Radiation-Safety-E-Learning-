import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "src", "data", "scores_db.json");

app.use(express.json());

// Helper to ensure DB exists and read data
function getDatabase() {
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      // Seed default entries
      const defaultRecords = [
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
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultRecords, null, 2), "utf-8");
      return defaultRecords;
    }
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database file", error);
    return [];
  }
}

function saveDatabase(data: any) {
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to database file", error);
  }
}

// REST API Endpoints
// Get all score records
app.get("/api/scores", (req, res) => {
  const data = getDatabase();
  res.json(data);
});

// Save a new score
app.post("/api/scores", (req, res) => {
  const { name, department, score, totalQuestions, answers } = req.body;
  
  if (!name || !department) {
    return res.status(400).json({ error: "ชื่อและแผนกจำเป็นต้องมี" });
  }

  const database = getDatabase();
  const newRecord = {
    id: `rec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name,
    department,
    score: Number(score),
    totalQuestions: Number(totalQuestions),
    answers: answers || [],
    completedAt: new Date().toISOString()
  };

  database.push(newRecord);
  saveDatabase(database);

  res.status(201).json(newRecord);
});

// Delete a score record
app.delete("/api/scores/:id", (req, res) => {
  const { id } = req.params;
  const database = getDatabase();
  const index = database.findIndex((rec: any) => rec.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "ไม่พบข้อมูลประวัติพนักงานที่ต้องการลบ" });
  }

  database.splice(index, 1);
  saveDatabase(database);

  res.json({ message: "ลบประวัติพนักงานสำเร็จ", id });
});

// Get department stats
app.get("/api/departments", (req, res) => {
  const database = getDatabase();
  
  // Aggregate stats by department
  const depts: Record<string, { total: number; totalScore: number; passed: number }> = {};
  
  database.forEach((rec: any) => {
    const dept = rec.department;
    if (!depts[dept]) {
      depts[dept] = { total: 0, totalScore: 0, passed: 0 };
    }
    depts[dept].total += 1;
    depts[dept].totalScore += rec.score;
    
    // Pass criterion: 4 or more out of 6 (66%+)
    if (rec.score >= 4) {
      depts[dept].passed += 1;
    }
  });

  const parsedStats = Object.keys(depts).map(name => {
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

  res.json(parsedStats);
});

// Vite Middleware integrated
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server starting on http://localhost:${PORT}`);
  });
}

startServer();
