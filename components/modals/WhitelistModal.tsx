"use client";

import React, { useState, useEffect } from "react";
import { WorldModal } from "@/components/world/WorldModal";
import { KeyRound, ShieldAlert, CheckCircle2, Clock, Search, Sparkles, AlertCircle, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { soundEngine } from "@/lib/audio";

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

  // Form state
  const [walletAddress, setWalletAddress] = useState("");
  const [twitterUsername, setTwitterUsername] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [mountTime, setMountTime] = useState<number>(0);

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
    if (reason.trim().length < 10) {
      setSubmitError("Please share at least 10 characters on why you'd like to join Moolies.");
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
          discordUsername: discordUsername.trim(),
          email: email.trim(),
          reason: reason.trim(),
          referralCode: referralCode.trim(),
          agreeToTerms,
          websiteHoneypot: honeypot,
          submissionTimestamp: mountTime,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setSubmitError(data.error || "Failed to submit application");
      } else {
        soundEngine?.playChime();
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
      title="The Whitelist Gate"
      subtitle="Guaranteed Mint Access & Owl Fellowship"
      icon={<KeyRound className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
      badge={isWhitelistOpen ? "Open for Submissions" : "Gate Closed"}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setActiveTab("apply")}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === "apply"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            Apply For Whitelist
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("check")}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === "check"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            Track Application Status
          </button>
        </div>

        {/* TAB 1: APPLY */}
        {activeTab === "apply" && (
          <div>
            {!isWhitelistOpen ? (
              <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-center space-y-3">
                <ShieldAlert className="w-10 h-10 mx-auto text-amber-600 dark:text-amber-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  The Whitelist Gate is Currently Closed
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  Applications for Wave 1 have concluded. Please stay tuned to our Discord announcements for the Wave 2 opening date!
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("check")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold shadow-sm"
                  >
                    <span>Check Existing Application</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : submitSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/80 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
                    Application Confirmed
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                    Welcome to the Nest!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto">
                    {submitSuccess.message}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 text-xs text-left max-w-sm mx-auto space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Application ID:</span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                      {submitSuccess.applicationId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Wallet:</span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                      {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Initial Status:</span>
                    <span className="font-semibold text-emerald-600 uppercase">
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
                    setReason("");
                  }}
                  className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitError && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
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

                {/* Wallet Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Ethereum Wallet Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="0x71C8A1b2F89A4c6c21e0B11eE5E729F4a6C49573"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm font-mono rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Your wallet will be granted mint rights if approved. Please verify carefully.
                  </p>
                </div>

                {/* Twitter & Discord row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      X / Twitter Username <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="@yourhandle"
                      value={twitterUsername}
                      onChange={(e) => setTwitterUsername(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Discord Username <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Username#0000"
                      value={discordUsername}
                      onChange={(e) => setDiscordUsername(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Email & Referral code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address <span className="text-slate-400 font-normal">(Optional notification)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="you@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Referral Code <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. OWLNEST"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Why would you like to join the Moolies community? <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us about yourself, your favorite owl character, or how you plan to contribute to the nest..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>Minimum 10 characters</span>
                    <span>{reason.length}/1000</span>
                  </div>
                </div>

                {/* Agreement checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="terms-check"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 mt-0.5 border-slate-300"
                  />
                  <label htmlFor="terms-check" className="text-xs text-slate-600 dark:text-slate-400 leading-tight">
                    I agree to the project Terms of Service, anti-sybil community guidelines, and acknowledge that one application is permitted per Ethereum wallet.
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
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
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Enter your Ethereum wallet address below to check the real-time review status of your application.
            </p>

            <form onSubmit={handleCheckStatus} className="flex gap-2">
              <input
                type="text"
                placeholder="0x..."
                value={checkWallet}
                onChange={(e) => setCheckWallet(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm font-mono rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={isChecking}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors disabled:opacity-50 flex items-center gap-1.5 shrink-0"
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
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300">
                {checkError}
              </div>
            )}

            {checkResult && (
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                {!checkResult.found ? (
                  <div className="text-center py-4">
                    <AlertCircle className="w-8 h-8 mx-auto text-amber-500 mb-2" />
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      No Application Found
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
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
                            <p className="text-xs font-bold uppercase tracking-wider">
                              Status
                            </p>
                            <p className="text-sm font-black mt-0.5">
                              {badge.text}
                            </p>
                          </div>
                        </div>
                      );
                    })()}

                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/60 text-xs space-y-1 text-slate-500 dark:text-slate-400">
                      <div className="flex justify-between">
                        <span>Wallet:</span>
                        <code className="text-slate-800 dark:text-slate-200">
                          {checkResult.data?.walletAddress}
                        </code>
                      </div>
                      <div className="flex justify-between">
                        <span>Submitted:</span>
                        <span>
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
