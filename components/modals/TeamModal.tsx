"use client";

import React, { useState } from "react";
import { WorldModal } from "@/components/world/WorldModal";
import { Users, MessageSquare, Quote, Heart } from "lucide-react";
import { TEAM_MEMBERS, TeamMember } from "@/lib/data/team";

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMemberId?: string;
}

export const TeamModal: React.FC<TeamModalProps> = ({
  isOpen,
  onClose,
  selectedMemberId = "archibald",
}) => {
  const [activeId, setActiveId] = useState<string>(selectedMemberId);

  const currentMember =
    TEAM_MEMBERS.find((m) => m.id === activeId) || TEAM_MEMBERS[0];

  return (
    <WorldModal
      isOpen={isOpen}
      onClose={onClose}
      title="The Moolies Council"
      subtitle="Founders, Artists & Core Builders"
      icon={<Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
      badge="Core Moolies"
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Character Tabs Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 dark:border-slate-800">
          {TEAM_MEMBERS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveId(m.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                activeId === m.id
                  ? "bg-purple-600 text-white shadow-md scale-105"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <span>{m.name.split(" ")[0]}</span>
              <span className="text-[10px] opacity-80 font-normal">({m.role.split(" ")[0]})</span>
            </button>
          ))}
        </div>

        {/* Active Member Showcase */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 via-amber-50/50 to-sky-50 dark:from-slate-800/80 dark:via-slate-800/60 dark:to-slate-800/80 border-2 border-purple-200 dark:border-purple-800/50 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                {currentMember.role}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-0.5">
                {currentMember.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                <span>Illustrated in the scene as: <strong>{currentMember.avatarChar}</strong></span>
              </p>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {currentMember.twitter && (
                <a
                  href={currentMember.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs shadow-xs"
                  aria-label={`${currentMember.name} on Twitter`}
                >
                  <TwitterIcon className="w-4 h-4 text-sky-400" />
                </a>
              )}
              {currentMember.discord && (
                <span className="px-3 py-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-mono text-xs flex items-center gap-1.5 border border-indigo-200 dark:border-indigo-800">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{currentMember.discord}</span>
                </span>
              )}
            </div>
          </div>

          {/* Speech Bubble Quote */}
          <div className="relative p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-purple-800/40 shadow-xs">
            <Quote className="w-6 h-6 text-purple-300 dark:text-purple-600 mb-1" />
            <p className="text-sm sm:text-base font-semibold italic text-slate-800 dark:text-slate-200 leading-relaxed pl-2">
              &ldquo;{currentMember.quote}&rdquo;
            </p>
          </div>

          {/* Bio text */}
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {currentMember.bio}
          </p>
        </div>

        {/* All Moolies in the Artwork Grid */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Spot every Moolie in the landscape
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TEAM_MEMBERS.map((member: TeamMember) => (
              <div
                key={member.id}
                onClick={() => setActiveId(member.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  activeId === member.id
                    ? "border-purple-500 bg-purple-500/5 shadow-sm"
                    : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 hover:border-slate-300"
                }`}
              >
                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                    {member.name}
                  </h5>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {member.avatarChar}
                  </p>
                </div>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                  Read &rarr;
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WorldModal>
  );
};
