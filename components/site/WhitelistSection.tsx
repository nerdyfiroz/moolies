"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  KeyRound,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Search,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Check,
  MessageSquareQuote,
} from "lucide-react";
import confetti from "canvas-confetti";
import { DEFAULT_WHITELIST_TASKS, WhitelistTask } from "@/lib/data/defaultSettings";
import { XIcon } from "./TwitterBanner";

interface WhitelistSectionProps {
  isWhitelistOpen?: boolean;
}

export const WhitelistSection: React.FC<WhitelistSectionProps> = ({
  isWhitelistOpen = true,
}) => {
  const [activeTab, setActiveTab] = useState<"apply" | "check">("apply");

  // Form inputs
  const [walletAddress, setWalletAddress] = useState("");
  const [twitterUsername, setTwitterUsername] = useState("");
  const [twitterCommentUrl, setTwitterCommentUrl] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [mountTime, setMountTime] = useState<number>(0);

  // Dynamic Whitelist Tasks & Open/Closed Status
  const [tasks, setTasks] = useState<WhitelistTask[]>(DEFAULT_WHITELIST_TASKS);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [whitelistOpen, setWhitelistOpen] = useState(isWhitelistOpen);

  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<{
    applicationId: string;
    message: string;
    status: string;
  } | null>(null);

  // Check Status tab state
  const [checkWallet, setCheckWallet] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<{
    found: boolean;
    data?: {
      walletAddress: string;
      twitterUsername?: string;
      twitterCommentUrl?: string;
      status: string;
      createdAt: string;
    };
    message?: string;
  } | null>(null);
  const [checkError, setCheckError] = useState<string | null>(null);

  useEffect(() => {
    setMountTime(Date.now());

    // Fetch dynamic project settings & whitelist tasks from API
    fetch("/api/project")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          if (typeof data.data.isWhitelistOpen === "boolean") {
            setWhitelistOpen(data.data.isWhitelistOpen);
          }
          if (
            Array.isArray(data.data.whitelistTasks) &&
            data.data.whitelistTasks.length > 0
          ) {
            setTasks(data.data.whitelistTasks);
          }
        }
      })
      .catch(() => {
        // Fallback to DEFAULT_WHITELIST_TASKS
      });
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#D3A0F7", "#F59E0B", "#10B981", "#3B82F6", "#EC4899", "#8B5CF6"],
      });
    } catch {
      // Ignored
    }
  };

  const handleTaskActionClick = (taskId: string) => {
    if (!completedTaskIds.includes(taskId)) {
      setCompletedTaskIds((prev) => [...prev, taskId]);
    }
  };

  const toggleTaskCompleted = (taskId: string) => {
    setCompletedTaskIds((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const cleanWallet = walletAddress.trim();
    const cleanTwitter = twitterUsername.trim();
    const cleanComment = twitterCommentUrl.trim();

    // Validations
    if (!cleanWallet || !/^0x[a-fA-F0-9]{40}$/.test(cleanWallet)) {
      setSubmitError("Please enter a valid Ethereum wallet address (0x...)");
      return;
    }
    if (!cleanTwitter) {
      setSubmitError("Please provide your Twitter / X username.");
      return;
    }
    if (!cleanComment) {
      setSubmitError("Please provide the direct link to your Twitter / X reply or comment.");
      return;
    }
    if (!cleanComment.startsWith("http://") && !cleanComment.startsWith("https://")) {
      setSubmitError("Please enter a valid URL (starting with https://...) for your Twitter comment.");
      return;
    }

    // Ensure the comment task is registered as completed if present
    const updatedCompleted = completedTaskIds.includes("task-comment-twitter")
      ? completedTaskIds
      : [...completedTaskIds, "task-comment-twitter"];

    // Required tasks validation
    const uncompletedRequired = tasks.filter(
      (t) => t.isRequired !== false && !updatedCompleted.includes(t.id)
    );
    if (uncompletedRequired.length > 0) {
      setSubmitError(`Please complete required task: "${uncompletedRequired[0].title}"`);
      return;
    }

    if (!agreeToTerms) {
      setSubmitError("You must agree to the Terms of Service.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/whitelist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: cleanWallet,
          twitterUsername: cleanTwitter.startsWith("@") ? cleanTwitter : `@${cleanTwitter}`,
          twitterCommentUrl: cleanComment,
          discordUsername: "",
          email: "",
          reason: `Completed ${updatedCompleted.length} whitelist task(s)`,
          completedTasks: updatedCompleted,
          referralCode: "",
          agreeToTerms,
          websiteHoneypot: honeypot,
          submissionTimestamp: mountTime,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setSubmitError(data.error || "Failed to submit application. Please check your details.");
      } else {
        triggerConfetti();
        setSubmitSuccess({
          applicationId: data.applicationId,
          message: data.message || "Your whitelist application has been received!",
          status: data.status || "under_review",
        });
      }
    } catch {
      setSubmitError("Network connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckError(null);
    setCheckResult(null);

    const clean = checkWallet.trim();
    if (!clean || !/^0x[a-fA-F0-9]{40}$/.test(clean)) {
      setCheckError("Please enter a valid Ethereum address (0x...)");
      return;
    }

    setIsChecking(true);
    try {
      const res = await fetch(`/api/whitelist/check?wallet=${clean}`);
      const data = await res.json();
      if (!res.ok) {
        setCheckError(data.error || "Failed to retrieve status.");
      } else {
        setCheckResult(data);
      }
    } catch {
      setCheckError("Unable to connect to status verification service.");
    } finally {
      setIsChecking(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return {
          bg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
          text: "Approved — Guaranteed Whitelist Slot!",
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
        };
      case "waitlisted":
        return {
          bg: "bg-amber-500/20 text-amber-300 border-amber-400/40",
          text: "Waitlisted — Next In Line For Wave 2",
          icon: <Clock className="w-5 h-5 text-amber-400" />,
        };
      case "rejected":
        return {
          bg: "bg-rose-500/20 text-rose-300 border-rose-400/40",
          text: "Not Selected This Wave",
          icon: <ShieldAlert className="w-5 h-5 text-rose-400" />,
        };
      default:
        return {
          bg: "bg-sky-500/20 text-sky-300 border-sky-400/40",
          text: "Application Under Review by Moolies Council",
          icon: <Clock className="w-5 h-5 text-sky-400" />,
        };
    }
  };

  return (
    <section id="whitelist-application" className="w-full max-w-4xl mx-auto space-y-6">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bubble moolies-bubble-badge text-xs font-black uppercase tracking-wider">
          <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
          <span>Priority Access &amp; Minting</span>
        </div>
        <h2 className="font-cooper text-3xl sm:text-4xl text-slate-950 tracking-wide drop-shadow-sm">
          Whitelist Application
        </h2>
        <p className="font-cartoon text-sm text-slate-800/90 max-w-lg mx-auto font-medium">
          Apply for guaranteed mint access or check the status of your existing submission.
        </p>
      </div>

      {/* Main Glassmorphic Container */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950/85 backdrop-blur-xl border border-purple-400/40 p-6 sm:p-8 text-white shadow-[0_20px_50px_rgba(46,16,101,0.25),0_0_35px_rgba(168,85,247,0.2)]">
        {/* Ambient background blur */}
        <div className="absolute top-0 left-1/3 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-fuchsia-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Navigation Tabs */}
          <div className="flex rounded-2xl bg-purple-950/50 p-1 border border-purple-500/30">
            <button
              id="tab-apply-button"
              type="button"
              onClick={() => setActiveTab("apply")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-cartoon font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === "apply"
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-md shadow-purple-900/40"
                  : "text-purple-300/70 hover:text-white"
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>Apply For Whitelist</span>
            </button>
            <button
              id="tab-check-button"
              type="button"
              onClick={() => setActiveTab("check")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-cartoon font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === "check"
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-md shadow-purple-900/40"
                  : "text-purple-300/70 hover:text-white"
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Track Application Status</span>
            </button>
          </div>

          {/* TAB 1: APPLY FOR WHITELIST */}
          {activeTab === "apply" && (
            <div>
              {!whitelistOpen ? (
                /* Closed Window View */
                <div className="p-8 rounded-2xl bg-purple-950/30 border border-purple-500/25 text-center space-y-4">
                  <ShieldAlert className="w-12 h-12 mx-auto text-purple-400" />
                  <h3 className="font-cooper text-2xl text-purple-200">
                    The Whitelist Window is Currently Closed
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-200/80 max-w-md mx-auto font-cartoon">
                    Whitelist applications are currently paused by the team. Please stay tuned to @moolieshq on X for announcements about the next wave!
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("check")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-700/60 hover:bg-purple-600/80 text-white font-cartoon text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>Check Existing Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : submitSuccess ? (
                /* Success Screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-purple-950/40 border border-purple-400/50 text-center space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-300 mx-auto flex items-center justify-center border border-emerald-400/40 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </div>
                  <div className="space-y-2">
                    <span className="font-bubble text-xs px-3.5 py-1 rounded-full uppercase tracking-wider bg-purple-500/30 text-purple-200 border border-purple-400/30">
                      Application Submitted
                    </span>
                    <h3 className="font-cooper text-2xl sm:text-3xl text-white mt-2">
                      Welcome to the Moolies Nest!
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-200/90 max-w-md mx-auto font-cartoon">
                      {submitSuccess.message}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-purple-500/30 font-mono text-xs max-w-md mx-auto text-left space-y-1.5">
                    <div className="flex justify-between text-purple-300">
                      <span>Application Reference:</span>
                      <strong className="text-white">{submitSuccess.applicationId.slice(0, 16)}...</strong>
                    </div>
                    <div className="flex justify-between text-purple-300">
                      <span>Status:</span>
                      <strong className="text-emerald-400 uppercase">{submitSuccess.status}</strong>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCheckWallet(walletAddress);
                        setActiveTab("check");
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-cartoon text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      <Search className="w-4 h-4" />
                      <span>Track Application Status</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitSuccess(null);
                        setWalletAddress("");
                        setTwitterUsername("");
                        setTwitterCommentUrl("");
                        setCompletedTaskIds([]);
                        setAgreeToTerms(false);
                      }}
                      className="px-4 py-3 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 text-purple-200 font-cartoon text-xs font-bold border border-purple-500/30 transition-colors cursor-pointer"
                    >
                      Submit Another Wallet
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Whitelist Application Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot field (hidden from real users) */}
                  <input
                    type="text"
                    name="website_url"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Field 1: Ethereum Wallet Address */}
                  <div className="space-y-2">
                    <label
                      htmlFor="wallet-address-input"
                      className="block text-xs sm:text-sm font-cartoon font-bold text-purple-200"
                    >
                      1. Ethereum Wallet Address (ERC-20 / ERC-721A) *
                    </label>
                    <input
                      id="wallet-address-input"
                      type="text"
                      required
                      placeholder="0x71C8A1b2F89A4c6c21e0B11eE5E729F4a6C49573"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/40 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 font-mono text-xs sm:text-sm text-white placeholder-purple-400/40 transition-all"
                    />
                    <p className="text-[11px] text-purple-300/70 font-cartoon">
                      Must be a personal self-custody wallet (MetaMask, Rabby, Rainbow, etc.). Do not use exchange addresses.
                    </p>
                  </div>

                  {/* Field 2: Twitter Handle */}
                  <div className="space-y-2">
                    <label
                      htmlFor="twitter-username-input"
                      className="block text-xs sm:text-sm font-cartoon font-bold text-purple-200"
                    >
                      2. Your Twitter / X Username *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400">
                        <XIcon className="w-4 h-4" />
                      </div>
                      <input
                        id="twitter-username-input"
                        type="text"
                        required
                        placeholder="@yourhandle"
                        value={twitterUsername}
                        onChange={(e) => setTwitterUsername(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/40 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 font-cartoon text-xs sm:text-sm text-white placeholder-purple-400/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* Field 3: Twitter Comment / Reply Link */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="twitter-comment-input"
                        className="block text-xs sm:text-sm font-cartoon font-bold text-purple-200"
                      >
                        3. Twitter / X Comment or Reply Link *
                      </label>
                      <span className="text-[10px] text-fuchsia-300 font-cartoon font-semibold px-2 py-0.5 rounded-md bg-purple-900/50 border border-purple-500/30">
                        Required
                      </span>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400">
                        <MessageSquareQuote className="w-4 h-4" />
                      </div>
                      <input
                        id="twitter-comment-input"
                        type="url"
                        required
                        placeholder="https://x.com/yourhandle/status/123456789..."
                        value={twitterCommentUrl}
                        onChange={(e) => {
                          setTwitterCommentUrl(e.target.value);
                          if (
                            e.target.value.trim().length > 10 &&
                            !completedTaskIds.includes("task-comment-twitter")
                          ) {
                            setCompletedTaskIds((prev) => [...prev, "task-comment-twitter"]);
                          }
                        }}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/40 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 font-cartoon text-xs sm:text-sm text-white placeholder-purple-400/40 transition-all"
                      />
                    </div>
                    <p className="text-[11px] text-purple-300/70 font-cartoon">
                      Reply or comment on our pinned post on X, copy your direct comment URL, and paste it here.
                    </p>
                  </div>

                  {/* Field 4: Required Whitelist Tasks */}
                  <div className="space-y-2.5 pt-1">
                    <label className="block text-xs sm:text-sm font-cartoon font-bold text-purple-200">
                      4. Complete Whitelist Tasks *
                    </label>

                    <div className="space-y-2.5">
                      {tasks.map((task) => {
                        const isDone = completedTaskIds.includes(task.id);
                        return (
                          <div
                            key={task.id}
                            className={`p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                              isDone
                                ? "bg-purple-950/50 border-emerald-500/40"
                                : "bg-purple-950/30 border-purple-500/30 hover:border-purple-400/50"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <button
                                type="button"
                                onClick={() => toggleTaskCompleted(task.id)}
                                className={`w-6 h-6 mt-0.5 rounded-lg border flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                                  isDone
                                    ? "bg-emerald-500 border-emerald-400 text-white"
                                    : "border-purple-400/50 hover:border-purple-300"
                                }`}
                                aria-label={`Toggle completion for ${task.title}`}
                              >
                                {isDone && <Check className="w-4 h-4 stroke-[3]" />}
                              </button>
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <p className="font-cartoon font-bold text-xs sm:text-sm text-white">
                                    {task.title}
                                  </p>
                                  {task.isRequired && (
                                    <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-purple-500/20 text-purple-300 border border-purple-400/30">
                                      Required
                                    </span>
                                  )}
                                </div>
                                <p className="font-cartoon text-[11px] text-purple-300/80">
                                  {task.description}
                                </p>
                              </div>
                            </div>

                            <a
                              href={task.actionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => handleTaskActionClick(task.id)}
                              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-purple-800/60 hover:bg-purple-700/80 text-white text-xs font-cartoon font-bold border border-purple-500/40 transition-colors shrink-0 cursor-pointer"
                            >
                              <span>{task.actionLabel || "Complete Task"}</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Field 5: Terms Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        id="agree-terms-checkbox"
                        type="checkbox"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded accent-purple-600 cursor-pointer shrink-0"
                      />
                      <span className="text-[11px] sm:text-xs text-purple-200/85 font-cartoon leading-relaxed">
                        I confirm that the submitted Ethereum wallet address belongs to me, that I have completed the required social tasks (including replying on X), and agree to the Moolies Minting Terms.
                      </span>
                    </label>
                  </div>

                  {/* Error Message Display */}
                  <AnimatePresence>
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs font-cartoon flex items-center gap-2.5"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                        <span>{submitError}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <button
                    id="submit-whitelist-button"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-cartoon text-sm font-bold shadow-[0_10px_30px_rgba(168,85,247,0.4)] hover:shadow-[0_15px_35px_rgba(168,85,247,0.55)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <KeyRound className="w-4 h-4 text-white" />
                        <span>Submit Whitelist Application</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: TRACK APPLICATION STATUS */}
          {activeTab === "check" && (
            <div className="space-y-5">
              <form onSubmit={handleCheckStatus} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="check-wallet-input"
                    className="block text-xs sm:text-sm font-cartoon font-bold text-purple-200"
                  >
                    Enter Ethereum Wallet Address to Verify Status
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      id="check-wallet-input"
                      type="text"
                      required
                      placeholder="0x..."
                      value={checkWallet}
                      onChange={(e) => setCheckWallet(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/40 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 font-mono text-xs sm:text-sm text-white placeholder-purple-400/40 transition-all"
                    />
                    <button
                      id="check-status-button"
                      type="submit"
                      disabled={isChecking}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-cartoon text-xs font-bold transition-all shadow-md cursor-pointer shrink-0 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isChecking ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Searching...</span>
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4" />
                          <span>Check Status</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Error message */}
                {checkError && (
                  <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs font-cartoon flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{checkError}</span>
                  </div>
                )}
              </form>

              {/* Result display */}
              {checkResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-2xl bg-purple-950/40 border border-purple-400/30 space-y-4"
                >
                  {checkResult.found && checkResult.data ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs text-purple-300 font-cartoon">
                          Application Verification:
                        </span>
                        {(() => {
                          const badge = getStatusBadge(checkResult.data.status);
                          return (
                            <div
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-cartoon font-bold border ${badge.bg}`}
                            >
                              {badge.icon}
                              <span>{badge.text}</span>
                            </div>
                          );
                        })()}
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900/70 border border-purple-500/20 font-mono text-xs space-y-2">
                        <div className="flex justify-between text-purple-300">
                          <span>Wallet:</span>
                          <span className="text-white truncate max-w-[220px]">
                            {checkResult.data.walletAddress}
                          </span>
                        </div>
                        {checkResult.data.twitterUsername && (
                          <div className="flex justify-between text-purple-300">
                            <span>Twitter / X:</span>
                            <span className="text-sky-300">
                              {checkResult.data.twitterUsername}
                            </span>
                          </div>
                        )}
                        {checkResult.data.twitterCommentUrl && (
                          <div className="flex justify-between items-center text-purple-300">
                            <span>Comment Link:</span>
                            <a
                              href={checkResult.data.twitterCommentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-fuchsia-300 hover:text-white underline truncate max-w-[220px] flex items-center gap-1"
                            >
                              <span className="truncate">{checkResult.data.twitterCommentUrl}</span>
                              <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                          </div>
                        )}
                        {checkResult.data.createdAt && (
                          <div className="flex justify-between text-purple-300">
                            <span>Submitted:</span>
                            <span className="text-purple-200">
                              {new Date(checkResult.data.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 space-y-2">
                      <Clock className="w-8 h-8 text-purple-400 mx-auto" />
                      <p className="font-cartoon text-sm text-purple-200 font-bold">
                        No Application Found
                      </p>
                      <p className="font-cartoon text-xs text-purple-300/80 max-w-sm mx-auto">
                        This wallet has not submitted a whitelist application yet.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setWalletAddress(checkWallet);
                          setActiveTab("apply");
                        }}
                        className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-700/60 hover:bg-purple-600/80 text-white font-cartoon text-xs font-bold transition-colors cursor-pointer"
                      >
                        <span>Apply Now With This Wallet</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
