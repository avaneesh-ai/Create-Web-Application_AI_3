const state = {
  id: "",
  username: "",
  email: "",
  passwordHash: "",
  fullName: "",
  mobile: "",
  role: "user",
  plan: "free",
  status: "active",
  token: "",
};

const steps = ["credentials", "profile", "verify", "inside"];
const screens = {
  credentials: document.querySelector("#credentials-screen"),
  profile: document.querySelector("#profile-screen"),
  sent: document.querySelector("#email-sent-screen"),
  confirm: document.querySelector("#confirm-screen"),
  inside: document.querySelector("#inside-screen"),
};

const credentialsForm = document.querySelector("#credentials-form");
const profileForm = document.querySelector("#profile-form");
const emailLink = document.querySelector("#email-link");
const sentMessage = document.querySelector("#sent-message");
const confirmEmail = document.querySelector("#confirm-email");
const confirmLogin = document.querySelector("#confirm-login");
const cancelLogin = document.querySelector("#cancel-login");
const restartFlow = document.querySelector("#restart-flow");
const themeButtons = document.querySelectorAll("[data-theme-option]");
const appTabs = document.querySelectorAll("[data-app-tab]");
const appPanels = document.querySelectorAll("[data-app-panel]");
const assistantForm = document.querySelector("#assistant-form");
const assistantQuestion = document.querySelector("#assistant-question");
const assistantMessages = document.querySelector("#assistant-messages");
const lessonButtons = document.querySelectorAll("[data-lesson]");
const lessonTitle = document.querySelector("#lesson-title");
const lessonBody = document.querySelector("#lesson-body");
const lessonPoints = document.querySelector("#lesson-points");
const languageSelect = document.querySelector("#language-select");
const languageList = document.querySelector("#language-list");
const languageName = document.querySelector("#language-name");
const languageSummary = document.querySelector("#language-summary");
const languageCode = document.querySelector("#language-code");
const builderName = document.querySelector("#builder-name");
const appPrompt = document.querySelector("#app-prompt");
const generateApp = document.querySelector("#generate-app");
const generateOutput = document.querySelector("#generate-output");
const htmlCode = document.querySelector("#html-code");
const cssCode = document.querySelector("#css-code");
const jsCode = document.querySelector("#js-code");
const runPreview = document.querySelector("#run-preview");
const resetPreview = document.querySelector("#reset-preview");
const appPreview = document.querySelector("#app-preview");
const currentRole = document.querySelector("#current-role");
const currentPlan = document.querySelector("#current-plan");
const adminAccessButton = document.querySelector("#admin-access-button");
const adminAccessMessage = document.querySelector("#admin-access-message");
const summaryUsername = document.querySelector("#summary-username");
const summaryPlan = document.querySelector("#summary-plan");
const proStatus = document.querySelector("#pro-status");
const activatePro = document.querySelector("#activate-pro");
const voiceMode = document.querySelector("#voice-mode");
const proLinkForm = document.querySelector("#pro-link-form");
const proLinkEmail = document.querySelector("#pro-link-email");
const proLinkOutput = document.querySelector("#pro-link-output");
const appLinkForm = document.querySelector("#app-link-form");
const appLinkEmail = document.querySelector("#app-link-email");
const appLinkOutput = document.querySelector("#app-link-output");
const installButtons = document.querySelectorAll("[data-install-app]");
const installStatus = document.querySelector("#install-status");
const topInstallStatus = document.querySelector("#top-install-status");
const userChatForm = document.querySelector("#user-chat-form");
const userChatRecipient = document.querySelector("#user-chat-recipient");
const userChatMessage = document.querySelector("#user-chat-message");
const userChatMessages = document.querySelector("#user-chat-messages");
const adminUsers = document.querySelector("#admin-users");
const adminChatForm = document.querySelector("#admin-chat-form");
const adminChatRecipient = document.querySelector("#admin-chat-recipient");
const adminChatMessage = document.querySelector("#admin-chat-message");
const adminAccessStatus = document.querySelector("#admin-access-status");
const inviteForm = document.querySelector("#invite-form");
const inviteName = document.querySelector("#invite-name");
const inviteMobile = document.querySelector("#invite-mobile");
const inviteEmail = document.querySelector("#invite-email");
const inviteOutput = document.querySelector("#invite-output");

let deferredInstallPrompt = null;
let pendingInvite = null;

const lessons = {
  basics: {
    title: "Web app basics",
    body: "A web application is software that runs in a browser. A small app can be built with HTML for structure, CSS for design, and JavaScript for actions.",
    points: [
      "Frontend: the part users see and click.",
      "Backend: the server, database, accounts, and private logic.",
      "Files: most starter apps begin with index.html, styles.css, and app.js.",
      "Workflow: plan the screen, build it, test it, then host it online.",
    ],
  },
  domain: {
    title: "What is a domain?",
    body: "A domain is the readable name people type to open your website, like example.com. It points visitors to the server where your app is hosted.",
    points: [
      "You buy or manage a domain through a domain registrar.",
      "A domain can have subdomains, like app.example.com or blog.example.com.",
      "The domain does not store your app by itself; it points to hosting.",
    ],
  },
  dns: {
    title: "What is DNS?",
    body: "DNS is the system that connects a domain name to the correct internet address. It tells browsers where to find your app.",
    points: [
      "A record: points a domain to an IP address.",
      "CNAME record: points one domain name to another domain name.",
      "Nameservers: tell the internet which DNS provider controls your records.",
      "DNS changes can take time to spread around the internet.",
    ],
  },
  hosting: {
    title: "How to host a web app",
    body: "Hosting means putting your app files or server online so other people can open it from a public URL.",
    points: [
      "Build and test the app on your computer first.",
      "Choose a hosting platform that matches your app type.",
      "Upload files directly or connect a GitHub repository.",
      "Set build commands if your app uses React, Vite, Next.js, or another framework.",
      "Connect your domain and turn on HTTPS/SSL.",
    ],
  },
  platforms: {
    title: "Apps to host web applications",
    body: "These platforms are beginner friendly and commonly used for web apps, static websites, and full-stack projects.",
    points: [
      "GitHub Pages: static HTML, CSS, and JavaScript sites.",
      "Netlify: frontend apps, previews, forms, and serverless functions.",
      "Vercel: frontend frameworks like Next.js, React, Vue, and Svelte.",
      "Firebase Hosting: static and single-page apps with Google Firebase tools.",
      "Render: static sites, backend web services, APIs, and databases.",
      "Cloudflare Pages: static and full-stack apps on Cloudflare's network.",
      "Railway: backend apps, APIs, services, and databases.",
    ],
  },
};

const languageNames = [
  "ActionScript",
  "Ada",
  "Apex",
  "Assembly",
  "AWK",
  "BASIC",
  "Bash",
  "C",
  "C#",
  "C++",
  "Clojure",
  "COBOL",
  "Crystal",
  "CSS",
  "D",
  "Dart",
  "Delphi",
  "Eiffel",
  "Elixir",
  "Elm",
  "Erlang",
  "F#",
  "Forth",
  "Fortran",
  "GDScript",
  "Go",
  "Groovy",
  "Hack",
  "Haskell",
  "Haxe",
  "HTML",
  "Idris",
  "Java",
  "JavaScript",
  "Julia",
  "Kotlin",
  "LabVIEW",
  "Lisp",
  "Logo",
  "Lua",
  "MATLAB",
  "Mathematica",
  "ML",
  "Nim",
  "Objective-C",
  "OCaml",
  "Pascal",
  "Perl",
  "PHP",
  "PL/SQL",
  "PowerShell",
  "Processing",
  "Prolog",
  "Python",
  "Q#",
  "R",
  "Racket",
  "Ruby",
  "Rust",
  "SAS",
  "Scala",
  "Scheme",
  "Scratch",
  "Shell",
  "Smalltalk",
  "Solidity",
  "SQL",
  "Swift",
  "Tcl",
  "TypeScript",
  "V",
  "VBA",
  "Verilog",
  "VHDL",
  "Visual Basic",
  "WebAssembly",
  "Zig",
];

const languageDetails = {
  HTML: {
    summary: "HTML creates the structure of a web page: headings, forms, buttons, images, links, and sections.",
    code: `<main>
  <h1>My web app</h1>
  <p>Hello from HTML.</p>
  <button>Start</button>
</main>`,
  },
  CSS: {
    summary: "CSS controls the design of a web page: colors, spacing, layout, typography, and responsive screens.",
    code: `body {
  font-family: system-ui, sans-serif;
  background: #f5f8f7;
  color: #172126;
}`,
  },
  JavaScript: {
    summary: "JavaScript adds behavior to web pages, such as buttons, forms, validation, data, and app logic.",
    code: `const message = "Hello from JavaScript";
document.body.insertAdjacentHTML("beforeend", \`<p>\${message}</p>\`);`,
  },
  TypeScript: {
    summary: "TypeScript is JavaScript with types. It helps teams catch mistakes before the app runs.",
    code: `type User = {
  name: string;
  email: string;
};

const user: User = {
  name: "Aarav",
  email: "user@example.com",
};`,
  },
  Python: {
    summary: "Python is popular for backends, automation, AI, data work, and beginner-friendly programming.",
    code: `from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello from Python"`,
  },
  Java: {
    summary: "Java is used for large backend systems, Android apps, enterprise tools, and long-running services.",
    code: `public class App {
  public static void main(String[] args) {
    System.out.println("Hello from Java");
  }
}`,
  },
  "C#": {
    summary: "C# is used for .NET web apps, Windows software, games with Unity, and backend APIs.",
    code: `using System;

class App {
  static void Main() {
    Console.WriteLine("Hello from C#");
  }
}`,
  },
  PHP: {
    summary: "PHP is a server-side language used by many websites, content systems, and backend apps.",
    code: `<?php
$name = "web app";
echo "Hello from $name";
?>`,
  },
  Ruby: {
    summary: "Ruby is known for readable code and web apps built with Ruby on Rails.",
    code: `class App
  def call
    "Hello from Ruby"
  end
end`,
  },
  Go: {
    summary: "Go is used for fast backend services, APIs, command-line tools, and cloud software.",
    code: `package main

import "fmt"

func main() {
  fmt.Println("Hello from Go")
}`,
  },
  Rust: {
    summary: "Rust is used for fast, memory-safe software, systems programming, web servers, and WebAssembly.",
    code: `fn main() {
  println!("Hello from Rust");
}`,
  },
  Swift: {
    summary: "Swift is used for iOS, macOS, and Apple platform apps.",
    code: `let appName = "My App"
print("Hello from \\(appName)")`,
  },
  Kotlin: {
    summary: "Kotlin is used for Android apps, backend services, and modern JVM projects.",
    code: `fun main() {
  println("Hello from Kotlin")
}`,
  },
  Dart: {
    summary: "Dart is commonly used with Flutter to create mobile, desktop, and web apps.",
    code: `void main() {
  print("Hello from Dart");
}`,
  },
  SQL: {
    summary: "SQL is used to store, read, filter, and update data in databases.",
    code: `SELECT name, email
FROM users
WHERE active = true;`,
  },
  C: {
    summary: "C is used for operating systems, embedded software, and low-level programming.",
    code: `#include <stdio.h>

int main() {
  printf("Hello from C\\n");
  return 0;
}`,
  },
  "C++": {
    summary: "C++ is used for games, high-performance software, desktop apps, and systems programming.",
    code: `#include <iostream>

int main() {
  std::cout << "Hello from C++\\n";
}`,
  },
};

const builderTemplate = {
  html: `<section class="demo-app">
  <h1>My first web app</h1>
  <p>Click the button to make the app respond.</p>
  <button id="demo-button">Click me</button>
  <p id="demo-output"></p>
</section>`,
  css: `.demo-app {
  max-width: 520px;
  margin: 40px auto;
  padding: 28px;
  border: 1px solid #dbe3e7;
  border-radius: 8px;
  font-family: system-ui, sans-serif;
  color: #172126;
  background: #ffffff;
}

button {
  min-height: 42px;
  border: 0;
  border-radius: 8px;
  padding: 0 16px;
  color: #ffffff;
  background: #16605a;
  font-weight: 800;
}`,
  js: `const button = document.querySelector("#demo-button");
const output = document.querySelector("#demo-output");

button.addEventListener("click", () => {
  output.textContent = "Your app is working.";
});`,
};

const generatedAppStyles = `.generated-app {
  max-width: 720px;
  margin: 36px auto;
  padding: 28px;
  border: 1px solid #dbe3e7;
  border-radius: 8px;
  font-family: system-ui, sans-serif;
  color: #172126;
  background: #ffffff;
}

.generated-app h1 {
  margin: 0 0 10px;
}

.generated-app input,
.generated-app textarea {
  width: 100%;
  min-height: 42px;
  margin: 8px 0;
  border: 1px solid #c8d4d8;
  border-radius: 8px;
  padding: 10px;
}

.generated-app button {
  min-height: 42px;
  border: 0;
  border-radius: 8px;
  padding: 0 16px;
  color: #ffffff;
  background: #16605a;
  font-weight: 800;
}`;

const storage = {
  read(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
    } catch {
      return fallback;
    }
  },
  write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

const getUsers = () => storage.read("appUsers", []);
const saveUsers = (users) => {
  storage.write("appUsers", users);
  localStorage.setItem("appUsersUpdatedAt", String(Date.now()));
};
const getChatMessages = () => storage.read("appChats", []);
const saveChatMessages = (messages) => storage.write("appChats", messages);

const normalize = (value) => String(value || "").trim().toLowerCase();
const safeText = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (character) => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return replacements[character];
  });

const getDeviceId = () => {
  let deviceId = localStorage.getItem("appDeviceId");
  if (!deviceId) {
    deviceId = createToken();
    localStorage.setItem("appDeviceId", deviceId);
  }
  return deviceId;
};

const findUser = (users, identity) => {
  const key = normalize(identity);
  return users.find((user) => normalize(user.email) === key || normalize(user.username) === key);
};

const findInviteByToken = (token) => getUsers().find((user) => user.inviteToken === token);

const findInviteForLogin = (users, email, mobile) =>
  users.find(
    (user) =>
      user.status === "invited" &&
      (normalize(user.email) === normalize(email) || user.mobile?.replace(/\D/g, "") === mobile.replace(/\D/g, "")),
  );

const hasApprovedLocalAdmin = () =>
  getUsers().some(
    (user) =>
      ["admin", "pre-admin"].includes(user.role) &&
      user.adminApproved === true &&
      (user.localDeviceIds || []).includes(getDeviceId()),
  );

const canManageUsers = () => {
  if (!["admin", "pre-admin"].includes(state.role)) return false;
  if (state.adminApproved !== true) return false;

  const users = getUsers();
  const currentUser = users.find((user) => user.id === state.id);
  const localDeviceIds = currentUser?.localDeviceIds || [];
  return currentUser?.adminApproved === true && localDeviceIds.includes(getDeviceId());
};

const formatRole = (role) => {
  if (role === "pre-admin") return "Pre-admin";
  return role === "admin" ? "Admin" : "User";
};

const formatPlan = (plan) => (plan === "pro" ? "Pro plan" : "Free plan");

const localTimestamp = () => new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" });

const getDeviceType = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isTablet =
    /ipad|tablet|playbook|silk/.test(userAgent) ||
    (/android/.test(userAgent) && !/mobile/.test(userAgent)) ||
    (/macintosh/.test(userAgent) && navigator.maxTouchPoints > 1);
  const isPhone = /mobi|iphone|ipod|android.*mobile|windows phone/.test(userAgent);

  if (isTablet) return "Tablet";
  if (isPhone) return "Phone";
  return window.innerWidth <= 900 && navigator.maxTouchPoints > 0 ? "Tablet / small laptop" : "Laptop / desktop";
};

const getBrowserName = () => {
  const userAgent = navigator.userAgent;
  if (/Edg\//.test(userAgent)) return "Microsoft Edge";
  if (/OPR\//.test(userAgent)) return "Opera";
  if (/CriOS|Chrome\//.test(userAgent) && !/Edg\//.test(userAgent)) return "Chrome";
  if (/Firefox\//.test(userAgent)) return "Firefox";
  if (/Safari\//.test(userAgent) && !/Chrome\//.test(userAgent)) return "Safari";
  return "Browser";
};

const getConnectionLabel = () => {
  if (!navigator.onLine) return "Offline";

  const connection = navigator.connection || navigator.webkitConnection || navigator.mozConnection;
  if (!connection) return "Online";

  const details = [];
  if (connection.type) details.push(connection.type);
  if (connection.effectiveType) details.push(connection.effectiveType.toUpperCase());
  if (connection.downlink) details.push(`${connection.downlink} Mbps`);

  return details.length ? `Online · ${details.join(" · ")}` : "Online";
};

const getCurrentLoginDevice = () => ({
  id: getDeviceId(),
  type: getDeviceType(),
  browser: getBrowserName(),
  platform: navigator.platform || "Unknown platform",
  screen: `${window.screen.width}x${window.screen.height}`,
  viewport: `${window.innerWidth}x${window.innerHeight}`,
  connection: getConnectionLabel(),
  lastSeenAt: localTimestamp(),
  lastSeenAtMs: Date.now(),
});

const mergeDeviceLogins = (deviceLogins = [], currentDevice) => {
  const logins = [...deviceLogins];
  const existingIndex = logins.findIndex((device) => device.id === currentDevice.id);

  if (existingIndex >= 0) {
    logins[existingIndex] = { ...logins[existingIndex], ...currentDevice };
  } else {
    logins.push(currentDevice);
  }

  return logins.slice(-12);
};

const getSharedUsersEndpoint = () => window.APP_USERS_API || localStorage.getItem("appUsersApi") || "";

const removePrivateFields = (user) => {
  const { password, passwordHash, token, inviteToken, ...safeUser } = user;
  return safeUser;
};

const userMergeKey = (user) => user?.id || normalize(user?.email) || normalize(user?.username);

const mergeUserLists = (localUsers, incomingUsers) => {
  const mergedUsers = new Map();
  const putUser = (user) => {
    const key = userMergeKey(user);
    if (!key) return;

    const existing = mergedUsers.get(key);
    if (!existing) {
      mergedUsers.set(key, user);
      return;
    }

    const existingTime = Number(existing.syncUpdatedAt || existing.lastSeenAtMs || 0);
    const userTime = Number(user.syncUpdatedAt || user.lastSeenAtMs || 0);
    const merged = userTime >= existingTime ? { ...existing, ...user } : { ...user, ...existing };

    if (existing.passwordHash || user.passwordHash) {
      merged.passwordHash = existing.passwordHash || user.passwordHash;
    }

    mergedUsers.set(key, merged);
  };

  localUsers.forEach(putUser);
  incomingUsers.forEach(putUser);
  return [...mergedUsers.values()];
};

let sharedUsersSyncing = false;

const pushUserToSharedDatabase = async (user) => {
  const endpoint = getSharedUsersEndpoint();
  if (!endpoint) return;

  await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "upsert-user", user: removePrivateFields(user) }),
  });
};

const pushUsersToSharedDatabase = async () => {
  const endpoint = getSharedUsersEndpoint();
  if (!endpoint) return;

  await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "replace-users", users: getUsers().map(removePrivateFields) }),
  });
};

const pullSharedUsersForAdmin = async () => {
  const endpoint = getSharedUsersEndpoint();
  if (!endpoint || !canManageUsers() || sharedUsersSyncing) return;

  sharedUsersSyncing = true;
  try {
    const response = await fetch(endpoint, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return;

    const data = await response.json();
    const incomingUsers = Array.isArray(data) ? data : data.users;
    if (!Array.isArray(incomingUsers)) return;

    saveUsers(mergeUserLists(getUsers(), incomingUsers));
  } catch {
    // The app still works locally if the shared database is unavailable.
  } finally {
    sharedUsersSyncing = false;
  }
};

const syncCurrentUserPresence = () => {
  if (!state.id) return;

  const users = getUsers();
  const index = users.findIndex((user) => user.id === state.id);
  if (index < 0) return;

  const currentDevice = getCurrentLoginDevice();
  const updatedUser = {
    ...users[index],
    deviceLogins: mergeDeviceLogins(users[index].deviceLogins, currentDevice),
    lastDevice: currentDevice,
    lastConnection: currentDevice.connection,
    lastSeenAt: currentDevice.lastSeenAt,
    lastSeenAtMs: currentDevice.lastSeenAtMs,
    loggedIn: true,
    syncUpdatedAt: Date.now(),
  };

  users[index] = updatedUser;
  saveUsers(users);
  Object.assign(state, updatedUser);
  localStorage.setItem("loggedInUser", JSON.stringify(state));
  pushUserToSharedDatabase(updatedUser).catch(() => {});
};

const refreshLiveAdminUsers = () => {
  syncCurrentUserPresence();

  if (canManageUsers()) {
    pullSharedUsersForAdmin()
      .catch(() => {})
      .finally(() => {
        updateAccountDisplay();
        renderAdminUsers();
        renderChatRecipients();
      });
  }
};

const setInstallStatus = (message) => {
  topInstallStatus.textContent = message;
  installStatus.textContent = message;
};

const setError = (formName, message = "") => {
  document.querySelector(`[data-error-for="${formName}"]`).textContent = message;
};

const showScreen = (screenName) => {
  Object.values(screens).forEach((screen) => screen.classList.remove("is-active"));
  screens[screenName].classList.add("is-active");
  updateProgress(screenName);
};

const applyTheme = (theme) => {
  const activeTheme = theme === "dark" ? "dark" : "light";
  document.body.classList.toggle("theme-dark", activeTheme === "dark");
  localStorage.setItem("themeMode", activeTheme);

  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeOption === activeTheme;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const updateProgress = (screenName) => {
  const stepForScreen = {
    credentials: "credentials",
    profile: "profile",
    sent: "verify",
    confirm: "verify",
    inside: "inside",
  };
  const currentStep = stepForScreen[screenName];
  const currentIndex = steps.indexOf(currentStep);

  steps.forEach((step, index) => {
    const marker = document.querySelector(`[data-step-indicator="${step}"]`);
    if (!marker) return;
    marker.classList.toggle("active", index === currentIndex);
    marker.classList.toggle("done", index < currentIndex);
  });
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidMobile = (mobile) => {
  const digitsOnly = mobile.replace(/\D/g, "");
  return digitsOnly.length >= 10;
};

const createToken = () => {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const hashPassword = async (password, email) => {
  const source = `${normalize(email)}:${password}`;
  const bytes = new TextEncoder().encode(source);
  const digest = await window.crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
};

const migrateStoredPasswords = async () => {
  const users = getUsers();
  let changed = false;

  for (const user of users) {
    if (user.password && !user.passwordHash && user.email) {
      user.passwordHash = await hashPassword(user.password, user.email);
      changed = true;
    }

    if ("password" in user) {
      delete user.password;
      changed = true;
    }
  }

  if (changed) {
    saveUsers(users);
  }
};

const migrateAdminAccess = () => {
  const users = getUsers();
  let changed = false;

  users.forEach((user) => {
    if (["admin", "pre-admin"].includes(user.role) && user.adminApproved !== true) {
      user.role = "user";
      changed = true;
    }
  });

  if (changed) {
    saveUsers(users);
  }
};

const savePendingLogin = () => {
  localStorage.setItem(
    "pendingLogin",
    JSON.stringify({
      username: state.username,
      email: state.email,
      passwordHash: state.passwordHash,
      fullName: state.fullName,
      mobile: state.mobile,
      token: state.token,
    }),
  );
};

const loadPendingLogin = () => {
  try {
    const pending = JSON.parse(localStorage.getItem("pendingLogin") || "null");
    if (!pending) return null;
    Object.assign(state, pending);
    return pending;
  } catch {
    return null;
  }
};

const buildEmailLink = () => {
  const url = new URL(window.location.href);
  url.hash = `login=${encodeURIComponent(state.token)}`;
  return url.toString();
};

const sendLoginLink = () => {
  state.token = createToken();
  savePendingLogin();

  const link = buildEmailLink();
  emailLink.href = link;
  sentMessage.textContent = `A login link has been sent to ${state.email}.`;
  showScreen("sent");
};

const showConfirmationFromLink = () => {
  const hash = window.location.hash.replace(/^#/, "");
  const [key, value] = hash.split("=");
  const pending = loadPendingLogin();

  if (key !== "login" || !pending || decodeURIComponent(value || "") !== pending.token) {
    return false;
  }

  confirmEmail.textContent = pending.email;
  showScreen("confirm");
  return true;
};

const applyAppTab = (tabName) => {
  const nextTab = tabName === "admin" && !canManageUsers() ? "learn" : tabName;

  appTabs.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.appTab === nextTab);
  });

  appPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.appPanel === nextTab);
  });
};

const updateVisibleTabs = () => {
  appTabs.forEach((button) => {
    if (button.dataset.appTab === "admin") {
      button.hidden = !canManageUsers();
    }
  });

  const activeAdminPanel = document.querySelector('[data-app-panel="admin"].is-active');
  if (activeAdminPanel && !canManageUsers()) {
    applyAppTab("learn");
  }
};

const upsertCurrentUser = () => {
  const users = getUsers();
  const existingIndex = users.findIndex(
    (user) => normalize(user.email) === normalize(state.email) || normalize(user.username) === normalize(state.username),
  );
  const existing = existingIndex >= 0 ? users[existingIndex] : null;
  const now = localTimestamp();
  const savedAdminApproved = existing?.adminApproved === true;
  const savedRole = savedAdminApproved ? existing?.role || "user" : "user";
  const savedPlan = existing?.plan || "free";
  const savedStatus = existing?.status || "active";
  const deviceId = getDeviceId();
  const currentDevice = getCurrentLoginDevice();
  const localDeviceIds = new Set(existing?.localDeviceIds || []);

  if (savedStatus === "suspended") {
    return null;
  }

  localDeviceIds.add(deviceId);

  const user = {
    id: existing?.id || createToken(),
    username: state.username,
    email: state.email,
    passwordHash: state.passwordHash || existing?.passwordHash || "",
    fullName: state.fullName,
    mobile: state.mobile,
    role: savedRole,
    adminApproved: savedAdminApproved,
    plan: savedPlan,
    status: savedStatus === "invited" ? "active" : savedStatus,
    localDeviceIds: [...localDeviceIds],
    deviceLogins: mergeDeviceLogins(existing?.deviceLogins, currentDevice),
    lastDevice: currentDevice,
    lastConnection: currentDevice.connection,
    lastSeenAt: currentDevice.lastSeenAt,
    lastSeenAtMs: currentDevice.lastSeenAtMs,
    createdAt: existing?.createdAt || now,
    invitedAt: existing?.invitedAt || "",
    joinedAt: existing?.joinedAt || (savedStatus === "invited" ? now : ""),
    lastLoginAt: now,
    loggedIn: true,
    syncUpdatedAt: Date.now(),
  };

  if (existingIndex >= 0) {
    users[existingIndex] = { ...existing, ...user };
    delete users[existingIndex].password;
  } else {
    users.push(user);
  }

  saveUsers(users);
  Object.assign(state, user);
  return user;
};

const saveCurrentUserChanges = (changes) => {
  const users = getUsers();
  const index = users.findIndex((user) => user.id === state.id);
  if (index < 0) return;

  const updatedUser = { ...users[index], ...changes, syncUpdatedAt: Date.now() };
  users[index] = updatedUser;
  saveUsers(users);
  Object.assign(state, updatedUser);
  localStorage.setItem("loggedInUser", JSON.stringify(state));
  pushUserToSharedDatabase(updatedUser).catch(() => {});
  updateAccountDisplay();
  renderAdminUsers();
  renderChatRecipients();
};

const applyPendingProLink = () => {
  const pendingProEmail = localStorage.getItem("pendingProEmail");
  if (pendingProEmail && normalize(pendingProEmail) === normalize(state.email)) {
    saveCurrentUserChanges({ plan: "pro", proSource: "subscription link" });
    localStorage.removeItem("pendingProEmail");
  }
};

const updateAccountDisplay = () => {
  document.querySelector("#welcome-title").textContent = `Welcome, ${state.fullName}`;
  summaryUsername.textContent = state.username;
  document.querySelector("#summary-email").textContent = state.email;
  document.querySelector("#summary-mobile").textContent = state.mobile;
  summaryPlan.textContent = formatPlan(state.plan);
  currentRole.textContent = formatRole(state.role);
  currentPlan.textContent = formatPlan(state.plan);
  proStatus.textContent = state.plan === "pro" ? "Pro active: faster mode and voice mode unlocked" : "Free plan";
  activatePro.textContent = state.plan === "pro" ? "Pro active" : "Subscribe $25";
  voiceMode.disabled = state.plan !== "pro";
  voiceMode.textContent = state.plan === "pro" ? "Voice mode" : "Voice locked";
  adminAccessStatus.textContent = canManageUsers()
    ? `${formatRole(state.role)} access is active · ${getSharedUsersEndpoint() ? "online sync ready" : "local demo mode"}`
    : "No admin access for this computer login";
  adminAccessButton.textContent = canManageUsers()
    ? "Open admin access"
    : hasApprovedLocalAdmin()
      ? "Request admin access"
      : "Set up first admin";
  document.body.classList.toggle("is-pro", state.plan === "pro");
  updateVisibleTabs();
};

const enterApp = () => {
  const user = upsertCurrentUser();
  if (!user) {
    confirmEmail.textContent = "This account is suspended.";
    showScreen("credentials");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(state));
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  pushUserToSharedDatabase(user).catch(() => {});
  applyPendingProLink();
  updateAccountDisplay();
  renderAdminUsers();
  renderChatRecipients();
  renderChatMessages();
  showScreen("inside");
};

const renderLesson = (lessonKey) => {
  const lesson = lessons[lessonKey] || lessons.basics;

  lessonButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lesson === lessonKey);
  });

  lessonTitle.textContent = lesson.title;
  lessonBody.textContent = lesson.body;
  lessonPoints.innerHTML = "";

  lesson.points.forEach((point) => {
    const item = document.createElement("li");
    item.textContent = point;
    lessonPoints.append(item);
  });
};

const languageFallback = (language) => ({
  summary: `${language} is one of the programming languages you can explore. Start with a small program, learn its tools, then connect it to a web app when the project needs it.`,
  code: `// ${language} starter area
// Write your code here.`,
});

const selectLanguage = (language) => {
  const details = languageDetails[language] || languageFallback(language);

  languageSelect.value = language;
  languageName.textContent = language;
  languageSummary.textContent = details.summary;
  languageCode.value = details.code;

  document.querySelectorAll(".language-chip").forEach((chip) => {
    chip.classList.toggle("is-active", chip.dataset.language === language);
  });

  localStorage.setItem("selectedLanguage", language);
};

const buildLanguageSelector = () => {
  languageNames.forEach((language) => {
    const option = document.createElement("option");
    option.value = language;
    option.textContent = language;
    languageSelect.append(option);

    const chip = document.createElement("button");
    chip.className = "language-chip";
    chip.type = "button";
    chip.dataset.language = language;
    chip.textContent = language;
    chip.addEventListener("click", () => selectLanguage(language));
    languageList.append(chip);
  });
};

const resetBuilderCode = () => {
  htmlCode.value = builderTemplate.html.replace("My first web app", builderName.value || "My first web app");
  cssCode.value = builderTemplate.css;
  jsCode.value = builderTemplate.js;
};

const renderAppPreview = () => {
  const previewDocument = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${builderName.value || "App preview"}</title>
    <style>${cssCode.value}</style>
  </head>
  <body>
    ${htmlCode.value}
    <script>${jsCode.value}<\/script>
  </body>
</html>`;

  appPreview.srcdoc = previewDocument;
};

const titleFromPrompt = (prompt) => {
  const cleaned = cleanText(prompt).replace(/[^\w\s-]/g, "");
  const words = cleaned.split(" ").filter(Boolean).slice(0, 5);
  if (words.length === 0) return "Generated app";
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};

const generateAppFromPrompt = (prompt) => {
  const lowerPrompt = prompt.toLowerCase();
  const title = titleFromPrompt(prompt);

  if (lowerPrompt.includes("todo") || lowerPrompt.includes("task")) {
    return {
      title,
      html: `<section class="generated-app">
  <h1>${title}</h1>
  <p>Add tasks and mark your progress.</p>
  <input id="item-input" placeholder="Add a task" />
  <button id="add-item">Add task</button>
  <ul id="item-list"></ul>
</section>`,
      css: generatedAppStyles,
      js: `const input = document.querySelector("#item-input");
const list = document.querySelector("#item-list");

document.querySelector("#add-item").addEventListener("click", () => {
  if (!input.value.trim()) return;
  const item = document.createElement("li");
  item.textContent = input.value.trim();
  item.addEventListener("click", () => item.style.textDecoration = "line-through");
  list.append(item);
  input.value = "";
});`,
    };
  }

  if (lowerPrompt.includes("calculator") || lowerPrompt.includes("calculate")) {
    return {
      title,
      html: `<section class="generated-app">
  <h1>${title}</h1>
  <input id="first-number" type="number" placeholder="First number" />
  <input id="second-number" type="number" placeholder="Second number" />
  <button id="calculate">Add numbers</button>
  <p id="result"></p>
</section>`,
      css: generatedAppStyles,
      js: `document.querySelector("#calculate").addEventListener("click", () => {
  const first = Number(document.querySelector("#first-number").value);
  const second = Number(document.querySelector("#second-number").value);
  document.querySelector("#result").textContent = \`Result: \${first + second}\`;
});`,
    };
  }

  if (lowerPrompt.includes("budget") || lowerPrompt.includes("expense") || lowerPrompt.includes("money")) {
    return {
      title,
      html: `<section class="generated-app">
  <h1>${title}</h1>
  <input id="income" type="number" placeholder="Income" />
  <input id="expense" type="number" placeholder="Expense" />
  <button id="show-balance">Show balance</button>
  <p id="balance"></p>
</section>`,
      css: generatedAppStyles,
      js: `document.querySelector("#show-balance").addEventListener("click", () => {
  const income = Number(document.querySelector("#income").value);
  const expense = Number(document.querySelector("#expense").value);
  document.querySelector("#balance").textContent = \`Balance: \${income - expense}\`;
});`,
    };
  }

  return {
    title,
    html: `<section class="generated-app">
  <h1>${title}</h1>
  <p>${prompt}</p>
  <textarea id="notes" placeholder="Write something for this app"></textarea>
  <button id="save-note">Save</button>
  <p id="output"></p>
</section>`,
    css: generatedAppStyles,
    js: `document.querySelector("#save-note").addEventListener("click", () => {
  const value = document.querySelector("#notes").value.trim();
  document.querySelector("#output").textContent = value
    ? \`Saved: \${value}\`
    : "Write something first.";
});`,
  };
};

const cleanText = (text) => text.replace(/\s+/g, " ").trim();

const createList = (items) => items.map((item, index) => `${index + 1}. ${item}`).join("\n");

const extractTopic = (question) =>
  question
    .replace(/[?!.]+$/g, "")
    .replace(/^(please\s+)?(explain|define|what is|what are|who is|who are|tell me about|how does|how do|why does|why is)\s+/i, "")
    .trim();

const answerMathQuestion = (question) => {
  const arithmeticQuestion = question.replace(/[?=]/g, "").trim();
  if (!/^[\d\s.+\-*/()%]+$/.test(arithmeticQuestion) || !/\d/.test(arithmeticQuestion)) return "";

  try {
    const normalizedExpression = arithmeticQuestion.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");
    const answer = Function(`"use strict"; return (${normalizedExpression})`)();
    return Number.isFinite(answer) ? `The answer is ${answer}.` : "";
  } catch {
    return "I could not calculate that one. Try writing the math in a simple format, like 25 * 4 or (12 + 8) / 2.";
  }
};

const answerAppQuestion = (question, lowerQuestion) => {
  if (lowerQuestion.includes("rude") || lowerQuestion.includes("better assistant")) {
    return "You are right to expect a helpful tone. I will answer calmly, clearly, and respectfully. Ask anything, and I will give the best answer I can.";
  }

  if (lowerQuestion.includes("login") || lowerQuestion.includes("log in")) {
    return "To log in, enter your username, email ID, and password, complete your profile, open the email link, and press Okay.";
  }

  if (lowerQuestion.includes("pro") || lowerQuestion.includes("subscription")) {
    return "The Pro plan is $25. It unlocks faster workspace mode and voice mode. Admins can also grant free Pro from the Admin tab.";
  }

  if (lowerQuestion.includes("admin") || lowerQuestion.includes("pre-admin")) {
    return "Admins and pre-admins can open the Admin / Pre-admin section only after approval. Normal users can request access, but they cannot see user details.";
  }

  if (
    lowerQuestion.includes("other device") ||
    lowerQuestion.includes("phone") ||
    lowerQuestion.includes("tablet") ||
    lowerQuestion.includes("wifi")
  ) {
    return "The Admin tab refreshes every second and shows each user's latest phone, tablet, laptop, or desktop details. To see users from different devices or WiFi networks, the hosted app must be connected to a shared online database.";
  }

  if (lowerQuestion.includes("install") || lowerQuestion.includes("download")) {
    return "Press the Install app button at the top of the app. Supported phones, tablets, laptops, and desktops can add the hosted app to their home screen, dock, or apps list.";
  }

  if (lowerQuestion.includes("share") || lowerQuestion.includes("send app")) {
    return "Open the Share tab, enter an email address, and the app will create a share link for that person. In the demo this is saved locally; in a hosted version it should connect to a backend.";
  }

  if (lowerQuestion.includes("web app") || lowerQuestion.includes("web application")) return lessons.basics.body;
  if (lowerQuestion.includes("domain")) return lessons.domain.body;
  if (lowerQuestion.includes("dns")) return lessons.dns.body;

  if (lowerQuestion.includes("host") || lowerQuestion.includes("deploy")) {
    return `${lessons.hosting.body} Good starter platforms include GitHub Pages, Netlify, Vercel, Firebase Hosting, Render, Cloudflare Pages, and Railway.`;
  }

  if (lowerQuestion.includes("email") || lowerQuestion.includes("link")) {
    return "The app sends a secure link to the email ID entered in the first step. In this demo, the link appears as a button so you can test it immediately.";
  }

  if (lowerQuestion.includes("password")) {
    return "Use a password with at least 6 characters. A stronger password should include letters, numbers, and a symbol.";
  }

  if (
    lowerQuestion.includes("background") ||
    lowerQuestion.includes("theme") ||
    lowerQuestion.includes("night") ||
    lowerQuestion.includes("light")
  ) {
    return "Use the Light and Night buttons at the top to change the app background whenever you want.";
  }

  if (lowerQuestion.includes("programming language") || lowerQuestion.includes("code")) {
    return "Choose a language from the Languages section. For web app creation, start with HTML, CSS, and JavaScript, then learn a backend language like Python, JavaScript, PHP, Java, Go, or Ruby.";
  }

  return "";
};

const createGeneralAssistantAnswer = (question) => {
  const lowerQuestion = question.toLowerCase();
  const topic = extractTopic(question) || "that";
  const mathAnswer = answerMathQuestion(question);
  if (mathAnswer) return mathAnswer;

  if (lowerQuestion.includes("hello") || lowerQuestion === "hi" || lowerQuestion.startsWith("hi ")) {
    return `Hello${state.fullName ? `, ${state.fullName}` : ""}. I am ready to help with explanations, coding, writing, plans, ideas, math, app questions, and general questions.`;
  }

  if (lowerQuestion.includes("time") || lowerQuestion.includes("date")) {
    return `The current date and time on this device is ${new Date().toLocaleString()}.`;
  }

  if (lowerQuestion.includes("latest") || lowerQuestion.includes("today") || lowerQuestion.includes("news")) {
    return "I can answer the question, but I may not know live updates unless the app is connected to an online AI/search service. For current facts, use the online AI connection so the answer can be checked against fresh sources.";
  }

  if (lowerQuestion.includes("health") || lowerQuestion.includes("medicine") || lowerQuestion.includes("legal")) {
    return `Here is a careful answer about ${topic}: I can explain general ideas and help you prepare questions, but health, medicine, and legal decisions should be checked with a qualified professional. Share the exact situation and I can help organize the information safely.`;
  }

  if (lowerQuestion.includes("joke")) {
    return "Here is a small one: Why did the developer go broke? Because they used up all their cache.";
  }

  if (lowerQuestion.startsWith("write ") || lowerQuestion.includes("write a ") || lowerQuestion.includes("draft ")) {
    return `Here is a clean draft you can edit:\n\n${topic.charAt(0).toUpperCase() + topic.slice(1)}\n\nI hope this message finds you well. I want to clearly share my idea, keep it simple, and make the next step easy to understand. Please let me know what you think, and I will be happy to improve it.`;
  }

  if (lowerQuestion.includes("ideas") || lowerQuestion.includes("suggest") || lowerQuestion.includes("recommend")) {
    return `Here are useful ideas for ${topic}:\n${createList([
      "Start with the smallest version that works.",
      "Make the main action easy to find.",
      "Keep the design simple and readable.",
      "Test it with one real user or example.",
      "Improve based on what feels confusing.",
    ])}`;
  }

  if (lowerQuestion.includes("compare") || lowerQuestion.includes("difference between") || lowerQuestion.includes(" vs ")) {
    return `A good comparison for ${topic} is:\n${createList([
      "Purpose: what each option is mainly used for.",
      "Strengths: where each one performs better.",
      "Limits: what each one is not good at.",
      "Cost and effort: how much time, money, or skill it needs.",
      "Best choice: pick the one that matches your goal.",
    ])}`;
  }

  if (lowerQuestion.startsWith("how to") || lowerQuestion.startsWith("how do") || lowerQuestion.startsWith("how can")) {
    return `Here is a practical way to do ${topic}:\n${createList([
      "Define the exact result you want.",
      "Gather the tools, information, or files needed.",
      "Build or try the smallest working version first.",
      "Test it and fix the most important problems.",
      "Improve the design, speed, safety, and user experience.",
    ])}`;
  }

  if (lowerQuestion.startsWith("why")) {
    return `The main reason is usually cause and effect. For "${question}", look at what changed, what result happened, and what rule connects them. A strong answer should explain the cause, give one example, and mention any exceptions.`;
  }

  if (lowerQuestion.startsWith("what is") || lowerQuestion.startsWith("what are") || lowerQuestion.startsWith("explain")) {
    return `${topic.charAt(0).toUpperCase() + topic.slice(1)} is the main subject of your question. A clear way to understand it is: what it means, why it matters, how it is used, and one simple example. Ask me to go deeper and I can break it into beginner-friendly steps.`;
  }

  if (lowerQuestion.startsWith("who is") || lowerQuestion.startsWith("where is") || lowerQuestion.startsWith("when is")) {
    return `I can help answer "${question}", but names, places, dates, and current facts can change or need exact checking. If the app is connected to an online AI/search service, I can give a more precise answer. Without that, I can still help explain the topic or plan how to verify it.`;
  }

  return `Here is my best answer: ${question} is something we can handle by separating it into the goal, the important facts, and the next action. The safest next step is to tell me whether you want a short answer, a step-by-step plan, an example, or code, and I will answer in that style.`;
};

const createAssistantAnswer = (question) => {
  const lowerQuestion = question.toLowerCase();
  return answerAppQuestion(question, lowerQuestion) || createGeneralAssistantAnswer(question);
};

const addChatMessage = (message, sender) => {
  const bubble = document.createElement("div");
  bubble.className = `chat-message ${sender}-message`;

  const text = document.createElement("p");
  text.textContent = message;
  bubble.append(text);

  assistantMessages.append(bubble);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
};

const getAiEndpoint = () => window.APP_AI_ENDPOINT || localStorage.getItem("appAiEndpoint") || "";

const fetchWithTimeout = (url, options, timeoutMs = 12000) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timeout));
};

const answerAssistantQuestion = async (question) => {
  const endpoint = getAiEndpoint();

  if (endpoint) {
    const response = await fetchWithTimeout(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        instructions:
          "Answer clearly, politely, and accurately. If the question needs current data, say that live verification is needed. Do not invent facts.",
      }),
    });
    const data = await response.json();
    return data.answer || data.message || data.text || createAssistantAnswer(question);
  }

  return createAssistantAnswer(question);
};

const createLinkForEmail = (type, email) => {
  const url = new URL(window.location.href);
  url.hash = `${type}=${encodeURIComponent(email)}`;
  return url.toString();
};

const createInviteLink = (token) => {
  const url = new URL(window.location.href);
  url.hash = `invite=${encodeURIComponent(token)}`;
  return url.toString();
};

const createInvitedUser = ({ fullName, mobile, email }) => {
  const users = getUsers();
  const existingIndex = users.findIndex((user) => normalize(user.email) === normalize(email));
  const now = localTimestamp();
  const inviteToken = createToken();
  const invitedUser = {
    ...(existingIndex >= 0 ? users[existingIndex] : {}),
    id: existingIndex >= 0 ? users[existingIndex].id : createToken(),
    username: existingIndex >= 0 ? users[existingIndex].username || "" : "",
    email,
    fullName,
    mobile,
    role: existingIndex >= 0 ? users[existingIndex].role || "user" : "user",
    adminApproved: existingIndex >= 0 ? users[existingIndex].adminApproved === true : false,
    plan: existingIndex >= 0 ? users[existingIndex].plan || "free" : "free",
    status: existingIndex >= 0 && users[existingIndex].status === "active" ? "active" : "invited",
    inviteToken,
    invitedAt: now,
    createdAt: existingIndex >= 0 ? users[existingIndex].createdAt || now : now,
    lastLoginAt: existingIndex >= 0 ? users[existingIndex].lastLoginAt || "" : "",
    localDeviceIds: existingIndex >= 0 ? users[existingIndex].localDeviceIds || [] : [],
    deviceLogins: existingIndex >= 0 ? users[existingIndex].deviceLogins || [] : [],
    lastDevice: existingIndex >= 0 ? users[existingIndex].lastDevice || null : null,
    lastConnection: existingIndex >= 0 ? users[existingIndex].lastConnection || "" : "",
    syncUpdatedAt: Date.now(),
  };

  if (existingIndex >= 0) {
    users[existingIndex] = invitedUser;
  } else {
    users.push(invitedUser);
  }

  saveUsers(users);
  pushUserToSharedDatabase(invitedUser).catch(() => {});
  return invitedUser;
};

const handleIncomingLinks = () => {
  const hash = window.location.hash.replace(/^#/, "");
  const [key, value] = hash.split("=");
  const decodedValue = decodeURIComponent(value || "");

  if (key === "pro" && value) {
    localStorage.setItem("pendingProEmail", decodedValue);
  }

  if (key === "invite" && value) {
    pendingInvite = findInviteByToken(decodedValue) || { email: decodedValue };
    if (pendingInvite.email) {
      document.querySelector("#email").value = pendingInvite.email;
    }
    if (pendingInvite.fullName) {
      document.querySelector("#fullName").value = pendingInvite.fullName;
    }
    if (pendingInvite.mobile) {
      document.querySelector("#mobile").value = pendingInvite.mobile;
    }
  }
};

const getUserLabel = (user) => user?.fullName || user?.username || user?.email || "Unknown user";

const renderChatRecipients = () => {
  const users = getUsers().filter((user) => user.status !== "suspended");
  const addNamedUserOptions = (select) => {
    users
      .filter((user) => user.id !== state.id)
      .forEach((user) => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = `${getUserLabel(user)} (${formatRole(user.role)})`;
        select.append(option);
      });
  };

  userChatRecipient.innerHTML = "";

  if (!canManageUsers()) {
    const adminsOption = document.createElement("option");
    adminsOption.value = "admins";
    adminsOption.textContent = "Admins / Pre-admins";
    userChatRecipient.append(adminsOption);
  }

  const addAllOption = (select) => {
    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "All users";
    select.append(allOption);
  };

  addAllOption(userChatRecipient);

  if (canManageUsers()) {
    addNamedUserOptions(userChatRecipient);
  }

  adminChatRecipient.innerHTML = "";
  addAllOption(adminChatRecipient);
  if (canManageUsers()) {
    addNamedUserOptions(adminChatRecipient);
  }
};

const renderChatMessages = () => {
  const users = getUsers();
  const userMap = new Map(users.map((user) => [user.id, user]));
  const messages = getChatMessages();
  const visibleMessages = messages.filter(
    (message) =>
      canManageUsers() ||
      message.toId === "all" ||
      message.fromId === state.id ||
      message.toId === state.id,
  );

  userChatMessages.innerHTML = "";

  if (visibleMessages.length === 0) {
    const empty = document.createElement("div");
    empty.className = "chat-message assistant-message";
    empty.innerHTML = "<p>No messages yet.</p>";
    userChatMessages.append(empty);
    return;
  }

  visibleMessages.slice(-80).forEach((message) => {
    const fromUser = userMap.get(message.fromId);
    const toUser = message.toId === "all" ? null : userMap.get(message.toId);
    const bubble = document.createElement("div");
    bubble.className = `chat-message ${message.fromId === state.id ? "user-message" : "assistant-message"}`;

    const meta = document.createElement("span");
    meta.className = "chat-meta";
    const recipientLabel =
      message.toId === "all"
        ? "All users"
        : message.toId === "admins"
          ? "Admins / Pre-admins"
          : getUserLabel(toUser);
    meta.textContent = `${getUserLabel(fromUser)} to ${recipientLabel} · ${message.createdAt}`;

    const text = document.createElement("p");
    text.textContent = message.text;
    bubble.append(meta, text);
    userChatMessages.append(bubble);
  });

  userChatMessages.scrollTop = userChatMessages.scrollHeight;
};

const sendChatMessage = (toId, text) => {
  const messages = getChatMessages();
  messages.push({
    id: createToken(),
    fromId: state.id,
    toId,
    text,
    createdAt: localTimestamp(),
  });
  saveChatMessages(messages);
  renderChatMessages();
};

const renderAdminUsers = () => {
  if (!canManageUsers()) {
    adminUsers.innerHTML = `<tr><td colspan="7">Admin access is not available.</td></tr>`;
    return;
  }

  const users = [...getUsers()].sort(
    (firstUser, secondUser) =>
      Number(secondUser.lastSeenAtMs || secondUser.syncUpdatedAt || 0) -
      Number(firstUser.lastSeenAtMs || firstUser.syncUpdatedAt || 0),
  );

  if (users.length === 0) {
    adminUsers.innerHTML = `<tr><td colspan="7">No users yet.</td></tr>`;
    return;
  }

  adminUsers.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");
    const isCurrentUser = user.id === state.id;
    const localAccess = (user.localDeviceIds || []).includes(getDeviceId());
    const lastDevice = user.lastDevice || (user.deviceLogins || []).at(-1) || null;
    const deviceCount = user.deviceLogins?.length || 0;
    row.innerHTML = `
      <td>
        <strong>${safeText(user.fullName || "No name")}</strong><br />
        <span class="muted">@${safeText(user.username || "username")}</span>
      </td>
      <td>
        ${safeText(user.email || "No email")}<br />
        <span class="muted">${safeText(user.mobile || "No mobile")}</span>
      </td>
      <td>
        <strong>${safeText(lastDevice?.type || "No device yet")}</strong><br />
        <span class="muted">${safeText(lastDevice?.browser || "Browser unknown")} · ${safeText(lastDevice?.platform || "Platform unknown")}</span><br />
        <span class="muted">Screen: ${safeText(lastDevice?.screen || "Unknown")}</span><br />
        <span class="muted">Network: ${safeText(user.lastConnection || lastDevice?.connection || "Unknown")}</span><br />
        <span class="muted">Saved devices: ${deviceCount}</span>
      </td>
      <td>${formatPlan(user.plan)}</td>
      <td>${formatRole(user.role)}</td>
      <td>
        <span class="status-pill">${safeText(user.status || "active")}</span><br />
        ${user.adminAccessRequestedAt ? `<span class="muted">Admin request: ${safeText(user.adminAccessRequestedAt)}</span><br />` : ""}
        <span class="muted">Admin approved: ${user.adminApproved === true ? "yes" : "no"}</span><br />
        <span class="muted">This computer: ${localAccess ? "yes" : "no"}</span><br />
        <span class="muted">Last login: ${safeText(user.lastLoginAt || "Never")}</span><br />
        <span class="muted">Last seen: ${safeText(user.lastSeenAt || "Not live")}</span>
      </td>
      <td>
        <div class="admin-actions">
          <button class="mini-button" type="button" data-admin-action="grant-pro" data-user-id="${safeText(user.id)}">Free Pro</button>
          <button class="mini-button" type="button" data-admin-action="chat" data-user-id="${safeText(user.id)}">Chat</button>
          <button class="mini-button" type="button" data-admin-action="pre-admin" data-user-id="${safeText(user.id)}">Make pre-admin</button>
          <button class="mini-button" type="button" data-admin-action="admin" data-user-id="${safeText(user.id)}">Make admin</button>
          <button class="mini-button" type="button" data-admin-action="suspend" data-user-id="${safeText(user.id)}" ${isCurrentUser ? "disabled" : ""}>${user.status === "suspended" ? "Unsuspend" : "Suspend"}</button>
          <button class="mini-button danger" type="button" data-admin-action="remove" data-user-id="${safeText(user.id)}" ${isCurrentUser ? "disabled" : ""}>Remove</button>
        </div>
      </td>
    `;
    adminUsers.append(row);
  });
};

const updateUserById = (userId, updater) => {
  const users = getUsers();
  const index = users.findIndex((user) => user.id === userId);
  if (index < 0) return;

  users[index] = { ...updater(users[index]), syncUpdatedAt: Date.now() };
  saveUsers(users);
  pushUsersToSharedDatabase().catch(() => {});

  if (userId === state.id) {
    Object.assign(state, users[index]);
    localStorage.setItem("loggedInUser", JSON.stringify(state));
    updateAccountDisplay();
  }

  renderAdminUsers();
  renderChatRecipients();
  renderChatMessages();
};

const handleAdminAction = (action, userId) => {
  if (!canManageUsers()) return;

  if (action === "remove") {
    const users = getUsers().filter((user) => user.id !== userId || user.id === state.id);
    saveUsers(users);
    pushUsersToSharedDatabase().catch(() => {});
    renderAdminUsers();
    renderChatRecipients();
    renderChatMessages();
    return;
  }

  if (action === "chat") {
    renderChatRecipients();
    adminChatRecipient.value = userId;
    adminChatMessage.focus();
    applyAppTab("admin");
    return;
  }

  updateUserById(userId, (user) => {
    if (action === "grant-pro") return { ...user, plan: "pro", proSource: "admin grant" };
    if (action === "pre-admin") {
      return {
        ...user,
        role: "pre-admin",
        adminApproved: true,
        adminAccessRequestedAt: "",
        localDeviceIds: [...new Set([...(user.localDeviceIds || []), getDeviceId()])],
      };
    }
    if (action === "admin") {
      return {
        ...user,
        role: "admin",
        adminApproved: true,
        adminAccessRequestedAt: "",
        localDeviceIds: [...new Set([...(user.localDeviceIds || []), getDeviceId()])],
      };
    }
    if (action === "suspend") {
      return { ...user, status: user.status === "suspended" ? "active" : "suspended" };
    }
    return user;
  });
};

credentialsForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setError("credentials");

  const formData = new FormData(credentialsForm);
  const username = String(formData.get("username")).trim();
  const email = String(formData.get("email")).trim();
  const password = String(formData.get("password"));
  const existingUser = findUser(getUsers(), username) || findUser(getUsers(), email);

  if (username.length < 3) {
    setError("credentials", "Username must be at least 3 characters.");
    return;
  }

  if (!isValidEmail(email)) {
    setError("credentials", "Please enter a valid email ID.");
    return;
  }

  if (password.length < 6) {
    setError("credentials", "Password must be at least 6 characters.");
    return;
  }

  if (
    existingUser &&
    existingUser.status !== "invited" &&
    (normalize(existingUser.username) !== normalize(username) || normalize(existingUser.email) !== normalize(email))
  ) {
    setError("credentials", "Use the saved username and email for this account.");
    return;
  }

  if (existingUser?.status === "suspended") {
    setError("credentials", "This account is suspended.");
    return;
  }

  const passwordHash = await hashPassword(password, existingUser?.email || email);

  if (existingUser && (existingUser.password || existingUser.passwordHash)) {
    const legacyPasswordMatches = existingUser.password && existingUser.password === password;
    const passwordHashMatches = existingUser.passwordHash && existingUser.passwordHash === passwordHash;

    if (!legacyPasswordMatches && !passwordHashMatches) {
      setError("credentials", "Please enter the saved password for this account.");
      return;
    }
  }

  state.id = existingUser?.id || "";
  state.username = username;
  state.email = email;
  state.passwordHash = passwordHash;
  state.adminApproved = existingUser?.adminApproved === true;
  state.role = state.adminApproved ? existingUser?.role || "user" : "user";
  state.plan = existingUser?.plan || "free";
  state.status = existingUser?.status || "active";
  showScreen("profile");
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  setError("profile");

  const formData = new FormData(profileForm);
  const fullName = String(formData.get("fullName")).trim();
  const mobile = String(formData.get("mobile")).trim();

  if (fullName.length < 2) {
    setError("profile", "Please enter your name.");
    return;
  }

  if (!isValidMobile(mobile)) {
    setError("profile", "Please enter a valid mobile number.");
    return;
  }

  state.fullName = fullName;
  state.mobile = mobile;
  sendLoginLink();
});

document.querySelectorAll("[data-back-to]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.backTo));
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => applyTheme(button.dataset.themeOption));
});

appTabs.forEach((button) => {
  button.addEventListener("click", () => applyAppTab(button.dataset.appTab));
});

lessonButtons.forEach((button) => {
  button.addEventListener("click", () => renderLesson(button.dataset.lesson));
});

languageSelect.addEventListener("change", () => selectLanguage(languageSelect.value));

runPreview.addEventListener("click", renderAppPreview);

resetPreview.addEventListener("click", () => {
  resetBuilderCode();
  renderAppPreview();
});

builderName.addEventListener("change", () => {
  if (htmlCode.value.includes("<h1>")) {
    resetBuilderCode();
    renderAppPreview();
  }
});

generateApp.addEventListener("click", () => {
  const prompt = cleanText(appPrompt.value);
  if (!prompt) {
    generateOutput.textContent = "Type what app you want to create first.";
    return;
  }

  const generatedApp = generateAppFromPrompt(prompt);
  builderName.value = generatedApp.title;
  htmlCode.value = generatedApp.html;
  cssCode.value = generatedApp.css;
  jsCode.value = generatedApp.js;
  renderAppPreview();
  generateOutput.textContent = "App created from your prompt. You can edit the code below.";
});

adminAccessButton.addEventListener("click", () => {
  if (canManageUsers()) {
    adminAccessMessage.textContent = "Admin access opened for this computer login.";
    renderAdminUsers();
    applyAppTab("admin");
    return;
  }

  if (!hasApprovedLocalAdmin()) {
    saveCurrentUserChanges({
      role: "admin",
      adminApproved: true,
      adminAccessRequestedAt: "",
      localDeviceIds: [...new Set([...(state.localDeviceIds || []), getDeviceId()])],
    });
    adminAccessMessage.textContent = "First admin is set up on this computer. Admin access opened.";
    renderAdminUsers();
    applyAppTab("admin");
    return;
  }

  saveCurrentUserChanges({ adminAccessRequestedAt: localTimestamp() });
  sendChatMessage("admins", `${state.fullName || state.username} requested Admin / Pre-admin access on this computer.`);
  adminAccessMessage.textContent = "Admin access request sent. An Admin or Pre-admin can approve it from their section.";
});

activatePro.addEventListener("click", () => {
  if (state.plan === "pro") return;
  saveCurrentUserChanges({ plan: "pro", proSource: "paid demo" });
  proLinkOutput.textContent = "Pro is active for this account. Payment is simulated in this demo.";
});

voiceMode.addEventListener("click", () => {
  if (state.plan !== "pro") {
    proLinkOutput.textContent = "Voice mode is available after Pro is active.";
    return;
  }

  const message = "Voice mode is unlocked for Pro.";
  proLinkOutput.textContent = message;

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(message));
  }
});

proLinkForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = proLinkEmail.value.trim();
  if (!isValidEmail(email)) return;

  const link = createLinkForEmail("pro", email);
  localStorage.setItem("pendingProEmail", email);
  proLinkOutput.textContent = `Pro subscription link created for ${email}: ${link}`;
});

appLinkForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = appLinkEmail.value.trim();
  if (!isValidEmail(email)) return;

  const link = createLinkForEmail("invite", email);
  appLinkOutput.textContent = `App link created for ${email}: ${link}`;
});

inviteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!canManageUsers()) return;

  const fullName = inviteName.value.trim();
  const mobile = inviteMobile.value.trim();
  const email = inviteEmail.value.trim();

  if (fullName.length < 2 || !isValidMobile(mobile) || !isValidEmail(email)) {
    inviteOutput.textContent = "Enter a valid name, mobile number, and email.";
    return;
  }

  const invitedUser = createInvitedUser({ fullName, mobile, email });
  const link = createInviteLink(invitedUser.inviteToken);
  inviteOutput.textContent = `${fullName} is invited. Link: ${link}`;
  inviteForm.reset();
  renderAdminUsers();
  renderChatRecipients();
});

const installCurrentApp = async () => {
  if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone) {
    setInstallStatus("This app is already installed on this device.");
    return;
  }

  if (!deferredInstallPrompt) {
    setInstallStatus(
      "If no install prompt appears, use your browser menu: Install app, Add to Home Screen, or Add to Dock.",
    );
    return;
  }

  deferredInstallPrompt.prompt();
  const choice = await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  setInstallStatus(
    choice.outcome === "accepted"
      ? "Install started for this phone, tablet, laptop, or desktop."
      : "Install was dismissed.",
  );
};

installButtons.forEach((button) => {
  button.addEventListener("click", installCurrentApp);
});

userChatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = cleanText(userChatMessage.value);
  if (!message) return;

  sendChatMessage(userChatRecipient.value, message);
  userChatMessage.value = "";
});

adminChatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = cleanText(adminChatMessage.value);
  if (!message) return;

  sendChatMessage(adminChatRecipient.value, message);
  adminChatMessage.value = "";
  applyAppTab("chat");
});

adminUsers.addEventListener("click", (event) => {
  const button = event.target.closest("[data-admin-action]");
  if (!button) return;
  handleAdminAction(button.dataset.adminAction, button.dataset.userId);
});

confirmLogin.addEventListener("click", enterApp);

cancelLogin.addEventListener("click", () => {
  window.location.hash = "";
  showScreen("credentials");
});

restartFlow.addEventListener("click", () => {
  localStorage.removeItem("pendingLogin");
  localStorage.removeItem("loggedInUser");
  window.location.hash = "";
  credentialsForm.reset();
  profileForm.reset();
  Object.keys(state).forEach((key) => {
    state[key] = "";
  });
  state.role = "user";
  state.adminApproved = false;
  state.plan = "free";
  state.status = "active";
  showScreen("credentials");
});

assistantForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const question = cleanText(assistantQuestion.value);
  if (!question) return;

  assistantQuestion.value = "";
  addChatMessage(question, "user");
  addChatMessage("Thinking...", "assistant");

  const thinkingMessage = assistantMessages.lastElementChild;

  try {
    const answer = await answerAssistantQuestion(question);
    thinkingMessage.querySelector("p").textContent = answer;
  } catch {
    thinkingMessage.querySelector("p").textContent = createAssistantAnswer(question);
  }

  assistantMessages.scrollTop = assistantMessages.scrollHeight;
});

window.addEventListener("hashchange", () => {
  handleIncomingLinks();
  showConfirmationFromLink();
});

window.addEventListener("storage", (event) => {
  if (!["appUsers", "appUsersUpdatedAt"].includes(event.key)) return;
  updateAccountDisplay();
  renderAdminUsers();
  renderChatRecipients();
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  setInstallStatus("Install is available for this device.");
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  setInstallStatus("The app is installed on this phone, tablet, laptop, or desktop.");
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {
    setInstallStatus("Install support is not available in this browser right now.");
  });
}

applyTheme(localStorage.getItem("themeMode") || "light");
handleIncomingLinks();
migrateStoredPasswords();
migrateAdminAccess();
renderLesson("basics");
buildLanguageSelector();
selectLanguage(localStorage.getItem("selectedLanguage") || "JavaScript");
resetBuilderCode();
renderAppPreview();
showConfirmationFromLink();
setInterval(refreshLiveAdminUsers, 1000);
