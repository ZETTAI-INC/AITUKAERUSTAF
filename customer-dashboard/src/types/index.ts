// ユーザー関連
export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  avatar?: string;
  plan: 'standard' | 'premium';
  contractStartDate: string;
  contractEndDate?: string;
  departmentId?: string;
}

// 部門関連
export interface Department {
  id: string;
  name: string;
  code: string;
  color: string;
  icon?: string;
  managerName?: string;
  memberCount?: number;
}

// 依頼関連
export type RequestStatus = 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled';
export type RequestCategory =
  | 'document'
  | 'data_analysis'
  | 'market_research'
  | 'content'
  | 'ai_news'
  | 'consulting';

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: RequestCategory;
  status: RequestStatus;
  priority: 'low' | 'medium' | 'high';
  estimatedHours: number;
  actualHours?: number;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  attachments?: Attachment[];
  messages?: Message[];
  departmentId: string;
  requesterId?: string;
  requesterName?: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export interface Message {
  id: string;
  requestId: string;
  senderId: string;
  senderName: string;
  senderType: 'customer' | 'staff';
  content: string;
  attachments?: Attachment[];
  createdAt: string;
}

// AIニュースレポート
export interface NewsReport {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  publishedAt: string;
  thumbnail?: string;
  tags: string[];
  isRead: boolean;
}

// 稼働時間
export interface UsageStats {
  totalHours: number;
  usedHours: number;
  remainingHours: number;
  monthlyBreakdown: MonthlyUsage[];
}

export interface MonthlyUsage {
  month: string;
  hours: number;
  requests: number;
}

// 部門別利用統計
export interface DepartmentUsageStats {
  departmentId: string;
  departmentName: string;
  usedHours: number;
  requestCount: number;
  completedCount: number;
}

// 契約情報
export interface Contract {
  id: string;
  planName: string;
  monthlyFee: number;
  includedHours: number;
  startDate: string;
  renewalDate: string;
  status: 'active' | 'pending' | 'cancelled';
  paymentMethod: string;
  billingHistory: BillingRecord[];
}

export interface BillingRecord {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl?: string;
}

// 通知
export interface Notification {
  id: string;
  type: 'request_update' | 'news' | 'billing' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}
