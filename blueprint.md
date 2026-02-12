# Project Blueprint

## Overview

This project is a Next.js application designed for 'Next Generation Learners'. It aims to provide a modern, engaging, and high-converting user experience for libraries, schools, and parents.

## Style and Design

*   **Frameworks**: Next.js, Tailwind CSS
*   **Design Philosophy**: Clean, authoritative, and modern, with ample whitespace to create a "Checkmate Academy" aesthetic.
*   **Color Palette**: Primarily monochrome (brand-navy: `#0F172A` for headers and key elements) with a vibrant accent color (brand-teal: `#4FD1C5` for highlights) and a light base (bg-slate-50).
*   **Typography**: Strong, clear, and hierarchical, using `text-[#0F172A]` for all headers.
*   **Layout**: Responsive, mobile-first, using a combination of flexbox and grid.

## Features

### Implemented Features:

*   A main navigation bar (`Navbar.tsx`) with updated links to all major pages.
*   A high-converting hero section on the homepage (`/`).
*   A program selection section with two distinct paths.
*   A "Trusted Organizations" section with a responsive layout, now present on both the homepage and after-school page.
*   A newsletter subscription form.
*   A comprehensive, high-converting landing page at `/libraries` specifically for librarians.
*   A high-converting landing page at `/after-school` for the "AI Thinkers & Builders Accelerators" targeted at parents.

### Librarian Landing Page (`/libraries`):

This page is designed to address the specific needs and concerns of librarians, encouraging them to book a program.

*   **Problem-Focused Hero Section**: Addresses the core problem of students using AI without guidance.
*   **"Different Means, Same End" Philosophy Section**: A core section explaining the program's passion-based learning approach.
*   **The "Four Pillars" of Impact**: A 4-column section addressing common librarian fears.
*   **"How the AI Thinkers & Builders Club Works" Section**: Includes a 4-step session roadmap and an interactive FAQ.
*   **Lead Form ("Book a Program")**: A clean, accessible form for booking requests, linked from the main navbar.

### After-School Accelerator Landing Page (`/after-school`):

This page is designed to attract parents and encourage them to sign up for the interest list.

*   **Outcome-Driven Hero Section**: Headline focuses on giving children a competitive edge in the AI era.
*   **The "Accelerator" Format**: A 3-column feature list explaining program logistics.
*   **"Different Means, Same End" Curriculum Section**: Explains the passion-based learning methodology with added context.
*   **Trusted Organizations Section**: A responsive grid showcasing 6 partner institutions to build credibility.
*   **"Why Parents Trust Us" Section**: Features the "Anti-Shortcut" philosophy.
*   **Parent Interest Form**: A form for parents to register their interest.

## Current Task: Update Navbar and After-School Page

*   **Files modified**: `src/components/Navbar.tsx`, `src/app/after-school/page.tsx`
*   **Objective**: To fix navigation links and synchronize content between the homepage and the after-school page for consistency.
*   **Steps**:
    1.  Update `Navbar.tsx` to point "Library Programs" to `/libraries`, "After School" to `/after-school`, and the "Book a Program" button to `/libraries#book-a-program`.
    2.  Add the "Trusted by Leading Schools & Libraries" section to `src/app/after-school/page.tsx`, ensuring it mirrors the homepage's layout and includes all six partner logos.
    3.  Append additional context to the "Different Means, Same End" curriculum description on the same page.
    4.  Run the linter to ensure code quality.
    5.  Update `blueprint.md` to document the changes.
