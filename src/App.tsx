// @ts-nocheck
import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Home,
  Globe,
  Settings,
  FolderKanban,
  FileCheck2,
  History,
  PieChart,
  ShieldCheck,
  Search,
  Filter,
  Building2,
  FileText,
  Activity,
  Target,
  BarChart3,
  DollarSign,
  Edit,
  CheckCircle,
  XCircle,
  LayoutList,
  CheckSquare,
  Plus,
  Trash2,
  AlertTriangle,
  Lock,
  Save,
  Bell,
  ServerCrash,
  SlidersHorizontal,
  Database,
  TableProperties,
  LayoutTemplate,
  Link as LinkIcon,
  FileEdit,
  FolderDown,
  UploadCloud,
  GripVertical,
  Monitor,
  Info,
  Image as ImageIcon,
  Megaphone,
  MousePointerClick,
  Star,
  Hash,
  Bot,
  Send,
  X,
  MessageSquare,
  Cpu,
  Brain,
  ScanSearch,
  AlertOctagon,
  Loader2,
  Sparkles,
  MessageSquareText,
  TrendingUp,
  FileUp,
  ArrowLeft,
  Power,
  Mail,
  MailWarning,
  MailCheck,
  Send as SendIcon,
} from "lucide-react";

// ==========================================
// 1. 載入測試資料 (共用資料庫 + 完美閉環彩蛋)
// ==========================================
const mockPrograms = [
  {
    id: "PG-113-001",
    name: "113年度協助中小微企業導入AI加值應用計畫",
    year: "113",
    agency: "數位發展部數位產業署",
    type: "補助型",
    status: "受理申請",
    budget: 30000000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    objective: "推動小微企業AI化",
    description: "針對人力不足的小微企業，提供最高 30 萬元的點數補助。",
  },
  {
    id: "PG-113-002",
    name: "113年度製造業智慧化升級轉型計畫",
    year: "113",
    agency: "經濟部產業發展署",
    type: "補助型",
    status: "受理申請",
    budget: 80000000,
    startDate: "2024-06-01",
    endDate: "2025-05-31",
    objective: "設備聯網與智造",
    description: "協助傳統製造業導入產線自動化、機台聯網。",
  },
  {
    id: "PG-113-003",
    name: "113年度地方創生數位賦能輔導計畫",
    year: "113",
    agency: "國家發展委員會",
    type: "輔導型",
    status: "受理申請",
    budget: 25000000,
    startDate: "2024-03-01",
    endDate: "2024-11-30",
    objective: "帶動偏鄉商業活力",
    description: "補助導入數位支付、線上點餐或在地特色行銷模組。",
  },
  {
    id: "PG-113-004",
    name: "113年度企業碳盤查與減碳轉型輔導計畫",
    year: "113",
    agency: "經濟部中小及新創企業署",
    type: "輔導型",
    status: "受理申請",
    budget: 35000000,
    startDate: "2024-07-01",
    endDate: "2025-06-30",
    objective: "淨零碳排",
    description: "協助中小企業進行溫室氣體盤查與減碳路徑規劃。",
  },
  {
    id: "PG-112-001",
    name: "112年度新創企業前瞻技術研發實證計畫",
    year: "112",
    agency: "國家科學及技術委員會",
    type: "專案型",
    status: "尚未執行",
    budget: 50000000,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    objective: "深科技落地",
    description: "專為深科技 (Deep Tech) 新創設計的研發補助。",
  },
  {
    id: "PG-114-001",
    name: "114年度智慧醫療與健康數據創新計畫",
    year: "114",
    agency: "衛生福利部",
    type: "補助型",
    status: "尚未執行",
    budget: 60000000,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    objective: "遠距醫療與AI診斷",
    description: "推廣智慧醫療科技於偏鄉與基層診所之應用。",
  },
  {
    id: "PG-112-002",
    name: "112年度雲市集工業大數據實證計畫",
    year: "112",
    agency: "數位發展部數位產業署",
    type: "補助型",
    status: "已結案",
    budget: 40000000,
    startDate: "2023-05-01",
    endDate: "2024-04-30",
    objective: "工業數據分析",
    description: "透過雲端市集採購數據分析軟體，優化製程。",
  },
];

const mockApplicants = {
  "A-101": {
    name: "台中某餐飲集團",
    type: "公司",
    identifier: "87654321",
    area: "台中市",
    totalProjects: 0,
    totalGrant: 0,
    attr: { CAPTIAL: 5000000, EMPLOYEE_NUMBER: 15, INDUSTRY: "餐飲服務業" },
  },
  "A-001": {
    name: "111有限公司",
    type: "公司",
    identifier: "11111111",
    area: "台北市",
    totalProjects: 3,
    totalGrant: 2500000,
    attr: { CAPTIAL: 5000000, EMPLOYEE_NUMBER: 15, INDUSTRY: "資訊軟體業" },
  },
  "A-002": {
    name: "222醫院",
    type: "醫事機構",
    identifier: "22222222",
    area: "台中市",
    totalProjects: 2,
    totalGrant: 4000000,
    attr: { BED_COUNT: 150, IS_TEACHING_HOSPITAL: false, LEVEL: "地區醫院" },
  },
  "A-003": {
    name: "333企業社",
    type: "商業",
    identifier: "33333333",
    area: "高雄市",
    totalProjects: 2,
    totalGrant: 1100000,
    attr: { CAPTIAL: 200000, EMPLOYEE_NUMBER: 3, INDUSTRY: "零售業" },
  },
  "A-006": {
    name: "666科技股份有限公司",
    type: "公司",
    identifier: "66666666",
    area: "新竹市",
    totalProjects: 4,
    totalGrant: 8500000,
    attr: { CAPTIAL: 20000000, EMPLOYEE_NUMBER: 120, INDUSTRY: "半導體製造業" },
  },
  "A-007": {
    name: "777文教基金會",
    type: "財團法人",
    identifier: "77777777",
    area: "台北市",
    totalProjects: 2,
    totalGrant: 1500000,
    attr: { FOUND_FUNDS: 10000000, EMPLOYEE_NUMBER: 8, FOCUS_AREA: "偏鄉教育" },
  },
  "A-009": {
    name: "999餐飲集團",
    type: "公司",
    identifier: "99999999",
    area: "台中市",
    totalProjects: 2,
    totalGrant: 1800000,
    attr: { CAPTIAL: 8000000, EMPLOYEE_NUMBER: 45, INDUSTRY: "餐飲業" },
  },
};

const mockProjects = [
  {
    id: "APP-113-987654",
    programId: "PG-113-003",
    applicantId: "A-101",
    name: "全通路雲端 POS 系統導入計畫",
    status: "審查中",
    grant: 500000,
    metric: [
      { name: "結帳與點餐時間縮短", target: "30%", actual: "審查中" },
      { name: "數位營收佔比", target: "40%", actual: "審查中" },
      { name: "每月減少盤點人力", target: "15小時", actual: "審查中" },
    ],
  },
  {
    id: "PRJ-001",
    programId: "PG-113-001",
    applicantId: "A-001",
    name: "智慧客服AI大腦建置案",
    status: "執行中",
    grant: 1500000,
    metric: [{ name: "客服回應時間縮短", target: "30%", actual: "25%" }],
  },
  {
    id: "PRJ-002",
    programId: "PG-112-002",
    applicantId: "A-001",
    name: "雲端ERP數據串接實證",
    status: "已結案",
    grant: 1000000,
    metric: [{ name: "庫存周轉率提升", target: "15%", actual: "18%" }],
  },
  {
    id: "PRJ-003",
    programId: "PG-114-001",
    applicantId: "A-002",
    name: "遠距AI輔助看診系統",
    status: "審查中",
    grant: 3500000,
    metric: [{ name: "服務偏鄉病患數", target: "5000人", actual: "0人" }],
  },
  {
    id: "PRJ-004",
    programId: "PG-113-003",
    applicantId: "A-003",
    name: "行動支付與雲端POS導入",
    status: "審查中",
    grant: 3000000,
    metric: [{ name: "數位支付營收佔比", target: "80%", actual: "0%" }],
  },
  {
    id: "PRJ-007",
    programId: "PG-112-001",
    applicantId: "A-006",
    name: "次世代晶片檢測演算法",
    status: "已結案",
    grant: 5000000,
    metric: [{ name: "檢測良率提升", target: "5%", actual: "6.2%" }],
  },
  {
    id: "PRJ-008",
    programId: "PG-113-002",
    applicantId: "A-006",
    name: "產線瑕疵檢測生成式AI模型",
    status: "執行中",
    grant: 3500000,
    metric: [{ name: "模型辨識準確率", target: "98%", actual: "95%" }],
  },
  {
    id: "PRJ-009",
    programId: "PG-113-003",
    applicantId: "A-007",
    name: "偏鄉學童線上陪伴平台",
    status: "執行中",
    grant: 1500000,
    metric: [{ name: "輔導學童數", target: "200人", actual: "120人" }],
  },
  {
    id: "PRJ-010",
    programId: "PG-113-001",
    applicantId: "A-009",
    name: "智能點餐與排班數據平台",
    status: "審查中",
    grant: 1200000,
    metric: [{ name: "人力成本節省", target: "10%", actual: "8%" }],
  },
];

const menuGroups = [
  {
    title: "前台內容",
    items: [
      { id: "home", name: "首頁內容管理", icon: Home },
      { id: "website", name: "網站內容管理", icon: Globe },
    ],
  },
  {
    title: "業務管理",
    items: [
      { id: "system", name: "系統配置管理", icon: Settings },
      { id: "program_setup", name: "計畫設定管理", icon: FolderKanban },
      { id: "program_review", name: "計畫申審管理", icon: FileCheck2 },
      { id: "program_history", name: "計畫申請查詢", icon: History },
    ],
  },
  {
    title: "戰情中心",
    items: [{ id: "dashboard", name: "政策資源儀表板", icon: PieChart }],
  },
];

const AGENCIES = [
  "系統總管理者 (Super Admin)",
  "數位發展部數位產業署",
  "經濟部產業發展署",
  "國家科學及技術委員會",
  "衛生福利部",
  "國家發展委員會",
  "經濟部中小及新創企業署",
];
const initialNavItems = [
  { id: 1, label: "首頁", url: "/", position: "header", visible: true },
  {
    id: 2,
    label: "計畫總覽",
    url: "/programs",
    position: "header",
    visible: true,
  },
  { id: 3, label: "常見問題", url: "/faq", position: "header", visible: true },
  {
    id: 4,
    label: "隱私權政策",
    url: "/privacy",
    position: "footer",
    visible: true,
  },
];
const initialStaticPages = [
  {
    id: "p1",
    title: "關於 AI 跨計畫查詢平台",
    slug: "about-us",
    lastUpdated: "2024-10-15",
    status: "已發布",
  },
  {
    id: "p2",
    title: "服務條款",
    slug: "terms",
    lastUpdated: "2024-01-20",
    status: "已發布",
  },
];
const initialDocs = [
  {
    id: "d1",
    name: "114年度計畫申請書範本.docx",
    category: "申請文件",
    size: "2.4 MB",
    downloads: 1250,
    date: "2024-11-01",
  },
  {
    id: "d2",
    name: "平台操作手冊_v2.pdf",
    category: "操作教學",
    size: "5.1 MB",
    downloads: 843,
    date: "2024-10-15",
  },
];
const placeholderImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 400'%3E%3Crect width='1920' height='400' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='150' fill='%2364748b' font-weight='bold'%3E1920x400%3C/text%3E%3C/svg%3E";
const initialBanners = [
  {
    id: "b1",
    title: "2024 AI 創新應用徵件開跑",
    imageUrl: placeholderImage,
    link: "/programs/PG-113-001",
    status: "上架中",
    order: 1,
  },
  {
    id: "b2",
    title: "中小企業數位轉型方案總覽",
    imageUrl: placeholderImage,
    link: "/programs/PG-113-002",
    status: "已下架",
    order: 2,
  },
];
const initialNews = [
  {
    id: "n1",
    title: "系統維護公告：本週五晚間暫停服務",
    category: "系統通知",
    publishDate: "2024-10-25",
    status: "已發布",
    isPinned: true,
  },
  {
    id: "n2",
    title: "113年度計畫審查結果公告",
    category: "計畫公告",
    publishDate: "2024-10-20",
    status: "已發布",
    isPinned: false,
  },
];

export default function App() {
  const [activeMenu, setActiveMenu] = useState("system");
  const [currentUserAgency, setCurrentUserAgency] = useState(
    "系統總管理者 (Super Admin)"
  );
  const [viewLayer, setViewLayer] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedApplicantDetails, setSelectedApplicantDetails] =
    useState(null);

  const [programs, setPrograms] = useState(mockPrograms);
  const [projects, setProjects] = useState(mockProjects);

  const currentRocYear = new Date().getFullYear() - 1911;
  const allowedCreationYears = [
    currentRocYear,
    currentRocYear + 1,
    currentRocYear + 2,
  ];
  const allYearsInDb = Array.from(
    new Set([...programs.map((p) => Number(p.year)), ...allowedCreationYears])
  ).sort((a, b) => b - a);

  // V8: 重新設計的信件通知物件與全域設定
  const [systemConfig, setSystemConfig] = useState({
    maintenanceMode: false,
    systemNotice: "配合系統升級作業，預計於本週五晚間 10:00 - 12:00 暫停服務。",
    emailSettings: {
      master: true, // 總開關
      frontendOps: true, // 前台操作確認信
      reviewProgress: true, // 審查與進度通知
      systemAlerts: true, // 系統內部異常警報
      contentUpdates: false, // 內容發布與推播通知
    },
    scaleThresholdSmall: 20,
    scaleThresholdMedium: 100,
    aiModel: "gpt-4o",
    apiKey: "sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx",
    monthlyTokenLimit: 1000000,
    tokenUsage: 452100,
    alertThreshold: 80,
    aiModulesEnabled: {
      home: true,
      website: true,
      system: true,
      dashboard: true,
      program_setup: true,
      program_review: true,
      program_history: true,
    },
  });

  const [isConfigSaved, setIsConfigSaved] = useState(false);

  const [websiteTab, setWebsiteTab] = useState("seo");
  const [websiteSettings, setWebsiteSettings] = useState({
    siteName: "AI 產業戰略資源跨計畫查詢平台",
    gaId: "G-X1Y2Z3A4B5",
    seoDesc:
      "整合台灣優質 AI 解決方案，推動產業數位轉型，提供一站式計畫申請與資源媒合服務。",
  });
  const [navItems, setNavItems] = useState(initialNavItems);
  const [staticPages, setStaticPages] = useState(initialStaticPages);
  const [docs, setDocs] = useState(initialDocs);
  const [homeTab, setHomeTab] = useState("banner");
  const [banners, setBanners] = useState(initialBanners);
  const [newsList, setNewsList] = useState(initialNews);
  const [featuredPrograms, setFeaturedPrograms] = useState([
    "PG-113-001",
    "PG-113-002",
    "PG-112-001",
  ]);

  const [dashFilterYear, setDashFilterYear] = useState("all");
  const [dashFilterAgency, setDashFilterAgency] = useState("all");
  const [setupSearchTrigger, setSetupSearchTrigger] = useState("");
  const [setupFilterYear, setSetupFilterYear] = useState("all");
  const [setupFilterAgency, setSetupFilterAgency] = useState("all");
  const [tempSetupSearch, setTempSetupSearch] = useState("");
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isEditingSetup, setIsEditingSetup] = useState(false);
  const [setupFormData, setSetupFormData] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [reviewTab, setReviewTab] = useState("programs");
  const [selectedProgramForReview, setSelectedProgramForReview] = useState("");
  const [reviewSearchTrigger, setReviewSearchTrigger] = useState("");
  const [reviewFilterYear, setReviewFilterYear] = useState("all");
  const [reviewFilterAgency, setReviewFilterAgency] = useState("all");
  const [tempReviewSearch, setTempReviewSearch] = useState("");
  const [searchTrigger, setSearchTrigger] = useState("");
  const [filterYear, setFilterYear] = useState("all");
  const [tempQuerySearch, setTempQuerySearch] = useState("");

  const [dashAnalystQuery, setDashAnalystQuery] = useState("");
  const [dashAnalystState, setDashAnalystState] = useState("idle");
  const [dashAnalystResult, setDashAnalystResult] = useState(null);
  const [isArchitectRunning, setIsArchitectRunning] = useState(false);
  const [architectStep, setArchitectStep] = useState(0);

  const [isJudgeAgentRunning, setIsJudgeAgentRunning] = useState(false);
  const [judgeScanStep, setJudgeScanStep] = useState(0);
  const [judgeResult, setJudgeResult] = useState(null);

  const [isAICopilotOpen, setIsAICopilotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "ai",
      content:
        "您好，長官！我是您的 AI 戰略分析助理。請告訴我您想了解的資訊，或是點擊上方快捷指令。",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isAITyping, setIsAITyping] = useState(false);
  const chatScrollRef = useRef(null);

  useEffect(() => {
    setIsJudgeAgentRunning(false);
    setJudgeScanStep(0);
    setJudgeResult(null);
  }, [selectedApplicantDetails]);
  useEffect(() => {
    if (chatScrollRef.current)
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
  }, [chatMessages, isAITyping]);

  // Agentic Workflow Functions
  const runDataAnalyst = (query) => {
    if (!query.trim()) return;
    setDashAnalystQuery(query);
    setDashAnalystState("loading");
    setTimeout(() => {
      let result = {};
      if (
        query.includes("工時") ||
        query.includes("時間") ||
        query.includes("省了多少")
      ) {
        result = {
          type: "bar",
          title: "AI Agent 審查工時節省效益分析",
          text: "目前 Judge Agent 已自動掃描 1,200 件申請案，成功為承辦人員節省約 84% 的初步審核工時。自動抓出風險異常件數達 156 件。",
          data: [
            {
              label: "傳統純人工審查 (預估工時)",
              value: 100,
              displayValue: "3,600",
              unit: " 小時",
              color: "bg-slate-300",
              textColor: "text-slate-600",
            },
            {
              label: "AI Agent 輔助審查 (實際工時)",
              value: 16,
              displayValue: "576",
              unit: " 小時",
              color: "bg-indigo-500",
              textColor: "text-indigo-600",
            },
          ],
        };
      } else if (query.includes("預算") || query.includes("消耗")) {
        result = {
          type: "progress",
          title: "113年度總預算消耗雷達",
          text: "全平台 113年度 總編列預算為 1.9 億元，目前已核定佔比為 68%，尚有 32% 可供後續梯次分配。目前無超支風險。",
          data: { used: 68, remaining: 32 },
        };
      } else if (query.includes("產業") || query.includes("成功率")) {
        result = {
          type: "bar",
          title: "各產業媒合成功率分析",
          text: "經 Data Analyst Agent 交叉比對，製造業因數位轉型需求明確，媒合成功率居冠。批發零售業申請基數最大，但因方案同質性高，退件率偏高。",
          data: [
            {
              label: "製造業 / 半導體業",
              value: 92,
              displayValue: "92",
              unit: "%",
              color: "bg-emerald-500",
              textColor: "text-emerald-700",
            },
            {
              label: "資訊軟體業",
              value: 75,
              displayValue: "75",
              unit: "%",
              color: "bg-blue-400",
              textColor: "text-blue-600",
            },
            {
              label: "批發零售業",
              value: 45,
              displayValue: "45",
              unit: "%",
              color: "bg-amber-400",
              textColor: "text-amber-600",
            },
          ],
        };
      } else {
        result = {
          type: "text",
          title: "系統動態分析建議",
          text: "根據目前的資料庫動態分析，各類型企業申請件數穩定成長。建議可針對「5萬以下」的低門檻方案加強前台推廣。",
          data: null,
        };
      }
      setDashAnalystResult(result);
      setDashAnalystState("result");
    }, 1500);
  };

  const runJudgeAgent = () => {
    setIsJudgeAgentRunning(true);
    setJudgeResult(null);
    setJudgeScanStep(1);
    setTimeout(() => {
      setJudgeScanStep(2);
      setTimeout(() => {
        setJudgeScanStep(3);
        setTimeout(() => {
          setIsJudgeAgentRunning(false);
          setJudgeScanStep(0);
          let critiqueData = { hasRisk: false, riskIndex: -1, message: "" };

          if (selectedApplicantDetails.id === "APP-113-987654") {
            critiqueData = {
              hasRisk: false,
              riskIndex: -1,
              message:
                "✅ Judge Agent 查核通過：\n1. 該單位為「餐飲服務業」，規模 15 人，完全符合本計畫補助對象。\n2. 預期效益具備具體量化指標（縮短時間 30%、營收佔比 40%）。\n3. 草稿內容與本計畫「數位賦能」宗旨高度契合，無異常風險，建議予以核定。",
            };
          } else if (selectedApplicantDetails.applicantId === "A-003") {
            critiqueData = {
              hasRisk: true,
              riskIndex: 0,
              message:
                "⚠️ Judge Agent 批判：該單位組織規模僅 3 人，資本額僅 20 萬，但本次申請高達 300 萬補助。經 Vector DB 比對，本案執行量能與預期 KPI 嚴重背離，【退件風險極高】。",
            };
          } else {
            critiqueData = {
              hasRisk: false,
              riskIndex: -1,
              message:
                "✅ Judge Agent 查核通過：該單位之資本額、過往履歷與本次 KPI 設置皆在合理常態分佈區間內，未發現明顯風險指標。",
            };
          }
          setJudgeResult(critiqueData);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const runArchitectAgent = () => {
    setIsArchitectRunning(true);
    setArchitectStep(1);
    setTimeout(() => {
      setArchitectStep(2);
      setTimeout(() => {
        setArchitectStep(3);
        setTimeout(() => {
          setIsArchitectRunning(false);
          setArchitectStep(0);
          setSetupFormData({
            id: `PG-${currentRocYear}-${Math.floor(Math.random() * 1000)
              .toString()
              .padStart(3, "0")}`,
            name: "115年度中小企業 AI 躍升先期導航計畫 (由 AI 匯入)",
            year: currentRocYear.toString(),
            agency:
              currentUserAgency === "系統總管理者 (Super Admin)"
                ? "數位發展部數位產業署"
                : currentUserAgency,
            type: "補助型",
            status: "尚未執行",
            budget: 150000000,
            startDate: "2026-01-01",
            endDate: "2026-12-31",
            objective: "推動百工百業導入生成式 AI，提升營運效率",
            description:
              "【Agent 自動萃取重點】：本計畫預計補助中小微企業導入雲端 AI 運算資源與顧問輔導，預期帶動 500 家企業轉型。每家企業補助上限 30 萬元。",
          });
        }, 1200);
      }, 1200);
    }, 1200);
  };

  // 模組運算邏輯
  const dashboardStats = useMemo(() => {
    const filteredDashPrograms = programs.filter(
      (p) =>
        (dashFilterYear === "all" || p.year === dashFilterYear) &&
        (dashFilterAgency === "all" || p.agency === dashFilterAgency)
    );
    const programIds = filteredDashPrograms.map((p) => p.id);
    const filteredDashProjects = projects.filter((prj) =>
      programIds.includes(prj.programId)
    );
    const totalBudget = filteredDashPrograms.reduce(
      (sum, p) => sum + p.budget,
      0
    );
    const statusCounts = filteredDashProjects.reduce((acc, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, {});
    const agencyDist = {};
    filteredDashPrograms.forEach((p) => {
      const key = dashFilterAgency === "all" ? p.agency : p.name;
      agencyDist[key] = (agencyDist[key] || 0) + p.budget;
    });
    const sortedDist = Object.entries(agencyDist).sort((a, b) => b[1] - a[1]);

    const scaleCategories = [
      {
        key: "small",
        label: `小微企業 (≤${systemConfig.scaleThresholdSmall}人)`,
      },
      {
        key: "medium",
        label: `中堅企業 (${systemConfig.scaleThresholdSmall + 1}-${
          systemConfig.scaleThresholdMedium
        }人)`,
      },
      {
        key: "large",
        label: `大型企業 (>${systemConfig.scaleThresholdMedium}人)`,
      },
    ];
    const crossAnalysisData = {};
    scaleCategories.forEach((c) => {
      crossAnalysisData[c.label] = {
        補助型: 0,
        輔導型: 0,
        專案型: 0,
        total: 0,
      };
    });
    filteredDashProjects.forEach((prj) => {
      const prog = filteredDashPrograms.find((p) => p.id === prj.programId);
      if (!prog) return;
      const applicant = mockApplicants[prj.applicantId];
      const empNum = applicant?.attr?.EMPLOYEE_NUMBER || 0;
      let scaleLabel =
        empNum <= systemConfig.scaleThresholdSmall
          ? scaleCategories[0].label
          : empNum <= systemConfig.scaleThresholdMedium
          ? scaleCategories[1].label
          : scaleCategories[2].label;
      if (crossAnalysisData[scaleLabel][prog.type] !== undefined) {
        crossAnalysisData[scaleLabel][prog.type] += 1;
        crossAnalysisData[scaleLabel].total += 1;
      }
    });
    return {
      programCount: filteredDashPrograms.length,
      projectCount: filteredDashProjects.length,
      applicantCount: new Set(
        filteredDashProjects.map((prj) => prj.applicantId)
      ).size,
      totalBudget,
      sortedDist,
      maxDistVal: sortedDist.length > 0 ? sortedDist[0][1] : 1,
      statusCounts,
      totalProjectsCount: filteredDashProjects.length || 1,
      crossAnalysisData,
      scaleCategories,
    };
  }, [dashFilterYear, dashFilterAgency, programs, projects, systemConfig]);

  const setupPrograms = useMemo(() => {
    let baseList =
      currentUserAgency === "系統總管理者 (Super Admin)"
        ? programs
        : programs.filter((p) => p.agency === currentUserAgency);
    if (setupSearchTrigger)
      baseList = baseList.filter(
        (p) =>
          p.name.includes(setupSearchTrigger) ||
          p.id.includes(setupSearchTrigger)
      );
    if (setupFilterYear !== "all")
      baseList = baseList.filter((p) => p.year === setupFilterYear);
    return baseList;
  }, [programs, currentUserAgency, setupSearchTrigger, setupFilterYear]);

  const filteredReviewPrograms = useMemo(() => {
    let baseList =
      currentUserAgency === "系統總管理者 (Super Admin)"
        ? programs
        : programs.filter((p) => p.agency === currentUserAgency);
    if (reviewSearchTrigger)
      baseList = baseList.filter((p) => p.name.includes(reviewSearchTrigger));
    if (reviewFilterYear !== "all")
      baseList = baseList.filter((p) => p.year === reviewFilterYear);
    const targetAgency =
      currentUserAgency === "系統總管理者 (Super Admin)"
        ? reviewFilterAgency
        : currentUserAgency;
    if (targetAgency !== "all")
      baseList = baseList.filter((p) => p.agency === targetAgency);
    return baseList;
  }, [
    programs,
    reviewSearchTrigger,
    reviewFilterYear,
    reviewFilterAgency,
    currentUserAgency,
  ]);

  const myApplications = useMemo(() => {
    if (!selectedProgramForReview) return [];
    return projects
      .filter((prj) => prj.programId === selectedProgramForReview)
      .map((prj) => ({ ...prj, applicant: mockApplicants[prj.applicantId] }));
  }, [projects, selectedProgramForReview]);

  const filteredQueryPrograms = useMemo(() => {
    return programs.filter((item) => {
      const matchSearch =
        item.name.includes(searchTrigger) || item.id.includes(searchTrigger);
      const matchYear = filterYear === "all" || item.year === filterYear;
      return matchSearch && matchYear;
    });
  }, [searchTrigger, filterYear, programs]);

  const currentProjectsForDrilldown = useMemo(() => {
    if (!selectedProgram) return [];
    return projects
      .filter((p) => p.programId === selectedProgram.id)
      .map((p) => ({ ...p, applicant: mockApplicants[p.applicantId] }));
  }, [selectedProgram, projects]);

  const getStatusColor = (status) => {
    if (
      status.includes("執行中") ||
      status.includes("上架中") ||
      status.includes("通過")
    )
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (status.includes("已結案") || status.includes("發布"))
      return "bg-slate-100 text-slate-600 border-slate-200";
    if (status.includes("受理") || status.includes("審查"))
      return "bg-blue-100 text-blue-700 border-blue-200";
    if (
      status.includes("尚未執行") ||
      status.includes("草稿") ||
      status.includes("已下架")
    )
      return "bg-amber-100 text-amber-700 border-amber-200";
    if (status.includes("退件") || status.includes("駁回"))
      return "bg-red-100 text-red-700 border-red-200";
    return "bg-slate-100 text-slate-600 border-slate-200";
  };

  const handleOpenSetupModal = (program = null) => {
    if (program) {
      setSetupFormData({ ...program });
      setIsEditingSetup(true);
    } else {
      setSetupFormData({
        id: `PG-${currentRocYear}-${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`,
        name: "",
        year: currentRocYear.toString(),
        agency:
          currentUserAgency === "系統總管理者 (Super Admin)"
            ? "數位發展部數位產業署"
            : currentUserAgency,
        type: "補助型",
        status: "尚未執行",
        budget: 0,
        startDate: "",
        endDate: "",
        objective: "",
        description: "",
      });
      setIsEditingSetup(false);
    }
    setIsSetupModalOpen(true);
  };

  const handleSaveSetup = (e) => {
    e.preventDefault();
    if (isEditingSetup)
      setPrograms((prev) =>
        prev.map((p) => (p.id === setupFormData.id ? setupFormData : p))
      );
    else setPrograms((prev) => [setupFormData, ...prev]);
    setIsSetupModalOpen(false);
  };

  const executeDelete = (id) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirmId(null);
    setProjects((prev) => prev.filter((prj) => prj.programId !== id));
  };

  const handleReviewProject = (projectId, newStatus) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, status: newStatus } : p))
    );
    if (selectedApplicantDetails?.id === projectId)
      setSelectedApplicantDetails((prev) => ({ ...prev, status: newStatus }));
  };

  const handleSaveSystemConfig = (e) => {
    e.preventDefault();
    setIsConfigSaved(true);
    setTimeout(() => setIsConfigSaved(false), 3000);
  };

  const toggleNavVisibility = (id) => {
    setNavItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const handleSendChat = (overrideMsg = null) => {
    const msgToSend = overrideMsg || chatInput.trim();
    if (!msgToSend) return;
    setChatMessages((prev) => [...prev, { role: "user", content: msgToSend }]);
    setChatInput("");
    setIsAITyping(true);
    setTimeout(() => {
      let aiReply = "";
      if (msgToSend.includes("本頁摘要") || msgToSend.includes("總結")) {
        const currentMenuName =
          menuGroups.flatMap((g) => g.items).find((m) => m.id === activeMenu)
            ?.name || "未知模組";
        aiReply = `您目前位於「${currentMenuName}」。根據目前頁面資訊，一切運作正常，無明顯異常指標。`;
      } else if (msgToSend.includes("異常") || msgToSend.includes("風險")) {
        aiReply = `已為您執行快速掃描：\n- 發現 **${
          dashboardStats.statusCounts["已退件"] || 0
        } 件** 已退件專案。\n- 目前 Token 消耗量已達 ${(
          (systemConfig.tokenUsage / systemConfig.monthlyTokenLimit) *
          100
        ).toFixed(1)}%，尚在安全範圍內。`;
      } else if (msgToSend.includes("推薦核定")) {
        aiReply = `根據 AI 綜合評估模型，推薦優先核定以下案件：\n1. **${
          myApplications[0]?.name || "無"
        }** (技術指標優異)\n2. **${
          myApplications[1]?.name || "無"
        }** (政策對標度高)\n*註：僅供參考，請以實際審查會議結論為準。*`;
      } else {
        aiReply = `長官您好，我已經收到您的指示：「${msgToSend}」。我會持續監控平台數據，有任何異常隨時向您回報。`;
      }
      setChatMessages((prev) => [...prev, { role: "ai", content: aiReply }]);
      setIsAITyping(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-800 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl z-20 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <span className="text-white font-bold text-lg tracking-wide">
            跨計畫平台 CMS
          </span>
        </div>

        <div className="p-4 flex flex-col gap-6 flex-1 overflow-y-auto custom-scrollbar">
          {menuGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="flex flex-col gap-1">
              <div className="text-xs font-bold text-slate-500 mb-1 px-2 tracking-wider">
                {group.title}
              </div>
              {group.items.map((menu) => {
                const Icon = menu.icon;
                const isActive = activeMenu === menu.id;
                return (
                  <button
                    key={menu.id}
                    onClick={() => {
                      setActiveMenu(menu.id);
                      setViewLayer(1);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                      isActive
                        ? "bg-blue-600 text-white font-medium shadow-md shadow-blue-900/20"
                        : "hover:bg-slate-800 hover:text-slate-100"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={isActive ? "text-blue-100" : "text-slate-400"}
                    />{" "}
                    {menu.name}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <p className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider font-bold flex items-center gap-1">
            <ShieldCheck size={12} /> 切換權限視角 (Demo)
          </p>
          <div className="flex flex-col gap-2">
            <select
              className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              value={currentUserAgency}
              onChange={(e) => {
                setCurrentUserAgency(e.target.value);
                setSelectedProgramForReview("");
                setReviewFilterAgency("all");
                setSetupFilterAgency("all");
                if (
                  e.target.value !== "系統總管理者 (Super Admin)" &&
                  activeMenu === "system"
                )
                  setActiveMenu("dashboard");
              }}
            >
              {AGENCIES.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative bg-slate-50">
        {/* Header */}
        <header className="bg-white h-16 border-b border-slate-200 px-8 flex items-center justify-between shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            {activeMenu === "program_history" && viewLayer === 2 && (
              <button
                onClick={() => setViewLayer(1)}
                className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              {activeMenu === "home" && (
                <>
                  <Home className="text-blue-600" size={24} /> 首頁內容管理
                  (前台布置)
                </>
              )}
              {activeMenu === "website" && (
                <>
                  <Globe className="text-blue-600" size={24} /> 網站內容管理
                  (前台設定)
                </>
              )}
              {activeMenu === "system" && (
                <>
                  <Settings className="text-blue-600" size={24} /> 系統配置管理
                </>
              )}
              {activeMenu === "dashboard" && (
                <>
                  <PieChart className="text-blue-600" size={24} />{" "}
                  政策資源儀表板 (含對話式 BI)
                </>
              )}
              {activeMenu === "program_setup" && (
                <>
                  <FolderKanban className="text-blue-600" size={24} />{" "}
                  計畫設定管理 (Knowledge Architect)
                </>
              )}
              {activeMenu === "program_review" && (
                <>
                  <FileCheck2 className="text-blue-600" size={24} />{" "}
                  計畫申審管理 (Judge Agent)
                </>
              )}
              {activeMenu === "program_history" && (
                <>
                  <History className="text-blue-600" size={24} /> 計畫申請查詢
                  (總覽)
                </>
              )}
            </h1>
          </div>
          <div className="text-sm px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-medium border border-indigo-100 flex items-center gap-2 shadow-sm">
            <Building2 size={16} /> 當前視角：{currentUserAgency}
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
          {/* ===================================================================== */}
          {/* Dashboard                                                              */}
          {/* ===================================================================== */}
          {activeMenu === "dashboard" && (
            <div className="animate-in fade-in duration-500 flex-1 overflow-y-auto p-8 h-full">
              {/* Data Analyst Agent UI */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden mb-8 transform transition-all duration-300">
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 p-6 md:p-8 flex flex-col items-center relative overflow-hidden">
                  <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-[80px] pointer-events-none"></div>
                  <div className="text-center mb-6 relative z-10">
                    <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2 mb-2">
                      <Sparkles className="text-indigo-400" /> Data Analyst
                      Agent 數據挖掘
                    </h2>
                    <p className="text-slate-400 text-sm">
                      請使用自然語言提問，系統將自動調用資料庫產生動態圖表與結論。
                    </p>
                  </div>
                  <div className="w-full max-w-4xl relative z-10">
                    <div className="relative flex items-center shadow-lg">
                      <div className="absolute inset-y-0 left-4 flex items-center">
                        <MessageSquareText
                          className="text-indigo-500"
                          size={22}
                        />
                      </div>
                      <input
                        type="text"
                        className="w-full bg-white/95 border-2 border-indigo-500/30 rounded-xl pl-12 pr-24 py-4 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                        placeholder="例如：幫我分析各產業的媒合成功率？"
                        value={dashAnalystQuery}
                        onChange={(e) => setDashAnalystQuery(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && runDataAnalyst(dashAnalystQuery)
                        }
                      />
                      <button
                        onClick={() => runDataAnalyst(dashAnalystQuery)}
                        className="absolute right-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors"
                      >
                        分析
                      </button>
                    </div>
                    <div className="flex justify-center gap-2 mt-4">
                      <span className="text-xs text-slate-400 font-medium">
                        快捷指令：
                      </span>
                      <button
                        onClick={() =>
                          runDataAnalyst(
                            "目前 Agent 幫我們節省了多少審查時間？"
                          )
                        }
                        className="text-xs bg-white/10 hover:bg-white/20 text-indigo-100 border border-white/10 px-3 py-1.5 rounded-full"
                      >
                        ⏳ 審查工時節省效益
                      </button>
                      <button
                        onClick={() => runDataAnalyst("113年度預算消耗比例")}
                        className="text-xs bg-white/10 hover:bg-white/20 text-indigo-100 border border-white/10 px-3 py-1.5 rounded-full"
                      >
                        💰 年度預算消耗比例
                      </button>
                      <button
                        onClick={() => runDataAnalyst("各產業的自動媒合成功率")}
                        className="text-xs bg-white/10 hover:bg-white/20 text-indigo-100 border border-white/10 px-3 py-1.5 rounded-full"
                      >
                        📊 各產業媒合成功率
                      </button>
                    </div>
                  </div>
                </div>

                {dashAnalystState === "loading" && (
                  <div className="bg-slate-50 p-10 flex flex-col items-center justify-center text-indigo-600 border-t border-slate-200">
                    <Loader2 size={32} className="animate-spin mb-3" />
                    <p className="font-bold animate-pulse text-sm">
                      Data Analyst Agent 正在擷取與計算資料庫 (Processing)...
                    </p>
                  </div>
                )}
                {dashAnalystState === "result" && dashAnalystResult && (
                  <div className="bg-white p-6 md:p-8 border-t border-slate-200 animate-in slide-in-from-top-4 fade-in duration-500">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <TrendingUp className="text-indigo-500" />{" "}
                      {dashAnalystResult.title}
                    </h3>
                    <div className="flex flex-col lg:flex-row gap-8 items-center">
                      <div className="flex-1 bg-indigo-50 border border-indigo-100 p-5 rounded-xl text-slate-700 leading-relaxed text-sm md:text-base">
                        <span className="font-bold text-indigo-800">
                          💡 AI 洞察摘要：
                        </span>
                        <br />
                        {dashAnalystResult.text}
                      </div>
                      <div className="flex-1 w-full max-w-md bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                        {dashAnalystResult.type === "bar" && (
                          <div className="space-y-5">
                            {dashAnalystResult.data.map((item, idx) => (
                              <div key={idx}>
                                <div className="flex justify-between text-sm mb-1.5">
                                  <span className="font-bold text-slate-700">
                                    {item.label}
                                  </span>
                                  <span
                                    className={`font-black ${item.textColor}`}
                                  >
                                    {item.displayValue}{" "}
                                    <span className="text-xs font-normal">
                                      {item.unit}
                                    </span>
                                  </span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-3.5">
                                  <div
                                    className={`${item.color} h-3.5 rounded-full`}
                                    style={{ width: `${item.value}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {dashAnalystResult.type === "progress" && (
                          <div className="flex flex-col items-center justify-center py-4">
                            <div className="text-5xl font-black text-indigo-600 mb-2">
                              {dashAnalystResult.data.used}%
                            </div>
                            <div className="text-sm text-slate-500 font-bold">
                              預算已分配比例
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-4">
                <div className="font-bold text-slate-700 flex items-center gap-2 whitespace-nowrap">
                  <Filter size={18} className="text-blue-500" /> 戰情篩選器：
                </div>
                <div className="w-full md:w-48 relative">
                  <select
                    className="w-full appearance-none bg-slate-50 border border-slate-200 py-2 pl-4 pr-10 rounded-lg cursor-pointer"
                    value={dashFilterYear}
                    onChange={(e) => setDashFilterYear(e.target.value)}
                  >
                    <option value="all">不限年度</option>
                    {allYearsInDb.map((y) => (
                      <option key={y} value={y.toString()}>
                        {y} 年度
                      </option>
                    ))}
                  </select>
                  <Filter
                    className="absolute right-3 top-2.5 text-slate-400 pointer-events-none"
                    size={14}
                  />
                </div>
                <div className="w-full md:w-64 relative">
                  <select
                    className="w-full appearance-none bg-slate-50 border border-slate-200 py-2 pl-4 pr-10 rounded-lg cursor-pointer"
                    value={dashFilterAgency}
                    onChange={(e) => setDashFilterAgency(e.target.value)}
                  >
                    <option value="all">不限機構/單位</option>
                    {AGENCIES.filter(
                      (a) => a !== "系統總管理者 (Super Admin)"
                    ).map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                  <Filter
                    className="absolute right-3 top-2.5 text-slate-400 pointer-events-none"
                    size={14}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <p className="text-sm text-slate-500 font-bold mb-1">
                    編列總預算
                  </p>
                  <p className="text-3xl font-black text-slate-800">
                    ${(dashboardStats.totalBudget / 100000000).toFixed(2)} 億
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <p className="text-sm text-slate-500 font-bold mb-1">
                    推動計畫總數
                  </p>
                  <p className="text-3xl font-black text-slate-800">
                    {dashboardStats.programCount} 項
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <p className="text-sm text-slate-500 font-bold mb-1">
                    累計申請案
                  </p>
                  <p className="text-3xl font-black text-slate-800">
                    {dashboardStats.projectCount} 件
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <p className="text-sm text-slate-500 font-bold mb-1">
                    參與企業家數
                  </p>
                  <p className="text-3xl font-black text-slate-800">
                    {dashboardStats.applicantCount} 家
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                    <TableProperties className="text-indigo-500" size={20} />{" "}
                    政策受眾交叉分析矩陣 (Cross-Analysis)
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="p-4 font-bold text-slate-700 w-1/4">
                          企業規模 (由系統參數定義)
                        </th>
                        <th className="p-4 font-bold text-slate-700 text-center border-l border-slate-200">
                          補助型計畫 (件)
                        </th>
                        <th className="p-4 font-bold text-slate-700 text-center border-l border-slate-200">
                          輔導型計畫 (件)
                        </th>
                        <th className="p-4 font-bold text-slate-700 text-center border-l border-slate-200">
                          專案型計畫 (件)
                        </th>
                        <th className="p-4 font-bold text-indigo-700 text-center border-l border-indigo-100 bg-indigo-50/50">
                          總計
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {dashboardStats.scaleCategories.map((scale, idx) => {
                        const rowData =
                          dashboardStats.crossAnalysisData[scale.label];
                        return (
                          <tr
                            key={idx}
                            className="hover:bg-slate-50 transition-colors"
                          >
                            <td className="p-4 font-semibold text-slate-800">
                              {scale.label}
                            </td>
                            <td className="p-4 text-center border-l border-slate-100 font-mono text-base">
                              {rowData["補助型"]}
                            </td>
                            <td className="p-4 text-center border-l border-slate-100 font-mono text-base">
                              {rowData["輔導型"]}
                            </td>
                            <td className="p-4 text-center border-l border-slate-100 font-mono text-base">
                              {rowData["專案型"]}
                            </td>
                            <td className="p-4 text-center border-l border-slate-100 font-bold text-indigo-600 font-mono text-base bg-indigo-50/30">
                              {rowData.total}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* Home (首頁內容管理)                                                     */}
          {/* ===================================================================== */}
          {activeMenu === "home" && (
            <div className="flex flex-col h-full animate-in fade-in duration-500 p-8 overflow-y-auto">
              <div className="flex border-b border-slate-200 mb-6 gap-6 px-2 overflow-x-auto">
                <button
                  onClick={() => setHomeTab("banner")}
                  className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                    homeTab === "banner"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500"
                  }`}
                >
                  <ImageIcon size={18} /> 主視覺橫幅 (Banner)
                </button>
                <button
                  onClick={() => setHomeTab("news")}
                  className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                    homeTab === "news"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500"
                  }`}
                >
                  <Megaphone size={18} /> 最新消息公告
                </button>
                <button
                  onClick={() => setHomeTab("featured")}
                  className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                    homeTab === "featured"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500"
                  }`}
                >
                  <Star size={18} /> 推薦計畫精選區
                </button>
              </div>

              {homeTab === "banner" && (
                <div className="max-w-5xl animate-in slide-in-from-bottom-4 duration-300">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-slate-800">
                          首頁大圖輪播管理
                        </h3>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                        <UploadCloud size={16} /> 上傳新 Banner
                      </button>
                    </div>
                    <table className="w-full text-left">
                      <thead className="bg-white text-slate-500 text-xs uppercase border-b border-slate-200">
                        <tr>
                          <th className="p-4 w-16 text-center">排序</th>
                          <th className="p-4 w-36">圖片預覽</th>
                          <th className="p-4">標題與連結</th>
                          <th className="p-4 text-center w-28">狀態</th>
                          <th className="p-4 text-center w-24">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {banners.map((banner) => (
                          <tr key={banner.id} className="hover:bg-slate-50">
                            <td className="p-4 text-center text-slate-300">
                              <GripVertical
                                size={20}
                                className="mx-auto cursor-move"
                              />
                            </td>
                            <td className="p-4">
                              <div className="w-28 h-10 bg-slate-200 rounded overflow-hidden">
                                <img
                                  src={
                                    banner.status === "上架中"
                                      ? banner.imageUrl
                                      : placeholderImage
                                  }
                                  alt="banner"
                                  className="w-full h-full object-cover opacity-60"
                                />
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-sm">
                                {banner.title}
                              </div>
                              <div className="text-xs text-blue-500 font-mono">
                                {banner.link}
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <span
                                className={`inline-flex px-2.5 py-1 rounded text-xs font-bold border ${getStatusColor(
                                  banner.status
                                )}`}
                              >
                                {banner.status}
                              </span>
                            </td>
                            <td className="p-4 text-center text-slate-400">
                              <button className="p-1.5 hover:text-blue-600 rounded">
                                <Edit size={16} />
                              </button>
                              <button className="p-1.5 hover:text-red-600 rounded">
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {homeTab === "news" && (
                <div className="max-w-5xl animate-in slide-in-from-bottom-4 duration-300">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                      <h3 className="font-bold text-slate-800">
                        最新消息與系統公告
                      </h3>
                      <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-50">
                        <Plus size={16} /> 發布新公告
                      </button>
                    </div>
                    <table className="w-full text-left">
                      <thead className="bg-white text-slate-500 text-xs uppercase border-b border-slate-200">
                        <tr>
                          <th className="p-4 w-16 text-center">
                            <Star size={14} className="mx-auto" />
                          </th>
                          <th className="p-4">公告標題</th>
                          <th className="p-4 w-28">分類</th>
                          <th className="p-4 text-center w-32">發布日期</th>
                          <th className="p-4 text-center w-24">狀態</th>
                          <th className="p-4 text-center w-24">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {newsList.map((news) => (
                          <tr key={news.id} className="hover:bg-slate-50">
                            <td className="p-4 text-center">
                              {news.isPinned ? (
                                <Star
                                  size={16}
                                  className="mx-auto text-amber-400 fill-amber-400 cursor-pointer"
                                />
                              ) : (
                                <Star
                                  size={16}
                                  className="mx-auto text-slate-200 cursor-pointer hover:text-slate-400"
                                />
                              )}
                            </td>
                            <td className="p-4 font-bold text-sm">
                              {news.title}
                            </td>
                            <td className="p-4 text-xs">
                              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                {news.category}
                              </span>
                            </td>
                            <td className="p-4 text-sm text-slate-500 text-center font-mono">
                              {news.publishDate}
                            </td>
                            <td className="p-4 text-center">
                              <span
                                className={`inline-flex px-2.5 py-1 rounded text-xs font-bold border ${getStatusColor(
                                  news.status
                                )}`}
                              >
                                {news.status}
                              </span>
                            </td>
                            <td className="p-4 text-center text-slate-400">
                              <button className="p-1.5 hover:text-blue-600 rounded">
                                <FileEdit size={16} />
                              </button>
                              <button className="p-1.5 hover:text-red-600 rounded">
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {homeTab === "featured" && (
                <div className="max-w-5xl animate-in slide-in-from-bottom-4 duration-300">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                    <div className="p-5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                      <h3 className="font-bold text-slate-800">
                        推薦計畫精選區 (Featured Programs)
                      </h3>
                      <div className="flex gap-2">
                        <select className="bg-white border border-slate-300 px-3 py-2 rounded-lg text-sm w-64 cursor-pointer">
                          <option value="">-- 從資料庫挑選計畫加入 --</option>
                          {programs
                            .filter((p) => !featuredPrograms.includes(p.id))
                            .map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                        </select>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition">
                          加入精選
                        </button>
                      </div>
                    </div>
                    <table className="w-full text-left">
                      <thead className="bg-white text-slate-500 text-xs uppercase border-b border-slate-200">
                        <tr>
                          <th className="p-4 w-16 text-center">排序</th>
                          <th className="p-4">計畫名稱 (自動連動資料庫)</th>
                          <th className="p-4 w-36">主辦機關</th>
                          <th className="p-4 text-center w-28">當前狀態</th>
                          <th className="p-4 text-center w-24">移除</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {featuredPrograms.map((fpId) => {
                          const prog = programs.find((p) => p.id === fpId);
                          if (!prog) return null;
                          return (
                            <tr key={prog.id} className="hover:bg-slate-50">
                              <td className="p-4 text-center text-slate-300">
                                <GripVertical
                                  size={20}
                                  className="mx-auto cursor-move"
                                />
                              </td>
                              <td className="p-4 font-bold text-sm">
                                {prog.name}
                              </td>
                              <td className="p-4 text-xs text-slate-500">
                                {prog.agency}
                              </td>
                              <td className="p-4 text-center">
                                <span
                                  className={`inline-flex px-2.5 py-1 rounded text-[10px] font-bold border ${getStatusColor(
                                    prog.status
                                  )}`}
                                >
                                  {prog.status}
                                </span>
                              </td>
                              <td className="p-4 text-center text-slate-400">
                                <button className="p-1.5 hover:text-red-600 rounded">
                                  <XCircle size={18} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===================================================================== */}
          {/* Website (網站內容管理)                                                   */}
          {/* ===================================================================== */}
          {activeMenu === "website" && (
            <div className="flex flex-col h-full animate-in fade-in duration-500 p-8 overflow-y-auto">
              <div className="flex border-b border-slate-200 mb-6 gap-8 px-2">
                <button
                  onClick={() => setWebsiteTab("seo")}
                  className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
                    websiteTab === "seo"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Monitor size={18} /> 基礎與 SEO 設定
                </button>
                <button
                  onClick={() => setWebsiteTab("nav")}
                  className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
                    websiteTab === "nav"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <LinkIcon size={18} /> 導覽列與選單
                </button>
                <button
                  onClick={() => setWebsiteTab("pages")}
                  className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
                    websiteTab === "pages"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <LayoutTemplate size={18} /> 靜態頁面編輯
                </button>
                <button
                  onClick={() => setWebsiteTab("docs")}
                  className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
                    websiteTab === "docs"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <FolderDown size={18} /> 文件下載中心
                </button>
              </div>

              {websiteTab === "seo" && (
                <div className="max-w-4xl space-y-6 animate-in slide-in-from-bottom-4 duration-300">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-3">
                      全站基礎資訊
                    </h3>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-bold mb-1.5">
                          平台名稱
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm"
                          value={websiteSettings.siteName}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              siteName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-1.5">
                          Google Analytics ID (GA4 追蹤碼)
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-mono"
                          value={websiteSettings.gaId}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              gaId: e.target.value,
                            })
                          }
                          placeholder="G-XXXXXXXXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-1.5">
                          搜尋引擎描述
                        </label>
                        <textarea
                          rows="3"
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm resize-none"
                          value={websiteSettings.seoDesc}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              seoDesc: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-2.5 rounded-lg font-bold flex items-center gap-2">
                      <Save size={18} /> 儲存網站設定
                    </button>
                  </div>
                </div>
              )}

              {websiteTab === "nav" && (
                <div className="max-w-5xl animate-in slide-in-from-bottom-4 duration-300">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                      <h3 className="font-bold text-slate-800">
                        前台網站導覽列結構
                      </h3>
                      <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-50">
                        <Plus size={16} /> 新增選單
                      </button>
                    </div>
                    <table className="w-full text-left">
                      <thead className="bg-white text-slate-500 text-xs uppercase border-b border-slate-200">
                        <tr>
                          <th className="p-4 w-16 text-center">排序</th>
                          <th className="p-4">選單文字</th>
                          <th className="p-4">連結目標</th>
                          <th className="p-4 text-center">位置</th>
                          <th className="p-4 text-center">狀態</th>
                          <th className="p-4 text-center">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {navItems.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50">
                            <td className="p-4 text-center text-slate-300">
                              <GripVertical
                                size={20}
                                className="mx-auto cursor-move"
                              />
                            </td>
                            <td className="p-4 font-bold text-sm">
                              {item.label}
                            </td>
                            <td className="p-4 text-sm text-blue-600 font-mono">
                              {item.url}
                            </td>
                            <td className="p-4 text-center">
                              <span
                                className={`text-xs px-2.5 py-1 rounded-md ${
                                  item.position === "header"
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {item.position}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => toggleNavVisibility(item.id)}
                                className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
                                  item.visible
                                    ? "bg-emerald-500"
                                    : "bg-slate-300"
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                    item.visible
                                      ? "translate-x-6"
                                      : "translate-x-1"
                                  }`}
                                />
                              </button>
                            </td>
                            <td className="p-4 text-center text-slate-400">
                              <button className="p-1.5 hover:text-blue-600 rounded">
                                <Edit size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {websiteTab === "pages" && (
                <div className="max-w-5xl animate-in slide-in-from-bottom-4 duration-300">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                      <h3 className="font-bold text-slate-800">靜態頁面管理</h3>
                    </div>
                    <table className="w-full text-left">
                      <thead className="bg-white text-slate-500 text-xs uppercase border-b border-slate-200">
                        <tr>
                          <th className="p-4">頁面標題</th>
                          <th className="p-4">路徑</th>
                          <th className="p-4 text-center">最後更新</th>
                          <th className="p-4 text-center">狀態</th>
                          <th className="p-4 text-center">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {staticPages.map((page) => (
                          <tr key={page.id} className="hover:bg-slate-50">
                            <td className="p-4 font-bold text-sm">
                              {page.title}
                            </td>
                            <td className="p-4 text-sm text-slate-500 font-mono">
                              /{page.slug}
                            </td>
                            <td className="p-4 text-sm text-slate-500 text-center">
                              {page.lastUpdated}
                            </td>
                            <td className="p-4 text-center">
                              <span
                                className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusColor(
                                  page.status
                                )}`}
                              >
                                {page.status}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <button className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md font-bold transition border border-blue-200">
                                <FileEdit size={14} /> 編輯
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {websiteTab === "docs" && (
                <div className="max-w-5xl animate-in slide-in-from-bottom-4 duration-300">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                      <h3 className="font-bold text-slate-800">公版文件管理</h3>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700">
                        <UploadCloud size={16} /> 上傳新檔案
                      </button>
                    </div>
                    <table className="w-full text-left">
                      <thead className="bg-white text-slate-500 text-xs uppercase border-b border-slate-200">
                        <tr>
                          <th className="p-4">檔案名稱</th>
                          <th className="p-4">分類</th>
                          <th className="p-4 text-center">檔案大小</th>
                          <th className="p-4 text-center">下載次數</th>
                          <th className="p-4 text-center">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {docs.map((doc) => (
                          <tr key={doc.id} className="hover:bg-slate-50">
                            <td className="p-4 font-bold text-sm flex items-center gap-2">
                              <FileText size={16} className="text-slate-400" />{" "}
                              {doc.name}
                            </td>
                            <td className="p-4 text-sm text-slate-600">
                              <span className="bg-slate-100 px-2 py-1 rounded text-xs">
                                {doc.category}
                              </span>
                            </td>
                            <td className="p-4 text-sm text-slate-500 text-center font-mono">
                              {doc.size}
                            </td>
                            <td className="p-4 text-sm font-bold text-center">
                              {doc.downloads}{" "}
                              <span className="text-xs font-normal text-slate-400">
                                次
                              </span>
                            </td>
                            <td className="p-4 text-center text-slate-400">
                              <button className="p-1.5 hover:text-red-600 rounded">
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===================================================================== */}
          {/* System (系統配置管理) V8: 信件通知細項拆解                                  */}
          {/* ===================================================================== */}
          {activeMenu === "system" && (
            <div className="animate-in fade-in duration-300 max-w-4xl mx-auto p-8 overflow-y-auto h-full">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">
                  全域系統參數設定
                </h2>
              </div>
              {currentUserAgency !== "系統總管理者 (Super Admin)" ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                  <ShieldCheck
                    size={48}
                    className="text-red-400 mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-red-800 mb-2">
                    權限不足
                  </h3>
                  <p className="text-red-600">請切換為系統總管理者解鎖。</p>
                </div>
              ) : (
                <div className="space-y-6 pb-20">
                  {/* 系統與營運參數設定 */}
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden border-l-4 border-l-blue-500">
                    <div className="px-6 py-4 bg-blue-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Settings size={18} className="text-blue-700" />
                        <h3 className="font-bold text-blue-900">
                          一般系統與營運參數設定
                        </h3>
                      </div>
                    </div>
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold mb-2 flex items-center gap-1">
                            <Power size={14} className="text-slate-500" />{" "}
                            系統維護模式 (暫停前台服務)
                          </label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={systemConfig.maintenanceMode}
                              onChange={(e) =>
                                setSystemConfig({
                                  ...systemConfig,
                                  maintenanceMode: e.target.checked,
                                })
                              }
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                            <span className="ml-3 text-sm font-medium text-slate-600">
                              {systemConfig.maintenanceMode
                                ? "開啟中 (暫停服務)"
                                : "關閉中 (正常營運)"}
                            </span>
                          </label>
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2">
                            維護跑馬燈公告內容
                          </label>
                          <input
                            type="text"
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm"
                            value={systemConfig.systemNotice}
                            onChange={(e) =>
                              setSystemConfig({
                                ...systemConfig,
                                systemNotice: e.target.value,
                              })
                            }
                            placeholder="例如：本週五晚間進行資料庫備份..."
                          />
                        </div>
                      </div>

                      {/* V8 新增: 細粒度信件通知控制 */}
                      <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 mt-2">
                        <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-4">
                          <div>
                            <label className="block text-sm font-bold flex items-center gap-1 text-slate-800">
                              <Bell size={16} className="text-blue-600" />{" "}
                              系統信件發送總閥門 (Master Switch)
                            </label>
                            <p className="text-xs text-slate-500 mt-1">
                              一鍵切斷全站對內外信件。關閉時，下方細部設定將強制反灰失效。
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={systemConfig.emailSettings.master}
                              onChange={(e) =>
                                setSystemConfig({
                                  ...systemConfig,
                                  emailSettings: {
                                    ...systemConfig.emailSettings,
                                    master: e.target.checked,
                                  },
                                })
                              }
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div
                          className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-opacity duration-300 ${
                            !systemConfig.emailSettings.master
                              ? "opacity-40 pointer-events-none grayscale"
                              : ""
                          }`}
                        >
                          {/* 前台操作確認信 */}
                          <div className="flex items-center justify-between bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm">
                            <div>
                              <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                                <MailCheck
                                  size={14}
                                  className="text-emerald-500"
                                />{" "}
                                前台操作確認信
                              </p>
                              <p className="text-[10px] text-slate-500 mt-0.5">
                                帳號註冊、密碼重設、草稿儲存等
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={systemConfig.emailSettings.frontendOps}
                                onChange={(e) =>
                                  setSystemConfig({
                                    ...systemConfig,
                                    emailSettings: {
                                      ...systemConfig.emailSettings,
                                      frontendOps: e.target.checked,
                                    },
                                  })
                                }
                              />
                              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                            </label>
                          </div>
                          {/* 審查與進度通知 */}
                          <div className="flex items-center justify-between bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm">
                            <div>
                              <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                                <FileCheck2
                                  size={14}
                                  className="text-blue-500"
                                />{" "}
                                計畫審查與進度通知
                              </p>
                              <p className="text-[10px] text-slate-500 mt-0.5">
                                核定通過、退件補件、撥款通知等
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={
                                  systemConfig.emailSettings.reviewProgress
                                }
                                onChange={(e) =>
                                  setSystemConfig({
                                    ...systemConfig,
                                    emailSettings: {
                                      ...systemConfig.emailSettings,
                                      reviewProgress: e.target.checked,
                                    },
                                  })
                                }
                              />
                              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                            </label>
                          </div>
                          {/* 系統內部異常警報 */}
                          <div className="flex items-center justify-between bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm">
                            <div>
                              <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                                <MailWarning
                                  size={14}
                                  className="text-amber-500"
                                />{" "}
                                系統內部異常警報
                              </p>
                              <p className="text-[10px] text-slate-500 mt-0.5">
                                Token超標、API斷線、DB連線異常等
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={
                                  systemConfig.emailSettings.systemAlerts
                                }
                                onChange={(e) =>
                                  setSystemConfig({
                                    ...systemConfig,
                                    emailSettings: {
                                      ...systemConfig.emailSettings,
                                      systemAlerts: e.target.checked,
                                    },
                                  })
                                }
                              />
                              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                            </label>
                          </div>
                          {/* 內容發布與推播通知 */}
                          <div className="flex items-center justify-between bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm">
                            <div>
                              <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                                <SendIcon
                                  size={14}
                                  className="text-purple-500"
                                />{" "}
                                內容發布與推播通知
                              </p>
                              <p className="text-[10px] text-slate-500 mt-0.5">
                                新計畫上架、平台最新消息主動訂閱推播
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={
                                  systemConfig.emailSettings.contentUpdates
                                }
                                onChange={(e) =>
                                  setSystemConfig({
                                    ...systemConfig,
                                    emailSettings: {
                                      ...systemConfig.emailSettings,
                                      contentUpdates: e.target.checked,
                                    },
                                  })
                                }
                              />
                              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-500"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <hr className="border-slate-100" />

                      <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Building2 size={16} className="text-slate-500" />{" "}
                        企業規模定義參數 (聯動戰情儀表板)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div>
                          <label className="block text-sm font-bold mb-2 text-slate-700">
                            小微企業人數上限
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              className="w-full bg-white border border-slate-300 rounded-lg p-2.5 pr-8 text-sm"
                              value={systemConfig.scaleThresholdSmall}
                              onChange={(e) =>
                                setSystemConfig({
                                  ...systemConfig,
                                  scaleThresholdSmall: Number(e.target.value),
                                })
                              }
                              min="1"
                            />
                            <span className="absolute right-3 top-2.5 text-slate-400 text-sm">
                              人
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2 text-slate-700">
                            中堅企業人數上限
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              className="w-full bg-white border border-slate-300 rounded-lg p-2.5 pr-8 text-sm"
                              value={systemConfig.scaleThresholdMedium}
                              onChange={(e) =>
                                setSystemConfig({
                                  ...systemConfig,
                                  scaleThresholdMedium: Number(e.target.value),
                                })
                              }
                              min={systemConfig.scaleThresholdSmall + 1}
                            />
                            <span className="absolute right-3 top-2.5 text-slate-400 text-sm">
                              人
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden border-l-4 border-l-purple-500">
                    <div className="px-6 py-4 bg-purple-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu size={18} className="text-purple-700" />
                        <h3 className="font-bold text-purple-900">
                          AI 模型與 Token 額度控制中心
                        </h3>
                      </div>
                    </div>
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-bold mb-2">
                            預設調用 AI 模型
                          </label>
                          <select
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm cursor-pointer"
                            value={systemConfig.aiModel}
                            onChange={(e) =>
                              setSystemConfig({
                                ...systemConfig,
                                aiModel: e.target.value,
                              })
                            }
                          >
                            <option value="gpt-4o">GPT-4o (精準度極高)</option>
                            <option value="gpt-4o-mini">
                              GPT-4o-mini (日常首選)
                            </option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2 flex items-center gap-1">
                            API Key{" "}
                            <Lock size={12} className="text-slate-400" />
                          </label>
                          <input
                            type="password"
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-mono"
                            value={systemConfig.apiKey}
                            onChange={(e) =>
                              setSystemConfig({
                                ...systemConfig,
                                apiKey: e.target.value,
                              })
                            }
                            placeholder="sk-..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2">
                            Token 消耗警告水位
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 pr-8 text-sm font-mono"
                              value={systemConfig.alertThreshold}
                              onChange={(e) =>
                                setSystemConfig({
                                  ...systemConfig,
                                  alertThreshold: Number(e.target.value),
                                })
                              }
                              max="100"
                              min="1"
                            />
                            <span className="absolute right-3 top-2.5 text-slate-400 text-sm">
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-900 rounded-xl p-5 text-white">
                        <div className="flex justify-between items-end mb-2">
                          <div>
                            <p className="text-sm font-bold text-slate-300 mb-1">
                              本月 Token 消耗水位計
                            </p>
                            <p className="text-2xl font-mono font-black">
                              {systemConfig.tokenUsage.toLocaleString()}{" "}
                              <span className="text-sm font-normal">
                                /{" "}
                                {systemConfig.monthlyTokenLimit.toLocaleString()}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-3 mt-3 overflow-hidden relative">
                          <div
                            className={`h-3 rounded-full transition-all ${
                              (systemConfig.tokenUsage /
                                systemConfig.monthlyTokenLimit) *
                                100 >=
                              systemConfig.alertThreshold
                                ? "bg-red-500"
                                : "bg-emerald-500"
                            }`}
                            style={{
                              width: `${
                                (systemConfig.tokenUsage /
                                  systemConfig.monthlyTokenLimit) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <hr className="border-purple-100" />
                      <div>
                        <h4 className="font-bold text-slate-800 mb-4">
                          各模組 AI 輔助功能啟用控制
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            { id: "home", name: "首頁內容管理 (文案生成)" },
                            {
                              id: "dashboard",
                              name: "政策資源儀表板 (戰情分析)",
                            },
                            {
                              id: "program_setup",
                              name: "計畫設定管理 (設定檢查)",
                            },
                            {
                              id: "program_review",
                              name: "計畫申審管理 (審查輔助)",
                            },
                          ].map((module) => (
                            <div
                              key={module.id}
                              className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200"
                            >
                              <span className="text-sm font-medium">
                                {module.name}
                              </span>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={
                                    systemConfig.aiModulesEnabled[module.id]
                                  }
                                  onChange={() =>
                                    setSystemConfig({
                                      ...systemConfig,
                                      aiModulesEnabled: {
                                        ...systemConfig.aiModulesEnabled,
                                        [module.id]:
                                          !systemConfig.aiModulesEnabled[
                                            module.id
                                          ],
                                      },
                                    })
                                  }
                                />
                                <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-4 mt-8 pb-10">
                    {isConfigSaved && (
                      <span className="text-emerald-600 font-bold flex items-center gap-1 animate-in fade-in">
                        <CheckCircle size={18} /> 設定已成功儲存
                      </span>
                    )}
                    <button
                      onClick={handleSaveSystemConfig}
                      className="bg-slate-800 hover:bg-slate-700 transition text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2"
                    >
                      <Save size={18} /> 儲存系統配置
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===================================================================== */}
          {/* Program Setup (計畫設定管理 - Knowledge Architect)                    */}
          {/* ===================================================================== */}
          {activeMenu === "program_setup" && (
            <div className="animate-in fade-in duration-300 p-8 h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    計畫設定管理
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    維護與設定您機關轄下的年度計畫，支援文件智能解析匯入。
                  </p>
                </div>
                <button
                  onClick={() => handleOpenSetupModal()}
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-md"
                >
                  <Plus size={18} /> 新增年度計畫
                </button>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search
                    className="absolute left-4 top-3 text-slate-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="搜尋名稱或編號..."
                    className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    value={tempSetupSearch}
                    onChange={(e) => setTempSetupSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter")
                        setSetupSearchTrigger(tempSetupSearch);
                    }}
                  />
                </div>
                <div className="w-full md:w-48 relative">
                  <select
                    className="w-full bg-slate-50 border border-slate-200 py-2.5 pl-4 pr-10 rounded-lg text-sm cursor-pointer"
                    value={setupFilterYear}
                    onChange={(e) => setSetupFilterYear(e.target.value)}
                  >
                    <option value="all">不限年度</option>
                    {allYearsInDb.map((y) => (
                      <option key={y} value={y.toString()}>
                        {y} 年度
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-10">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                    <tr>
                      <th className="p-4 font-medium w-32">計畫編號</th>
                      <th className="p-4 font-medium">計畫名稱與主辦機關</th>
                      <th className="p-4 font-medium text-center">類型</th>
                      <th className="p-4 font-medium text-right">總預算</th>
                      <th className="p-4 font-medium text-center w-28">狀態</th>
                      <th className="p-4 font-medium text-center w-36">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {setupPrograms.map((p) => (
                      <tr
                        key={p.id}
                        className="hover:bg-blue-50/30 transition-colors group"
                      >
                        <td className="p-4 font-mono text-sm text-slate-600 font-bold">
                          {p.id}
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-slate-800">
                            {p.name}
                          </div>
                          <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                            <Building2 size={12} />
                            {p.agency}
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">
                            {p.type}
                          </span>
                        </td>
                        <td className="p-4 text-right font-mono text-sm">
                          ${(p.budget / 10000).toLocaleString()} 萬
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`inline-flex px-2 py-1 rounded-md text-[11px] font-bold border ${getStatusColor(
                              p.status
                            )}`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          {deleteConfirmId === p.id ? (
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => executeDelete(p.id)}
                                className="text-xs bg-red-600 text-white px-2 py-1 rounded"
                              >
                                確定刪除
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="text-xs bg-slate-200 px-2 py-1 rounded"
                              >
                                取消
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                              <button
                                onClick={() => handleOpenSetupModal(p)}
                                className="p-1.5 text-blue-600 bg-blue-50 rounded"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(p.id)}
                                className="p-1.5 text-red-600 bg-red-50 rounded"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* Program Review (計畫申審管理 - Judge Agent)                             */}
          {/* ===================================================================== */}
          {activeMenu === "program_review" && (
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
              <div className="flex px-8 pt-4 border-b border-slate-200 bg-white shrink-0 gap-6">
                <button
                  onClick={() => setReviewTab("programs")}
                  className={`pb-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
                    reviewTab === "programs"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <FolderKanban size={18} /> 1. 選擇查核計畫
                </button>
                <button
                  onClick={() => setReviewTab("applications")}
                  className={`pb-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
                    reviewTab === "applications"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <CheckSquare size={18} /> 2. 執行案件審核
                </button>
              </div>
              <div className="p-8 flex-1 overflow-y-auto">
                {reviewTab === "programs" && (
                  <div className="animate-in fade-in duration-300">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search
                          className="absolute left-4 top-3 text-slate-400"
                          size={20}
                        />
                        <input
                          type="text"
                          placeholder="搜尋計畫名稱..."
                          className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                          value={tempReviewSearch}
                          onChange={(e) => setTempReviewSearch(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter")
                              setReviewSearchTrigger(tempReviewSearch);
                          }}
                        />
                      </div>
                      <div className="w-full md:w-48 relative">
                        <select
                          className="w-full bg-slate-50 border border-slate-200 py-2.5 pl-4 pr-10 rounded-lg text-sm cursor-pointer"
                          value={reviewFilterYear}
                          onChange={(e) => setReviewFilterYear(e.target.value)}
                        >
                          <option value="all">不限年度</option>
                          {allYearsInDb.map((y) => (
                            <option key={y} value={y.toString()}>
                              {y} 年度
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-10">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                          <tr>
                            <th className="p-4 font-medium w-32">計畫編號</th>
                            <th className="p-4 font-medium">計畫名稱</th>
                            <th className="p-4 font-medium text-center">
                              當前狀態
                            </th>
                            <th className="p-4 font-medium text-center">
                              操作
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredReviewPrograms.map((p) => (
                            <tr
                              key={p.id}
                              className="hover:bg-blue-50/30 transition-colors"
                            >
                              <td className="p-4 font-mono text-sm text-slate-500">
                                {p.id}
                              </td>
                              <td className="p-4 font-bold text-slate-800">
                                {p.name}
                              </td>
                              <td className="p-4 text-center">
                                <span
                                  className={`inline-flex px-2 py-1 rounded-md text-xs font-bold border ${getStatusColor(
                                    p.status
                                  )}`}
                                >
                                  {p.status}
                                </span>
                              </td>
                              <td className="p-4 text-center">
                                <button
                                  onClick={() => {
                                    setSelectedProgramForReview(p.id);
                                    setReviewTab("applications");
                                  }}
                                  className="text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-bold transition border border-blue-200"
                                >
                                  進入審核
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {reviewTab === "applications" && (
                  <div className="animate-in fade-in duration-300">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-6 flex items-center gap-4">
                      <div className="font-bold text-slate-700 whitespace-nowrap">
                        當前審核計畫：
                      </div>
                      <select
                        className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 rounded-lg p-2.5 font-medium cursor-pointer"
                        value={selectedProgramForReview}
                        onChange={(e) =>
                          setSelectedProgramForReview(e.target.value)
                        }
                      >
                        <option value="">-- 請下拉選擇 --</option>
                        {programs.map((p) => (
                          <option key={p.id} value={p.id}>
                            [{p.status}] {p.id} - {p.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {selectedProgramForReview && (
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-10">
                        <table className="w-full text-left">
                          <thead className="bg-white text-slate-500 text-xs uppercase border-b border-slate-200">
                            <tr>
                              <th className="p-4 font-medium">申請專案名稱</th>
                              <th className="p-4 font-medium">申請單位</th>
                              <th className="p-4 font-medium text-center">
                                履歷審查
                              </th>
                              <th className="p-4 font-medium text-center">
                                當前狀態
                              </th>
                              <th className="p-4 font-medium text-center w-48">
                                審核決策
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {myApplications.map((app) => (
                              <tr
                                key={app.id}
                                className={`hover:bg-slate-50 ${
                                  app.id === "APP-113-987654"
                                    ? "bg-amber-50/30"
                                    : ""
                                }`}
                              >
                                <td className="p-4 font-bold text-sm text-slate-800">
                                  {app.name}{" "}
                                  {app.id === "APP-113-987654" && (
                                    <span className="ml-2 text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded border border-amber-200">
                                      前台剛送出✨
                                    </span>
                                  )}
                                </td>
                                <td className="p-4 text-sm text-slate-600 flex items-center gap-2">
                                  <Building2 size={14} />
                                  {app.applicant.name}
                                </td>
                                <td className="p-4 text-center">
                                  <button
                                    onClick={() =>
                                      setSelectedApplicantDetails(app)
                                    }
                                    className="text-blue-600 hover:underline text-xs font-medium flex items-center justify-center mx-auto gap-1"
                                  >
                                    <FileText size={14} /> 啟動 AI 履歷掃描
                                  </button>
                                </td>
                                <td className="p-4 text-center">
                                  <span
                                    className={`inline-flex px-2 py-1 rounded text-xs font-bold border ${getStatusColor(
                                      app.status
                                    )}`}
                                  >
                                    {app.status}
                                  </span>
                                </td>
                                <td className="p-4 text-center">
                                  {app.status === "審查中" ||
                                  app.status === "受理申請" ? (
                                    <div className="flex items-center justify-center gap-2">
                                      <button
                                        onClick={() =>
                                          handleReviewProject(
                                            app.id,
                                            "核定通過"
                                          )
                                        }
                                        className="flex items-center gap-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-2 py-1.5 rounded text-xs font-bold"
                                      >
                                        <CheckCircle size={14} /> 通過
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleReviewProject(app.id, "已退件")
                                        }
                                        className="flex items-center gap-1 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 px-2 py-1.5 rounded text-xs font-bold"
                                      >
                                        <XCircle size={14} /> 退件
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="text-center text-xs text-slate-400 font-medium bg-slate-50 py-1.5 rounded">
                                      決策已鎖定
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* Program History (計畫申請查詢 - 總覽)                                   */}
          {/* ===================================================================== */}
          {activeMenu === "program_history" && viewLayer === 1 && (
            <div className="animate-in fade-in duration-300 p-8 h-full overflow-y-auto">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                    <Search className="text-slate-400" size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="搜尋計畫名稱或編號..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    value={tempQuerySearch}
                    onChange={(e) => setTempQuerySearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setSearchTrigger(tempQuerySearch);
                    }}
                  />
                </div>
                <div className="w-full md:w-64 relative">
                  <select
                    className="w-full bg-white border border-slate-200 py-3 pl-4 pr-10 rounded-lg text-sm cursor-pointer"
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                  >
                    <option value="all">不限年度</option>
                    {allYearsInDb.map((y) => (
                      <option key={y} value={y.toString()}>
                        {y} 年度
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-10">
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center rounded-t-xl">
                  <h3 className="font-semibold text-slate-700 text-sm flex items-center gap-2">
                    <Globe size={16} className="text-slate-400" />
                    公開計畫總覽 (不受單位權限限制)
                  </h3>
                  <span className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                    共 {filteredQueryPrograms.length} 筆
                  </span>
                </div>
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-500 text-sm border-b border-slate-200">
                      <th className="p-4 text-center">年度</th>
                      <th className="p-4">計畫名稱與主辦機關</th>
                      <th className="p-4 text-right">總預算</th>
                      <th className="p-4 text-center">狀態</th>
                      <th className="p-4 text-center">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredQueryPrograms.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-blue-50/50 transition-colors"
                      >
                        <td className="p-4 text-center">
                          <span className="bg-slate-100 text-slate-600 font-mono text-xs px-2 py-1 rounded">
                            {row.year}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-slate-800 text-base">
                            {row.name}
                          </div>
                          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            <Building2 size={12} /> {row.agency}
                          </div>
                        </td>
                        <td className="p-4 text-right font-mono text-sm">
                          ${(row.budget / 10000).toLocaleString()} 萬
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-full border text-xs font-medium ${getStatusColor(
                              row.status
                            )}`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => {
                              setSelectedProgram(row);
                              setViewLayer(2);
                            }}
                            className="text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-1.5 rounded-md text-sm font-bold mx-auto border border-blue-200 transition-colors"
                          >
                            查看細節
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Drilldown Layer 2 */}
          {activeMenu === "program_history" &&
            viewLayer === 2 &&
            selectedProgram && (
              <div className="animate-in slide-in-from-right-4 duration-300 p-8 h-full overflow-y-auto">
                <div className="bg-slate-900 text-white rounded-xl p-6 mb-6 shadow-md border border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full -mt-20 -mr-20 blur-3xl"></div>
                  <div className="relative z-10">
                    <div className="text-blue-400 text-xs font-bold mb-2 tracking-wider">
                      PROGRAM_DETAIL
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold mb-1">
                      {selectedProgram.name}
                    </h2>
                    <p className="text-slate-400 text-sm flex flex-wrap gap-x-4 mt-2">
                      <span className="bg-slate-800 px-2 py-1 rounded">
                        編號：{selectedProgram.id}
                      </span>
                      <span className="bg-slate-800 px-2 py-1 rounded">
                        主辦機關：{selectedProgram.agency}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-10">
                  <div className="p-5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <FileText size={18} className="text-blue-600" />{" "}
                      專案申請清單
                    </h3>
                  </div>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-slate-500 text-xs uppercase border-b border-slate-200">
                        <th className="p-4">申請專案名稱</th>
                        <th className="p-4">申請單位</th>
                        <th className="p-4 text-right">申請金額</th>
                        <th className="p-4 text-center">專案狀態</th>
                        <th className="p-4 text-center">履歷</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {currentProjectsForDrilldown.map((prj) => (
                        <tr
                          key={prj.id}
                          className="hover:bg-blue-50/30 transition-colors"
                        >
                          <td className="p-4">
                            <div className="font-bold text-sm">{prj.name}</div>
                            <div className="text-xs text-slate-400 mt-1 font-mono">
                              ID: {prj.id}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm font-medium flex items-center gap-1.5">
                              <Building2 size={14} /> {prj.applicant.name}
                            </div>
                          </td>
                          <td className="p-4 text-right font-mono text-sm">
                            ${(prj.grant / 10000).toLocaleString()} 萬
                          </td>
                          <td className="p-4 text-center">
                            <span
                              className={`inline-flex px-2.5 py-1 rounded-md border text-xs font-medium ${getStatusColor(
                                prj.status
                              )}`}
                            >
                              {prj.status}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => setSelectedApplicantDetails(prj)}
                              className="text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md text-xs font-bold border border-blue-200 transition-colors"
                            >
                              查看細節
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
        </div>
      </main>

      {/* ===================================================================== */}
      {/* 浮動 AI 戰略導覽員 (Floating Copilot)                                    */}
      {/* ===================================================================== */}
      <div
        className={`fixed bottom-6 right-8 z-50 flex flex-col items-end transition-all duration-300 ${
          isAICopilotOpen ? "translate-y-0 opacity-100" : "translate-y-2"
        }`}
      >
        {isAICopilotOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-[380px] h-[550px] mb-4 flex flex-col overflow-hidden animate-in zoom-in-95 origin-bottom-right">
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">AI 戰略導覽員</h3>
                  <p className="text-[10px] text-blue-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>{" "}
                    模型: {systemConfig.aiModel}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAICopilotOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>
            {systemConfig.aiModulesEnabled[activeMenu] ? (
              <>
                <div className="bg-slate-50 p-2 border-b border-slate-100 flex gap-2 overflow-x-auto shrink-0 custom-scrollbar">
                  <button
                    onClick={() => handleSendChat("生成本頁摘要")}
                    className="text-[11px] font-bold bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm hover:text-blue-600 transition-colors"
                  >
                    ⚡ 生成摘要
                  </button>
                  <button
                    onClick={() => handleSendChat("推薦優先核定名單")}
                    className="text-[11px] font-bold bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm hover:text-emerald-600 transition-colors"
                  >
                    💡 推薦核定名單
                  </button>
                </div>
                <div
                  ref={chatScrollRef}
                  className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4"
                >
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                          msg.role === "user"
                            ? "bg-blue-600 text-white rounded-br-sm"
                            : "bg-white border border-slate-200 text-slate-700 rounded-bl-sm leading-relaxed"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isAITyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center shadow-sm">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.15s" }}
                        ></div>
                        <div
                          className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.3s" }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3 bg-white border-t border-slate-200 shrink-0">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="輸入要求..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-full pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                      disabled={isAITyping}
                    />
                    <button
                      onClick={() => handleSendChat()}
                      disabled={isAITyping || !chatInput.trim()}
                      className="absolute right-1.5 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50">
                <ShieldCheck size={56} className="text-slate-300 mb-4" />
                <h4 className="font-bold text-slate-700 mb-2">
                  此模組AI功能已停用
                </h4>
                <p className="text-sm text-slate-500">請洽系統管理員</p>
              </div>
            )}
          </div>
        )}
        <button
          onClick={() => setIsAICopilotOpen(!isAICopilotOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
            isAICopilotOpen
              ? "bg-slate-800 text-white rotate-90"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isAICopilotOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>

      {/* ===================================================================== */}
      {/* Modals 區塊 (計畫設定與履歷檢視)                                           */}
      {/* ===================================================================== */}

      {/* Setup Modal */}
      {isSetupModalOpen && setupFormData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col my-8">
            <div className="p-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center sticky top-0 z-10">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <Settings size={18} className="text-blue-600" />{" "}
                {isEditingSetup
                  ? "編輯計畫屬性"
                  : "新增年度計畫 (Knowledge Architect)"}
              </h3>
              <button
                onClick={() => setIsSetupModalOpen(false)}
                className="text-slate-400 hover:bg-slate-200 p-1.5 rounded-md transition"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[75vh]">
              {!isEditingSetup && (
                <div className="mb-6 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 p-6 rounded-xl relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-indigo-800 flex items-center gap-2">
                      <Sparkles className="text-indigo-500" /> Agentic
                      智能匯入：自動解析核定文件
                    </h4>
                  </div>
                  {!isArchitectRunning ? (
                    <div
                      className="border-2 border-dashed border-indigo-200 bg-white rounded-lg p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-indigo-50 transition"
                      onClick={runArchitectAgent}
                    >
                      <FileUp size={32} className="text-indigo-300" />
                      <p className="text-sm font-bold text-indigo-600">
                        點擊上傳「計畫須知」或「核定公文」 (PDF/Word)
                      </p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg p-6 flex flex-col items-center justify-center gap-4 border border-indigo-100 shadow-sm">
                      <Loader2
                        size={32}
                        className="text-indigo-600 animate-spin"
                      />
                      <div className="flex items-center gap-3 text-sm font-bold text-indigo-700">
                        {architectStep === 1 &&
                          "1. 讀取文件與 OCR 版面解析 (Reasoning)..."}
                        {architectStep === 2 &&
                          "2. 語意理解與表單欄位萃取 (Orchestrating)..."}
                        {architectStep === 3 &&
                          "3. 結構化資料並寫入安全站存區 (Drafting)..."}
                      </div>
                      <div className="w-full max-w-md bg-indigo-50 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-500 h-2 rounded-full transition-all duration-1000"
                          style={{
                            width:
                              architectStep === 1
                                ? "33%"
                                : architectStep === 2
                                ? "66%"
                                : "100%",
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <form onSubmit={handleSaveSetup} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">
                      計畫編號 (自動生成)
                    </label>
                    <input
                      type="text"
                      value={setupFormData.id}
                      disabled
                      className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2.5 text-sm cursor-not-allowed font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">
                      計畫年度
                    </label>
                    <select
                      required
                      value={setupFormData.year}
                      onChange={(e) =>
                        setSetupFormData({
                          ...setupFormData,
                          year: e.target.value,
                        })
                      }
                      className="w-full border border-slate-300 bg-white rounded-lg px-3 py-2.5 text-sm cursor-pointer"
                    >
                      {allowedCreationYears.map((y) => (
                        <option key={y} value={y.toString()}>
                          {y} 年度
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">
                    計畫名稱 *
                  </label>
                  <input
                    type="text"
                    required
                    value={setupFormData.name}
                    onChange={(e) =>
                      setSetupFormData({
                        ...setupFormData,
                        name: e.target.value,
                      })
                    }
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-bold text-slate-800"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">
                      主辦機關 *
                    </label>
                    <select
                      required
                      value={setupFormData.agency}
                      onChange={(e) =>
                        setSetupFormData({
                          ...setupFormData,
                          agency: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm cursor-pointer"
                    >
                      {AGENCIES.filter(
                        (a) => a !== "系統總管理者 (Super Admin)"
                      ).map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">
                      計畫類型
                    </label>
                    <select
                      value={setupFormData.type}
                      onChange={(e) =>
                        setSetupFormData({
                          ...setupFormData,
                          type: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm cursor-pointer"
                    >
                      <option value="補助型">補助型</option>
                      <option value="輔導型">輔導型</option>
                      <option value="專案型">專案型</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">
                      對外狀態 *
                    </label>
                    <select
                      required
                      value={setupFormData.status}
                      onChange={(e) =>
                        setSetupFormData({
                          ...setupFormData,
                          status: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-blue-700 cursor-pointer"
                    >
                      <option value="尚未執行">尚未執行 (隱藏)</option>
                      <option value="受理申請">受理申請 (開放收件)</option>
                      <option value="執行中">執行中</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">
                      開始日期
                    </label>
                    <input
                      type="date"
                      value={setupFormData.startDate || ""}
                      onChange={(e) =>
                        setSetupFormData({
                          ...setupFormData,
                          startDate: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">
                      結束日期
                    </label>
                    <input
                      type="date"
                      value={setupFormData.endDate || ""}
                      onChange={(e) =>
                        setSetupFormData({
                          ...setupFormData,
                          endDate: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">
                      總預算 (NTD)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={setupFormData.budget || 0}
                      onChange={(e) =>
                        setSetupFormData({
                          ...setupFormData,
                          budget: Number(e.target.value),
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono text-emerald-700 font-bold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">
                    計畫目標
                  </label>
                  <input
                    type="text"
                    value={setupFormData.objective || ""}
                    onChange={(e) =>
                      setSetupFormData({
                        ...setupFormData,
                        objective: e.target.value,
                      })
                    }
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">
                    計畫說明與限制
                  </label>
                  <textarea
                    rows="4"
                    value={setupFormData.description || ""}
                    onChange={(e) =>
                      setSetupFormData({
                        ...setupFormData,
                        description: e.target.value,
                      })
                    }
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm resize-none"
                  ></textarea>
                </div>
                <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsSetupModalOpen(false)}
                    className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-colors flex items-center gap-2"
                  >
                    <CheckCircle size={16} /> 人工確認無誤並儲存
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {selectedApplicantDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 md:p-5 border-b border-slate-200 flex justify-between items-center bg-white shrink-0 relative overflow-hidden">
              {isJudgeAgentRunning && (
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 animate-[pulse_2s_ease-in-out_infinite] pointer-events-none"></div>
              )}
              <div className="relative z-10">
                <h3 className="font-bold text-lg md:text-xl text-slate-800 flex items-center gap-2">
                  申請單位與專案履歷{" "}
                  {judgeResult?.hasRisk && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full border border-red-200 animate-pulse">
                      ⚠️ 檢測出高風險
                    </span>
                  )}
                  {judgeResult && !judgeResult.hasRisk && (
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full border border-emerald-200">
                      ✅ 系統檢核優良
                    </span>
                  )}
                </h3>
              </div>
              <div className="flex items-center gap-4 relative z-10">
                {!isJudgeAgentRunning && !judgeResult && (
                  <button
                    onClick={runJudgeAgent}
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-bold shadow-md hover:scale-105 transition-transform"
                  >
                    <Brain size={18} /> 啟動 Judge Agent 擬真審核
                  </button>
                )}
                {isJudgeAgentRunning && (
                  <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-lg text-indigo-700 text-sm font-bold">
                    <Loader2 size={16} className="animate-spin" />
                    {judgeScanStep === 1 && "1. 意圖理解與需求解析..."}
                    {judgeScanStep === 2 && "2. 流程派發與資料庫比對..."}
                    {judgeScanStep === 3 && "3. 交叉審查與生成判斷..."}
                  </div>
                )}
                <button
                  onClick={() => setSelectedApplicantDetails(null)}
                  className="text-slate-400 hover:text-slate-700 bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>
            {isJudgeAgentRunning && (
              <div className="w-full h-1 bg-indigo-100 relative overflow-hidden shrink-0">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-indigo-500 animate-[translateX_1.5s_infinite_linear]"></div>
              </div>
            )}
            <div className="p-5 md:p-6 overflow-y-auto bg-slate-50 flex-1 relative">
              {judgeResult && (
                <div
                  className={`mb-6 p-4 rounded-xl border flex items-start gap-3 animate-in slide-in-from-top-4 ${
                    judgeResult.hasRisk
                      ? "bg-red-50 border-red-200"
                      : "bg-emerald-50 border-emerald-200"
                  }`}
                >
                  {judgeResult.hasRisk ? (
                    <AlertOctagon size={24} className="text-red-500 shrink-0" />
                  ) : (
                    <CheckCircle
                      size={24}
                      className="text-emerald-500 shrink-0"
                    />
                  )}
                  <div>
                    <h4
                      className={`font-bold ${
                        judgeResult.hasRisk
                          ? "text-red-800"
                          : "text-emerald-800"
                      }`}
                    >
                      {judgeResult.hasRisk
                        ? "AI 審核警告 (Critique Alert)"
                        : "AI 審核建議 (Critique Passed)"}
                    </h4>
                    <p
                      className={`text-sm mt-1 leading-relaxed whitespace-pre-wrap ${
                        judgeResult.hasRisk
                          ? "text-red-700"
                          : "text-emerald-700"
                      }`}
                    >
                      {judgeResult.message}
                    </p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                <div
                  className={`bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col transition-all duration-500 ${
                    isJudgeAgentRunning
                      ? "border-indigo-300 opacity-70"
                      : "border-slate-200"
                  }`}
                >
                  <div className="bg-slate-800 px-5 py-3 flex items-center gap-2 shrink-0">
                    <Building2 size={18} className="text-slate-300" />
                    <h4 className="font-bold text-white tracking-wide">
                      申請單位基資 (Layer 1)
                    </h4>
                  </div>
                  <div className="p-5 space-y-4 flex-1">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">
                        {selectedApplicantDetails.applicant.name}
                      </h2>
                      <p className="text-sm text-slate-500 font-mono mt-1">
                        統編：{selectedApplicantDetails.applicant.identifier}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-xs text-slate-400 font-semibold mb-1">
                          產業屬性
                        </p>
                        <p className="text-sm text-slate-700 font-medium">
                          {selectedApplicantDetails.applicant.attr.INDUSTRY ||
                            "無"}
                        </p>
                      </div>
                      <div
                        className={`rounded p-1 -m-1 transition-colors ${
                          judgeResult?.hasRisk
                            ? "bg-red-50 outline outline-1 outline-red-200"
                            : ""
                        }`}
                      >
                        <p className="text-xs text-slate-400 font-semibold mb-1">
                          組織規模指標 (AI 標定點)
                        </p>
                        <p
                          className={`text-sm font-medium ${
                            judgeResult?.hasRisk
                              ? "text-red-600 font-bold"
                              : "text-slate-700"
                          }`}
                        >
                          {
                            selectedApplicantDetails.applicant.attr
                              .EMPLOYEE_NUMBER
                          }{" "}
                          人
                        </p>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 mt-auto border border-blue-100">
                      <p className="text-xs text-blue-800 font-bold mb-3 flex items-center gap-1">
                        <History size={14} /> 歷史政府補助 (RAG Vector 關聯)
                      </p>
                      <div className="flex justify-between items-center text-center">
                        <div>
                          <p className="text-2xl font-black text-blue-600">
                            {selectedApplicantDetails.applicant.totalProjects}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            累計件數
                          </p>
                        </div>
                        <div className="w-px h-10 bg-blue-200"></div>
                        <div>
                          <p className="text-2xl font-black text-blue-600 font-mono">
                            {(
                              selectedApplicantDetails.applicant.totalGrant /
                              10000
                            ).toLocaleString()}{" "}
                            萬
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            總補助額
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col transition-all duration-500 ${
                    isJudgeAgentRunning
                      ? "border-purple-300 opacity-70"
                      : "border-slate-200"
                  }`}
                >
                  <div className="bg-slate-700 px-5 py-3 flex items-center gap-2 shrink-0">
                    <FolderKanban size={18} className="text-slate-300" />
                    <h4 className="font-bold text-white tracking-wide">
                      本次申請專案 (Layer 2)
                    </h4>
                  </div>
                  <div className="p-5 space-y-4 flex-1">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span
                          className={`text-xs px-2 py-1 rounded border font-medium ${getStatusColor(
                            selectedApplicantDetails.status
                          )}`}
                        >
                          {selectedApplicantDetails.status}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          ID: {selectedApplicantDetails.id}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-slate-800 leading-snug">
                        {selectedApplicantDetails.name}
                      </h2>
                    </div>
                    <div
                      className={`pt-2 rounded p-1 -m-1 transition-colors ${
                        judgeResult?.hasRisk
                          ? "bg-red-50 outline outline-1 outline-red-200 mt-2"
                          : ""
                      }`}
                    >
                      <p className="text-xs text-slate-400 font-semibold mb-1">
                        本次申請核定金額 (AI 標定點)
                      </p>
                      <p
                        className={`text-xl font-bold font-mono ${
                          judgeResult?.hasRisk
                            ? "text-red-600"
                            : "text-emerald-600"
                        }`}
                      >
                        NT${" "}
                        {(
                          selectedApplicantDetails.grant / 10000
                        ).toLocaleString()}{" "}
                        萬
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-xs text-slate-500 font-bold mb-3 flex items-center gap-1">
                        <Target size={14} /> 專案預期效益 / KPI 指標
                      </p>
                      <div className="space-y-3 relative">
                        {isJudgeAgentRunning && judgeScanStep === 3 && (
                          <div className="absolute right-2 top-2 z-10 text-indigo-500 animate-ping">
                            <ScanSearch size={24} />
                          </div>
                        )}
                        {selectedApplicantDetails.metric.map((m, idx) => {
                          const isRiskTarget =
                            judgeResult?.hasRisk &&
                            judgeResult.riskIndex === idx;
                          return (
                            <div
                              key={idx}
                              className={`p-3 rounded-lg border transition-colors duration-500 ${
                                isRiskTarget
                                  ? "bg-red-50 border-red-300 shadow-sm shadow-red-100"
                                  : "bg-slate-50 border-slate-200"
                              }`}
                            >
                              <p
                                className={`text-sm font-bold mb-2 flex items-center gap-2 ${
                                  isRiskTarget
                                    ? "text-red-700"
                                    : "text-slate-800"
                                }`}
                              >
                                {m.name}{" "}
                                {isRiskTarget && (
                                  <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded uppercase">
                                    High Risk
                                  </span>
                                )}
                              </p>
                              <div className="flex gap-4">
                                <div className="flex-1">
                                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">
                                    預計目標
                                  </p>
                                  <p
                                    className={`text-sm font-bold ${
                                      isRiskTarget
                                        ? "text-red-600"
                                        : "text-slate-700"
                                    }`}
                                  >
                                    {m.target}
                                  </p>
                                </div>
                                <div className="flex-1">
                                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">
                                    實際達成
                                  </p>
                                  <p className="text-sm font-medium text-slate-500">
                                    {m.actual}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center shrink-0">
              <div className="hidden md:flex items-center gap-2">
                <Brain size={16} className="text-indigo-400" />
                <span>
                  Agentic Workflow 展示模式：資料由 Layer 1 與 Layer 2
                  交叉推論而成。
                </span>
              </div>
              <button
                onClick={() => setSelectedApplicantDetails(null)}
                className="bg-slate-200 text-slate-700 px-6 py-2.5 rounded-lg hover:bg-slate-300 transition-colors font-medium"
              >
                關閉履歷
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tailwind 自訂動畫 */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes translateX { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
        @keyframes dash { to { stroke-dashoffset: 0; } }
      `,
        }}
      />
    </div>
  );
}
