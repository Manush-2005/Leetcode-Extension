# LeetCode Extension

A small leetcode extension I built using the [WXT framework](https://wxt.dev/) to for Leetcode problem solving. This extension integrates two backend services and provides tools for user insights, problem tagging, submission tracking, and AI-powered problem-solving assistance.

## Features

### 1. User Details & Submission Stats
- **LeetCode API Backend**: Fetch detailed user statistics and profile information by entering a LeetCode username.
- **Graphical UI**: Visualize the number of submissions made by the user in the last 30 days with an intuitive graph in the profile section.

### 2. Problem Tagging
- Tag LeetCode problems based on algorithms (e.g., Dynamic Programming, Binary Search, etc.) for better organization and review.

### 3. Solution Video Links
- **BackendService**: Retrieve links to high-quality YouTube videos explaining solutions for specific LeetCode problems, powered by LangGraph AI agents.

### 4. AI View: Problem Breakdown & Strategy
- **BackendService**: Break down complex Data Structures and Algorithms (DSA) problems into smaller sub-topics (chunks).
  - Provides code snippets for each chunk.
  - Suggests a step-by-step strategy to solve the problem using these chunks.

## Tech Stack
- **Frontend**: Built with the WXT framework for a lightweight and modular browser extension.
- **Backends**:
  - **LeetCode API**: Fetches user-specific data from LeetCode.
  - **BackendService**: Custom backend leveraging LangGraph AI agents for video suggestions and problem-solving assistance.
- **Languages**: JavaScript/TypeScript (assumed based on WXT).
- **UI**: Graphical components for submission visualization.

## 🚀 Installation Guide

Follow these steps to set up the project locally:

---

### 1. **Clone the Repository**
Clone the project and move into the directory:
```bash
git clone https://github.com/Manush-2005/Leetcode-Extension.git
cd Leetcode-Extension
cd leetcode Helper
npm install
cd ../leetcode_api
npm install
cd ../backendService
pip install -r requirements.txt


