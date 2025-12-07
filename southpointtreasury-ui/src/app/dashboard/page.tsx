"use client";

import { useState, useEffect } from "react";
import { Layout } from "@/components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Icons
const WalletIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const PiggyBankIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
    <path d="M2 9v1c0 1.1.9 2 2 2h1" />
    <path d="M16 11h.01" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

const MoreIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// Sample data
const transactions = [
  {
    id: 1,
    name: "Cameron Williamson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    service: "Figma",
    date: "12/02/22",
    time: "10:37:19 AM",
    amount: "$17.12",
    status: "Pending",
  },
  {
    id: 2,
    name: "Courtney Henry",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    service: "Netflix",
    date: "11/02/22",
    time: "12:22:21 AM",
    amount: "$10.21",
    status: "Completed",
  },
  {
    id: 3,
    name: "Eleanor Pena",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    service: "Spotify",
    date: "10/02/22",
    time: "10:11:39 AM",
    amount: "$12.18",
    status: "Completed",
  },
];

// Upcoming reminders
const upcomingReminders = [
  { id: 1, title: "Board Meeting", date: "Dec 10", time: "2:00 PM", type: "meeting" },
  { id: 2, title: "Tithe Submission", date: "Dec 15", time: "10:00 AM", type: "finance" },
  { id: 3, title: "Youth Ministry Event", date: "Dec 18", time: "6:00 PM", type: "event" },
];

// Church accounts for transfers
const churchAccounts = [
  { id: 1, name: "Church Budget", balance: 15420.50 },
  { id: 2, name: "Maintenance Account", balance: 8750.00 },
  { id: 3, name: "Youth Ministry", balance: 3200.00 },
  { id: 4, name: "Outreach Fund", balance: 5100.00 },
  { id: 5, name: "Building Fund", balance: 22000.00 },
  { id: 6, name: "Tithe Account", balance: 12500.00 },
];

// Monthly chart data
const monthlyData = [
  { name: "Jan", income: 320, outcome: 180 },
  { name: "Feb", income: 380, outcome: 220 },
  { name: "Mar", income: 420, outcome: 250 },
  { name: "Apr", income: 480, outcome: 280 },
  { name: "May", income: 520, outcome: 320 },
  { name: "Jun", income: 580, outcome: 342 },
  { name: "Jul", income: 540, outcome: 380 },
  { name: "Aug", income: 560, outcome: 350 },
  { name: "Sep", income: 520, outcome: 320 },
  { name: "Oct", income: 540, outcome: 340 },
  { name: "Nov", income: 580, outcome: 360 },
  { name: "Dec", income: 560, outcome: 340 },
];

// Annual chart data (past 5 years)
const currentYear = new Date().getFullYear();
const annualData = [
  { name: (currentYear - 4).toString(), income: 42500, outcome: 28000 },
  { name: (currentYear - 3).toString(), income: 48200, outcome: 31500 },
  { name: (currentYear - 2).toString(), income: 52800, outcome: 34200 },
  { name: (currentYear - 1).toString(), income: 58400, outcome: 38100 },
  { name: currentYear.toString(), income: 62100, outcome: 41500 },
];

// Expense data for donut chart
const expenseDataMonthly = [
  { name: "Bills", value: 30, color: "#4F46E5", amount: "$5,734" },
  { name: "Ministries", value: 25, color: "#06B6D4", amount: "$4,778" },
  { name: "Outreach", value: 20, color: "#F59E0B", amount: "$3,822" },
  { name: "Education", value: 15, color: "#8B5CF6", amount: "$2,867" },
  { name: "Equipment", value: 10, color: "#10B981", amount: "$1,911" },
];

const expenseDataDaily = [
  { name: "Bills", value: 35, color: "#4F46E5", amount: "$201" },
  { name: "Ministries", value: 20, color: "#06B6D4", amount: "$115" },
  { name: "Outreach", value: 18, color: "#F59E0B", amount: "$103" },
  { name: "Education", value: 15, color: "#8B5CF6", amount: "$86" },
  { name: "Equipment", value: 12, color: "#10B981", amount: "$68" },
];

const expenseDataAnnually = [
  { name: "Bills", value: 28, color: "#4F46E5", amount: "$64,232" },
  { name: "Ministries", value: 27, color: "#06B6D4", amount: "$61,938" },
  { name: "Outreach", value: 22, color: "#F59E0B", amount: "$50,468" },
  { name: "Education", value: 13, color: "#8B5CF6", amount: "$29,822" },
  { name: "Equipment", value: 10, color: "#10B981", amount: "$22,940" },
];

// Custom tooltip component for line chart
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="recharts-custom-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.dataKey === "income" ? "Income" : "Outcome"}: ${entry.value.toFixed(2)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom tooltip for pie chart
const PieTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { color: string } }> }) => {
  if (active && payload && payload.length) {
    return (
      <div className="recharts-custom-tooltip">
        <p style={{ color: payload[0].payload.color, fontWeight: 600 }}>
          {payload[0].name}: {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [chartTimeFilter, setChartTimeFilter] = useState<"monthly" | "daily" | "annually">("monthly");
  const [showChartDropdown, setShowChartDropdown] = useState(false);
  const [expenseTimeFilter, setExpenseTimeFilter] = useState<"monthly" | "daily" | "annually">("monthly");
  const [showExpenseDropdown, setShowExpenseDropdown] = useState(false);
  const [activeReminder, setActiveReminder] = useState(0);
  const [transferFrom, setTransferFrom] = useState("");
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReminder((prev) => (prev + 1) % upcomingReminders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Get days in current month
  const now = new Date();
  const currentMonth = now.toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <Layout title="Southpoint SDA Dashboard">
      {/* Top Section: Summary Cards + My Cards */}
      <div className="content-top">
        <div className="summary-cards">
          <div className="summary-card primary">
            <div className="summary-card-header">
              <div className="summary-card-icon">
                <WalletIcon />
              </div>
              <div className="summary-card-menu">
                <MoreIcon />
              </div>
            </div>
            <div className="summary-card-label">Balance</div>
            <div className="summary-card-value">$2190.19</div>
          </div>

          <div className="summary-card">
            <div className="summary-card-header">
              <div className="summary-card-icon">
                <TrendingUpIcon />
              </div>
              <div className="summary-card-menu">
                <MoreIcon />
              </div>
            </div>
            <div className="summary-card-label">Offering Collected</div>
            <div className="summary-card-value">$21.30</div>
          </div>

          <div className="summary-card">
            <div className="summary-card-header">
              <div className="summary-card-icon">
                <PiggyBankIcon />
              </div>
              <div className="summary-card-menu">
                <MoreIcon />
              </div>
            </div>
            <div className="summary-card-label">Weekly Collection</div>
            <div className="summary-card-value">$1875.10</div>
          </div>

          <div className="summary-card">
            <div className="summary-card-header">
              <div className="summary-card-icon">
                <ArrowDownIcon />
              </div>
              <div className="summary-card-menu">
                <MoreIcon />
              </div>
            </div>
            <div className="summary-card-label">Expenses</div>
            <div className="summary-card-value">$19,112</div>
          </div>
        </div>

        {/* Upcoming Reminders */}
        <div className="my-cards">
          <div className="my-cards-header">
            <h3 className="my-cards-title">Upcoming</h3>
            <div className="summary-card-menu">
              <MoreIcon />
            </div>
          </div>
          <div className="upcoming-reminders-wrapper">
            <div className="upcoming-reminders">
              {upcomingReminders.map((reminder, index) => (
                <div 
                  key={reminder.id} 
                  className={`reminder-item ${activeReminder === index ? "active" : ""}`}
                >
                  <div className="reminder-icon">
                    <CalendarIcon />
                  </div>
                  <div className="reminder-details">
                    <div className="reminder-title">{reminder.title}</div>
                    <div className="reminder-time">
                      <ClockIcon />
                      {reminder.date} • {reminder.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="reminder-dots">
              {upcomingReminders.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to reminder ${index + 1}`}
                  className={`reminder-dot ${activeReminder === index ? "active" : ""}`}
                  onClick={() => setActiveReminder(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Charts + Balance Info */}
      <div className="content-middle">
        <div className="charts-section">
          {/* Finances Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Finances</h3>
              <div className="chart-filters">
                <div className="chart-filter">
                  <span className="chart-filter-dot income"></span>
                  Income
                </div>
                <div className="chart-filter">
                  <span className="chart-filter-dot outcome"></span>
                  Outcome
                </div>
                <div className="chart-dropdown-wrapper">
                  <div 
                    className="chart-dropdown"
                    onClick={() => setShowChartDropdown(!showChartDropdown)}
                  >
                    {chartTimeFilter === "monthly" ? "Monthly" : chartTimeFilter === "daily" ? `Daily (${currentMonth})` : "Annually"}
                    <ChevronDownIcon />
                  </div>
                  {showChartDropdown && (
                    <div className="chart-dropdown-menu">
                      <div 
                        className={`chart-dropdown-item ${chartTimeFilter === "monthly" ? "active" : ""}`}
                        onClick={() => {
                          setChartTimeFilter("monthly");
                          setShowChartDropdown(false);
                        }}
                      >
                        Monthly
                      </div>
                      <div 
                        className={`chart-dropdown-item ${chartTimeFilter === "daily" ? "active" : ""}`}
                        onClick={() => {
                          setChartTimeFilter("daily");
                          setShowChartDropdown(false);
                        }}
                      >
                        Daily
                      </div>
                      <div 
                        className={`chart-dropdown-item ${chartTimeFilter === "annually" ? "active" : ""}`}
                        onClick={() => {
                          setChartTimeFilter("annually");
                          setShowChartDropdown(false);
                        }}
                      >
                        Annually
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="line-chart">
              <ResponsiveContainer width="100%" height={120}>
                <LineChart
                  data={
                    chartTimeFilter === "monthly" 
                      ? monthlyData 
                      : chartTimeFilter === "annually"
                      ? annualData
                      : daysArray.map((day) => ({
                          name: day.toString(),
                          income: 300 + Math.sin(day * 0.3) * 150 + Math.random() * 50,
                          outcome: 200 + Math.cos(day * 0.25) * 100 + Math.random() * 30,
                        }))
                  }
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9CA3AF", fontSize: 11 }}
                    interval={chartTimeFilter === "monthly" ? 0 : chartTimeFilter === "annually" ? 0 : 4}
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#4F46E5"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 6, fill: "#4F46E5", stroke: "#fff", strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="outcome"
                    stroke="#EF4444"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 6, fill: "#EF4444", stroke: "#fff", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Expenses Donut Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">All Expenses</h3>
              <div className="chart-dropdown-wrapper">
                <div 
                  className="chart-dropdown"
                  onClick={() => setShowExpenseDropdown(!showExpenseDropdown)}
                >
                  {expenseTimeFilter === "monthly" ? "Monthly" : expenseTimeFilter === "daily" ? "Daily" : "Annually"}
                  <ChevronDownIcon />
                </div>
                {showExpenseDropdown && (
                  <div className="chart-dropdown-menu">
                    <div 
                      className={`chart-dropdown-item ${expenseTimeFilter === "monthly" ? "active" : ""}`}
                      onClick={() => {
                        setExpenseTimeFilter("monthly");
                        setShowExpenseDropdown(false);
                      }}
                    >
                      Monthly
                    </div>
                    <div 
                      className={`chart-dropdown-item ${expenseTimeFilter === "daily" ? "active" : ""}`}
                      onClick={() => {
                        setExpenseTimeFilter("daily");
                        setShowExpenseDropdown(false);
                      }}
                    >
                      Daily
                    </div>
                    <div 
                      className={`chart-dropdown-item ${expenseTimeFilter === "annually" ? "active" : ""}`}
                      onClick={() => {
                        setExpenseTimeFilter("annually");
                        setShowExpenseDropdown(false);
                      }}
                    >
                      Annually
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="donut-chart-container">
              <div className="donut-chart">
                <ResponsiveContainer width="100%" height={100}>
                  <PieChart>
                    <Pie
                      data={expenseTimeFilter === "monthly" ? expenseDataMonthly : expenseTimeFilter === "daily" ? expenseDataDaily : expenseDataAnnually}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={45}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {(expenseTimeFilter === "monthly" ? expenseDataMonthly : expenseTimeFilter === "daily" ? expenseDataDaily : expenseDataAnnually).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="donut-legend">
                {(expenseTimeFilter === "monthly" ? expenseDataMonthly : expenseTimeFilter === "daily" ? expenseDataDaily : expenseDataAnnually).map((item, index) => (
                  <div key={index} className="donut-legend-item">
                    <span 
                      className="donut-legend-dot" 
                      style={{ backgroundColor: item.color }}
                    ></span>
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="expense-summary">
              {(expenseTimeFilter === "monthly" ? expenseDataMonthly : expenseTimeFilter === "daily" ? expenseDataDaily : expenseDataAnnually).slice(0, 3).map((item, index) => (
                <div key={index} className="expense-item">
                  <div className="expense-item-label">{item.name}</div>
                  <div className="expense-item-value">{item.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="sidebar-section">
          <div className="account-header">
            <h3 className="account-title">Account</h3>
            <div className="summary-card-menu">
              <MoreIcon />
            </div>
          </div>
          <div className="balance-info">
            <div className="balance-row">
              <div>
                <div className="balance-label">Your Balance</div>
                <div className="balance-value">$2190.19</div>
              </div>
              <div className="balance-change positive">
                <span className="up">↑ 9.14%</span>
                <span className="down">↓ 8.39%</span>
              </div>
            </div>
            <div className="balance-details">
              <div className="balance-detail">
                <span className="balance-detail-label">Currency</span>
                <span className="balance-detail-value">USD / US Dollar</span>
              </div>
              <div className="balance-detail">
                <span className="balance-detail-label">Status</span>
                <span className="balance-detail-value">Active</span>
              </div>
            </div>
          </div>
          <button className="add-card-btn">
            <PlusIcon />
            Add New Account
          </button>
        </div>
      </div>

      {/* Bottom Section: Transactions + Quick Transfer */}
      <div className="content-bottom">
        {/* Transactions */}
        <div className="transactions-card">
          <div className="transactions-header">
            <h3 className="transactions-title">Transactions</h3>
            <div className="chart-dropdown">
              Recent
              <ChevronDownIcon />
            </div>
          </div>
          <div className="transactions-table">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="transaction-row">
                <div className="transaction-user">
                  <img
                    src={transaction.avatar}
                    alt={transaction.name}
                    className="transaction-avatar"
                  />
                  <span className="transaction-name">{transaction.name}</span>
                </div>
                <div className="transaction-service">{transaction.service}</div>
                <div className="transaction-date">{transaction.date}</div>
                <div className="transaction-time">{transaction.time}</div>
                <div className="transaction-amount">{transaction.amount}</div>
                <div className="transaction-status">
                  <span
                    className={`status-badge ${transaction.status.toLowerCase()}`}
                  >
                    {transaction.status}
                  </span>
                  <div className="transaction-expand">
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Transfer */}
        <div className="quick-transfer">
          <h3 className="quick-transfer-title">Quick Transfer</h3>
          
          <div className="transfer-input-group">
            <div className="transfer-input-label">From Account</div>
            <div className="transfer-select-wrapper">
              <select 
                className="transfer-select"
                value={transferFrom}
                onChange={(e) => setTransferFrom(e.target.value)}
              >
                <option value="">Select source account</option>
                {churchAccounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} (${account.balance.toLocaleString()})
                  </option>
                ))}
              </select>
              <ChevronDownIcon />
            </div>
          </div>

          <div className="transfer-input-group">
            <div className="transfer-input-label">To Account</div>
            <div className="transfer-select-wrapper">
              <select 
                className="transfer-select"
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
              >
                <option value="">Select destination account</option>
                {churchAccounts
                  .filter((account) => account.id.toString() !== transferFrom)
                  .map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} (${account.balance.toLocaleString()})
                    </option>
                  ))}
              </select>
              <ChevronDownIcon />
            </div>
          </div>

          <div className="transfer-input-group">
            <div className="transfer-input-label">Amount</div>
            <div className="transfer-input">
              <span className="transfer-input-currency">$</span>
              <input 
                type="number" 
                placeholder="0.00"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="transfer-actions">
            <button className="transfer-btn primary">Send Money</button>
            <button className="transfer-btn secondary">Save as Draft</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
