"use client";

import { useMemo, useState } from "react";

type Tab = "feed" | "marketplace" | "events" | "announcements";

type Post = {
  id: number;
  author: string;
  role: string;
  category: Tab;
  title: string;
  content: string;
  time: string;
  image?: string;
  price?: string;
};

const starterPosts: Post[] = [
  {
    id: 1,
    author: "Sofia M.",
    role: "Resident • Tower B",
    category: "feed",
    title: "Looking for a yoga partner",
    content: "Anyone interested in morning yoga on the terrace this weekend?",
    time: "12 min ago",
  },
  {
    id: 2,
    author: "David R.",
    role: "Resident • Tower A",
    category: "marketplace",
    title: "Desk chair for sale",
    content: "Ergonomic chair, great condition.",
    time: "1h ago",
    price: "$80",
  },
  {
    id: 3,
    author: "Administration",
    role: "Official Announcement",
    category: "announcements",
    title: "Pool maintenance on Saturday",
    content: "The pool area will be closed from 8am to 2pm for cleaning and inspection.",
    time: "2h ago",
  },
  {
    id: 4,
    author: "Carolina V.",
    role: "Resident • Tower C",
    category: "events",
    title: "Sunday brunch meetup",
    content: "A few neighbors are meeting in the social lounge at 11am. Everyone is welcome.",
    time: "3h ago",
  },
];

const tabs: { key: Tab; label: string }[] = [
  { key: "feed", label: "Feed" },
  { key: "marketplace", label: "Marketplace" },
  { key: "events", label: "Events" },
  { key: "announcements", label: "Announcements" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");

  const filteredPosts = useMemo(() => {
    return starterPosts.filter((post) => post.category === activeTab);
  }, [activeTab]);

  return (
    <main className="min-h-screen bg-[#05070b] text-white">
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.28em] text-sky-300/70">
              Studio55 App
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Plura Community
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-zinc-400 md:text-base">
              A private community hub for residents to connect, post updates,
              sell items, share events, and stay in sync without sharing phone numbers.
            </p>
          </div>

          <button className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.02]">
            New Post
          </button>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-white text-black"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.55fr_0.85fr]">
          <section className="rounded-3xl border border-white/10 bg-[#081637] p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-2xl font-semibold">
                  {tabs.find((tab) => tab.key === activeTab)?.label}
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Community activity filtered by section.
                </p>
              </div>
              <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-300">
                {filteredPosts.length} post{filteredPosts.length === 1 ? "" : "s"}
              </div>
            </div>

            <div className="space-y-4">
              {filteredPosts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-6 py-12 text-center text-zinc-400">
                  No posts yet in this section.
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/[0.07]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-zinc-400">
                          {post.author} • {post.role}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold text-white">
                          {post.title}
                        </h3>
                      </div>
                      <span className="shrink-0 text-xs text-zinc-500">
                        {post.time}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-zinc-300">
                      {post.content}
                    </p>

                    {post.price && (
                      <div className="mt-4 inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">
                        {post.price}
                      </div>
                    )}
                  </article>
                ))
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-xl font-semibold">Community Snapshot</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Quick status panel for the building.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm text-zinc-400">Residents online</p>
                  <p className="mt-1 text-2xl font-semibold">24</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm text-zinc-400">Items for sale</p>
                  <p className="mt-1 text-2xl font-semibold">8</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm text-zinc-400">Events this week</p>
                  <p className="mt-1 text-2xl font-semibold">3</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-xl font-semibold">Why this app matters</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
                <li>• Neighbors can connect without exposing phone numbers.</li>
                <li>• Marketplace posts stay inside the private community.</li>
                <li>• Events and announcements are easier to track than WhatsApp threads.</li>
                <li>• This is a strong base for login, posting, uploads, and moderation later.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}