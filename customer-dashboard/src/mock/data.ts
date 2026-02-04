import type {
  User,
  ServiceRequest,
  NewsReport,
  UsageStats,
  Contract,
  Notification,
  Message,
  Department,
  DepartmentUsageStats
} from '../types';

// モック部門データ
export const mockDepartments: Department[] = [
  {
    id: 'dept-001',
    name: '営業部',
    code: 'SALES',
    color: '#1890ff',
    managerName: '佐藤 一郎',
    memberCount: 15,
  },
  {
    id: 'dept-002',
    name: 'マーケティング部',
    code: 'MARKETING',
    color: '#52c41a',
    managerName: '鈴木 花子',
    memberCount: 8,
  },
  {
    id: 'dept-003',
    name: '人事部',
    code: 'HR',
    color: '#722ed1',
    managerName: '高橋 次郎',
    memberCount: 5,
  },
  {
    id: 'dept-004',
    name: '経理部',
    code: 'FINANCE',
    color: '#fa8c16',
    managerName: '田中 美咲',
    memberCount: 6,
  },
  {
    id: 'dept-005',
    name: '経営企画部',
    code: 'PLANNING',
    color: '#eb2f96',
    managerName: '伊藤 健太',
    memberCount: 4,
  },
  {
    id: 'dept-006',
    name: '情報システム部',
    code: 'IT',
    color: '#13c2c2',
    managerName: '渡辺 大輔',
    memberCount: 7,
  },
];

// モックユーザー
export const mockUser: User = {
  id: 'user-001',
  name: '山田 太郎',
  email: 'yamada@example.com',
  company: '株式会社サンプル',
  plan: 'standard',
  contractStartDate: '2024-01-15',
  departmentId: 'dept-001',
};

// モック依頼データ
export const mockRequests: ServiceRequest[] = [
  {
    id: 'req-001',
    title: '2024年度事業計画書の作成',
    description: '来年度の事業計画書を作成してください。売上目標と主要施策を含めてください。',
    category: 'document',
    status: 'in_progress',
    priority: 'high',
    estimatedHours: 5,
    actualHours: 3,
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-03T15:30:00Z',
    dueDate: '2024-12-10',
    departmentId: 'dept-005',
    requesterName: '伊藤 健太',
  },
  {
    id: 'req-002',
    title: '競合他社分析レポート',
    description: '主要競合3社の製品・価格・マーケティング戦略を分析してください。',
    category: 'market_research',
    status: 'review',
    priority: 'medium',
    estimatedHours: 8,
    actualHours: 7.5,
    createdAt: '2024-11-28T09:00:00Z',
    updatedAt: '2024-12-02T14:00:00Z',
    dueDate: '2024-12-05',
    departmentId: 'dept-002',
    requesterName: '鈴木 花子',
  },
  {
    id: 'req-003',
    title: 'SNS投稿コンテンツ作成（12月分）',
    description: '12月のSNS投稿用コンテンツを20件作成してください。',
    category: 'content',
    status: 'completed',
    priority: 'medium',
    estimatedHours: 4,
    actualHours: 3.5,
    createdAt: '2024-11-25T11:00:00Z',
    updatedAt: '2024-11-30T16:00:00Z',
    departmentId: 'dept-002',
    requesterName: '中村 さくら',
  },
  {
    id: 'req-004',
    title: '売上データ分析レポート',
    description: 'Q3の売上データを分析し、トレンドと改善点をレポートしてください。',
    category: 'data_analysis',
    status: 'pending',
    priority: 'low',
    estimatedHours: 6,
    createdAt: '2024-12-04T08:00:00Z',
    updatedAt: '2024-12-04T08:00:00Z',
    dueDate: '2024-12-15',
    departmentId: 'dept-001',
    requesterName: '佐藤 一郎',
  },
  {
    id: 'req-005',
    title: 'AI導入提案書',
    description: '社内業務へのAI導入に関する提案書を作成してください。',
    category: 'consulting',
    status: 'completed',
    priority: 'high',
    estimatedHours: 10,
    actualHours: 9,
    createdAt: '2024-11-15T10:00:00Z',
    updatedAt: '2024-11-25T17:00:00Z',
    departmentId: 'dept-006',
    requesterName: '渡辺 大輔',
  },
  {
    id: 'req-006',
    title: '採用説明会用プレゼン資料',
    description: '新卒採用説明会で使用するプレゼン資料を作成してください。会社紹介と福利厚生の説明を含めてください。',
    category: 'document',
    status: 'in_progress',
    priority: 'high',
    estimatedHours: 6,
    actualHours: 2,
    createdAt: '2024-12-02T09:00:00Z',
    updatedAt: '2024-12-04T11:00:00Z',
    dueDate: '2024-12-08',
    departmentId: 'dept-003',
    requesterName: '高橋 次郎',
  },
  {
    id: 'req-007',
    title: '月次経費レポート自動化提案',
    description: '毎月の経費レポート作成を自動化するための提案書を作成してください。',
    category: 'consulting',
    status: 'pending',
    priority: 'medium',
    estimatedHours: 4,
    createdAt: '2024-12-03T14:00:00Z',
    updatedAt: '2024-12-03T14:00:00Z',
    dueDate: '2024-12-20',
    departmentId: 'dept-004',
    requesterName: '田中 美咲',
  },
];

// 部門別利用統計
export const mockDepartmentStats: DepartmentUsageStats[] = [
  { departmentId: 'dept-001', departmentName: '営業部', usedHours: 4.5, requestCount: 2, completedCount: 1 },
  { departmentId: 'dept-002', departmentName: 'マーケティング部', usedHours: 6, requestCount: 3, completedCount: 2 },
  { departmentId: 'dept-003', departmentName: '人事部', usedHours: 2, requestCount: 1, completedCount: 0 },
  { departmentId: 'dept-004', departmentName: '経理部', usedHours: 1.5, requestCount: 1, completedCount: 0 },
  { departmentId: 'dept-005', departmentName: '経営企画部', usedHours: 3, requestCount: 1, completedCount: 0 },
  { departmentId: 'dept-006', departmentName: '情報システム部', usedHours: 1.5, requestCount: 1, completedCount: 1 },
];

// モックメッセージ
export const mockMessages: Message[] = [
  {
    id: 'msg-001',
    requestId: 'req-001',
    senderId: 'user-001',
    senderName: '山田 太郎',
    senderType: 'customer',
    content: '事業計画書の作成をお願いします。売上目標は前年比120%でお願いします。',
    createdAt: '2024-12-01T10:00:00Z',
  },
  {
    id: 'msg-002',
    requestId: 'req-001',
    senderId: 'staff-001',
    senderName: 'OTASUKE AI サポート',
    senderType: 'staff',
    content: '承知しました。現在作成を進めております。中間報告を明日お送りいたします。',
    createdAt: '2024-12-01T10:30:00Z',
  },
  {
    id: 'msg-003',
    requestId: 'req-001',
    senderId: 'staff-001',
    senderName: 'OTASUKE AI サポート',
    senderType: 'staff',
    content: '中間報告です。売上目標の章まで完成しました。添付ファイルをご確認ください。',
    createdAt: '2024-12-02T15:00:00Z',
  },
];

// モックニュースレポート
export const mockNewsReports: NewsReport[] = [
  {
    id: 'news-001',
    title: 'OpenAI、GPT-5の開発を正式発表',
    summary: 'OpenAIが次世代モデルGPT-5の開発を正式に発表。2025年前半のリリースを予定。',
    content: `OpenAIは本日、次世代言語モデル「GPT-5」の開発を正式に発表しました。

主な特徴：
- マルチモーダル能力の大幅強化
- 推論能力の向上
- より長いコンテキストウィンドウ
- 効率的な処理による低コスト化

リリースは2025年前半を予定しており、企業向けAPIも同時に提供される見込みです。`,
    category: 'AI動向',
    publishedAt: '2024-12-04T09:00:00Z',
    tags: ['OpenAI', 'GPT-5', 'LLM'],
    isRead: false,
  },
  {
    id: 'news-002',
    title: 'Google、Gemini 2.0を発表 - マルチモーダルAIの新時代',
    summary: 'GoogleがGemini 2.0を発表。画像・音声・動画の統合処理能力が大幅向上。',
    content: `Googleは最新のAIモデル「Gemini 2.0」を発表しました。

新機能：
- リアルタイム動画分析
- 高精度な画像生成
- 多言語音声認識の精度向上
- コード生成能力の強化

Google Cloud経由で即日利用可能となっています。`,
    category: 'AI動向',
    publishedAt: '2024-12-03T10:00:00Z',
    tags: ['Google', 'Gemini', 'マルチモーダル'],
    isRead: true,
  },
  {
    id: 'news-003',
    title: '日本企業のAI導入率が50%を突破',
    summary: '経産省の調査により、日本企業のAI導入率が初めて50%を超えたことが明らかに。',
    content: `経済産業省の最新調査によると、日本企業のAI導入率が50.3%となり、初めて過半数を超えました。

業種別導入率：
- 製造業: 58%
- 金融業: 65%
- 小売業: 45%
- サービス業: 42%

主な用途は業務効率化、顧客対応、データ分析となっています。`,
    category: '市場動向',
    publishedAt: '2024-12-02T11:00:00Z',
    tags: ['日本市場', 'AI導入', '統計'],
    isRead: true,
  },
  {
    id: 'news-004',
    title: 'Microsoft Copilot、新機能追加でさらに便利に',
    summary: 'Microsoft CopilotにExcel自動分析機能とPowerPoint自動生成機能が追加。',
    content: `MicrosoftはCopilotの大型アップデートを発表しました。

新機能：
- Excelデータの自動分析・可視化
- PowerPointプレゼンテーションの自動生成
- Teamsミーティングの自動議事録作成
- Outlookメールの自動返信提案

Microsoft 365ユーザーは追加料金なしで利用可能です。`,
    category: 'ツール情報',
    publishedAt: '2024-12-01T14:00:00Z',
    tags: ['Microsoft', 'Copilot', '生産性'],
    isRead: false,
  },
  {
    id: 'news-005',
    title: 'ChatGPT、日本語対応が大幅強化',
    summary: 'OpenAIがChatGPTの日本語対応を強化。敬語や専門用語の精度が向上。',
    content: `OpenAIはChatGPTの日本語対応を大幅に強化したと発表しました。

改善点：
- ビジネス敬語の正確な使用
- 業界専門用語への対応強化
- 日本固有の文化・慣習への理解向上
- 縦書き対応の出力オプション追加

日本市場でのさらなる普及が期待されます。`,
    category: 'AI動向',
    publishedAt: '2024-11-30T09:00:00Z',
    tags: ['OpenAI', 'ChatGPT', '日本語'],
    isRead: true,
  },
];

// モック利用統計
export const mockUsageStats: UsageStats = {
  totalHours: 30,
  usedHours: 18.5,
  remainingHours: 11.5,
  monthlyBreakdown: [
    { month: '2024-07', hours: 25, requests: 8 },
    { month: '2024-08', hours: 28, requests: 10 },
    { month: '2024-09', hours: 30, requests: 12 },
    { month: '2024-10', hours: 27, requests: 9 },
    { month: '2024-11', hours: 29, requests: 11 },
    { month: '2024-12', hours: 18.5, requests: 5 },
  ],
};

// モック契約情報
export const mockContract: Contract = {
  id: 'contract-001',
  planName: 'スタンダードプラン',
  monthlyFee: 300000,
  includedHours: 30,
  startDate: '2024-01-15',
  renewalDate: '2025-01-15',
  status: 'active',
  paymentMethod: 'クレジットカード（****-****-****-1234）',
  billingHistory: [
    { id: 'bill-006', date: '2024-12-01', amount: 330000, status: 'paid' },
    { id: 'bill-005', date: '2024-11-01', amount: 330000, status: 'paid' },
    { id: 'bill-004', date: '2024-10-01', amount: 330000, status: 'paid' },
    { id: 'bill-003', date: '2024-09-01', amount: 330000, status: 'paid' },
    { id: 'bill-002', date: '2024-08-01', amount: 330000, status: 'paid' },
    { id: 'bill-001', date: '2024-07-01', amount: 330000, status: 'paid' },
  ],
};

// モック通知
export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    type: 'request_update',
    title: '依頼のステータスが更新されました',
    message: '「競合他社分析レポート」がレビュー待ち状態になりました。',
    isRead: false,
    createdAt: '2024-12-03T14:00:00Z',
    link: '/requests/req-002',
  },
  {
    id: 'notif-002',
    type: 'news',
    title: '本日のAIニュースレポート',
    message: '新しいAIニュースレポートが配信されました。',
    isRead: false,
    createdAt: '2024-12-04T09:00:00Z',
    link: '/news',
  },
  {
    id: 'notif-003',
    type: 'request_update',
    title: '依頼が完了しました',
    message: '「SNS投稿コンテンツ作成（12月分）」が完了しました。',
    isRead: true,
    createdAt: '2024-11-30T16:00:00Z',
    link: '/requests/req-003',
  },
  {
    id: 'notif-004',
    type: 'billing',
    title: '請求書が発行されました',
    message: '12月分の請求書が発行されました。',
    isRead: true,
    createdAt: '2024-12-01T00:00:00Z',
    link: '/contract',
  },
];

// カテゴリラベル
export const categoryLabels: Record<string, string> = {
  document: '資料・企画書作成',
  data_analysis: 'データ分析・レポート',
  market_research: '競合調査・市場分析',
  content: 'コンテンツ制作',
  ai_news: 'AIニュースレポート',
  consulting: 'AI導入支援・コンサルティング',
};

// ステータスラベル
export const statusLabels: Record<string, string> = {
  pending: '受付中',
  in_progress: '作業中',
  review: 'レビュー待ち',
  completed: '完了',
  cancelled: 'キャンセル',
};

// 部門ラベル（IDからラベルへの変換用）
export const getDepartmentById = (id: string): Department | undefined => {
  return mockDepartments.find(dept => dept.id === id);
};
