const languageButton = document.getElementById("langBtn");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const form = document.getElementById("inquiryForm");
const statusMessage = document.getElementById("formStatus");

let language = "ar";

function setLanguage(nextLanguage) {
  language = nextLanguage;

  const isEnglish = language === "en";

  document.documentElement.lang = isEnglish ? "en" : "ar";
  document.documentElement.dir = isEnglish ? "ltr" : "rtl";
  document.body.classList.toggle("english", isEnglish);

  languageButton.textContent = isEnglish ? "عربي" : "EN";

  menuToggle.setAttribute(
    "aria-label",
    isEnglish ? "Open navigation" : "فتح القائمة"
  );

  document.querySelectorAll("[data-ar][data-en]").forEach((element) => {
    const value = element.dataset[language];

    if (value === undefined) return;

    if (["H1", "H2"].includes(element.tagName)) {
      element.innerHTML = value;
    } else {
      element.textContent = value;
    }
  });

  if (statusMessage) {
    statusMessage.textContent = "";
  }
}

languageButton.addEventListener("click", () => {
  setLanguage(language === "ar" ? "en" : "ar");
});

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

document.getElementById("year").textContent =
  new Date().getFullYear();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);

  const labels = language === "ar"
    ? {
        name: "الاسم",
        company: "الشركة",
        email: "البريد الإلكتروني",
        type: "نوع الاستفسار",
        message: "الرسالة"
      }
    : {
        name: "Name",
        company: "Company",
        email: "Email",
        type: "Inquiry type",
        message: "Message"
      };

  const body = [
    `${labels.name}: ${data.get("name") || ""}`,
    `${labels.company}: ${data.get("company") || "-"}`,
    `${labels.email}: ${data.get("email") || ""}`,
    `${labels.type}: ${data.get("type") || ""}`,
    "",
    `${labels.message}:`,
    `${data.get("message") || ""}`
  ].join("\n");

  const subject = language === "ar"
    ? "استفسار من موقع رصين"
    : "Inquiry from RASEEN website";

  // غيّر هذا العنوان إلى البريد الإلكتروني الحقيقي للشركة.
  const recipient = "YOUR_EMAIL@example.com";

  if (recipient === "YOUR_EMAIL@example.com") {
    statusMessage.textContent = language === "ar"
      ? "يرجى إضافة بريد الشركة داخل ملف script.js لتفعيل تجهيز رسالة الاستفسار."
      : "Please add the company email in script.js to enable inquiry emails.";

    return;
  }

  const mailto =
    `mailto:${recipient}?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;
});
