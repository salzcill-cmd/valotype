# Product Requirements Document

**Product:** ValoType
**Organization:** ValoWeb
**Version:** 1.0
**Date:** September 2, 2026
**Status:** Draft — Blueprint for Engineering

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision](#2-product-vision)
3. [Mission](#3-mission)
4. [Problem Statement](#4-problem-statement)
5. [Opportunity](#5-opportunity)
6. [Target Users](#6-target-users)
7. [Personas](#7-personas)
8. [Product Positioning](#8-product-positioning)
9. [Brand](#9-brand)
10. [Naming](#10-naming)
11. [Tagline](#11-tagline)
12. [Product Principles](#12-product-principles)
13. [Core Gameplay Loop](#13-core-gameplay-loop)
14. [Learning System](#14-learning-system)
15. [Game Systems](#15-game-systems)
16. [Progression](#16-progression)
17. [Gamification](#17-gamification)
18. [Challenges](#18-challenges)
19. [Social](#19-social)
20. [Viral Loop](#20-viral-loop)
21. [Monetization](#21-monetization)
22. [UX Strategy](#22-ux-strategy)
23. [UI Design](#23-ui-design)
24. [Neo-Brutalist Art Direction](#24-neo-brutalist-art-direction)
25. [Anti-AI-Slop Rules](#25-anti-ai-slop-rules)
26. [Design System](#26-design-system)
27. [Motion Design](#27-motion-design)
28. [Accessibility](#28-accessibility)
29. [Responsive Design](#29-responsive-design)
30. [Information Architecture](#30-information-architecture)
31. [Page Specifications](#31-page-specifications)
32. [Typing Engine](#32-typing-engine)
33. [Scoring](#33-scoring)
34. [Difficulty](#34-difficulty)
35. [Adaptive Learning](#35-adaptive-learning)
36. [Authentication](#36-authentication)
37. [User Flow](#37-user-flow)
38. [User Stories](#38-user-stories)
39. [Functional Requirements](#39-functional-requirements)
40. [Non-Functional Requirements](#40-non-functional-requirements)
41. [Technical Architecture](#41-technical-architecture)
42. [Frontend Architecture](#42-frontend-architecture)
43. [Backend Architecture](#43-backend-architecture)
44. [API Architecture](#44-api-architecture)
45. [Database Architecture](#45-database-architecture)
46. [Data Model](#46-data-model)
47. [State Management](#47-state-management)
48. [Performance](#48-performance)
49. [Security](#49-security)
50. [Privacy](#50-privacy)
51. [SEO](#51-seo)
52. [Analytics](#52-analytics)
53. [Testing](#53-testing)
54. [CI/CD](#54-cicd)
55. [Deployment](#55-deployment)
56. [Observability](#56-observability)
57. [Error Handling](#57-error-handling)
58. [Edge Cases](#58-edge-cases)
59. [Admin](#59-admin)
60. [MVP Scope](#60-mvp-scope)
61. [Feature Prioritization](#61-feature-prioritization)
62. [Roadmap](#62-roadmap)
63. [Metrics](#63-metrics)
64. [Success Criteria](#64-success-criteria)
65. [Risks](#65-risks)
66. [Mitigation](#66-mitigation)
67. [Competitive Analysis](#67-competitive-analysis)
68. [Differentiation](#68-differentiation)
69. [Future Opportunities](#69-future-opportunities)
70. [Definition of Done](#70-definition-of-done)
71. [Acceptance Criteria](#71-acceptance-criteria)
72. [Implementation Notes](#72-implementation-notes)
73. [Final Product Blueprint](#73-final-product-blueprint)
74. [Decision Log](#74-decision-log)
75. [Assumptions](#75-assumptions)
76. [Open Questions](#76-open-questions)

---

## 1. Executive Summary

ValoType is a gamified web-based typing education platform built by ValoWeb. It transforms learning to type into an engaging game experience — not a boring course. Targeting Indonesian students (SD, SMP, SMA/SMK) first, then expanding globally, ValoType combines RPG progression, skill-based challenges, and competitive leaderboards to create a product users return to daily.

**The one-liner:** "Game yang kebetulan membuatmu jago mengetik."

**Core value:** Users come to play → they type → they improve → they want to return.

**Why it matters:** Indonesia needs 260M+ citizens ready for a digital economy by 2045. Typing is the most fundamental digital skill. No one teaches it well. Existing solutions are either boring typing trainers or gimmicky games that don't actually teach. ValoType bridges this gap.

**Key metrics target (Year 1):** 50,000 MAU, 30% D7 retention, 5% premium conversion.

---

## 2. Product Vision

> "Sebuah platform belajar mengetik berbasis game yang membuat kemampuan mengetik terasa seperti bermain game, bukan seperti mengikuti kursus komputer."

**Product must feel:**
- Modern
- Fun
- Youthful
- Premium
- Competitive
- Aspirational
- Energetic
- Sophisticated
- Genuinely useful

**Product must NOT feel:**
- Government website
- Typing tutorial from 2005
- Children's edutainment
- Generic SaaS
- Homework

---

## 3. Mission

> "Membantu meningkatkan literasi digital dan kemampuan keyboard masyarakat Indonesia sebagai fondasi menuju Indonesia Emas 2045."

**Mission statement:**
> "Satu keyboard. Satu skill. Satu generasi yang lebih siap."

**Educational promise:**
> "Setiap menit di ValoType membuatmu lebih cepat, lebih akurat, dan lebih percaya diri di depan keyboard."

---

## 4. Problem Statement

### Problem Analysis

| # | Problem | Root Cause | Existing Behavior | Emotional Pain | Functional Pain | Opportunity | Product Response |
|---|---------|-----------|-------------------|----------------|-----------------|-------------|------------------|
| 1 | Typing too slow | No structured practice, relies on hunt-and-peck | Uses 2-4 fingers, looks at keyboard constantly | Embarrassment at school/work | Cannot keep up with digital tasks | Huge skill gap to close | Guided learning through gameplay |
| 2 | Always looks at keyboard | Never learned touch typing, no incentive to stop looking | Pecks at keys, self-taught bad habits | Frustration when told to stop looking | Slow, error-prone, tiring | Clear finger position feedback | Virtual keyboard with finger guides, visual feedback |
| 3 | Wrong finger positions | No instruction, self-taught from start | Invented own finger mapping | Confusion when learning "proper" way | Limits speed ceiling fundamentally | Skill assessment + targeted practice | Calibration system that maps finger usage |
| 4 | Low accuracy | Speed prioritized over correctness, no feedback | Types fast but full of errors | Discouraged by constant corrections | Wasted time on backspaces, poor output quality | Accuracy-first culture | Combo system rewards accuracy over raw speed |
| 5 | Bored during practice | Repetitive drills, no variation, feels like homework | Practices for 5 min then quits | Resentment toward "learning" | No sense of progress, no fun | Gamification that's actually fun | Mini-games, progression, challenges |
| 6 | Feels like school assignment | Traditional typing tutor format | Forced by teacher, clicks through | Resistance, disengagement | Learning feels like punishment | Make it feel like play | RPG mechanics, rewards, competition |
| 7 | No progress visibility | No tracking, no history, no benchmarks | Doesn't know current WPM or accuracy | Aimlessness | Cannot measure improvement | Visual progress system | Dashboard with WPM tracking, graphs, ranks |
| 8 | No daily motivation | No reason to return, no streaks | Practices once then forgets | Boredom, loss of interest | Habit never forms | Daily challenge + streak | Daily Challenge, streak system, rewards |
| 9 | Don't know weak fingers | No diagnostic tool | Repeats same mistakes, doesn't know why | Confusion about what to practice | Wasted practice time on wrong areas | Weakness detection + targeted drills | Error analysis, finger tracking, personalized practice |
| 10 | Typing trainers feel outdated | Design stuck in 2010s, no modern UX | Uses old software or avoids it entirely | "This looks ancient" | Poor UX discourages use | Modern, beautiful typing experience | Neo-brutalist 2026 design, premium feel |
| 11 | Typing games don't teach | Too focused on game, not enough skill building | Plays game, doesn't improve | "I played but I'm not better" | Time wasted, no skill gain | Game that actually teaches | Pedagogically sound progression + game mechanics |
| 12 | Users quit after days | No retention mechanism, no social pressure | Tries for 2-3 days then stops | Loss of motivation, forgets to return | Habit never solidifies | Retention architecture | Streaks, daily challenges, social competition |

---

## 5. Opportunity

**Market size:** [RESEARCH REQUIRED] Indonesia has ~50M+ students across SD, SMP, SMA/SMK. Internet penetration exceeds 75%. Mobile-first market. Typing skill is increasingly essential for education, work, and daily digital life.

**Gap in market:**
- Typing.com / Keybr: Functional but boring, no game feel
- MonkeyType: Fast but no learning progression, not beginner-friendly
- TypeRacer: Fun competitive but not educational, steep learning curve
- Nitro Type: Gaming-first, learning-second
- 10FastFingers: Test-only, no practice or learning

**ValoType's opportunity:** Be the first platform that is simultaneously fun enough to play daily AND educational enough to genuinely improve typing skill. The "game that happens to make you type well."

---

## 6. Target Users

| Priority | Segment | Description |
|----------|---------|-------------|
| P0 | Pelajar SMP | 12-15 years old, learning digital skills, competitive, mobile-first |
| P0 | Pelajar SD kelas tinggi | 10-12 years old, just starting, need foundational learning |
| P0 | Pelajar SMA/SMK | 15-18 years old, preparing for workforce, need speed |
| P1 | Mahasiswa | 18-24, productivity-focused, want efficiency |
| P1 | Pemula (all ages) | Anyone who can't touch type, various ages |
| P2 | Guru | Teachers who want to assign typing practice |
| P2 | Sekolah | Institutions looking for typing curriculum |
| P2 | Orang tua | Parents concerned about children's digital literacy |
| P3 | Pengguna umum | General public wanting to improve typing |

---

## 7. Personas

### Persona 1: Raka (SMP Beginner)

| Attribute | Detail |
|-----------|--------|
| Age | 13 |
| Goal | Learn to type properly because teacher said so, secretly wants to be fast like YouTubers |
| Pain | Doesn't know where to start, typing classes at school are boring |
| Behavior | Plays mobile games 2+ hours daily, active on social media, short attention span |
| Motivation | Friends who type fast are "cool", wants to impress |
| Frustration | Current typing apps are "like grandma's computer" |
| Desired outcome | Be able to type without looking at keyboard, be fast |
| Feature needs | Fun onboarding, quick games, visible progress, competition with friends |

### Persona 2: Sari (SMP Competitive Gamer)

| Attribute | Detail |
|-----------|--------|
| Age | 14 |
| Goal | Be the fastest typist in class, dominate leaderboards |
| Pain | Already types okay but wants to be the best, frustrated by lack of competition |
| Behavior | Competitive gamer, plays Roblox/Mobile Legends, loves rankings |
| Motivation | Winning, being #1, collecting achievements |
| Frustration | No one to compete with in typing, existing typing sites are "singleplayer only" |
| Desired outcome | Top rank, impressive scores to share, titles and badges |
| Feature needs | Leaderboards, daily challenges, achievements, shareable results |

### Persona 3: Dimas (Student Productivity)

| Attribute | Detail |
|-----------|--------|
| Age | 17 |
| Goal | Improve typing speed for school essays and upcoming university life |
| Pain | Types at 25 WPM, needs to write long papers efficiently |
| Behavior | Uses laptop for school, follows productivity YouTubers, organized |
| Motivation | Efficiency, self-improvement, measurable results |
| Frustration | Can't find a typing tool that shows clear progress over time |
| Desired outcome | Reach 60+ WPM with 95%+ accuracy |
| Feature needs | Progress tracking, analytics, structured learning path, personal records |

### Persona 4: Budi (Adult Beginner)

| Attribute | Detail |
|-----------|--------|
| Age | 35 |
| Goal | Learn proper typing for new office job requirement |
| Pain | Never learned touch typing, embarrassed to admit it |
| Behavior | Uses computer daily but hunts-and-pecks, uses phone for most tasks |
| Motivation | Career requirement, doesn't want to be left behind |
| Frustration | Feels too old for "beginner" typing sites designed for kids |
| Desired outcome | Confidently type without looking, reach acceptable office speed |
| Feature needs | Non-judgmental onboarding, clear basics, adult-appropriate design |

### Persona 5: Ibu Dewi (Teacher)

| Attribute | Detail |
|-----------|--------|
| Age | 42 |
| Goal | Teach students proper typing, track their progress |
| Pain | No easy way to assign and monitor typing practice for 30 students |
| Behavior | Uses Google Classroom, projector in class, basic tech skills |
| Motivation | Students improve, easier to manage assignments |
| Frustration | Typing.com is blocked by school filter, no Indonesian content |
| Desired outcome | Dashboard showing all students' progress, assignable challenges |
| Feature needs | Class management, student progress view, assignment creation |

---

## 8. Product Positioning

**Indonesian:**
> Untuk pelajar Indonesia yang ingin belajar mengetik dengan cara yang seru, ValoType adalah platform typing game yang mengubah latihan mengetik jadi petualangan. Berbeda dari typing tutor biasa yang membosankan, ValoType bikin kamu pengen balik lagi setiap hari — karena setiap keystroke berasa kayak naik level.

**English:**
> For Indonesian students who want to learn typing the fun way, ValoType is a typing game platform that turns typing practice into an adventure. Unlike boring typing tutors, ValoType makes you want to come back every day — because every keystroke feels like leveling up.

**Category:** EdTech × Gaming (Typing Education Platform)

**Unique Value Proposition:**
"ValoType is the only typing platform where every session makes you measurably faster — and you actually want to come back tomorrow."

**Competitive Moat:**
1. Indonesia-first content and language (Bahasa Indonesia typing content, not just translated English)
2. Integrated pedagogical learning path with game progression
3. Finger-level skill analytics no other free platform offers
4. Community and school features built for Indonesian education context
5. Design quality that makes students proud to use (not embarrassed)

---

## 9. Brand

### Brand Personality

| Trait | Expression |
|-------|------------|
| Energetic | Fast, alive, never sluggish — the UI moves with purpose |
| Clever | Smart game mechanics, not just flash — every feature teaches something |
| Youthful | Speaks the language of students, not their parents |
| Confident | Knows it's good, doesn't need to brag — lets results speak |
| Playful | Fun without being silly, competitive without being toxic |
| Ambitious | Aspires to be THE typing platform for Indonesia |
| Indonesian | Proudly local, naturally integrated, not forced patriotism |
| Inclusive | Anyone can play, anyone can improve — no gatekeeping |
| Premium | Feels like a product, not a project |

**Avoid:** childish, corporate, cringe, too formal, gamer-toxic

### Tone of Voice

**Do:**
- "Main sekarang, lihat hasilnya."
- "Kamu tadi 42 WPM. Sekarang coba pecahkan."
- "Combo 15! Kamu lagi on fire."
- "Akurasi 98%. Mantap."

**Don't:**
- "Unlock your ultimate potential with our revolutionary typing ecosystem!"
- "Welcome to the future of typing education."
- "Empowering the next generation of digital citizens."
- Any sentence that sounds AI-generated.

### Copywriting Principle

CTAs should be concrete, not generic:
- ✅ Mulai Main
- ✅ Tes Kecepatanmu
- ✅ Main Sekarang
- ✅ Coba 60 Detik
- ✅ Pecahkan Rekormu
- ❌ Learn More
- ❌ Get Started Today
- ❌ Discover Your Journey

---

## 10. Naming

### Naming Exploration

| # | Name | Reasoning | Pros | Cons | Brand Fit | Memorability |
|---|------|-----------|------|------|-----------|-------------|
| 1 | **ValoType** | "Valo" + "Type" — direct, clear, functional | Clear purpose, easy to remember, good SEO | Slightly generic-sounding "Type" | ★★★★ | ★★★★ |
| 2 | **ValoKeys** | "Valo" + "Keys" — keyboard reference | Sounds cool, game-like, short | Less clear about typing specifically | ★★★★ | ★★★★ |
| 3 | **ValoType Arena** | Adds competitive feel | Arena implies competition and fun | Too long, harder to say | ★★★ | ★★★ |
| 4 | **ValoRush** | "Valo" + "Rush" — speed, energy, excitement | Energetic, fast, memorable, game-feel | Doesn't directly reference typing | ★★★★★ | ★★★★★ |
| 5 | **ValoType Quest** | RPG quest metaphor | Implies adventure and progression | Wordy, hard to shorten | ★★★ | ★★★ |
| 6 | **ValoStrike** | "Strike" = typing strikes + combo strikes | Powerful, competitive, concise | Could be confused with other meanings | ★★★★ | ★★★★★ |
| 7 | **ValoBlast** | "Blast" = fun, explosive, combo-feel | Energetic, youthful, sounds like a game | Less educational feel | ★★★★ | ★★★★ |
| 8 | **ValoKey** | Clean and simple | Short, punchy, easy to say | Doesn't convey the game/education aspect | ★★★ | ★★★ |
| 9 | **ValoLevel** | Level-up metaphor | Progression-focused, easy to understand | Overused word in gaming | ★★★ | ★★★ |
| 10 | **ValoPulse** | Rhythm, heartbeat, typing rhythm | Unique, suggests rhythm and life | Doesn't immediately suggest typing | ★★★ | ★★★★ |

### Selected Name: **ValoType**

**Rationale:**
- Clear connection to typing — immediately understood
- "Valo" prefix ties to ValoWeb brand
- Easy for Indonesian students to say: "Va-lo-Type"
- Short enough for domain, social media handles
- Has strong visual potential (the "V" and "T" create bold logo opportunities)
- Not so gaming that it alienates education users
- Not so educational that it alienates gamers
- Good SEO properties: "typing" is a high-value keyword

**Rejected alternatives:**
- ValoRush: Strong name but loses the education connection. Better as a game mode name.
- ValoStrike: Could work but ambiguous. Better saved for a feature (typing strike = combo).

**Note:** Domain/trademark availability has NOT been verified. Must be checked before launch.

---

## 11. Tagline

### Tagline Candidates

| # | Tagline | Notes |
|---|---------|-------|
| 1 | "Game yang kebetulan membuatmu jago mengetik" | Honest, unique, memorable — the core truth |
| 2 | "Main. Ketik. Jago." | Ultra-short, punchy, action-oriented |
| 3 | "Satu keyboard. Satu skill. Satu generasi." | Aspirational, Indonesia Emas connection |
| 4 | "Ketik seperti bermain. Bermain seperti belajar." | Symmetric, clever, captures dual nature |
| 5 | "Lebih cepat dari jari kamu yang sekarang" | Provocative, competitive, fun |
| 6 | "Kemampuan mengetik yang bikin kamu proud" | Youthful, natural Indonesian |
| 7 | "Bukan typing tutor. Ini arena." | Contrarian, positions against competition |
| 8 | "Latihan mengetik yang nggak berasa latihan" | Core principle in one line |
| 9 | "Level up keyboard skill kamu" | Simple, gaming reference, clear |
| 10 | "Dari hunt-and-peck jadi keyboard master" | Transformation story |

### Final Selection

**Product tagline:** "Game yang kebetulan membuatmu jago mengetik"

**Secondary tagline (for hero/CTA):** "Main. Ketik. Jago."

**Mission statement:** "Meningkatkan kemampuan mengetik masyarakat Indonesia — satu keystroke pada satu waktu."

---

## 12. Product Principles

### 10 Core Principles

1. **Typing First** — Every feature must serve typing skill improvement. If it doesn't make someone type better, question its existence.

2. **Fun Is Functional** — Fun isn't decoration. Fun is the mechanism that makes people practice longer. If it's not fun, they won't type. If they won't type, they won't improve.

3. **Fast By Default** — Every interaction must feel instant. Typing latency is unacceptable. Load times are unacceptable. Lag kills flow.

4. **Visible Progress** — Users must always know: "I'm getting better." Show the data. Show the improvement. Show the journey.

5. **Never Punish Learning** — Mistakes during practice are learning opportunities, not failures. The system adapts, never shames.

6. **No Dark Patterns** — No manipulative retention mechanics. No gambling. No pay-to-win. Users return because the product is genuinely valuable.

7. **Mobile-Aware** — Mobile typing is different from desktop. Don't pretend they're the same. Design for each context honestly.

8. **Accessibility Is Not Optional** — Keyboard navigation, screen readers, reduced motion, contrast — these aren't features, they're requirements.

9. **Every Animation Earns Its Place** — If an animation doesn't inform, feedback, or guide — delete it.

10. **Build For Mastery** — The end goal is a user who types confidently and quickly. Every system decision should serve this.

---

## 13. Core Gameplay Loop

### The ValoType Loop: "Type → Rank → Rise → Return"

```
ARRIVE
  ↓
Enter the Arena (choose mode)
  ↓
TYPE (core mechanic: keystrokes are gameplay)
  ↓
Evaluation: Speed + Accuracy + Combo
  ↓
EARN: Score → XP → Rank points
  ↓
PROGRESS: Level up → Unlock content → Expand skill
  ↓
RECEIVE: Daily Quest update → Streak update → Achievement check
  ↓
CHALLENGE: New difficulty unlocked → Weakness targeted → Personal record attempt
  ↓
SHARE: Result card → Challenge a friend → Compete on leaderboard
  ↓
RETURN TOMORROW: Daily Challenge available → Streak waiting → New quest
```

### Why This Loop Is Different

Most typing sites have: Type → See score → Type again. Linear and boring.

ValoType adds:
- **Rank system** — You're not just typing, you're climbing. Your rank changes based on performance.
- **Quest-driven practice** — Instead of "type random text," you have objectives: "Master the top row this session" or "Complete 3 rounds with 95%+ accuracy."
- **Weakness targeting** — The system knows your weak keys and serves content accordingly. You're not just practicing; you're healing.
- **Social stakes** — Your results are shareable. Friends can challenge you. Class leaderboards exist. You're not typing in a vacuum.

### Game Session State Machine

```
idle
  → [user clicks play] → lobby
    → [user selects mode] → countdown (3-2-1)
      → playing
        → [user pauses] → paused → playing
        → [text completed] → scoring → result
          → [user clicks retry] → lobby
          → [user clicks next] → lobby
          → [user clicks home] → idle
        → [timeout/disconnect] → abandoned
```

### Game Session Data (minimum)

```
sessionId:        UUID
challengeId:      string (maps to content)
startedAt:        timestamp
endedAt:          timestamp
expectedText:     string
typedText:        string (for replay/analysis)
errorPositions:   number[] (positions of errors)
accuracy:         number (0-100)
wpm:              number
rawWpm:           number (before penalty)
score:            number
maxCombo:         number
difficulty:       string
duration:         number (seconds)
```

---

## 14. Learning System

### Pedagogical Progression

ValoType uses a **6-stage skill progression** that feels like game progression, not a course syllabus.

| Stage | Name | Focus | Game Metaphor | Unlock Condition |
|-------|------|-------|---------------|-----------------|
| 1 | **The Foundation** | Keyboard familiarity, home row | Tutorial Island | Account creation |
| 2 | **Row Master** | Top row, bottom row exploration | First Expedition | Complete Stage 1 with 80%+ accuracy |
| 3 | **Word Builder** | Common word patterns, bigrams | Village Builder | Complete 10 Stage 2 challenges |
| 4 | **Flow State** | Sentence typing, rhythm | Arena Warrior | Reach 25 WPM average |
| 5 | **Precision Strike** | Punctuation, numbers, symbols | Boss Slayer | Reach 40 WPM with 90%+ accuracy |
| 6 | **Keyboard Master** | Real-world text, speed mastery | Legend | Reach 60 WPM with 95%+ accuracy |

### Within Each Stage

Each stage contains:
- **Skill lessons** (3-5 per stage) — targeted practice for specific keys/combinations
- **Challenge rounds** (5-10 per stage) — timed challenges combining learned skills
- **Boss challenge** (1 per stage) — comprehensive test of all skills in that stage
- **Mastery test** — repeat boss to earn "Mastery" badge

### Key Design Decisions

1. **Stage 1 is NOT boring.** It starts with an interactive calibration that also functions as a game. Users don't realize they're being assessed.

2. **Lessons are optional after calibration.** Advanced users can skip ahead. The calibration determines starting point.

3. **Content is Indonesia-themed.** Sentences about sekolah, teknologi, Nusantara, not generic "the quick brown fox."

4. **Wrong keys get flagged.** After each session, the system highlights which keys the user struggles with and serves targeted practice.

---

## 15. Game Systems

### Mini-Games

#### Game 1: Speed Blitz
| Aspect | Detail |
|--------|--------|
| Purpose | Pure speed training |
| Gameplay | Type as fast as possible for 30 seconds. Text gets progressively harder. |
| Typing Skill | Raw speed, reaction time |
| Difficulty | Adaptive based on player WPM |
| Duration | 30 seconds |
| Scoring | WPM × accuracy multiplier |
| Combo | Maintained by correct typing, broken by errors |
| Failure | No fail state — everyone finishes, score reflects performance |
| Reward | XP based on score, speed rank badge at milestones |
| Replayability | High — always beat your record |
| Anti-cheese | Server validates timing + keystroke pattern |

#### Game 2: Accuracy Fortress
| Aspect | Detail |
|--------|--------|
| Purpose | Accuracy training |
| Gameplay | Type text with zero tolerance for errors. Each error damages your fortress wall. 5 errors = game over. |
| Typing Skill | Accuracy, careful reading before typing |
| Difficulty | Text complexity increases with accuracy |
| Duration | 60-90 seconds |
| Scoring | (Accuracy)^2 × speed × difficulty |
| Combo | Errors break combo AND damage fortress |
| Failure | 5 errors = game over. Partial completion = partial reward. |
| Reward | Accuracy milestones unlock fortress decorations (cosmetic) |
| Replayability | Medium-high — trying for perfect run |
| Anti-cheese | Paste detection, timing analysis |

#### Game 3: Endurance Run
| Aspect | Detail |
|--------|--------|
| Purpose | Consistency and stamina |
| Gameplay | Type continuously. Speed increases every 20 seconds. Text adapts to weak keys. Survive as long as possible. |
| Typing Skill | Consistency, stamina, weak-key improvement |
| Difficulty | Escalating — starts easy, gets faster |
| Duration | Variable — 60s to 5+ minutes depending on skill |
| Scoring | Time survived × average accuracy × difficulty multiplier |
| Combo | Unbroken typing streak increases score multiplier |
| Failure | Falling below minimum WPM threshold ends the run |
| Reward | XP + endurance badge + weakness report |
| Replayability | High — survival instinct drives retry |
| Anti-cheese | Minimum WPM threshold prevents slow gaming |

#### Game 4: Combo Cascade
| Aspect | Detail |
|--------|--------|
| Purpose | Accuracy + rhythm |
| Gameplay | Words fall from the top of the screen. Type each word before it reaches the bottom. Consecutive correct words build combo multiplier. |
| Typing Skill | Speed + accuracy under pressure |
| Difficulty | Word speed and complexity increase |
| Duration | Until game over (word reaches bottom = lose a life, 3 lives) |
| Scoring | Combo multiplier × words typed × accuracy |
| Combo | Core mechanic — higher combo = higher score |
| Failure | 3 missed words = game over |
| Reward | High combo screenshots are shareable |
| Replayability | Very high — "just one more try" feel |
| Anti-cheese | Words are randomized, server generates sequence |

#### Game 5: Word Weave (Puzzle Mode)
| Aspect | Detail |
|--------|--------|
| Purpose | Vocabulary + pattern recognition |
| Gameplay | Given a category (e.g., "hewan", "makanan"), type as many valid words as possible in 60 seconds. Each valid word connects to the next. |
| Typing Skill | Typing fluency + vocabulary |
| Difficulty | Category difficulty + time pressure |
| Duration | 60 seconds |
| Scoring | Valid words × length × speed |
| Combo | Consecutive valid words of 4+ letters |
| Failure | No fail, but low score = low reward |
| Reward | Vocabulary expansion + typing practice |
| Replayability | High — different categories, different words |
| Anti-cheese | Dictionary validation on server |

### Why These Mini-Games Work

Each game trains a different aspect of typing:
- **Speed Blitz** → Raw WPM
- **Accuracy Fortress** → Precision
- **Endurance Run** → Consistency + weakness remediation
- **Combo Cascade** → Speed under pressure
- **Word Weave** → Fluency + pattern

No single game is the "right" way to play. Users naturally gravitate toward their weakness or preference, which is exactly how improvement works.

---

## 16. Progression

### Progression Systems

| System | MVP | V1 | V2 | Future |
|--------|-----|-----|-----|--------|
| XP (experience points) | ✅ | ✅ | ✅ | ✅ |
| Level (1-100) | ✅ | ✅ | ✅ | ✅ |
| Typing Rank (Bronze → Diamond) | ✅ | ✅ | ✅ | ✅ |
| WPM tracking | ✅ | ✅ | ✅ | ✅ |
| Accuracy tracking | ✅ | ✅ | ✅ | ✅ |
| Combo (per-session) | ✅ | ✅ | ✅ | ✅ |
| Streak (daily login) | ✅ | ✅ | ✅ | ✅ |
| Achievement system | ❌ | ✅ | ✅ | ✅ |
| Daily Challenge | ❌ | ✅ | ✅ | ✅ |
| Weekly Challenge | ❌ | ❌ | ✅ | ✅ |
| Personal records | ✅ | ✅ | ✅ | ✅ |
| Mastery levels (per skill) | ❌ | ❌ | ✅ | ✅ |
| Seasonal events | ❌ | ❌ | ❌ | ✅ |

### XP Formula

```
XP = (WPM × 0.3) + (Accuracy × 0.5) + (ComboBonus × 0.1) + (DifficultyBonus × 0.1)
```

XP thresholds per level increase exponentially:
- Level 1→2: 100 XP
- Level 2→3: 150 XP
- Level N→N+1: 100 × (1.2)^(N-1) XP

### Typing Rank

| Rank | WPM Requirement | Accuracy Requirement |
|------|-----------------|---------------------|
| Iron | 0+ | 0%+ |
| Bronze | 15+ | 70%+ |
| Silver | 25+ | 80%+ |
| Gold | 35+ | 85%+ |
| Platinum | 45+ | 90%+ |
| Diamond | 55+ | 93%+ |
| Valor | 70+ | 95%+ |

Rank is based on **best session WPM × accuracy multiplier**. De-ranking is possible but requires consistently poor performance (3+ sessions below rank threshold).

### Streak Design

- Streak counts consecutive days with at least 1 completed session
- **Grace period:** 1 missed day doesn't break streak (1 free skip per 7-day cycle)
- Streak freeze: Earned through achievements or daily challenges
- Streak displays: "🔥 12 hari berturut-turut!"
- Streak milestones: 7, 30, 60, 100, 365 days → special badges

---

## 17. Gamification

### Gamification Architecture

| Mechanic | Purpose | Implementation |
|----------|---------|---------------|
| XP | Long-term progression signal | Earned every session, accumulates toward level |
| Levels | Achievement milestones | Displayed on profile, unlock cosmetic tiers |
| Ranks | Skill demonstration | Based on WPM+accuracy, visible on leaderboard |
| Streak | Daily habit formation | Consecutive days with practice |
| Combo | Per-session performance | Consecutive correct keystrokes → multiplier |
| Achievements | Discovery + mastery | Permanent accomplishments, shareable |
| Daily Challenge | Daily retention hook | Unique challenge each day, bonus rewards |
| Leaderboard | Social motivation | Global, weekly, school-based rankings |
| Personal Records | Self-competition | "Beat your own best" is always available |
| Quests | Guided practice | Objective-driven sessions, not random typing |

### Anti-Manipulation Rules

- ❌ No loot boxes
- ❌ No gacha mechanics
- ❌ No pay-to-win
- ❌ No gambling-like reward schedules
- ❌ No manipulative FOMO (limited-time-only essential features)
- ❌ No guilt-based retention ("You'll lose everything if you don't come back!")
- ✅ Positive reinforcement only
- ✅ Streak protection (grace period)
- ✅ Free version includes all learning content
- ✅ Premium is cosmetic + analytics, not skill-gating

---

## 18. Challenges

### Daily Challenge

| Aspect | Detail |
|--------|--------|
| Frequency | 1 per day, resets at midnight (WIB) |
| Content | Unique text combination, moderate difficulty |
| Goal | Complete with highest score possible |
| Reward | Bonus XP (2× normal), streak credit |
| Share | Auto-generated result card |
| Retry | Unlimited retries, best score counts |

### Weekly Challenge

| Aspect | Detail |
|--------|--------|
| Frequency | 1 per week (resets Monday) |
| Content | Themed challenge (e.g., "Science Week", "Nusantara Week") |
| Goal | Best score across 3 attempts |
| Reward | Bonus XP, weekly rank badge |
| Leaderboard | Separate weekly leaderboard |
| Phase | V2 |

### Weakness Challenge (Auto-generated)

After each session, if the system detects weak keys, it auto-generates a practice challenge targeting those keys. This appears as a recommended next activity.

---

## 19. Social

### MVP Social Features

| Feature | Priority | Description |
|---------|----------|-------------|
| Leaderboard (global) | P0 | Ranked by best WPM × accuracy score |
| Leaderboard (weekly) | P0 | Resets weekly, fresh competition |
| Share result card | P0 | Shareable image with key stats |
| Challenge a friend (link) | P1 | Generate challenge link, friend plays same text |
| School/class leaderboard | P2 | Group-based leaderboard (Phase 5) |

### Social Rules

- No public chat (toxicity prevention)
- No DMs between users (student safety)
- No friend system (too complex for MVP, adds moderation burden)
- Challenge links work without account (low friction)
- Leaderboard shows username + rank + WPM only (minimal data exposure)

---

## 20. Viral Loop

### Primary Viral Loop: "The Score Card"

```
User completes challenge
  ↓
Gets impressive result card (WPM, accuracy, rank, combo)
  ↓
Card is visually striking — "Gue mau upload ini"
  ↓
User shares to Instagram Story / WhatsApp Status / Twitter
  ↓
Friend sees score: "Wah, 55 WPM? Gue coba ah"
  ↓
Friend opens ValoType link
  ↓
Friend plays (guest mode, no signup friction)
  ↓
Friend gets their score card
  ↓
Friend shares → cycle continues
```

### Secondary Loop: "The Challenge"

```
User generates challenge link (same text, same conditions)
  ↓
Sends to friend: "Coba kalahkan gue"
  ↓
Friend plays the same challenge
  ↓
Result compared side by side
  ↓
Competitive instinct activates
  ↓
Both share results
```

### Shareable Result Card Design

The result card must be:
- **Visually striking** — Neo-brutalist design, bold typography
- **Screenshot-friendly** — Works as Instagram Story (9:16) or square (1:1)
- **Information-dense but not cluttered** — Key stats only
- **Aspirational** — Makes the sharer look skilled
- **Branded subtly** — ValoType logo in corner, not dominating

Card contents:
```
[ValoType logo — small]
[WPM in large bold type]
[Accuracy percentage]
[Rank badge]
[Combo peak]
[Personal Best indicator if applicable]
[One-liner: "Bisa ngalahin?"]
[Valotype.com — small at bottom]
```

### Virality Metrics

- **K-factor target:** 0.3 (each user brings 0.3 new users through sharing)
- **Share rate target:** 15% of sessions result in a share
- **Challenge completion rate:** 60% of challenge recipients play

---

## 21. Monetization

### Freemium Model

| Feature | Free | Premium (Rp 39,000/month ~ $2.5) |
|---------|------|----------------------------------|
| Core typing practice | ✅ | ✅ |
| All mini-games | ✅ | ✅ |
| WPM/accuracy tracking | ✅ | ✅ |
| Daily challenge | ✅ | ✅ |
| Basic leaderboard | ✅ | ✅ |
| Share result cards | ✅ | ✅ |
| Progress dashboard | Basic | Advanced with graphs, trends |
| Detailed analytics | ❌ | ✅ Finger heatmap, error patterns, improvement trends |
| Custom themes | ❌ | ✅ 5+ visual themes |
| Advanced challenges | ❌ | ✅ Expert-only challenge modes |
| Detailed weakness reports | ❌ | ✅ AI-powered weakness analysis |
| Priority in matchmaking | ❌ | ✅ Faster challenge pairing |
| Custom titles/badges | ❌ | ✅ Premium-exclusive cosmetic titles |
| Export data | ❌ | ✅ Download progress as PDF/CSV |
| Ad-free | Basic ads | No ads |

### Pricing Hypothesis

- **Rp 39,000/month** (~$2.50 USD) — low enough for student allowance, high enough for sustainability
- **Rp 349,000/year** (~$22 USD) — 25% discount for annual
- **School plan:** Rp 15,000/student/year (bulk, 30+ students) — Phase 5

### Conversion Strategy

1. Free version is genuinely valuable — no bait-and-switch
2. Premium appears naturally in context: "Want to see your weak keys in detail? → Premium"
3. First session of advanced analytics is free (taste of premium)
4. No aggressive popups. Soft prompt after natural interaction.
5. Social proof: "45% of Gold+ players use Premium analytics"

### Ethical Monetization Rules

- ❌ No essential learning content behind paywall
- ❌ No artificial limitation on practice frequency
- ❌ No "pay to remove penalties"
- ❌ No dark pattern upsells
- ✅ Premium enhances, never gates
- ✅ Students can use free version indefinitely and improve fully
- ✅ All game modes available free

---

## 22. UX Strategy

### UX Principles

1. **One primary action per screen.** Every page has ONE thing the user should do.
2. **Zero friction to start typing.** Guest mode, instant start, no signup required for first play.
3. **Typing screen = focus mode.** Minimal UI. Maximum attention on the text. No distractions.
4. **Dashboard = game home screen.** Not an admin panel. Not a spreadsheet. A game lobby.
5. **Results = celebration.** Every result screen should feel rewarding, even for mediocre scores.
6. **Progress = visible always.** Any screen can show "where am I on my journey?"

### First Session Design (5-Minute Test)

```
0:00-0:10  → Landing page loads, bold hook visible, "Main Sekarang" CTA
0:10-0:15  → User clicks CTA → Instant transition to typing screen
0:15-0:25  → Brief calibration prompt: "Ketik kalimat ini untuk mulai..."
0:25-0:55  → User types 60 seconds of text
0:55-1:05  → Result appears: WPM, accuracy, score, first rank assigned
1:05-1:15  → XP animation, "Level 1" badge appears
1:15-1:30  → Recommended: "Coba Speed Blitz untuk latih kecepatan!"
1:30-2:30  → User plays Speed Blitz mini-game
2:30-2:45  → Result + comparison to first session
2:45-3:00  → Weakness detected: "Huruf J dan K masih perlu latihan"
3:00-3:15  → Recommended: "Coba Accuracy Fortress — fokus ke huruf yang lemah"
3:15-4:00  → User plays targeted challenge
4:00-4:15  → Result shows improvement
4:15-4:30  → Daily challenge tease: "Besok ada tantangan baru!"
4:30-5:00  → User sees dashboard with progress → natural exit or continue playing
```

**Key:** No signup required for any of this. Account creation is prompted naturally when user wants to save progress across devices.

### Information Architecture

| Page | MVP | Purpose | Primary CTA |
|------|-----|---------|-------------|
| Landing | ✅ | Convert visitors to players | Main Sekarang |
| Play/Dashboard | ✅ | Game home, activity selection | Start Playing |
| Game Screen | ✅ | Core typing gameplay | (typing input) |
| Result Screen | ✅ | Show performance, encourage retry | Play Again |
| Profile | ✅ | Player stats and identity | View Progress |
| Progress | ✅ | Improvement over time | Continue Learning |
| Leaderboard | ✅ | Rankings and competition | See Your Rank |
| Settings | ✅ | Preferences, theme, account | — |
| Premium | ✅ | Conversion page | Upgrade |
| Achievements | ❌ V1 | Unlock showcase | View All |
| About | ✅ | Brand story | — |
| Privacy | ✅ | Privacy policy | — |
| Terms | ✅ | Terms of service | — |

---

## 23. UI Design

### Page Specifications

#### Landing Page

**Primary goal:** Make visitors want to play in 5 seconds.
**Primary CTA:** "Main Sekarang" (big, bold, impossible to miss)
**Secondary CTA:** "Lihat Cara Bermain"

**Sections:**
1. **Hero** — Bold statement + interactive typing demo (lightweight, loads fast)
2. **How it works** — 3 steps: Ketik → Skor → Naik Level
3. **Features preview** — Mini-games, challenges, leaderboard visual
4. **Leaderboard snapshot** — Shows top players (social proof)
5. **Progression preview** — Visual rank system (Iron → Valor)
6. **Testimonials** — Student quotes (Phase 2, real user quotes)
7. **Indonesia mission** — "Kemampuan mengetik untuk Indonesia Emas 2045"
8. **FAQ** — Common questions
9. **Footer** — Links, socials, branding

**Hero interactive demo:** Users can type 1-2 sentences right on the landing page. Lightweight (no game engine loaded). Shows immediate WPM calculation. CTA after completion: "Main versi lengkap →"

#### Dashboard (Play Screen)

**Primary goal:** Get user playing within 2 seconds of landing.
**Primary CTA:** One big "PLAY" button — always visible, always prominent.

**Layout:**
```
┌─────────────────────────────────┐
│ [Avatar] Raka · Lv.12 · Iron   │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│ ┌──────────┐ ┌────────────────┐ │
│ │ 🔥 7 day │ │ ⚡ 32 WPM avg  │ │
│ │ streak   │ │ 🎯 89% acc     │ │
│ └──────────┘ └────────────────┘ │
│                                  │
│  ┌─────────────────────────┐    │
│  │    ▶ MULAI MAIN         │    │
│  │    Daily Challenge      │    │
│  │    "Tantangan Hari Ini" │    │
│  └─────────────────────────┘    │
│                                  │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐   │
│ │Blitz│ │Fort│ │Endu│ │Casc│   │
│ └────┘ └────┘ └────┘ └────┘   │
│                                  │
│ Recent: 35 WPM · 92% acc       │
│ Personal Best: 42 WPM          │
│ Next Rank: Silver (8 WPM away)  │
└─────────────────────────────────┘
```

#### Game Screen

**Primary goal:** Type. Focus. No distractions.
**Layout:** Minimal. Text prompt takes center stage.

```
┌─────────────────────────────────┐
│ ← Back          Score: 1,247   │
│                                  │
│ ┌─────────────────────────────┐ │
│ │                             │ │
│ │  the quick brown fox jumps  │ │
│ │  over the lazy dog and      │ │
│ │  runs across the field      │ │
│ │                             │ │
│ └─────────────────────────────┘ │
│                                  │
│ WPM: 38  │  ACC: 94%  │ 🔥12  │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│ ████████████░░░░░░░░  62%       │
│                                  │
│ [virtual keyboard - optional]    │
└─────────────────────────────────┘
```

**Rules:**
- Text is large and readable (minimum 18px)
- Current character highlighted with strong visual indicator
- Correct = subtle green, Error = bold red with shake
- Combo counter visible but not distracting
- WPM and accuracy update in real-time
- Progress bar shows completion percentage
- Pause button accessible but not prominent
- Virtual keyboard shown only for beginners (toggle in settings)

#### Result Screen

**Primary goal:** Celebrate performance, show improvement, prompt next action.

```
┌─────────────────────────────────┐
│          SELESAI! 🎉            │
│                                  │
│  ┌──────────────────────────┐  │
│  │        38 WPM            │  │
│  │        94% Akurasi       │  │
│  │     Score: 1,247         │  │
│  └──────────────────────────┘  │
│                                  │
│  🔥 Max Combo: 23              │
│  ⬆️  WPM naik +3 dari rekor!  │
│  🏆 Personal Best baru!       │
│                                  │
│  ⚠️ Huruf yang perlu diperhatikan:│
│  J, K, X                       │
│                                  │
│  ┌──────────┐ ┌──────────────┐ │
│  │Main Lagi │ │Perbaiki Lemah│ │
│  └──────────┘ └──────────────┘ │
│  ┌──────────────────────────┐  │
│  │    📤 Share Hasil        │  │
│  └──────────────────────────┘  │
└─────────────────────────────────┘
```

#### Profile Screen

**Primary goal:** Show player identity and full stats.

**Sections:**
- Avatar + Username + Title (unlocked via achievements)
- Current Rank with visual badge
- Level progress bar
- WPM record + Accuracy record
- Sessions played / Total time typed
- Achievement showcase (grid)
- Streak history
- Weekly/monthly graphs (premium)

---

## 24. Neo-Brutalist Art Direction

### Design Direction: "Structured Play"

ValoType uses a **Neo-Brutalist 2026** aesthetic that is sophisticated, not chaotic. Think: **architectural geometry meets playground energy.**

### Core Visual Principles

1. **Bold geometry** — Strong rectangular shapes, asymmetric but balanced
2. **Hard shadows** — Offset shadows (not blurred), creating depth
3. **High contrast** — Dark text on light backgrounds, strong color accents
4. **Expressive typography** — Large, confident type that has personality
5. **Intentional imperfection** — Slight rotations, offset elements, hand-crafted feel
6. **No glassmorphism** — Solid colors, not frosted glass
7. **No gradient backgrounds** — Flat color blocks with clear boundaries
8. **No decorative blobs** — Every visual element has purpose

### What This Looks Like

**Cards:** Solid background, thick border (2-3px), hard shadow (offset 4-6px, no blur), slight rotation on hover.

**Buttons:** Bold text, solid background, thick border, hard shadow. Hover = shadow shifts. Active = shadow disappears (pressed feel).

**Typography:** One display font (bold, geometric), one body font (clean, readable). No script fonts. No decorative fonts.

**Colors:** Limited palette. 2-3 primary colors + neutrals. Each color has a meaning (not random).

**Layout:** Asymmetric grids. Strong horizontal rules. Clear sections. Breathing room but not excessive whitespace.

---

## 25. Anti-AI-Slop Rules

### Mandatory Checklist

- [ ] NOT a generic SaaS landing page
- [ ] NO gradient purple/blue backgrounds
- [ ] NO glowing blobs or orbs
- [ ] NO excessive glassmorphism
- [ ] NO random floating 3D objects
- [ ] NO meaningless gradients
- [ ] NO generic AI illustrations (no robot, no brain, no lightbulb)
- [ ] NO stock-looking hero images
- [ ] NO excessive rounded corners (pills on everything)
- [ ] NO template-looking dashboards
- [ ] NO unnecessary icon overload
- [ ] NO random decorative noise
- [ ] NO excessive shadows on everything
- [ ] NO excessive animation on everything
- [ ] NO design that looks AI-generated without art direction

### Art Direction Test

Every screen must pass: "Does this look like it was designed by a human with taste, or generated by a template?"

Signs of AI-slop to actively avoid:
- Uniform corner radius on everything
- Gradient on every surface
- Floating elements with no compositional purpose
- Every section having a different visual treatment
- Text that says nothing concrete
- Icons that don't add meaning
- Animations that don't provide feedback

---

## 26. Design System

### Design Tokens

```css
/* Colors — "Electric Playground" palette */
--color-bg:           #F5F0E8;       /* warm cream — avoids cold white */
--color-fg:           #1A1A1A;       /* near-black — high contrast */
--color-primary:      #FF3E00;       /* electric orange — energy, action */
--color-secondary:    #0057FF;       /* bold blue — trust, progression */
--color-accent:       #FFD600;       /* bright yellow — achievement, highlight */
--color-success:      #00C853;       /* green — correct, accuracy */
--color-danger:       #FF1744;       /* red — errors, critical */
--color-muted:        #9E9E9E;       /* grey — secondary text */
--color-surface:      #FFFFFF;       /* white — card backgrounds */
--color-surface-alt:  #E8E3DA;       /* warm grey — secondary surfaces */

/* Typography */
--font-display:       'Space Grotesk', sans-serif;  /* headings, scores */
--font-body:          'Inter', sans-serif;            /* body text */
--font-mono:          'JetBrains Mono', monospace;   /* typing text, code */

/* Spacing scale (4px base) */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;

/* Border */
--border-width:  2px;
--border-color:  var(--color-fg);
--border-radius: 0px;           /* neo-brutalist: sharp corners */
--border-radius-sm: 2px;        /* slight radius only where needed */

/* Shadows */
--shadow-offset-x: 4px;
--shadow-offset-y: 4px;
--shadow-color:    var(--color-fg);
--shadow:          var(--shadow-offset-x) var(--shadow-offset-y) 0 var(--shadow-color);
--shadow-lg:       6px 6px 0 var(--shadow-color);
--shadow-hover:    2px 2px 0 var(--shadow-color);  /* press effect */

/* Typography scale */
--text-xs:   12px;
--text-sm:   14px;
--text-base: 16px;
--text-lg:   18px;
--text-xl:   20px;
--text-2xl:  24px;
--text-3xl:  30px;
--text-4xl:  36px;
--text-5xl:  48px;
--text-6xl:  64px;
--text-score: 72px;  /* for WPM display */
```

### Color Rationale

- **Electric Orange (#FF3E00):** Energy, action, urgency — used for primary CTAs, active states
- **Bold Blue (#0057FF):** Trust, progression, depth — used for links, progression, rank indicators
- **Bright Yellow (#FFD600):** Achievement, highlight, reward — used for XP, achievements, highlights
- **Warm Cream (#F5F0E8):** Not cold white, feels handmade, premium — background
- **Near-Black (#1A1A1A):** Not pure black, softer but still high contrast — text

### Component Inventory

| Component | Style Notes |
|-----------|-------------|
| Button | Solid bg, thick border, hard shadow, bold text. Variant: primary (orange), secondary (blue), ghost |
| Input | Thick bottom border or full border, no rounded corners, clear focus state |
| Card | Solid bg, thick border, hard shadow, optional slight rotation |
| Dialog | Solid bg, thick border, hard shadow, clear close button |
| Toast | Bold background, thick border, slides in from top-right |
| Tooltip | Solid bg, thick border, arrow pointer |
| Progress | Solid bar, thick border, fill animates smoothly |
| Badge | Solid bg, thick border, bold text, various sizes |
| Tabs | Bold active indicator, thick bottom border on active |
| Score Display | Large monospace font, high contrast |
| Keyboard Visualization | Grid of keys, bold borders, highlight colors |
| Achievement Card | Solid bg, icon + text, unlock animation |
| Leaderboard Row | Rank + name + score, bold borders, alternating bg |
| Navigation | Bold links, clear active state, hard shadow on mobile hamburger |

---

## 27. Motion Design

### Motion Principles

1. **Fast** — Most animations ≤ 200ms. Users shouldn't wait for UI.
2. **Responsive** — Animation starts on user input, not on load.
3. **Purposeful** — Every animation communicates something. No decorative motion.
4. **Consistent** — Same type of action = same type of animation.
5. **Interruptible** — Users can skip or override any animation.
6. **Accessible** — All animations respect `prefers-reduced-motion`.

### Motion Specifications

| Context | Animation | Duration | Easing | Fallback (reduced motion) |
|---------|-----------|----------|--------|---------------------------|
| Button hover | Shadow shifts | 100ms | ease-out | None (static) |
| Button press | Shadow removes | 50ms | linear | None |
| Character correct | Flash green + subtle scale | 100ms | ease-out | Color change only |
| Character error | Flash red + shake | 150ms | ease-in-out | Color change only |
| Combo counter | Increment + pulse | 200ms | spring | Instant number update |
| XP gain | Number count-up | 300ms | ease-out | Instant number |
| Level up | Full-screen celebration | 500ms | spring | Text announcement |
| Achievement unlock | Card appears + bounce | 400ms | spring | Text notification |
| Page transition | Slide + fade | 200ms | ease-in-out | Instant |
| Modal open | Scale from center | 200ms | ease-out | Instant appear |
| Modal close | Scale to center | 150ms | ease-in | Instant disappear |
| Leaderboard update | Row reorder | 300ms | ease-in-out | Instant reorder |
| Score card appear | Slide up + fade | 250ms | ease-out | Instant appear |

### Reduced Motion

When `prefers-reduced-motion: reduce` is active:
- All spring/physics animations → instant state changes
- All movement animations → opacity-only transitions
- All celebration effects → text-only feedback
- Game effects → minimal or disabled
- Typing feedback → color change only (no shake/scale)

---

## 28. Accessibility

### WCAG 2.2 AA Target

| Requirement | Implementation |
|-------------|---------------|
| Keyboard navigation | All interactive elements focusable and operable via keyboard |
| Focus state | Bold, visible focus ring (3px solid orange) on all focusable elements |
| Screen reader | Semantic HTML, ARIA labels for game states, live regions for score updates |
| Semantic HTML | Proper heading hierarchy, landmarks, lists, buttons vs links |
| Contrast | All text ≥ 4.5:1 ratio against background. Large text ≥ 3:1. |
| Reduced motion | Full `prefers-reduced-motion` support (see §27) |
| Readable typography | Minimum 16px body, 18px for typing text |
| Color independence | Never rely solely on color to convey information (errors use icon + color) |
| Touch targets | Minimum 44×44px for all interactive elements |
| Error feedback | Errors communicated via text + visual (not color alone) |
| Cognitive accessibility | Simple language, clear labels, predictable navigation |

### Game-Specific Accessibility

- **Typing game + screen reader:** Provide audio feedback option (correct/error sounds)
- **Visual typing:** Characters have text labels, not just color indicators
- **Alternative input:** Game can be played with keyboard only (no mouse required)
- **Pause:** Game pauses on blur, on Escape key, on pause button
- **Timeout:** No hard timeouts. User can take as long as they want.
- **Cognitive load:** Game screen shows only essential info. Complexity unfolds gradually.

---

## 29. Responsive Design

### Breakpoints

| Name | Width | Target |
|------|-------|--------|
| Mobile S | 320px | Small phones |
| Mobile M | 375px | Standard phones (iPhone SE, etc.) |
| Mobile L | 428px | Large phones (iPhone 14, etc.) |
| Tablet | 768px | iPad portrait |
| Laptop | 1024px | iPad landscape, small laptops |
| Desktop | 1280px | Standard desktop |
| Large | 1536px | Large monitors |

### Mobile Considerations

**Typing on mobile is fundamentally different.** Don't pretend otherwise.

| Context | Strategy |
|---------|----------|
| Physical keyboard + mobile browser | Full game experience, same as desktop |
| On-screen keyboard | Limit to short challenges, practice mode. Cannot achieve full speed. |
| Touch typing learning | Mobile shows finger guide overlay, user practices without on-screen keyboard |
| Dashboard/progress | Full experience, optimized for touch |
| Landing page | Mobile-first design, large CTA, easy to start |

**Mobile typing limitations:**
- On-screen keyboard input has inherent latency (100-300ms vs 10-50ms physical)
- Autocorrect/predictive text interfere with accurate measurement
- No physical finger positioning possible
- Recommendation: Physical keyboard strongly recommended for serious practice

### Desktop Considerations
- Virtual keyboard optional (toggle in settings)
- More screen real estate for stats sidebar
- Keyboard shortcuts for navigation (arrows, Enter, Escape)
- Wider leaderboard display

---

## 30. Information Architecture

```
ValoType
├── / (Landing)
├── /play (Dashboard — requires auth or guest mode)
├── /play/game (Game Screen — entered from dashboard)
├── /play/result (Result Screen — after game)
├── /play/game/:gameId (Specific mini-game)
├── /learn (Learning path — requires auth)
├── /learn/:stageId (Specific stage)
├── /learn/:stageId/:lessonId (Specific lesson)
├── /challenges (Challenge hub)
├── /challenges/daily (Daily challenge)
├── /leaderboard (Leaderboard)
├── /profile (Player profile — requires auth)
├── /profile/:userId (Public profile view)
├── /achievements (Achievement showcase — requires auth)
├── /progress (Progress dashboard — requires auth)
├── /premium (Premium page)
├── /settings (Settings — requires auth)
├── /about (About page)
├── /privacy (Privacy policy)
├── /terms (Terms of service)
└── /api/trpc/* (tRPC API endpoints)
```

---

## 31. Page Specifications

*(Detailed in §23 under "Page Specifications" and each individual page section)*

---

## 32. Typing Engine

### Core Architecture

The typing engine is the heart of the product. It runs client-side for responsiveness and reports results server-side for verification.

### Input Handling

```
onKeyDown event
  ↓
Filter: Ignore modifier-only keys (Shift, Ctrl, Alt, Meta)
  ↓
Filter: Ignore repeated keydown from key hold (use event.repeat)
  ↓
Filter: Block during IME composition (event.isComposing)
  ↓
Capture: key, timestamp, position in text
  ↓
Compare: typed character vs expected character
  ↓
Update: state (position, accuracy, combo, timing data)
  ↓
Render: visual feedback (correct/error highlighting)
```

### WPM Calculation

```
WPM = (total characters typed / 5) / (time in minutes)
```

Where:
- "Characters typed" = total characters attempted (correct + incorrect)
- "5" = standard word length (characters per word)
- "Time" = elapsed time from first keystroke to completion

**Raw WPM** = WPM without accuracy penalty
**Net WPM** = Raw WPM × (correct characters / total characters)

### Accuracy Calculation

```
Accuracy = (correct characters / total characters typed) × 100
```

### Combo System

- Combo starts at 0
- Each correct keystroke: combo + 1
- Each error: combo resets to 0
- Combo multiplier = 1 + (combo × 0.01) — max 2x at combo 100
- Combo is session-only (doesn't persist between games)

### Anti-Cheat Measures

1. **Timing analysis:** Flag sessions where keystroke timing is impossibly uniform (bot-like)
2. **Paste detection:** If clipboard paste detected, session is marked as "practice" (no leaderboard)
3. **WPM sanity check:** Server rejects WPM > 200 (human limit ~180 WPM for short bursts)
4. **Keystroke count validation:** typedText.length must match expectedText.length for full completion
5. **Client hash:** Client sends hash of typed text for server verification (not foolproof but adds friction)

### Mobile/IME Handling

- Detect virtual keyboard via screen width + input type
- Disable autocorrect/autocomplete on typing input
- Handle composition events for languages with IME (not critical for Indonesian but future-proof)
- On-screen keyboard: Accept input but tag session as "mobile" (separate leaderboard)

---

## 33. Scoring

### Score Formula

```
Base Score = WPM × Accuracy% × DifficultyMultiplier

Difficulty Multipliers:
  Stage 1: 0.8
  Stage 2: 0.9
  Stage 3: 1.0
  Stage 4: 1.1
  Stage 5: 1.2
  Stage 6: 1.3

Combo Bonus = 1 + (maxCombo × 0.005) — cap at 1.5x

Final Score = Base Score × Combo Bonus × CompletionBonus

Completion Bonus:
  Full completion: 1.0
  Partial (stopped early): 0.5
```

### Sanity Check Results

| Player Profile | WPM | Accuracy | Expected Score | Ranking Impact |
|----------------|-----|----------|----------------|---------------|
| Fast but sloppy | 80 | 60% | 80 × 0.6 × 1.0 × 1.0 × 1.0 = 48 | Moderate — accuracy kills score |
| Slow but perfect | 25 | 99% | 25 × 0.99 × 1.0 × 1.0 × 1.0 = 24.75 | Low-moderate — speed matters |
| Fast and accurate | 70 | 95% | 70 × 0.95 × 1.0 × 1.0 × 1.0 = 66.5 | High — balanced skill |
| Speed-only exploiter | 150 | 50% | 150 × 0.5 × 1.0 × 1.0 × 1.0 = 75 | Flagged by server validation |

**Key insight:** Accuracy is weighted heavily (0.5× in the multiplier) to prevent speed-only strategies.

---

## 34. Difficulty

### Adaptive Difficulty System

ValoType uses a **multi-signal adaptive system** that adjusts challenge difficulty in real-time.

### Signals Considered

| Signal | Weight | Purpose |
|--------|--------|---------|
| WPM (recent 5 sessions) | 30% | Overall speed capability |
| Accuracy (recent 5 sessions) | 25% | Precision level |
| Error pattern (which keys) | 20% | Targeted weakness |
| Consistency (speed variance) | 15% | Reliability |
| Session duration (time on platform) | 10% | Fatigue detection |

### Difficulty Levels (Implicit)

Rather than explicit "Easy/Medium/Hard" labels, difficulty is expressed through:

| Dimension | Low Difficulty | High Difficulty |
|-----------|---------------|-----------------|
| Text length | Short (3-5 words) | Long (10-20 words) |
| Word complexity | Common words | Rare/complex words |
| Punctuation | None | Full punctuation |
| Numbers | None | Included |
| Speed pressure | None (untimed) | Strict timer |
| Error tolerance | High | Low |
| Keyboard coverage | Home row only | Full keyboard |

### Adaptive Rules

1. **If accuracy < 80% for 2 sessions:** Reduce text complexity, focus on weak keys
2. **If accuracy > 95% for 3 sessions:** Increase complexity, add punctuation
3. **If WPM plateaus for 5 sessions:** Introduce new key combinations
4. **If user struggles on specific keys:** Serve content containing those keys
5. **If session time > 5 minutes:** Suggest break (gentle, not enforced)

---

## 35. Adaptive Learning

### Weakness Detection Algorithm

After each session:
1. Log each error by character position
2. Map error characters to finger/row
3. Calculate error rate per character: `errors[char] / attempts[char]`
4. Characters with error rate > 2× average are flagged as "weak"
5. Next recommended session focuses on weak characters

### Example Output

```
Session completed.
Weak keys identified: J, K, X
Recommended: Accuracy Fortress — J/K/X focus
```

### Personalized Practice Path

The system maintains a skill profile:
```
{
  homeRow: { mastery: 0.92, weakKeys: ['k'] },
  topRow: { mastery: 0.78, weakKeys: ['r', 't', 'y'] },
  bottomRow: { mastery: 0.65, weakKeys: ['b', 'n', 'm'] },
  punctuation: { mastery: 0.45, weakKeys: [',', '.', ';'] },
  numbers: { mastery: 0.30, weakKeys: ['all'] },
  commonWords: { mastery: 0.88 },
  sentences: { mastery: 0.72 }
}
```

This profile drives:
- Which mini-game is recommended next
- Which text content is served
- Which learning stage is appropriate

---

## 36. Authentication

### Auth Flow

```
Visitor lands on ValoType
  ↓
Plays as GUEST (localStorage-based progress)
  ↓
After 3 sessions or when user wants to save progress:
  ↓
Prompt: "Simpan progresmu? Buat akun gratis."
  ↓
Options:
  ├── Email + Password (primary)
  ├── Google OAuth (convenience)
  └── Continue as Guest (skip)
  ↓
If email signup:
  ├── Email verification (optional for MVP, required later)
  └── Login
```

### Key Decisions

1. **Guest mode is first-class.** Users can play multiple sessions without an account. Progress stored in localStorage.
2. **Signup is prompted, not forced.** After the user has experienced value (3+ sessions), they're gently reminded.
3. **Account migration:** When guest creates account, localStorage data is synced to server.
4. **No phone number.** Students shouldn't need to share phone numbers.
5. **Password hashing:** bcrypt with salt. Never plaintext.
6. **Session management:** HTTP-only cookies with JWT. No localStorage tokens.

---

## 37. User Flow

### New User Flow

```
Landing Page
  → Click "Main Sekarang"
  → Calibration typing (60 seconds)
  → Result: WPM, accuracy, assigned rank
  → Dashboard (with progress from calibration)
  → Play mini-game or challenge
  → Result
  → "Save your progress?" prompt
  → (optional) Create account
  → Return tomorrow for daily challenge
```

### Returning User Flow

```
Landing/Dashboard
  → See streak, daily challenge, progress
  → Choose activity (recommended or self-selected)
  → Play
  → Result
  → Updated stats
  → Share or continue
```

### Teacher Flow (Phase 5)

```
Teacher signup (school email)
  → Create class (name, grade)
  → Get class code
  → Share code with students
  → Students join class
  → Teacher dashboard shows:
    - Class average WPM
    - Individual student progress
    - Assignment completion rates
    - Weakest areas across class
  → Teacher creates assignment (text + deadline)
  → Students receive assignment notification
  → Students complete assignment
  → Teacher reviews results
```

---

## 38. User Stories

### Onboarding

| ID | Story |
|----|-------|
| US-ONBOARD-001 | As a new visitor, I want to start typing immediately without signing up, so that I can experience the product before committing. |
| US-ONBOARD-002 | As a new user, I want a brief calibration that feels like a game, so that I'm assessed without feeling tested. |
| US-ONBOARD-003 | As a new user, I want to receive my first rank immediately, so that I have a starting point for progression. |

### Typing

| ID | Story |
|----|-------|
| US-TYPE-001 | As a player, I want instant visual feedback when I type a correct character, so that I stay in flow. |
| US-TYPE-002 | As a player, I want to clearly see my errors, so that I can learn from mistakes. |
| US-TYPE-003 | As a player, I want my combo to increase with consecutive correct characters, so that accuracy feels rewarding. |
| US-TYPE-004 | As a player, I want to see my real-time WPM and accuracy, so that I know my performance mid-session. |

### Learning

| ID | Story |
|----|-------|
| US-LEARN-001 | As a beginner, I want to start with home row keys, so that I build proper foundation. |
| US-LEARN-002 | As a returning player, I want the system to remember my weak keys, so that I practice what I actually need. |
| US-LEARN-003 | As an advanced player, I want to skip introductory lessons, so that I'm not bored. |

### Progression

| ID | Story |
|----|-------|
| US-PROG-001 | As a player, I want to see XP gained after each session, so that I feel my effort is rewarded. |
| US-PROG-002 | As a player, I want to see how close I am to the next level/rank, so that I'm motivated to play one more. |
| US-PROG-003 | As a player, I want personal records highlighted, so that I celebrate self-improvement. |

### Challenge

| ID | Story |
|----|-------|
| US-CHAL-001 | As a player, I want a daily challenge that's different each day, so that I have a reason to return. |
| US-CHAL-002 | As a player, I want to challenge a friend via link, so that we can compete without needing accounts. |
| US-CHAL-003 | As a player, I want to retry a challenge unlimited times, so that I can improve without penalty. |

### Leaderboard

| ID | Story |
|----|-------|
| US-LB-001 | As a player, I want to see my percentile, not just my rank number, so that I feel my relative performance. |
| US-LB-002 | As a player, I want a weekly leaderboard that resets, so that everyone has a fresh chance. |

### Profile

| ID | Story |
|----|-------|
| US-PROF-001 | As a player, I want to display my achievements, so that I show off my accomplishments. |
| US-PROF-002 | As a player, I want my profile to show my typing journey, so that I see how far I've come. |

### Premium

| ID | Story |
|----|-------|
| US-PREM-001 | As a free user, I want to use all core learning features, so that I can improve without paying. |
| US-PREM-002 | As a premium user, I want detailed analytics on my weaknesses, so that I can optimize my practice. |

### Accessibility

| ID | Story |
|----|-------|
| US-A11Y-001 | As a user with motor impairments, I want full keyboard navigation, so that I can use the product without a mouse. |
| US-A11Y-002 | As a user with reduced motion preference, I want animations to be minimal, so that I'm not distracted or nauseated. |
| US-A11Y-003 | As a screen reader user, I want game state announced, so that I can participate. |

### Privacy

| ID | Story |
|----|-------|
| US-PRIV-001 | As a student, I want to use the product without providing personal information, so that my privacy is protected. |
| US-PRIV-002 | As a user, I want to delete my account and all data, so that I have control over my information. |

---

## 39. Functional Requirements

### Typing Engine

| ID | Priority | Requirement | Rationale | Acceptance Criteria | Dependencies |
|----|----------|-------------|-----------|--------------------|-------------| 
| FR-TYPE-001 | P0 | Capture keyboard input on physical keyboard with < 50ms latency | Core product | Given game is active, When user presses a key, Then input is registered and visual feedback appears within 50ms | None |
| FR-TYPE-002 | P0 | Compare typed character against expected character | Core mechanic | Given expected text "hello", When user types "h", Then "h" is marked correct. When user types "j", Then "j" is marked incorrect | FR-TYPE-001 |
| FR-TYPE-003 | P0 | Calculate WPM in real-time | Performance feedback | Given game is active, When 5+ seconds have elapsed, Then WPM display updates every second | FR-TYPE-001 |
| FR-TYPE-004 | P0 | Calculate accuracy percentage | Performance feedback | Given game is active, When any keystroke occurs, Then accuracy recalculates correctly | FR-TYPE-001 |
| FR-TYPE-005 | P0 | Track combo (consecutive correct keystrokes) | Game mechanic | Given combo at 0, When user types correct character, Then combo increases by 1. When user types wrong character, Then combo resets to 0 | FR-TYPE-002 |
| FR-TYPE-006 | P0 | Detect session completion | Flow control | Given all expected text has been typed, Then session ends and transitions to result screen | FR-TYPE-001 |
| FR-TYPE-007 | P0 | Block paste input | Anti-cheat | Given game is active, When paste event occurs, Then paste is prevented and session flagged as practice-only | FR-TYPE-001 |
| FR-TYPE-008 | P0 | Pause on Escape key | UX | Given game is active, When Escape is pressed, Then game pauses with overlay. When Escape pressed again, Then game resumes | FR-TYPE-001 |
| FR-TYPE-009 | P1 | Detect IME composition events | Compatibility | Given game is active, During IME composition, Then input is ignored until composition ends | FR-TYPE-001 |
| FR-TYPE-010 | P1 | Prevent key repeat from advancing position | Anti-exploit | Given game is active, When key is held down, Then character position advances only once per physical keypress | FR-TYPE-001 |

### Progression

| ID | Priority | Requirement |
|----|----------|-------------|
| FR-PROG-001 | P0 | Award XP after each completed session based on score formula |
| FR-PROG-002 | P0 | Calculate and display level based on cumulative XP |
| FR-PROG-003 | P0 | Track and display personal records (best WPM, best accuracy, best score) |
| FR-PROG-004 | P0 | Track and display streak (consecutive days with sessions) |
| FR-PROG-005 | P0 | Assign typing rank based on best WPM × accuracy |
| FR-PROG-006 | P1 | Award achievements based on milestones and specific accomplishments |
| FR-PROG-007 | P1 | Generate daily challenge with unique content each day |
| FR-PROG-008 | P2 | Generate weekly challenge with themed content |

### Game Modes

| ID | Priority | Requirement |
|----|----------|-------------|
| FR-GAME-001 | P0 | Speed Blitz mini-game (30-second speed test) |
| FR-GAME-002 | P0 | Accuracy Fortress mini-game (error-limited accuracy challenge) |
| FR-GAME-003 | P1 | Endurance Run mini-game (survival-based stamina challenge) |
| FR-GAME-004 | P1 | Combo Cascade mini-game (falling words with combo mechanic) |
| FR-GAME-005 | P2 | Word Weave mini-game (vocabulary puzzle) |

### Social

| ID | Priority | Requirement |
|----|----------|-------------|
| FR-SOCIAL-001 | P0 | Global leaderboard (ranked by best score) |
| FR-SOCIAL-002 | P0 | Weekly leaderboard (resets Monday) |
| FR-SOCIAL-003 | P0 | Shareable result card (downloadable image) |
| FR-SOCIAL-004 | P1 | Challenge a friend via unique link |
| FR-SOCIAL-005 | P2 | School/class leaderboard |

### Auth

| ID | Priority | Requirement |
|----|----------|-------------|
| FR-AUTH-001 | P0 | Guest mode (localStorage progress) |
| FR-AUTH-002 | P0 | Email + password signup/login |
| FR-AUTH-003 | P1 | Google OAuth login |
| FR-AUTH-004 | P1 | Account data migration from guest to registered |
| FR-AUTH-005 | P1 | Account deletion |

---

## 40. Non-Functional Requirements

| ID | Priority | Requirement | Target |
|----|----------|-------------|--------|
| NFR-PERF-001 | P0 | Typing input latency | < 50ms from keystroke to visual feedback |
| NFR-PERF-002 | P0 | Initial page load | < 2 seconds on 3G, < 1 second on 4G |
| NFR-PERF-003 | P0 | Lighthouse Performance score | ≥ 90 |
| NFR-PERF-004 | P0 | INP (Interaction to Next Paint) | < 200ms |
| NFR-PERF-005 | P0 | CLS (Cumulative Layout Shift) | < 0.1 |
| NFR-PERF-006 | P0 | JS bundle size (initial) | < 200KB gzipped |
| NFR-PERF-007 | P1 | TTFB (Time to First Byte) | < 400ms |
| NFR-PERF-008 | P1 | Memory usage during gameplay | < 100MB |
| NFR-SEC-001 | P0 | Passwords hashed with bcrypt | Cost factor ≥ 12 |
| NFR-SEC-002 | P0 | Rate limiting on auth endpoints | 5 requests/minute |
| NFR-SEC-003 | P0 | Input validation on all API endpoints | Zod schemas |
| NFR-SEC-004 | P1 | CSRF protection | SameSite cookies |
| NFR-SEC-005 | P1 | XSS prevention | React auto-escaping + CSP headers |
| NFR-SEC-006 | P0 | SQL injection prevention | Parameterized queries via Drizzle |
| NFR-A11Y-001 | P0 | Keyboard navigation | All interactive elements keyboard-accessible |
| NFR-A11Y-002 | P0 | Screen reader compatibility | Semantic HTML + ARIA labels |
| NFR-A11Y-003 | P0 | Reduced motion support | All animations respect prefers-reduced-motion |
| NFR-A11Y-004 | P0 | Color contrast | WCAG 2.2 AA (4.5:1 text, 3:1 large text) |
| NFR-A11Y-005 | P1 | Touch target size | ≥ 44×44px |
| NFR-BROWSER-001 | P0 | Chrome (latest 2 versions) | Full support |
| NFR-BROWSER-002 | P0 | Edge (latest 2 versions) | Full support |
| NFR-BROWSER-003 | P1 | Firefox (latest 2 versions) | Full support |
| NFR-BROWSER-004 | P1 | Safari (latest 2 versions) | Full support |
| NFR-BROWSER-005 | P1 | Android Chrome | Full support |
| NFR-BROWSER-006 | P1 | iOS Safari | Core support (typing limitations noted) |

---

## 41. Technical Architecture

### Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                    CLIENT                        │
│  React 19 + React Compiler + Tailwind CSS v4    │
│  shadcn/ui components                           │
│  Zustand (game state, preferences)              │
│  TanStack Query (server data)                   │
│  Typing Engine (custom, client-side)            │
└──────────────────┬──────────────────────────────┘
                   │ tRPC v11
┌──────────────────▼──────────────────────────────┐
│                    SERVER                        │
│  Node.js runtime                                │
│  tRPC v11 (API layer)                           │
│  Drizzle ORM (database layer)                   │
│  Auth (session management)                      │
│  Business logic (scoring, progression)          │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│                  DATABASE                        │
│  PostgreSQL                                     │
│  Drizzle schema + migrations                    │
└─────────────────────────────────────────────────┘
```

### Why This Stack

| Technology | Role | Why |
|------------|------|-----|
| Vite 8 (Rolldown) | Build tool | Fast builds, native ESM, minimal config |
| React 19 | UI framework | Compiler reduces manual optimization, stable ecosystem |
| React Compiler | Automatic optimization | Eliminates need for manual useMemo/useCallback, reduces bugs |
| TypeScript 5.9 | Type safety | End-to-end type safety from DB to UI |
| Tailwind CSS v4 | Styling | Utility-first, zero-runtime CSS, excellent DX |
| shadcn/ui | Component foundation | Copy-paste components, fully customizable, not a dependency |
| Zustand | Client state | Minimal, no boilerplate, perfect for game state |
| TanStack Query | Server state | Caching, refetching, optimistic updates |
| tRPC v11 | API layer | End-to-end type safety, no code generation needed |
| Drizzle ORM | Database layer | SQL-like API, TypeScript-first, excellent DX |
| PostgreSQL | Database | Reliable, feature-rich, handles complexity |
| Biome | Linting/formatting | Fast, single tool for lint + format |

### Dependency Boundaries

**Frontend dependencies:**
- UI: React, shadcn/ui, Tailwind
- State: Zustand
- Server data: TanStack Query, tRPC client
- Animations: CSS transitions/animations (no heavy animation library)
- Utilities: minimal (date-fns if needed, nothing else)

**Backend dependencies:**
- API: tRPC v11
- Database: Drizzle ORM, PostgreSQL driver (pg)
- Auth: Custom (bcrypt, cookie management)
- Validation: Zod (already included with tRPC)

**Not adding:**
- No Redux (Zustand suffices)
- No React Query devtools in production
- No moment.js (use native Date or date-fns)
- No lodash (use native methods)
- No axios (use fetch + tRPC)
- No styled-components (Tailwind)
- No framer-motion (CSS animations)

---

## 42. Frontend Architecture

### Folder Structure

```
src/
├── app/                    # App shell, providers, layout
│   ├── layout.tsx          # Root layout
│   ├── providers.tsx       # QueryClient, tRPC, etc.
│   └── not-found.tsx
├── components/             # Shared UI components
│   ├── ui/                 # shadcn/ui base components
│   ├── game/               # Game-specific components
│   │   ├── typing-area.tsx
│   │   ├── score-display.tsx
│   │   ├── combo-counter.tsx
│   │   ├── keyboard-viz.tsx
│   │   └── progress-bar.tsx
│   ├── layout/             # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── nav.tsx
│   └── shared/             # Cross-feature components
│       ├── result-card.tsx
│       ├── rank-badge.tsx
│       └── xp-bar.tsx
├── features/               # Feature modules
│   ├── auth/               # Authentication
│   │   ├── components/
│   │   ├── hooks/
│   │   └── schemas.ts
│   ├── typing/             # Core typing engine
│   │   ├── engine/
│   │   │   ├── input-handler.ts
│   │   │   ├── accuracy.ts
│   │   │   ├── wpm.ts
│   │   │   ├── combo.ts
│   │   │   └── scoring.ts
│   │   ├── hooks/
│   │   │   ├── use-typing-game.ts
│   │   │   ├── use-timer.ts
│   │   │   └── use-combo.ts
│   │   └── components/
│   ├── games/              # Mini-games
│   │   ├── speed-blitz/
│   │   ├── accuracy-fortress/
│   │   ├── endurance-run/
│   │   └── combo-cascade/
│   ├── progress/           # Progression system
│   ├── leaderboard/        # Leaderboards
│   ├── profile/            # Player profile
│   ├── achievements/       # Achievement system
│   └── settings/           # User settings
├── hooks/                  # Shared custom hooks
├── lib/                    # Utilities, constants, types
│   ├── tRPC.ts             # tRPC client setup
│   ├── query-client.ts     # TanStack Query setup
│   └── utils.ts            # Utility functions
├── stores/                 # Zustand stores
│   ├── game-store.ts       # Active game session state
│   └── preferences-store.ts # User preferences
├── routes/                 # Page components (file-based routing)
│   ├── index.tsx           # Landing page
│   ├── play.tsx            # Dashboard
│   ├── play.game.tsx       # Game screen
│   ├── play.result.tsx     # Result screen
│   ├── leaderboard.tsx
│   ├── profile.tsx
│   ├── premium.tsx
│   └── settings.tsx
├── styles/                 # Global styles, Tailwind config
│   ├── globals.css         # Tailwind imports + custom tokens
│   └── fonts.ts            # Font loading
└── server/                 # Server-side code
    ├── routers/            # tRPC routers
    │   ├── auth.ts
    │   ├── profile.ts
    │   ├── typing.ts
    │   ├── leaderboard.ts
    │   ├── achievements.ts
    │   └── index.ts
    ├── db/                 # Database
    │   ├── schema.ts       # Drizzle schema
    │   ├── migrations/     # Migration files
    │   └── index.ts        # DB connection
    ├── auth/               # Auth logic
    │   ├── session.ts
    │   └── password.ts
    └── trpc/               # tRPC context, middleware
        ├── context.ts
        └── router.ts
```

---

## 43. Backend Architecture

### Server Responsibilities

1. **API serving** via tRPC v11
2. **Authentication** — session management, password hashing
3. **Business logic** — score verification, progression calculations
4. **Database operations** — CRUD via Drizzle
5. **Rate limiting** — protect endpoints from abuse
6. **Content management** — typing challenge text, lessons

### Server/Client Boundary

| Logic | Location | Reason |
|-------|----------|--------|
| Typing input capture | Client | Must be instant (< 50ms) |
| WPM calculation | Client (display) + Server (verification) | Client for real-time feedback, server for leaderboard |
| Score calculation | Client (display) + Server (final) | Client for motivation, server for integrity |
| Progression updates | Server | Prevent client manipulation |
| Leaderboard ranking | Server | Single source of truth |
| Auth | Server | Security |
| Content serving | Server | Cacheable, shared |

---

## 44. API Architecture

### tRPC Router Structure

```typescript
// Server routers
appRouter = {
  auth: {
    signup         // mutation: email, password → session
    login          // mutation: email, password → session
    logout         // mutation: → void
    me             // query: → user profile
  },
  profile: {
    get            // query: userId? → profile
    update         // mutation: username, avatar → profile
    getStats       // query: userId → typing statistics
  },
  typing: {
    submitResult   // mutation: sessionData → verified score + XP
    getHistory     // query: pagination → session history
    getWeakKeys    // query: → weak key analysis
    getProgress    // query: → skill progression data
  },
  leaderboard: {
    getGlobal      // query: page → leaderboard entries
    getWeekly      // query: page → weekly leaderboard
    getPercentile  // query: → user's percentile
  },
  achievements: {
    getAll         // query: → all achievements with unlock status
    getRecent      // query: → recently unlocked
  },
  dailyChallenge: {
    getCurrent     // query: → today's challenge
    submitResult   // mutation: result → score
  },
  subscription: {
    getStatus      // query: → subscription status
    createCheckout // mutation: → checkout URL
    webhook        // (handled separately)
  }
}
```

### API Procedure Details

#### auth.signup
- **Type:** mutation
- **Input:** `{ email: string, password: string, username: string }`
- **Output:** `{ userId: string, sessionToken: string }`
- **Auth:** None (public)
- **Validation:** Email format, password ≥ 8 chars, username 3-20 chars alphanumeric
- **Error cases:** Email already exists, weak password, invalid username
- **Rate limit:** 3 requests/minute per IP

#### typing.submitResult
- **Type:** mutation
- **Input:** `{ challengeId: string, expectedText: string, typedText: string, timestamps: number[], duration: number }`
- **Output:** `{ score: number, xp: number, accuracy: number, wpm: number, rank: string, level: number }`
- **Auth:** Required (or guest session token)
- **Validation:** Server recalculates all metrics. Validates timing consistency. Checks for paste (abnormally fast typing).
- **Error cases:** Invalid session, tampered data, rate limit exceeded
- **Rate limit:** 10 requests/minute per user

#### leaderboard.getGlobal
- **Type:** query
- **Input:** `{ page: number, limit: number }`
- **Output:** `{ entries: Array<{ rank, username, wpm, accuracy, score }>, total: number, userRank?: number }`
- **Auth:** None
- **Validation:** Page ≥ 1, limit ≤ 50
- **Caching:** 60-second TTL

---

## 45. Database Architecture

### PostgreSQL with Drizzle ORM

**Schema location:** `src/server/db/schema.ts`

**Migration strategy:** Drizzle Kit for generating and applying migrations. No code-first pushing to production.

---

## 46. Data Model

### Users Table

| Field | Type | Notes |
|-------|------|-------|
| id | UUID (PK) | Primary key |
| email | text (unique) | Login credential |
| username | text (unique) | Display name |
| passwordHash | text | bcrypt hash |
| avatarUrl | text | Nullable, default avatar if null |
| createdAt | timestamp | Account creation |
| updatedAt | timestamp | Last profile update |
| isPremium | boolean | Default false |
| premiumExpiresAt | timestamp | Nullable |

**Indexes:** email (unique), username (unique)

### Profiles Table

| Field | Type | Notes |
|-------|------|-------|
| id | UUID (PK) | Primary key |
| userId | UUID (FK → users) | One-to-one with users |
| title | text | Unlocked via achievements |
| bestWpm | integer | Personal record |
| bestAccuracy | integer | Personal record (0-100) |
| bestScore | integer | Personal record |
| totalSessions | integer | Lifetime sessions count |
| totalTypedChars | bigint | Lifetime characters typed |
| currentStreak | integer | Consecutive days |
| longestStreak | integer | Best streak ever |
| lastActiveAt | timestamp | Last session date |
| currentLevel | integer | XP-based level |
| currentXp | integer | XP within current level |
| totalXp | bigint | Lifetime XP |
| currentRank | text | Iron/Bronze/Silver/Gold/Platinum/Diamond/Valor |

**Indexes:** userId (unique), currentRank, currentLevel

### Typing Sessions Table

| Field | Type | Notes |
|-------|------|-------|
| id | UUID (PK) | Primary key |
| userId | UUID (FK → users, nullable) | Null for guests |
| guestToken | text | For guest sessions |
| challengeId | text | Maps to content |
| gameMode | text | blitz/fortress/endurance/cascade/weave/free |
| expectedText | text | The text to type |
| typedText | text | What user typed |
| errorCount | integer | Total errors |
| accuracy | real | 0-100 |
| wpm | integer | Words per minute |
| rawWpm | integer | Without accuracy penalty |
| score | integer | Final score |
| maxCombo | integer | Highest combo in session |
| durationMs | integer | Session duration in ms |
| isVerified | boolean | Server-verified |
| isPractice | boolean | Practice mode (not scored) |
| difficulty | text | Session difficulty level |
| createdAt | timestamp | Session timestamp |

**Indexes:** userId + createdAt, score DESC (for leaderboard), challengeId

**Partitioning:** Consider partitioning by month for sessions table at scale (>1M rows).

### Achievements Table (reference data)

| Field | Type | Notes |
|-------|------|-------|
| id | text (PK) | Achievement identifier |
| name | text | Display name |
| description | text | How to earn |
| category | text | speed/accuracy/consistency/exploration/mastery/challenge/milestone |
| iconEmoji | text | Display emoji |
| xpReward | integer | XP earned on unlock |
| rarity | text | common/rare/epic/legendary |

### User Achievements Table

| Field | Type | Notes |
|-------|------|-------|
| id | UUID (PK) | Primary key |
| userId | UUID (FK → users) | Player |
| achievementId | text (FK → achievements) | Achievement |
| unlockedAt | timestamp | When earned |

**Indexes:** userId + achievementId (unique)

### Content/Lessons Table (reference data)

| Field | Type | Notes |
|-------|------|-------|
| id | text (PK) | Lesson identifier |
| stageId | text | Learning stage |
| title | text | Display title |
| text | text | Typing content |
| category | text | Content category (school/tech/science/etc.) |
| targetKeys | text[] | Keys this lesson focuses on |
| difficulty | integer | 1-10 difficulty rating |
| language | text | id-ID or en-US |
| isActive | boolean | Whether currently available |

### Leaderboard Table (materialized view)

Generated from typing sessions. Refreshed periodically (not real-time for MVP).

| Field | Type | Notes |
|-------|------|-------|
| userId | UUID | Player |
| bestScore | integer | Best score ever |
| weeklyScore | integer | Best score this week |
| bestWpm | integer | Best WPM |
| bestAccuracy | integer | Best accuracy |
| lastSessionAt | timestamp | Most recent session |

**Indexes:** bestScore DESC, weeklyScore DESC

### Subscriptions Table

| Field | Type | Notes |
|-------|------|-------|
| id | UUID (PK) | Primary key |
| userId | UUID (FK → users) | Subscriber |
| planId | text | premium_monthly / premium_yearly |
| status | text | active / cancelled / expired |
| currentPeriodStart | timestamp | Billing period start |
| currentPeriodEnd | timestamp | Billing period end |
| paymentProvider | text | Payment provider used |
| externalId | text | Provider subscription ID |

---

## 47. State Management

### State Ownership

| State | Owner | Examples |
|-------|-------|----------|
| Local UI State | React useState | Modal open, selected tab, form inputs |
| Game Session | Zustand store | Active game, typed text, combo, WPM, accuracy, timer |
| User Preferences | Zustand store | Theme, sound, reduced motion, language |
| Server Data | TanStack Query | Profile, progress, leaderboard, achievements, challenges |
| Auth State | TanStack Query + cookie | User session, login status |

### Zustand Stores

**Game Store:**
```typescript
{
  // Session state
  status: 'idle' | 'countdown' | 'playing' | 'paused' | 'completed'
  gameMode: string
  challengeId: string
  expectedText: string
  
  // Typing state
  currentPosition: number
  typedChars: Array<{ char: string, correct: boolean, timestamp: number }>
  currentCombo: number
  maxCombo: number
  
  // Metrics
  wpm: number
  accuracy: number
  errorCount: number
  startTime: number
  
  // Actions
  startGame: (challengeId: string, text: string) => void
  typeCharacter: (char: string) => void
  pause: () => void
  resume: () => void
  complete: () => void
  reset: () => void
}
```

### TanStack Query Keys

```typescript
queryKeys = {
  profile: ['profile'] or ['profile', userId]
  stats: ['stats'] or ['stats', userId]
  progress: ['progress']
  leaderboard: ['leaderboard', 'global', page]
  weeklyLeaderboard: ['leaderboard', 'weekly', page]
  achievements: ['achievements']
  dailyChallenge: ['dailyChallenge']
  sessions: ['sessions', page]
  weakKeys: ['weakKeys']
}
```

---

## 48. Performance

### Performance Budget

| Metric | Target | How |
|--------|--------|-----|
| LCP | < 2.0s | Optimized fonts, minimal above-fold content |
| INP | < 200ms | React Compiler, minimal state updates during typing |
| CLS | < 0.1 | Reserved space for dynamic content, stable fonts |
| TTFB | < 400ms | Edge caching, optimized server response |
| Initial JS bundle | < 200KB gzipped | Code splitting, lazy loading |
| CSS bundle | < 30KB gzipped | Tailwind purge, minimal custom CSS |
| Total page weight | < 500KB | Minimal assets, SVG icons, optimized images |
| Typing latency | < 50ms | Direct DOM manipulation for cursor, no React re-render on keystroke |

### Optimization Strategy

1. **Code splitting:** Game modes loaded on demand. Landing page doesn't load game code.
2. **Lazy loading:** Below-fold sections load after initial paint.
3. **Font optimization:** Display swap, subset to Latin + Latin Extended, preload critical fonts.
4. **Image optimization:** SVG for icons/illustrations. No raster images in critical path.
5. **React Compiler:** Automatic memoization reduces unnecessary re-renders.
6. **CSS-first approach:** Tailwind v4 generates minimal CSS. No runtime CSS-in-JS.
7. **TanStack Query caching:** Server data cached, reducing API calls.
8. **Minimal state updates during typing:** Game loop uses refs for timing, state updates throttled to 100ms for WPM/accuracy display.

### Typing Performance Deep Dive

The typing engine is the most latency-sensitive part. Strategy:

1. **Input handler:** `onKeyDown` directly updates a ref (not state). React re-render only for visual updates (throttled to 16ms for 60fps).
2. **Character comparison:** Pure function, runs synchronously.
3. **Visual feedback:** CSS class toggling via direct DOM manipulation for current character. No React reconciliation for individual characters.
4. **WPM/accuracy display:** Updated via `requestAnimationFrame` at most once per frame.
5. **Combo animation:** CSS transition triggered by class change, not React state-driven animation.

---

## 49. Security

### Security Requirements

| Area | Requirement |
|------|-------------|
| Password storage | bcrypt, cost factor ≥ 12, salt per user |
| Session management | HTTP-only, Secure, SameSite=Strict cookies |
| JWT | Short-lived access tokens (15 min), refresh token rotation |
| Input validation | Zod schemas on all API inputs |
| Rate limiting | Auth: 5/min. API: 30/min. Score submission: 10/min |
| CSRF | SameSite cookies + origin header validation |
| XSS | React auto-escaping + Content-Security-Policy headers |
| SQL injection | Drizzle ORM parameterized queries (no raw SQL) |
| Secrets | Environment variables, never committed. Use `.env.example` for documentation |
| HTTPS | Enforced in production. HSTS header. |
| Abuse prevention | Rate limiting, suspicious pattern detection, automated typing detection |

### Score Integrity

Server verifies:
1. `typedText.length === expectedText.length` for full completion
2. WPM ≤ 200 (impossible for humans above this)
3. Keystroke timing variance > threshold (bots have uniform timing)
4. Session duration consistent with character count
5. No paste patterns (sudden large text insertion)

Failed verification → session marked as "unverified", excluded from leaderboard.

---

## 50. Privacy

### Data Collection

| Data | Collected | Purpose | Retention |
|------|-----------|---------|-----------|
| Email | Only on signup | Authentication | Until account deletion |
| Username | On signup | Display name | Until account deletion |
| Password | On signup (hashed) | Authentication | Until account deletion |
| Typing sessions | Always | Progress tracking | 2 years, then anonymized |
| Device type | Optional | Analytics (mobile vs desktop) | 1 year |
| IP address | On auth events | Abuse prevention | 90 days |

### What We DON'T Collect

- Real name (not required)
- Phone number
- School name (unless class mode)
- Location (beyond country for analytics)
- Browsing history
- Social media profiles
- Biometric data
- Contact list

### Student Privacy Considerations

- Users may be under 13 (COPPA considerations, [RESEARCH REQUIRED for Indonesian regulations])
- Minimal data collection by design
- No third-party tracking pixels on student-facing pages
- No targeted advertising
- Parental consent mechanism for users under 13: [RESEARCH REQUIRED]
- Account deletion includes all associated data

### Data Deletion

- Users can delete their account from Settings
- Deletion removes: profile, sessions, achievements, leaderboard entries
- Deletion is permanent and irreversible
- Deletion request processed within 72 hours

---

## 51. SEO

### Target Keywords

| Keyword | Volume (est.) | Difficulty | Priority |
|---------|--------------|------------|----------|
| typing test Indonesia | High | Medium | P0 |
| belajar mengetik | High | Low | P0 |
| latihan mengetik | High | Low | P0 |
| mengetik 10 jari | Medium | Low | P0 |
| typing game | High | High | P1 |
| typing test online | High | High | P1 |
| belajar keyboard | Medium | Low | P1 |
| game mengetik | Medium | Low | P1 |
| typing practice | High | High | P2 |

### SEO Implementation

1. **Semantic HTML:** Proper heading hierarchy, landmarks, article sections
2. **Metadata:** Dynamic `<title>` and `<meta description>` per page
3. **Open Graph:** Social sharing metadata for result cards
4. **Structured data:** WebApplication schema for the main app
5. **Sitemap:** Auto-generated, updated on content changes
6. **Robots.txt:** Allow all, disallow /api/
7. **Canonical URLs:** Prevent duplicate content
8. **Content pages:** /about, /privacy, /terms (static, indexable)
9. **Performance:** Fast loading = better SEO ranking
10. **Mobile-first:** Google's mobile-first indexing

---

## 52. Analytics

### Event Taxonomy

| Event | Category | Properties | Privacy |
|-------|----------|------------|---------|
| `landing_view` | page | referrer, utm_params | Anonymous |
| `game_start` | game | gameMode, difficulty, challengeId | Anonymous |
| `game_complete` | game | gameMode, wpm, accuracy, score, duration | User-linked |
| `game_pause` | game | gameMode, position | Anonymous |
| `session_submit` | typing | wpm, accuracy, score, combo, verified | User-linked |
| `level_up` | progression | oldLevel, newLevel | User-linked |
| `rank_change` | progression | oldRank, newRank | User-linked |
| `achievement_unlocked` | progression | achievementId | User-linked |
| `daily_challenge_start` | challenge | challengeId | User-linked |
| `daily_challenge_complete` | challenge | score, wpm, accuracy | User-linked |
| `share_result` | social | platform, gameMode | Anonymous |
| `signup` | auth | method (email/google) | Anonymous |
| `login` | auth | method | Anonymous |
| `premium_view` | monetization | — | Anonymous |
| `premium_convert` | monetization | plan | User-linked |

### Privacy-First Analytics

- No third-party analytics scripts (no Google Analytics, no Mixpanel)
- Self-hosted analytics or privacy-compliant solution
- No cross-site tracking
- No fingerprinting
- User can opt out of analytics in settings
- Aggregated data only for reporting

---

## 53. Testing

### Testing Strategy

| Type | Scope | Tools | Priority |
|------|-------|-------|----------|
| Unit tests | Typing engine, scoring, WPM calculation | Vitest | P0 |
| Unit tests | Utility functions, formatting | Vitest | P0 |
| Integration tests | API routes, auth flow | Vitest | P0 |
| Component tests | UI components (rendering) | Vitest + Testing Library | P1 |
| E2E tests | Critical user flows | Playwright | P1 |
| Accessibility tests | WCAG compliance | axe-core + Playwright | P1 |
| Performance tests | Bundle size, Core Web Vitals | Lighthouse CI | P1 |

### Critical Test Areas

1. **Typing engine:** Input handling, accuracy calculation, WPM calculation, combo tracking, paste blocking
2. **Scoring:** Score formula, XP calculation, rank determination
3. **Auth:** Signup, login, session management, guest mode
4. **Leaderboard:** Score submission, ranking, pagination
5. **Daily challenge:** Content generation, daily reset

---

## 54. CI/CD

### Pipeline

```
Push to main / PR created
  ↓
Install dependencies (pnpm install)
  ↓
Biome lint
  ↓
Biome format check
  ↓
TypeScript type check (tsc --noEmit)
  ↓
Unit tests (vitest)
  ↓
Build (vite build)
  ↓
[If PR] Preview deployment
  ↓
[If main] E2E tests (playwright)
  ↓
[If main] Production deployment
```

### Quality Gates

- Zero Biome errors
- Zero TypeScript errors
- All unit tests pass
- Build succeeds
- Bundle size within budget
- Lighthouse score ≥ 90

---

## 55. Deployment

### Architecture

| Component | Service | Notes |
|-----------|---------|-------|
| Frontend | Vercel / Cloudflare Pages | Static SPA, edge-cached |
| Backend | Vercel Serverless / Railway | tRPC server, API routes |
| Database | Neon / Supabase (PostgreSQL) | Serverless PostgreSQL |
| Environment | Staging + Production | Preview deploys for PRs |

### Environment Variables

```
DATABASE_URL=          # PostgreSQL connection string
AUTH_SECRET=           # Session signing secret
GOOGLE_CLIENT_ID=      # Google OAuth (if used)
GOOGLE_CLIENT_SECRET=  # Google OAuth
STRIPE_SECRET_KEY=     # Stripe (if used for premium)
STRIPE_WEBHOOK_SECRET= # Stripe webhook
```

### Migration Strategy

```bash
# Generate migration
drizzle-kit generate

# Apply migration
drizzle-kit push    # Development
drizzle-kit migrate # Production
```

---

## 56. Observability

### MVP Observability

| Tool | Purpose |
|------|---------|
| Error tracking | Sentry or similar — capture unhandled errors |
| Server logs | Structured JSON logging |
| API monitoring | Request count, latency, error rate |
| Database monitoring | Query performance, connection pool |
| Uptime monitoring | Heartbeat checks |

### Key Alerts

- API error rate > 5%
- P95 latency > 1s
- Database connection pool > 80%
- Error rate spike (> 10 errors/minute)

---

## 57. Error Handling

### UI Error States

| State | UI | Message |
|-------|----|---------|
| Loading | Skeleton with pulse animation | — |
| Empty (no data) | Illustration + message | "Belum ada data. Mulai bermain untuk mulai tracking!" |
| Network error | Retry button | "Koneksi terputus. Coba lagi?" |
| Unauthorized | Login prompt | "Silakan login untuk melanjutkan." |
| Server error | Retry button | "Ada masalah di server kami. Coba beberapa saat lagi." |
| Rate limited | Timer | "Terlalu banyak permintaan. Tunggu sebentar." |

### Error Message Principles

- Clear — user understands what happened
- Short — no paragraphs of text
- Not blaming — "Ada masalah" not "Kamu melakukan kesalahan"
- Actionable — always includes what to do next

---

## 58. Edge Cases

| Scenario | Handling |
|----------|----------|
| User refreshes during game | Game state lost. Prompt: "Permainan belum tersimpan. Mulai ulang?" |
| Internet lost during game | Game continues client-side. Result submitted when online. |
| Keyboard disconnects | Game pauses automatically. Prompt: "Keyboard terputus. Sambungkan kembali." |
| Browser loses focus | Game pauses after 3 seconds. Resumes on refocus. |
| User pastes text | Blocked. Session flagged as practice-only (no leaderboard). |
| User presses unexpected key | Ignored (only characters in expected text are accepted, plus Enter/Backspace). |
| Duplicate score submission | Server deduplication via session ID. Second submission rejected. |
| API timeout | Client retries once. Then shows error with retry button. |
| Server unavailable | Offline mode: typing works, results queued, synced when online. |
| Invalid score (impossible WPM) | Server rejects. User gets error: "Skor tidak valid. Coba lagi." |
| Extremely high WPM (>200) | Flagged for review, excluded from leaderboard. |
| Mobile keyboard autocorrect | Disabled via input attributes. Warning shown. |
| Screen reader user | Game state announced via ARIA live regions. |
| Reduced motion user | All animations reduced to instant state changes. |
| Account deleted while session active | Session completes, data anonymized. |
| Expired session | Redirect to login. Guest mode available. |

---

## 59. Admin

### MVP Admin Needs

- **Content management:** Add/edit typing challenge text
- **User moderation:** View/ban users if needed
- **Leaderboard moderation:** Remove suspicious scores
- **Basic analytics:** User count, sessions, retention

### Admin Approach (MVP)

No custom admin panel. Use direct database queries + simple scripts for content management. Custom admin UI only when team size and content volume demand it (V2+).

---

## 60. MVP Scope

### Must Have (P0)

- [ ] Typing engine (input capture, WPM, accuracy, combo)
- [ ] Calibration / first session
- [ ] 2 mini-games (Speed Blitz + Accuracy Fortress)
- [ ] XP + Level system
- [ ] Typing rank system
- [ ] Personal records tracking
- [ ] Streak system
- [ ] Guest mode
- [ ] Email signup/login
- [ ] Dashboard (game home)
- [ ] Game screen
- [ ] Result screen
- [ ] Leaderboard (global)
- [ ] Shareable result card
- [ ] Landing page (with interactive demo)
- [ ] Profile page
- [ ] Settings page
- [ ] Responsive design (mobile + desktop)
- [ ] Basic accessibility (keyboard nav, contrast, reduced motion)
- [ ] Neo-brutalist design system
- [ ] Dark/light theme
- [ ] Score verification (server-side)
- [ ] Basic content (50+ typing challenges)

### Should Have (P1)

- [ ] Achievement system
- [ ] Daily challenge
- [ ] Challenge a friend (link)
- [ ] Endurance Run mini-game
- [ ] Combo Cascade mini-game
- [ ] Weakness detection + targeted practice
- [ ] Detailed progress analytics
- [ ] Google OAuth
- [ ] Premium page + subscription (basic)
- [ ] Advanced analytics (premium)
- [ ] Custom themes (premium)

### Could Have (P2)

- [ ] Weekly challenge
- [ ] Word Weave mini-game
- [ ] Mastery levels per skill
- [ ] School/class leaderboard
- [ ] Comprehensive SEO content
- [ ] Offline mode (partial)
- [ ] Custom admin panel

### Won't Have Yet (P3)

- [ ] AI typing coach
- [ ] Seasonal events
- [ ] School management (class creation, assignment)
- [ ] Multiplayer real-time
- [ ] Mobile app (PWA sufficient)
- [ ] Advanced content management system
- [ ] B2B school plans
- [ ] Internationalization (beyond id-ID)
- [ ] Sound effects
- [ ] Advanced cheat detection

---

## 61. Feature Prioritization

### Priority Matrix (Impact × Effort)

| Feature | Impact | Effort | Priority | MVP? |
|---------|--------|--------|----------|------|
| Typing engine | Critical | Moderate | P0 | ✅ |
| Calibration/first session | High | Low | P0 | ✅ |
| XP + Level system | High | Low | P0 | ✅ |
| Typing rank | High | Low | P0 | ✅ |
| Guest mode | High | Low | P0 | ✅ |
| Dashboard | High | Moderate | P0 | ✅ |
| Speed Blitz game | High | Moderate | P0 | ✅ |
| Accuracy Fortress game | High | Moderate | P0 | ✅ |
| Leaderboard | High | Moderate | P0 | ✅ |
| Share result card | High | Moderate | P0 | ✅ |
| Landing page | High | Moderate | P0 | ✅ |
| Streak | Medium | Low | P0 | ✅ |
| Profile page | Medium | Low | P0 | ✅ |
| Settings | Medium | Low | P0 | ✅ |
| Responsive design | Critical | Moderate | P0 | ✅ |
| Neo-brutalist design | High | Moderate | P0 | ✅ |
| Basic accessibility | Critical | Moderate | P0 | ✅ |
| Daily challenge | Medium | Moderate | P1 | ❌ |
| Achievement system | Medium | Moderate | P1 | ❌ |
| Friend challenge (link) | Medium | Low | P1 | ❌ |
| Weakness detection | High | High | P1 | ❌ |
| Google OAuth | Medium | Low | P1 | ❌ |
| Premium/subscription | Medium | High | P1 | ❌ |
| Advanced analytics | Medium | High | P1 | ❌ |
| Endurance Run game | Medium | Moderate | P1 | ❌ |
| Combo Cascade game | Medium | Moderate | P1 | ❌ |
| Weekly challenge | Low | Moderate | P2 | ❌ |
| School leaderboard | Medium | High | P2 | ❌ |
| Word Weave game | Low | Moderate | P2 | ❌ |
| Mastery levels | Low | High | P2 | ❌ |
| AI typing coach | High | Very High | P3 | ❌ |
| Seasonal events | Low | Moderate | P3 | ❌ |
| Multiplayer real-time | Medium | Very High | P3 | ❌ |

---

## 62. Roadmap

### Phase 0: Foundation (Week 1-3)

**Goal:** Technical foundation + design system

| Feature | Deliverable |
|---------|-------------|
| Project setup | Vite 8, React 19, TypeScript 5.9, Tailwind v4, shadcn/ui |
| Design system | Tokens, base components (Button, Card, Badge, etc.) |
| Neo-brutalist theme | Light + dark mode |
| Typing engine v1 | Core input handling, WPM, accuracy, combo |
| Database setup | PostgreSQL, Drizzle schema, migrations |
| Auth system | Guest mode + email signup/login |
| tRPC setup | API layer, context, middleware |

**Success metric:** Typing engine works with < 50ms latency. Design system renders consistently.

**Risks:** Typing engine latency higher than expected. Neo-brutalist design doesn't come together.

### Phase 1: MVP (Week 4-8)

**Goal:** Launchable product with core value

| Feature | Deliverable |
|---------|-------------|
| Landing page | Interactive demo, CTA, responsive |
| Dashboard | Game home, activity selection |
| Game screen | Typing interface, real-time feedback |
| Result screen | Score, XP, improvement display |
| Speed Blitz | 30-second speed challenge |
| Accuracy Fortress | Error-limited accuracy challenge |
| XP + Level | Progression system |
| Typing rank | Rank assignment and display |
| Streak | Daily streak tracking |
| Leaderboard | Global + weekly |
| Share card | Downloadable result image |
| Profile | Player stats |
| Settings | Preferences |
| Content | 50+ typing challenges (Indonesian) |
| Score verification | Server-side validation |

**Success metric:** 1,000 users in first month. 20% D7 retention. < 50ms typing latency.

**Risks:** Content production bottleneck. Performance on low-end devices.

### Phase 2: Retention (Week 9-12)

**Goal:** Keep users coming back

| Feature | Deliverable |
|---------|-------------|
| Daily challenge | Unique daily content + bonus XP |
| Achievement system | 30+ achievements |
| Weakness detection | Error analysis + targeted practice |
| Progress analytics | Detailed improvement tracking |
| Endurance Run game | Survival mode |
| Combo Cascade game | Falling words mode |

**Success metric:** 30% D7 retention. 15% D30 retention.

### Phase 3: Social (Week 13-16)

**Goal:** Organic growth through sharing

| Feature | Deliverable |
|---------|-------------|
| Challenge a friend | Shareable challenge links |
| Improved share cards | Better visual design, more data |
| School/class leaderboard | Group-based rankings |
| Referral system | Invite friends, earn rewards |

**Success metric:** K-factor > 0.2. 10% of sessions result in share.

### Phase 4: Monetization (Week 17-20)

**Goal:** Sustainable revenue

| Feature | Deliverable |
|---------|-------------|
| Premium subscription | Monthly/yearly plans |
| Advanced analytics | Premium-only insights |
| Custom themes | Premium cosmetic options |
| Advanced challenges | Expert modes |
| Payment integration | Stripe or local payment provider |

**Success metric:** 5% conversion rate. Rp 5M MRR at 50K MAU.

### Phase 5: School (Week 21-26)

**Goal:** B2B education market

| Feature | Deliverable |
|---------|-------------|
| Teacher dashboard | Class management |
| Assignment system | Create/assign/review |
| Student progress view | Per-student analytics |
| School plans | Bulk pricing |

### Phase 6: Scale (Week 27+)

**Goal:** Growth + internationalization

| Feature | Deliverable |
|---------|-------------|
| English content | en-US localization |
| AI typing coach | Personalized recommendations |
| Advanced content management | Admin panel |
| API for schools | Integration with LMS |
| Performance optimization | Handle 100K+ concurrent |

---

## 63. Metrics

### North Star Metric

**Weekly Active Typers Who Improve** (WATI)

Definition: Unique users who complete at least 3 typing sessions in a week AND show measurable WPM or accuracy improvement from their baseline.

Why this metric:
- "Weekly" ensures consistency (not one-time visitors)
- "Typers" ensures actual product use (not just browsing)
- "3+ sessions" ensures meaningful engagement
- "Show improvement" ensures the product is actually delivering value

### Supporting Metrics

| Category | Metric | Target (MVP) |
|----------|--------|-------------|
| Activation | % of visitors who complete first session | > 60% |
| Activation | % of first sessions that lead to second session | > 40% |
| Retention | D1 retention | > 35% |
| Retention | D7 retention | > 20% |
| Retention | D30 retention | > 10% |
| Engagement | Avg sessions per user per week | > 3 |
| Engagement | Avg session duration | > 3 minutes |
| Engagement | Avg sessions before signup | < 5 |
| Learning | Avg WPM improvement after 10 sessions | > 5 WPM |
| Virality | Share rate (shares / sessions) | > 10% |
| Virality | K-factor | > 0.2 |
| Monetization | Free → Premium conversion | > 3% |
| Monetization | Monthly churn (premium) | < 8% |
| Performance | Lighthouse score | > 90 |
| Performance | Typing latency (p95) | < 50ms |

---

## 64. Success Criteria

### MVP Launch Criteria

| # | Criterion | How to verify |
|---|-----------|--------------|
| 1 | User can start typing without account | Guest mode works end-to-end |
| 2 | User can complete a typing challenge | Typing engine captures input, calculates metrics |
| 3 | System calculates accurate score | Server-side verification matches client |
| 4 | System saves progress | Profile updates correctly after session |
| 5 | User can see improvement | WPM/accuracy tracked and displayed |
| 6 | User can replay | Multiple sessions work, history visible |
| 7 | Typing latency < 50ms | Performance testing confirms |
| 8 | Works on mobile (physical keyboard) | Tested on Android + iOS |
| 9 | Leaderboard displays correctly | Rankings update after sessions |
| 10 | Share card generates correctly | Downloadable image looks good |
| 11 | Design is neo-brutalist | Passes Anti-AI-Slop checklist |
| 12 | Accessible (basic) | Keyboard nav, contrast, reduced motion work |

---

## 65. Risks

### Product Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Users get bored quickly | High | Critical | Daily challenges, varied mini-games, social competition |
| Game overwhelms learning | Medium | High | Pedagogical structure ensures skill progression |
| Learning overwhelms fun | Medium | High | Game-first UX, learning is invisible |
| Cheating on leaderboard | High | Medium | Server validation, suspicious score detection |
| Poor mobile experience | High | High | Honest about mobile limitations, physical keyboard recommended |
| Leaderboard toxicity | Medium | Medium | Percentile focus, personal improvement highlighting |
| Privacy concerns (minors) | Medium | Critical | Minimal data, no social features, parental controls |
| Content scalability | Medium | Medium | Content model allows easy addition without code changes |
| Retention problems | High | Critical | Multiple retention mechanisms (streak, daily challenge, social) |
| Premium feels unfair | Medium | High | Core learning always free, premium is analytics + cosmetic |

### Business Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Low willingness to pay | High | High | Very low price point, generous free tier |
| High acquisition cost | Medium | High | SEO + viral sharing (organic channels first) |
| Low retention | High | Critical | Multiple retention mechanisms, content updates |
| Low premium conversion | High | Medium | Generous free tier, premium adds genuine value |
| Competition from typing.com | Medium | Medium | Better design, game feel, Indonesia-first |
| School sales cycle is long | High | Medium | School features in Phase 5, focus on consumer first |
| Content production cost | Medium | Medium | Community content (future), template system |

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Typing latency too high | Low | Critical | Direct DOM manipulation, minimal React updates |
| Bundle size too large | Medium | High | Code splitting, lazy loading, strict budget |
| Animation performance issues | Medium | Medium | CSS-only animations, reduced motion fallback |
| Real-time leaderboard scaling | Low | Medium | MVP uses periodic refresh, not WebSocket |
| PostgreSQL growth (sessions table) | Medium | Low | Partitioning strategy, data retention policy |
| tRPC complexity | Low | Low | Simple router structure, no over-abstraction |
| Browser differences | Medium | Medium | Feature detection, graceful degradation |
| Mobile input issues | High | Medium | Honest about limitations, physical keyboard emphasis |

---

## 66. Mitigation

*(Mitigation strategies embedded in risk tables above. Key principles:)*

1. **Ship MVP first, optimize later.** Don't over-engineer for scale you don't have.
2. **Measure everything.** If retention is low, the data tells you why.
3. **User feedback loops.** Quick iteration based on real usage.
4. **Performance budget enforcement.** Bundle size checked in CI.
5. **Progressive enhancement.** Core typing works without JavaScript fancy features.

---

## 67. Competitive Analysis

### typing.com

| Aspect | Assessment |
|--------|-----------|
| Strengths | Comprehensive curriculum, free, school features, well-structured lessons |
| Weaknesses | Dated design, feels like homework, no game mechanics, boring UX |
| Target | Schools, structured learners |
| Learning | Strong (systematic curriculum) |
| Retention | Low (no game loop, no daily hooks) |
| UX | Functional but outdated |

### MonkeyType

| Aspect | Assessment |
|--------|-----------|
| Strengths | Clean design, fast, community, customizable, good testing |
| Weaknesses | No learning path, no beginner support, test-only, no progression |
| Target | Existing touch-typists wanting speed practice |
| Learning | Minimal (no structured improvement) |
| Retention | Medium (habit-driven by competitive users) |
| UX | Excellent, minimalist |

### TypeRacer

| Aspect | Assessment |
|--------|-----------|
| Strengths | Competitive multiplayer, fun race format, social |
| Weaknesses | Steep learning curve, no teaching, frustrating for beginners, dated UI |
| Target | Intermediate-advanced typists |
| Learning | Low (assumes you already can type) |
| Retention | High for competitive users |
| UX | Functional, somewhat dated |

### Nitro Type

| Aspect | Assessment |
|--------|-----------|
| Strengths | Car racing theme, visual appeal, school adoption |
| Weaknesses | Game-first, learning-second, complex, heavy |
| Target | Students (especially US) |
| Learning | Low (game is primary, typing is incidental) |
| Retention | High (game mechanics) |
| UX | Overwhelming, busy |

### Keybr

| Aspect | Assessment |
|--------|-----------|
| Strengths | Adaptive difficulty, finger tracking, strong learning algorithm |
| Weaknesses | Ugly design, no game feel, boring for casual users |
| Target | Serious learners |
| Learning | Excellent (best adaptive algorithm) |
| Retention | Low (no fun) |
| UX | Functional but unattractive |

### 10FastFingers

| Aspect | Assessment |
|--------|-----------|
| Strengths | Simple, fast, multi-language, competitions |
| Weaknesses | Test-only, no learning, no progression, very basic |
| Target | Quick typists wanting benchmark |
| Learning | None |
| Retention | Very low |
| UX | Basic |

---

## 68. Differentiation

### Why ValoType Over Alternatives?

| Category | ValoType | typing.com | MonkeyType | TypeRacer |
|----------|----------|------------|------------|-----------|
| Learning path | ✅ Integrated into gameplay | ✅ Structured but boring | ❌ None | ❌ None |
| Fun factor | ✅ Game-first design | ❌ Homework feel | ⚠️ Minimalist is fun | ✅ Competitive |
| Beginner-friendly | ✅ Calibration → guided | ✅ Yes | ❌ No | ❌ No |
| Indonesian content | ✅ Native Indonesian | ❌ English only | ❌ English only | ⚠️ Limited |
| Design quality | ✅ Neo-brutalist 2026 | ❌ Dated | ✅ Clean | ❌ Dated |
| Weakness detection | ✅ Finger-level analysis | ⚠️ Basic | ❌ None | ❌ None |
| Progression | ✅ RPG-style | ⚠️ Lesson completion | ❌ None | ⚠️ Limited |
| Mobile-first | ✅ Responsive + honest | ⚠️ Desktop-first | ❌ Desktop only | ❌ Desktop only |
| Price | Free + premium | Free | Free | Freemium |

### Positioning Statement

> "ValoType is the typing platform that makes learning feel like gaming — not the other way around. Unlike typing.com (boring) or MonkeyType (no learning), ValoType combines adaptive skill training with engaging game mechanics, wrapped in a design students are proud to use."

### Competitive Moat

1. **Indonesia-first content** — no competitor has Bahasa Indonesia typing content
2. **Pedagogical + game integration** — not one or the other
3. **Finger-level analytics** — weakness detection no free competitor offers
4. **Design quality** — the only typing platform students want to screenshot and share
5. **Community features** — school/class integration built for Indonesian education

---

## 69. Future Opportunities

| Opportunity | Phase | Impact | Effort |
|-------------|-------|--------|--------|
| AI typing coach | P6 | High | Very High |
| Personalized lesson generation | P6 | High | High |
| Weak-key AI diagnosis | P4+ | High | High |
| Adaptive challenge AI | P4+ | Medium | High |
| Learning recommendations | P4+ | Medium | Medium |
| Mobile app (PWA → native) | P5+ | Medium | Very High |
| Multiplayer real-time races | P3+ | High | Very High |
| Content creator system | P5+ | Medium | High |
| API for LMS integration | P5+ | Medium | High |
| International expansion | P6+ | High | High |
| Offline mode (full PWA) | P4 | Medium | High |
| Sound effects | P3 | Low | Low |
| Achievement marketplace | P4 | Low | Medium |

---

## 70. Definition of Done

### Feature Definition of Done

A feature is DONE when:

- [ ] **Functionality:** Works as specified in acceptance criteria
- [ ] **UI:** Matches design spec, neo-brutalist aesthetic
- [ ] **Responsive:** Works on mobile (375px+), tablet (768px+), desktop (1280px+)
- [ ] **Accessibility:** Keyboard navigable, screen reader compatible, contrast compliant
- [ ] **Error state:** Handles loading, empty, error, offline states
- [ ] **Loading state:** Skeleton or spinner where applicable
- [ ] **Tests:** Unit tests for business logic, component test for UI
- [ ] **Performance:** Within performance budget (bundle size, latency)
- [ ] **Type safety:** No `any`, proper TypeScript types
- [ ] **Code review:** Reviewed and approved
- [ ] **Biome:** Zero lint/format errors

---

## 71. Acceptance Criteria

### Calibration/First Session

```
Given a new user visits ValoType for the first time
When they click "Main Sekarang"
Then they see a typing screen with a text prompt
And a 60-second timer starts after first keystroke
And real-time WPM and accuracy are displayed
And combo counter tracks consecutive correct keystrokes

Given the user completes the 60-second calibration
When the result screen appears
Then WPM is calculated correctly
Then accuracy percentage is shown
Then a typing rank is assigned (Iron for beginners)
Then XP is awarded based on score
Then the user is prompted to continue to dashboard
```

### Typing Engine

```
Given a typing session is active
When the user types the correct character
Then the character is highlighted in green
And the cursor advances to the next character
And the combo counter increases by 1
And WPM and accuracy update in real-time

Given a typing session is active
When the user types an incorrect character
Then the character is highlighted in red
And the cursor does NOT advance (error must be corrected)
And the combo counter resets to 0
And accuracy decreases

Given a typing session is active
When the user presses Escape
Then the game pauses
And a pause overlay appears
And the timer stops
When the user presses Escape again
Then the game resumes
And the timer continues

Given a typing session is active
When the user attempts to paste text
Then the paste is blocked
And the session is flagged as "practice only"
And a notification appears: "Paste terdeteksi. Sesi ini tidak masuk leaderboard."
```

### Score Submission

```
Given a typing session is completed
When the client submits the result to the server
Then the server recalculates WPM and accuracy
Then the server validates:
  - WPM ≤ 200
  - Timing consistency (no bot-like patterns)
  - Session duration reasonable for text length
If validation passes:
  Then the score is saved
  Then XP is awarded
  Then leaderboard position is updated
If validation fails:
  Then the score is rejected
  Then the user sees: "Skor tidak dapat diverifikasi."
```

---

## 72. Implementation Notes

### Typing Engine Architecture

The typing engine should be implemented as a custom React hook (`useTypingGame`) that:

1. Manages game state via refs (not state) for performance
2. Updates React state only for visual rendering (throttled to 16ms)
3. Uses `requestAnimationFrame` for smooth WPM/accuracy updates
4. Handles all keyboard events via `onKeyDown` on a hidden input element
5. Prevents default browser behavior (scroll, backspace navigation)
6. Supports pause/resume via state machine

### Content Model

Content should be stored as structured data (JSON or database), not hardcoded:

```typescript
{
  id: "speed-blitz-001",
  text: "Mengetik dengan cepat dan akurat adalah keterampilan penting di era digital.",
  category: "technology",
  difficulty: 2,
  targetKeys: ["a", "s", "d", "f", "j", "k", "l", ";"],
  language: "id-ID",
  metadata: {
    wordCount: 9,
    avgWordLength: 6.2,
    uniqueKeys: ["a", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "w", "y", ";"]
  }
}
```

### Theme Toggle

Use CSS custom properties + Tailwind's `dark:` variant. Toggle via Zustand store persisted to localStorage. No flash of wrong theme (use `prefers-color-scheme` for initial load).

---

## 73. Final Product Blueprint

### Recommended Product Blueprint

| Aspect | Decision |
|--------|----------|
| **Name** | ValoType |
| **Tagline** | "Game yang kebetulan membuatmu jago mengetik" |
| **Positioning** | Typing game platform for Indonesian students |
| **Target** | SMP students first, then SMA/SMK, SD, general |
| **Core Loop** | Type → Score → XP → Rank → Challenge → Return |
| **Killer Feature** | Finger-level weakness detection + targeted practice |
| **MVP** | Typing engine + 2 games + progression + leaderboard + share |
| **Monetization** | Freemium: core free, analytics/themes premium |
| **Visual Identity** | Neo-brutalist 2026, electric orange + bold blue |
| **Typography** | Space Grotesk (display) + Inter (body) + JetBrains Mono (typing) |
| **Technology** | Vite 8 + React 19 + Tailwind v4 + tRPC v11 + Drizzle + PostgreSQL |
| **Primary Metric** | Weekly Active Typers Who Improve |
| **Differentiation** | The only typing platform that's both genuinely fun AND genuinely educational |
| **Differentiation (Indonesia)** | Bahasa Indonesia-first content, built for Indonesian schools |
| **Roadmap** | Foundation → MVP → Retention → Social → Monetization → School → Scale |

### The "One Thing" Test

**"Apa satu hal yang membuat ValoType berbeda sehingga pengguna berkata: 'Ini bukan website belajar mengetik biasa'?"**

**Answer:** The moment you finish your first session and the system tells you "Huruf J, K, dan X adalah kelemahanmu. Coba Accuracy Fortress yang fokus ke huruf-huruf ini." — that's when you realize this isn't just a typing test. It's a typing coach that happens to be a game. No other platform simultaneously identifies your specific weaknesses AND creates a fun mini-game designed to fix them. That's the magic.

---

## 74. Decision Log

### Decision: Name

- **Chosen:** ValoType
- **Why:** Clear, memorable, SEO-friendly, direct connection to typing + ValoWeb
- **Rejected alternatives:** ValoRush (loses education connection), ValoStrike (ambiguous)
- **Trade-off:** Slightly generic "Type" suffix, but clarity wins

### Decision: Tech Stack

- **Chosen:** Vite 8 + React 19 + Tailwind v4 + tRPC v11 + Drizzle + PostgreSQL
- **Why:** End-to-end type safety, modern tooling, minimal bundle, strong DX
- **Rejected alternatives:** Next.js (unnecessary for SPA), Prisma (heavier than Drizzle), Redux (Zustand is simpler)
- **Trade-off:** tRPC adds complexity vs REST, but type safety is worth it

### Decision: Guest Mode

- **Chosen:** Guest mode with localStorage, account creation after value demonstration
- **Why:** Low friction onboarding, users experience value before commitment
- **Rejected alternatives:** Mandatory signup (too high friction), no guest mode (can't track without account)
- **Trade-off:** Guest data lost if device changes, but acceptable for MVP

### Decision: Design System

- **Chosen:** Neo-brutalist 2026 with custom tokens on shadcn/ui foundation
- **Why:** Distinctive, anti-generic, aligns with youthful brand
- **Rejected alternatives:** Generic SaaS design (boring), glassmorphism (trendy but dated), Material Design (too corporate)
- **Trade-off:** Custom design takes more effort than stock shadcn, but brand identity is worth it

### Decision: Monetization Timing

- **Chosen:** Premium features in Phase 4 (after retention established)
- **Why:** Premature monetization kills growth. Build value first.
- **Rejected alternatives:** Day 1 premium (kills adoption), never monetize (unsustainable)
- **Trade-off:** Delayed revenue, but sustainable user base

---

## 75. Assumptions

| Assumption | Confidence | How to Validate |
|------------|-----------|-----------------|
| Indonesian students want to learn typing | High | Existing typing app usage data [VERIFY] |
| Students will use a web-based typing tool | High | Mobile web usage statistics [VERIFY] |
| Game mechanics improve retention | High | Industry data from Duolingo, etc. |
| Neo-brutalist design appeals to students | Medium | User testing with target demographic |
| WPM 15-25 is typical for Indonesian students | Low | [RESEARCH REQUIRED] — baseline measurement needed |
| Premium price of Rp 39K/month is acceptable | Low | A/B testing, user surveys |
| Typing latency < 50ms is achievable with React | Medium | Prototype testing required |
| Guest mode will convert to registered users | Medium | Analytics after MVP launch |
| Share cards will drive organic growth | Low | Post-launch measurement |
| Server-side score verification is sufficient anti-cheat | Medium | Monitor leaderboard for anomalies |
| PostgreSQL handles MVP scale easily | High | Standard for this use case |
| tRPC v11 is stable enough for production | High | [VERIFY] v11 release status |
| Content can be produced at scale | Medium | Template system + manual curation |

---

## 76. Open Questions

1. **Domain availability:** Is valotype.com (or .id) available? [VERIFY]
2. **tRPC v11 stability:** Is tRPC v11 stable and production-ready? [VERIFY]
3. **Indonesian student typing baseline:** What's the average WPM of Indonesian SMP students? [RESEARCH REQUIRED]
4. **Payment provider:** Which payment provider works best for Indonesian market? [RESEARCH REQUIRED — consider Midtrans, Xendit]
5. **Legal requirements for minors:** What are Indonesian data protection requirements for users under 13? [RESEARCH REQUIRED]
6. **School adoption strategy:** Should we target individual teachers or school administrators? [USER RESEARCH REQUIRED]
7. **Content licensing:** Any restrictions on using Bahasa Indonesia educational content? [VERIFY]
8. **Vercel/Neon availability in Indonesia:** Latency from Indonesian users to these services? [TEST REQUIRED]

---

*End of Product Requirements Document*

*Generated as blueprint for ValoType by ValoWeb.*
*This document is a living artifact — update as decisions are validated and assumptions are tested.*
