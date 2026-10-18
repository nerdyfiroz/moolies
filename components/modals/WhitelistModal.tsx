"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WorldModal } from "@/components/world/WorldModal";
import { KeyRound, ShieldAlert, CheckCircle2, Clock, Search, Sparkles, AlertCircle, ArrowRight, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";
import { DEFAULT_WHITELIST_TASKS, WhitelistTask } from "@/lib/data/defaultSettings";

const XLogo = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface WhitelistModalProps {
  isOpen: boolean;
  onClose: () => void;
  isWhitelistOpen?: boolean;
}

export const WhitelistModal: React.FC<WhitelistModalProps> = ({
  isOpen,
  onClose,
  isWhitelistOpen = true,
}) => {
  const [activeTab, setActiveTab] = useState<"apply" | "check">("apply");

  // Form state — Twitter + Wallet
  const [walletAddress, setWalletAddress] = useState("");
  const [twitterUsername, setTwitterUsername] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [mountTime, setMountTime] = useState<number>(0);

  // Dynamic Whitelist Tasks configured by Admin
  const [tasks, setTasks] = useState<WhitelistTask[]>(DEFAULT_WHITELIST_TASKS);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);

  // Status & feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<{
    applicationId: string;
    message: string;
    status: string;
  } | null>(null);

  // Status check tab state
  const [checkWallet, setCheckWallet] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<{
    found: boolean;
    data?: { walletAddress: string; status: string; createdAt: string };
    message?: string;
  } | null>(null);
  const [checkError, setCheckError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMountTime(Date.now());
      setSubmitError(null);

      // Fetch dynamic whitelist tasks configured from admin
      fetch("/api/project")
        .then((res) => res.json())
        .then((data) => {
          if (
            data?.data?.whitelistTasks &&
            Array.isArray(data.data.whitelistTasks) &&
            data.data.whitelistTasks.length > 0
          ) {
            setTasks(data.data.whitelistTasks);
          }
        })
        .catch(() => {
          // fallback to DEFAULT_WHITELIST_TASKS
        });
    }
  }, [isOpen]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#F59E0B", "#10B981", "#3B82F6", "#EC4899", "#8B5CF6"],
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

    // Client-side validations
    if (!walletAddress || !/^0x[a-fA-F0-9]{40}$/.test(walletAddress.trim())) {
      setSubmitError("Please enter a valid Ethereum wallet address (0x...)");
      return;
    }
    if (!twitterUsername.trim()) {
      setSubmitError("Please provide your Twitter / X username.");
      return;
    }

    // Verify all required tasks are completed
    const uncompletedRequired = tasks.filter(
      (t) => t.isRequired !== false && !completedTaskIds.includes(t.id)
    );
    if (uncompletedRequired.length > 0) {
      setSubmitError(`Please complete required task: "${uncompletedRequired[0].title}"`);
      return;
    }

    if (!agreeToTerms) {
      setSubmitError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/whitelist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: walletAddress.trim(),
          twitterUsername: twitterUsername.trim(),
          discordUsername: "",
          email: "",
          reason: `Completed ${completedTaskIds.length} whitelist task(s)`,
          completedTasks: completedTaskIds,
          referralCode: "",
          agreeToTerms,
          websiteHoneypot: honeypot,
          submissionTimestamp: mountTime,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setSubmitError(data.error || "Failed to submit application");
      } else {
        triggerConfetti();
        setSubmitSuccess({
          applicationId: data.applicationId,
          message: data.message,
          status: data.status,
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
        setCheckError(data.error || "Failed to check status");
      } else {
        setCheckResult(data);
      }
    } catch {
      setCheckError("Unable to connect to status service. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return {
          bg: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300",
          text: "Approved — Guaranteed Whitelist Slot!",
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        };
      case "waitlisted":
        return {
          bg: "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300",
          text: "Waitlisted — Next In Line For Wave 2",
          icon: <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
        };
      case "rejected":
        return {
          bg: "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300",
          text: "Not Selected This Wave",
          icon: <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
        };
      default:
        return {
          bg: "bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border-sky-300",
          text: "Application Under Review by Owl Council",
          icon: <Clock className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
        };
    }
  };

  return (
    <WorldModal
      isOpen={isOpen}
      onClose={onClose}
      title="The Whitelist Window"
      subtitle="Guaranteed Mint Access & Whitelist Application"
      icon={<KeyRound className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
      badge={isWhitelistOpen ? "Open for Submissions" : "Window Closed"}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        {/* Navigation Tabs */}
        <div className="flex border-b border-purple-500/30">
          <button
            type="button"
            onClick={() => setActiveTab("apply")}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-moolies font-bold text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === "apply"
                ? "border-purple-400 text-purple-200"
                : "border-transparent text-purple-300/60 hover:text-purple-200"
            }`}
          >
            Apply For Whitelist
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("check")}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-moolies font-bold text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === "check"
                ? "border-purple-400 text-purple-200"
                : "border-transparent text-purple-300/60 hover:text-purple-200"
            }`}
          >
            Track Application Status
          </button>
        </div>

        {/* TAB 1: APPLY */}
        {activeTab === "apply" && (
          <div>
            {!isWhitelistOpen ? (
              <div className="p-6 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-center space-y-3">
                <ShieldAlert className="w-10 h-10 mx-auto text-purple-400" />
                <h3 className="font-moolies moolies-title-gradient text-lg sm:text-xl font-bold">
                  The Whitelist Window is Currently Closed
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/80 max-w-md mx-auto">
                  Applications for Wave 1 have concluded. Please stay tuned to our announcements for the next opening date!
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("check")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-moolies text-xs font-bold shadow-sm"
                  >
                    <span>Check Existing Application</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : submitSuccess ? (
              <div className="p-6 rounded-2xl bg-purple-950/50 border border-purple-400/50 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-purple-500/20 text-purple-300 mx-auto flex items-center justify-center border border-purple-400/40">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <span className="moolies-bubble-badge text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                    Application Confirmed
                  </span>
                  <h3 className="font-moolies moolies-title-gradient text-2xl sm:text-3xl font-black mt-2">
                    Welcome to the Nest!
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-200/80 mt-2 max-w-md mx-auto">
                    {submitSuccess.message}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs text-left max-w-sm mx-auto space-y-1">
                  <div className="flex justify-between">
                    <span className="text-purple-300/70">Application ID:</span>
                    <span className="font-mono font-semibold text-purple-200">
                      {submitSuccess.applicationId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-300/70">Wallet:</span>
                    <span className="font-mono font-semibold text-purple-200">
                      {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-300/70">Initial Status:</span>
                    <span className="font-moolies font-semibold text-emerald-400 uppercase">
                      {submitSuccess.status}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitSuccess(null);
                    setWalletAddress("");
                    setTwitterUsername("");
                    setCompletedTaskIds([]);
                  }}
                  className="px-5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 font-moolies text-xs font-bold border border-purple-500/40 transition-colors"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {submitError && (
                  <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/50 text-xs text-rose-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Honeypot field for bots */}
                <input
                  type="text"
                  name="website_url_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* ===== DYNAMIC WHITELIST TASKS SECTION ===== */}
                <div className="p-5 rounded-2xl bg-purple-950/35 border border-purple-500/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center">
                        <XLogo className="w-4.5 h-4.5 text-purple-200" />
                      </div>
                      <div>
                        <h4 className="font-moolies text-sm sm:text-base font-bold text-white">
                          Whitelist Tasks
                        </h4>
                        <p className="text-[11px] text-purple-200/70">
                          Complete all required tasks below to qualify
                        </p>
                      </div>
                    </div>
                    <span className="moolies-bubble-badge text-[11px] font-bold px-2.5 py-1 rounded-full">
                      {completedTaskIds.length} / {tasks.length} Completed
                    </span>
                  </div>

                  {/* Tasks Animated List */}
                  <div className="space-y-2.5">
                    {tasks.map((task, idx) => {
                      const isDone = completedTaskIds.includes(task.id);
                      return (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * idx, type: "spring", stiffness: 350, damping: 25 }}
                          whileHover={{ scale: 1.01 }}
                          className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                            isDone
                              ? "bg-purple-950/50 border-purple-400/60 shadow-sm"
                              : "bg-purple-950/30 border-purple-500/25 hover:border-purple-500/40"
                          }`}
                        >
                          <div
                            onClick={() => toggleTaskCompleted(task.id)}
                            className="flex items-center gap-3 cursor-pointer select-none flex-1 pr-2"
                          >
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                isDone
                                  ? "bg-emerald-500 text-white"
                                  : "bg-purple-900/60 text-purple-300 border border-purple-500/30"
                              }`}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4" />
                              ) : (
                                <span className="font-moolies text-xs font-black">{idx + 1}</span>
                              )}
                            </div>
                            <div>
                              <p className="font-moolies text-xs font-bold text-white flex items-center gap-1.5">
                                <span>{task.title}</span>
                                {task.isRequired && (
                                  <span className="text-[10px] text-fuchsia-400 font-semibold">*Required</span>
                                )}
                              </p>
                              {task.description && (
                                <p className="text-[10px] text-purple-200/70">{task.description}</p>
                              )}
                            </div>
                          </div>

                          {task.actionUrl && (
                            <a
                              href={task.actionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => handleTaskActionClick(task.id)}
                              className={`px-3 py-1.5 rounded-lg text-[11px] font-moolies font-bold flex items-center gap-1.5 transition-colors shrink-0 ${
                                isDone
                                  ? "bg-purple-500/20 text-purple-200 hover:bg-purple-500/30 border border-purple-400/40"
                                  : "bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white shadow-sm cursor-pointer"
                              }`}
                            >
                              {isDone ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                  <span>Done</span>
                                </>
                              ) : (
                                <>
                                  <ExternalLink className="w-3 h-3" />
                                  <span>{task.actionLabel || "Complete"}</span>
                                </>
                              )}
                            </a>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* ===== X USERNAME ===== */}
                <div>
                  <label className="block font-moolies text-xs font-bold text-purple-200 mb-1">
                    Your X / Twitter Username <span className="text-fuchsia-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="@yourhandle"
                    value={twitterUsername}
                    onChange={(e) => setTwitterUsername(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-purple-950/40 border border-purple-500/40 focus:border-purple-400 text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                  />
                  <p className="text-[11px] text-purple-300/60 mt-1">
                    We&apos;ll verify your completed whitelist tasks with this handle.
                  </p>
                </div>

                {/* ===== WALLET ADDRESS ===== */}
                <div>
                  <label className="block font-moolies text-xs font-bold text-purple-200 mb-1">
                    Ethereum Wallet Address <span className="text-fuchsia-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="0x71C8A1b2F89A4c6c21e0B11eE5E729F4a6C49573"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono rounded-xl bg-purple-950/40 border border-purple-500/40 focus:border-purple-400 text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                  />
                  <p className="text-[11px] text-purple-300/60 mt-1">
                    This wallet will be granted mint rights if approved. Please verify carefully.
                  </p>
                </div>

                {/* Agreement checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="terms-check"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 mt-0.5 border-purple-400/50 bg-purple-950/40 cursor-pointer"
                  />
                  <label htmlFor="terms-check" className="text-xs text-purple-200/80 leading-tight cursor-pointer">
                    I agree to the project Terms of Service, anti-sybil guidelines, and confirm that all required whitelist tasks were completed truthfully.
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:via-purple-500 hover:to-indigo-500 text-white font-moolies font-black text-sm shadow-[0_4px_18px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting to Owl Council...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Submit Whitelist Application</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: STATUS CHECK */}
        {activeTab === "check" && (
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-purple-200/80">
              Enter your Ethereum wallet address below to check the real-time review status of your application.
            </p>

            <form onSubmit={handleCheckStatus} className="flex gap-2">
              <input
                type="text"
                placeholder="0x..."
                value={checkWallet}
                onChange={(e) => setCheckWallet(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm font-mono rounded-xl bg-purple-950/40 border border-purple-500/40 focus:border-purple-400 text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
              />
              <button
                type="submit"
                disabled={isChecking}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-moolies text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
              >
                {isChecking ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    <span>Check</span>
                  </>
                )}
              </button>
            </form>

            {checkError && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/50 text-xs text-rose-300">
                {checkError}
              </div>
            )}

            {checkResult && (
              <div className="p-5 rounded-2xl bg-purple-950/35 border border-purple-500/30 space-y-3">
                {!checkResult.found ? (
                  <div className="text-center py-4">
                    <AlertCircle className="w-8 h-8 mx-auto text-purple-400 mb-2" />
                    <h4 className="font-moolies text-sm font-bold text-white">
                      No Application Found
                    </h4>
                    <p className="text-xs text-purple-300/70 mt-1 max-w-sm mx-auto">
                      We haven&apos;t received a whitelist submission for this address yet. Switch to the &quot;Apply&quot; tab to submit yours!
                    </p>
                  </div>
                ) : (
                  <div>
                    {(() => {
                      const badge = getStatusBadge(checkResult.data?.status || "pending");
                      return (
                        <div className={`p-4 rounded-xl border ${badge.bg} flex items-center gap-3`}>
                          {badge.icon}
                          <div>
                            <p className="font-moolies text-xs font-bold uppercase tracking-wider">
                              Status
                            </p>
                            <p className="font-moolies text-sm font-black mt-0.5">
                              {badge.text}
                            </p>
                          </div>
                        </div>
                      );
                    })()}

                    <div className="mt-3 pt-3 border-t border-purple-500/25 text-xs space-y-1 text-purple-300/70">
                      <div className="flex justify-between">
                        <span>Wallet:</span>
                        <code className="text-purple-200">
                          {checkResult.data?.walletAddress}
                        </code>
                      </div>
                      <div className="flex justify-between">
                        <span>Submitted:</span>
                        <span className="text-purple-200">
                          {checkResult.data?.createdAt
                            ? new Date(checkResult.data.createdAt).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "Recently"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </WorldModal>
  );
};
