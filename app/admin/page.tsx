"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  KeyRound,
  Download,
  Users,
  CheckCircle2,
  XCircle,
  Search,
  Settings,
  Sparkles,
  LogOut,
  RefreshCw,
  Calendar,
  DollarSign,
  ArrowLeft,
  AlertCircle,
  ExternalLink,
  ListChecks,
  Plus,
  Trash2,
} from "lucide-react";
import { DEFAULT_WHITELIST_TASKS, WhitelistTask } from "@/lib/data/defaultSettings";

interface Application {
  _id: string;
  walletAddress: string;
  twitterUsername: string;
  twitterCommentUrl?: string;
  discordUsername?: string;
  email?: string;
  reason: string;
  completedTasks?: string[];
  referralCode?: string;
  status: "pending" | "approved" | "waitlisted" | "rejected";
  adminNotes?: string;
  createdAt: string;
}

interface Stats {
  total: number;
  pending: number;
  approved: number;
  waitlisted: number;
  rejected: number;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<"applications" | "tasks" | "settings" | "announcements">("applications");
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, approved: 0, waitlisted: 0, rejected: 0 });
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingApps, setIsLoadingApps] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState("");

  // Whitelist tasks state
  const [whitelistTasks, setWhitelistTasks] = useState<WhitelistTask[]>(DEFAULT_WHITELIST_TASKS);
  const [tasksSaved, setTasksSaved] = useState(false);
  const [isSavingTasks, setIsSavingTasks] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskUrl, setNewTaskUrl] = useState("");
  const [newTaskLabel, setNewTaskLabel] = useState("Complete");
  const [newTaskRequired, setNewTaskRequired] = useState(true);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    projectName: "Moolies",
    tagline: "A cozy, whimsical Moolies realm exploring the metaverse",
    description: "Moolies is a generative collection of 2,000 lovable Moolies adventurers.",
    totalSupply: 2000,
    mintedSupply: 412,
    whitelistPrice: "0.025",
    publicPrice: "0.040",
    currency: "ETH",
    blockchainNetwork: "Ethereum",
    contractAddress: "0x71C8A1b2F89A4c6c21e0B11eE5E729F4a6C49573",
    explorerUrl: "https://etherscan.io",
    openseaUrl: "https://opensea.io/collection/moolies-official",
    twitterUrl: "https://x.com/moolieshq",
    discordUrl: "https://discord.gg/moolies",
    mintPhase: "whitelist" as const,
    isWhitelistOpen: true,
    whitelistStartDate: "2026-11-01T14:00:00Z",
    whitelistEndDate: "2026-11-05T14:00:00Z",
    publicMintStartDate: "2026-11-06T14:00:00Z",
    revealDate: "2026-11-10T18:00:00Z",
  });
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // New announcement form state
  const [annTitle, setAnnTitle] = useState("");
  const [annContent, setAnnContent] = useState("");
  const [annCategory, setAnnCategory] = useState<"general" | "whitelist" | "giveaway" | "tech" | "lore">("general");
  const [annSaved, setAnnSaved] = useState(false);

  // Check initial session & fetch applications
  const checkSessionAndFetch = async () => {
    setIsLoadingApps(true);
    try {
      const res = await fetch(`/api/admin/applications?status=${statusFilter}&search=${encodeURIComponent(searchQuery)}`);
      if (res.status === 401) {
        setIsAuthenticated(false);
      } else {
        const data = await res.json();
        if (data.success) {
          setIsAuthenticated(true);
          setApplications(data.data || []);
          if (data.stats) setStats(data.stats);
          fetchProjectData();
        }
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoadingApps(false);
    }
  };

  const fetchProjectData = async () => {
    try {
      const res = await fetch("/api/project");
      const data = await res.json();
      if (data?.data) {
        if (
          data.data.whitelistTasks &&
          Array.isArray(data.data.whitelistTasks) &&
          data.data.whitelistTasks.length > 0
        ) {
          setWhitelistTasks(data.data.whitelistTasks);
        }
        setSettingsForm((prev) => ({
          ...prev,
          ...data.data,
        }));
      }
    } catch {}
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: WhitelistTask = {
      id: "task-" + Date.now().toString(36),
      title: newTaskTitle.trim(),
      description: newTaskDesc.trim(),
      actionUrl: newTaskUrl.trim(),
      actionLabel: newTaskLabel.trim() || "Complete",
      isRequired: newTaskRequired,
    };
    setWhitelistTasks((prev) => [...prev, newTask]);
    setNewTaskTitle("");
    setNewTaskDesc("");
    setNewTaskUrl("");
    setNewTaskLabel("Complete");
    setNewTaskRequired(true);
  };

  const handleRemoveTask = (taskId: string) => {
    setWhitelistTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleToggleRequired = (taskId: string) => {
    setWhitelistTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, isRequired: !t.isRequired } : t))
    );
  };

  const handleSaveTasks = async () => {
    setIsSavingTasks(true);
    setTasksSaved(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...settingsForm,
          whitelistTasks,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTasksSaved(true);
        setTimeout(() => setTasksSaved(false), 3000);
      } else {
        alert(data.error || "Failed to save whitelist tasks");
      }
    } catch {
      alert("Error saving whitelist tasks");
    } finally {
      setIsSavingTasks(false);
    }
  };

  useEffect(() => {
    checkSessionAndFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, searchQuery]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setLoginError(data.error || "Invalid administrator password");
      } else {
        setIsAuthenticated(true);
        checkSessionAndFetch();
      }
    } catch {
      setLoginError("Login connection error");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
    setPassword("");
  };

  // Update applicant status
  const handleUpdateStatus = async (
    id: string,
    newStatus: "approved" | "waitlisted" | "rejected" | "pending"
  ) => {
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          adminNotes: adminNoteInput,
        }),
      });
      const data = await res.json();
      if (data.success) {
        // Refresh local items
        setApplications((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status: newStatus, adminNotes: adminNoteInput } : app))
        );
        if (selectedApp?._id === id) {
          setSelectedApp((prev) => (prev ? { ...prev, status: newStatus, adminNotes: adminNoteInput } : null));
        }
        checkSessionAndFetch();
      }
    } catch {
      alert("Failed to update status");
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSettingsSaved(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settingsForm),
      });
      const data = await res.json();
      if (data.success) {
        setSettingsSaved(true);
        setTimeout(() => setSettingsSaved(false), 3000);
      } else {
        alert(data.error || "Failed to save settings");
      }
    } catch {
      alert("Error saving settings");
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Create Announcement
  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: annTitle,
          content: annContent,
          category: annCategory,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAnnSaved(true);
        setAnnTitle("");
        setAnnContent("");
        setTimeout(() => setAnnSaved(false), 3000);
      }
    } catch {
      alert("Failed to create announcement");
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    window.open(`/api/admin/export?status=${statusFilter}`, "_blank");
  };

  // Quick Start / Stop Whitelist Form Toggle
  const handleToggleWhitelistOpen = async () => {
    const nextStatus = !settingsForm.isWhitelistOpen;
    const updated = { ...settingsForm, isWhitelistOpen: nextStatus, whitelistTasks };
    setSettingsForm(updated);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        alert(
          nextStatus
            ? "✅ Whitelist form has been STARTED! Users can now submit applications on the live website."
            : "🛑 Whitelist form has been STOPPED / CLOSED! Applications are now paused on the live website."
        );
      } else {
        alert("Failed to update whitelist status");
      }
    } catch {
      alert("Error updating settings");
    }
  };

  // Login view
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 text-white">
        <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/90 border-2 border-amber-300/30 shadow-2xl backdrop-blur-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/30">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Moolies Admin Portal
            </h1>
            <p className="text-xs text-slate-400">
              Authorized project administrators only
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 text-slate-950 font-bold text-sm shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoggingIn ? (
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Authenticate Session</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Moolies World</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition-colors"
            title="Return to World"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-lg font-bold">Moolies Governance Control</h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Quick Whitelist Start / Stop Toggle */}
          <button
            type="button"
            onClick={handleToggleWhitelistOpen}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
              settingsForm.isWhitelistOpen
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25"
                : "bg-rose-500/15 border-rose-500/40 text-rose-600 dark:text-rose-400 hover:bg-rose-500/25"
            }`}
            title={
              settingsForm.isWhitelistOpen
                ? "Whitelist Form is OPEN. Click to STOP it."
                : "Whitelist Form is CLOSED. Click to START it."
            }
          >
            <span
              className={`w-2 h-2 rounded-full ${
                settingsForm.isWhitelistOpen ? "bg-emerald-500 animate-ping" : "bg-rose-500"
              }`}
            />
            <span>
              {settingsForm.isWhitelistOpen ? "Whitelist Form: ACTIVE" : "Whitelist Form: STOPPED"}
            </span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Total Applicants</span>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{stats.total}</p>
          </div>
          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-slate-900 border border-sky-200 dark:border-sky-900/50 shadow-xs">
            <span className="text-xs text-sky-600 dark:text-sky-400 font-bold">Pending Review</span>
            <p className="text-2xl font-black text-sky-700 dark:text-sky-300 mt-1">{stats.pending}</p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50 shadow-xs">
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">Approved WL</span>
            <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-1">{stats.approved}</p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-amber-900/50 shadow-xs">
            <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">Waitlisted</span>
            <p className="text-2xl font-black text-amber-700 dark:text-amber-300 mt-1">{stats.waitlisted}</p>
          </div>
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 shadow-xs col-span-2 sm:col-span-1">
            <span className="text-xs text-rose-600 dark:text-rose-400 font-bold">Rejected</span>
            <p className="text-2xl font-black text-rose-700 dark:text-rose-300 mt-1">{stats.rejected}</p>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab("applications")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === "applications"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Applications ({stats.total})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("tasks")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === "tasks"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <ListChecks className="w-4 h-4 text-emerald-500" />
            <span>Whitelist Tasks ({whitelistTasks.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === "settings"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Project Settings & Mint</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("announcements")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === "announcements"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Publish Announcements</span>
          </button>
        </div>

        {/* TAB 1: APPLICATIONS LIST */}
        {activeTab === "applications" && (
          <div className="space-y-4">
            {/* Filter & Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by wallet, @twitter, discord..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-semibold"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="waitlisted">Waitlisted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={checkSessionAndFetch}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                  title="Refresh list"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingApps ? "animate-spin" : ""}`} />
                </button>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3.5">Wallet Address</th>
                      <th className="p-3.5">Twitter / X</th>
                      <th className="p-3.5">Twitter Comment</th>
                      <th className="p-3.5">Discord</th>
                      <th className="p-3.5">Reason</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {applications.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-400">
                          No whitelist applications match current query.
                        </td>
                      </tr>
                    ) : (
                      applications.map((app) => (
                        <tr
                          key={app._id}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white">
                            {app.walletAddress.slice(0, 6)}...{app.walletAddress.slice(-4)}
                          </td>
                          <td className="p-3.5 font-medium text-sky-600 dark:text-sky-400">
                            {app.twitterUsername}
                          </td>
                          <td className="p-3.5">
                            {app.twitterCommentUrl ? (
                              <a
                                href={app.twitterCommentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-300 font-bold hover:underline"
                                title={app.twitterCommentUrl}
                              >
                                <span>View Comment</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                          <td className="p-3.5 text-slate-500">
                            {app.discordUsername || "—"}
                          </td>
                          <td className="p-3.5 max-w-xs truncate text-slate-600 dark:text-slate-300" title={app.reason}>
                            {app.reason}
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                app.status === "approved"
                                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                  : app.status === "waitlisted"
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                                  : app.status === "rejected"
                                  ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                                  : "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300"
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-slate-400 whitespace-nowrap">
                            {new Date(app.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-3.5 text-right whitespace-nowrap space-x-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedApp(app);
                                setAdminNoteInput(app.adminNotes || "");
                              }}
                              className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold cursor-pointer"
                            >
                              Review
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateStatus(app._id, "approved")}
                              title="Approve applicant"
                              className="p-1 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 cursor-pointer"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateStatus(app._id, "rejected")}
                              title="Reject applicant"
                              className="p-1 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 cursor-pointer"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Review Drawer / Modal */}
            {selectedApp && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
                <div className="w-full max-w-lg p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Review Whitelist Applicant
                    </h3>
                    <button
                      type="button"
                      onClick={() => setSelectedApp(null)}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer text-lg"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400">Wallet:</span>
                      <p className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                        {selectedApp.walletAddress}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-400">Twitter:</span>
                        <p className="font-bold text-sky-600">{selectedApp.twitterUsername}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Discord:</span>
                        <p className="font-bold">{selectedApp.discordUsername || "—"}</p>
                      </div>
                    </div>
                    {selectedApp.twitterCommentUrl && (
                      <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
                        <span className="text-slate-400 font-bold block text-[11px]">
                          Twitter / X Comment Link:
                        </span>
                        <a
                          href={selectedApp.twitterCommentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono font-bold text-purple-600 dark:text-purple-300 hover:underline break-all inline-flex items-center gap-1.5"
                        >
                          <span>{selectedApp.twitterCommentUrl}</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      </div>
                    )}
                    {selectedApp.email && (
                      <div>
                        <span className="text-slate-400">Email:</span>
                        <p className="font-medium">{selectedApp.email}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-slate-400 font-semibold">Completed Whitelist Tasks:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {selectedApp.completedTasks && selectedApp.completedTasks.length > 0 ? (
                          selectedApp.completedTasks.map((tId, idx) => {
                            const taskObj = whitelistTasks.find((wt) => wt.id === tId);
                            return (
                              <span
                                key={idx}
                                className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                <span>{taskObj?.title || tId}</span>
                              </span>
                            );
                          })
                        ) : (
                          <span className="text-slate-500 italic text-[11px] px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                            Tasks completed on submission
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Submission Note:</span>
                      <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 mt-1 leading-relaxed">
                        {selectedApp.reason}
                      </p>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Internal Admin Notes:</label>
                      <input
                        type="text"
                        placeholder="Add private note..."
                        value={adminNoteInput}
                        onChange={(e) => setAdminNoteInput(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs text-slate-400">Change Status:</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(selectedApp._id, "approved")}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(selectedApp._id, "waitlisted")}
                        className="px-3 py-1.5 rounded-xl bg-amber-600 text-white font-bold text-xs"
                      >
                        Waitlist
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(selectedApp._id, "rejected")}
                        className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: WHITELIST TASKS CONFIGURATION */}
        {activeTab === "tasks" && (
          <div className="space-y-6 max-w-4xl">
            {/* Header Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 text-white shadow-lg space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider">
                  <ListChecks className="w-3.5 h-3.5 text-amber-300" />
                  Live Whitelist Configuration
                </span>
                <span className="text-xs font-semibold text-emerald-100">
                  {whitelistTasks.length} Configured Tasks
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                Whitelist Requirements &amp; Tasks
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
                Add, customize, or remove the tasks required for community members to qualify for whitelist. These tasks appear dynamically on the live website. Applicants must complete all required tasks before submitting their wallet.
              </p>
            </div>

            {tasksSaved && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span className="font-bold">Whitelist tasks updated live on website!</span>
              </div>
            )}

            {/* Add New Task Card */}
            <form onSubmit={handleAddTask} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Add New Whitelist Task</span>
                </h4>
                <span className="text-[11px] text-slate-400">Fill in details and click Add Task</span>
              </div>

              {/* Quick Presets */}
              <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
                <span className="text-slate-400 font-semibold text-[11px]">Quick Templates:</span>
                <button
                  type="button"
                  onClick={() => {
                    setNewTaskTitle("Reply or comment on our pinned post on X");
                    setNewTaskDesc("Leave a thoughtful reply or comment on our pinned post and paste your comment link below");
                    setNewTaskUrl("https://x.com/moolieshq");
                    setNewTaskLabel("Comment on X");
                    setNewTaskRequired(true);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>💬 Reply / Comment on X (Required)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewTaskTitle("Follow @moolieshq on X (Twitter)");
                    setNewTaskDesc("Follow our official Twitter account for announcements");
                    setNewTaskUrl("https://x.com/moolieshq");
                    setNewTaskLabel("Follow @moolieshq");
                    setNewTaskRequired(true);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/60 dark:hover:bg-sky-900 text-sky-700 dark:text-sky-300 font-bold border border-sky-200 dark:border-sky-800 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>🐦 Follow @moolieshq</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewTaskTitle("Retweet / Repost our Pinned Announcement");
                    setNewTaskDesc("Share our latest drop announcement with your followers");
                    setNewTaskUrl("https://x.com/moolieshq");
                    setNewTaskLabel("Repost on X");
                    setNewTaskRequired(false);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>🔄 Retweet Announcement</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Task Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Follow @moolieshq on X, Join Community Discord, Like & Retweet"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Description / Instruction
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Stay updated with drop alerts and giveaways"
                    value={newTaskDesc}
                    onChange={(e) => setNewTaskDesc(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Action URL
                  </label>
                  <input
                    type="url"
                    placeholder="e.g. https://x.com/moolieshq or https://discord.gg/..."
                    value={newTaskUrl}
                    onChange={(e) => setNewTaskUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Action Button Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Follow, Retweet, Join Discord, Visit"
                    value={newTaskLabel}
                    onChange={(e) => setNewTaskLabel(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
                  />
                </div>

                <div className="flex items-center gap-2 sm:pt-6">
                  <input
                    type="checkbox"
                    id="new-task-req"
                    checked={newTaskRequired}
                    onChange={(e) => setNewTaskRequired(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <label htmlFor="new-task-req" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                    Required task for whitelist
                  </label>
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Task</span>
                </button>
              </div>
            </form>

            {/* Current Tasks List Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Configured Tasks ({whitelistTasks.length})
                </h4>
                <button
                  type="button"
                  onClick={handleSaveTasks}
                  disabled={isSavingTasks}
                  className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                  <span>{isSavingTasks ? "Saving..." : "Save Tasks to Live Site"}</span>
                </button>
              </div>

              {whitelistTasks.length === 0 ? (
                <div className="p-8 text-center text-slate-400 space-y-2">
                  <ListChecks className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
                  <p className="text-xs">No whitelist tasks configured yet. Add one above!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {whitelistTasks.map((task, idx) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                              {task.title}
                            </span>
                            <span
                              onClick={() => handleToggleRequired(task.id)}
                              className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase cursor-pointer select-none transition-colors ${
                                task.isRequired
                                  ? "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300"
                                  : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                              }`}
                              title="Click to toggle required / optional"
                            >
                              {task.isRequired ? "Required" : "Optional"}
                            </span>
                          </div>
                          {task.description && (
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {task.description}
                            </p>
                          )}
                          {task.actionUrl && (
                            <a
                              href={task.actionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-sky-600 dark:text-sky-400 font-mono hover:underline"
                            >
                              <span>{task.actionUrl}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        {task.actionLabel && (
                          <span className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                            Button: {task.actionLabel}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveTask(task.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                          title="Delete task"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveTasks}
                  disabled={isSavingTasks}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                  <span>{isSavingTasks ? "Saving to live site..." : "Save Whitelist Tasks"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROJECT SETTINGS & MINT */}
        {activeTab === "settings" && (
          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl">
            {settingsSaved && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Project settings updated and live!</span>
              </div>
            )}

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-bold flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-amber-500" />
                <span>Mint Pricing & Supply</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Total Supply
                  </label>
                  <input
                    type="number"
                    value={settingsForm.totalSupply}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, totalSupply: parseInt(e.target.value, 10) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Whitelist Mint Price (ETH)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whitelistPrice}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whitelistPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Public Mint Price (ETH)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.publicPrice}
                    onChange={(e) => setSettingsForm({ ...settingsForm, publicPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold"
                  />
                </div>
              </div>

              {/* Whitelist Window Switch */}
              <div className="pt-2 flex items-center justify-between p-4 rounded-2xl bg-amber-50 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Whitelist Window Application Status
                  </p>
                  <p className="text-xs text-slate-500">
                    When closed, new visitors are shown a friendly notice and cannot submit forms.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setSettingsForm({ ...settingsForm, isWhitelistOpen: !settingsForm.isWhitelistOpen })
                  }
                  className={`px-4 py-2 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                    settingsForm.isWhitelistOpen
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-rose-600 text-white shadow-xs"
                  }`}
                >
                  {settingsForm.isWhitelistOpen ? "GATE OPEN" : "GATE CLOSED"}
                </button>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-500" />
                <span>Schedule & Contract</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Contract Address (Ethereum)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.contractAddress}
                    onChange={(e) => setSettingsForm({ ...settingsForm, contractAddress: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    OpenSea Collection URL
                  </label>
                  <input
                    type="text"
                    value={settingsForm.openseaUrl}
                    onChange={(e) => setSettingsForm({ ...settingsForm, openseaUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSavingSettings}
              className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
            >
              {isSavingSettings ? "Saving..." : "Save Configuration"}
            </button>
          </form>
        )}

        {/* TAB 3: PUBLISH ANNOUNCEMENTS */}
        {activeTab === "announcements" && (
          <form onSubmit={handleCreateAnnouncement} className="space-y-4 max-w-2xl">
            {annSaved && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Announcement published to Butterflies hotspot!</span>
              </div>
            )}

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-bold">Post New Announcement</h3>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wave 2 Whitelist Approved..."
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Category
                </label>
                <select
                  value={annCategory}
                  onChange={(e) =>
                    setAnnCategory(e.target.value as "general" | "whitelist" | "giveaway" | "tech" | "lore")
                  }
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                >
                  <option value="general">General</option>
                  <option value="whitelist">Whitelist</option>
                  <option value="giveaway">Giveaway</option>
                  <option value="tech">Tech</option>
                  <option value="lore">Lore</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Content
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Announcement body text..."
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Publish to Realm
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
