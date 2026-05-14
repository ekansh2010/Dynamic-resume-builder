const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const summaryInput = document.getElementById("summary");

const previewName = document.getElementById("previewName");
const previewEmail = document.getElementById("previewEmail");
const previewPhone = document.getElementById("previewPhone");
const previewSummary = document.getElementById("previewSummary");

const profileCircle = document.getElementById("profileCircle");

const addSkillBtn = document.getElementById("addSkillBtn");
const skillInput = document.getElementById("skillInput");

const skillsList = document.getElementById("skillsList");
const previewSkills = document.getElementById("previewSkills");

const addExperienceBtn = document.getElementById("addExperienceBtn");

const companyInput = document.getElementById("company");
const roleInput = document.getElementById("role");
const durationInput = document.getElementById("duration");

const experienceList = document.getElementById("experienceList");
const previewExperience = document.getElementById("previewExperience");

let skills = [];
let experiences = [];

/* LIVE PREVIEW */

nameInput.addEventListener("input", () => {
    previewName.textContent = nameInput.value || "Your Name";

    profileCircle.textContent =
        nameInput.value.charAt(0).toUpperCase() || "E";

    saveData();
});

emailInput.addEventListener("input", () => {
    previewEmail.textContent =
        emailInput.value || "example@email.com";

    saveData();
});

phoneInput.addEventListener("input", () => {
    previewPhone.textContent =
        phoneInput.value || "+91 9876543210";

    saveData();
});

summaryInput.addEventListener("input", () => {
    previewSummary.textContent =
        summaryInput.value ||
        "Your professional summary will appear here.";

    saveData();
});

/* ADD SKILLS */

addSkillBtn.addEventListener("click", () => {

    const skill = skillInput.value.trim();

    if(skill === ""){
        alert("Please enter a skill");
        return;
    }

    skills.push(skill);

    renderSkills();

    skillInput.value = "";

    saveData();
});

function renderSkills(){

    skillsList.innerHTML = "";
    previewSkills.innerHTML = "";

    skills.forEach(skill => {

        const skillTag = document.createElement("span");
        skillTag.classList.add("skill-tag");
        skillTag.textContent = skill;

        skillsList.appendChild(skillTag);

        const previewTag = document.createElement("span");
        previewTag.classList.add("preview-skill");
        previewTag.textContent = skill;

        previewSkills.appendChild(previewTag);
    });
}

/* ADD EXPERIENCE */

addExperienceBtn.addEventListener("click", () => {

    const company = companyInput.value.trim();
    const role = roleInput.value.trim();
    const duration = durationInput.value.trim();

    if(company === "" || role === "" || duration === ""){
        alert("Please fill all experience fields");
        return;
    }

    const expObj = {
        company,
        role,
        duration
    };

    experiences.push(expObj);

    renderExperience();

    companyInput.value = "";
    roleInput.value = "";
    durationInput.value = "";

    saveData();
});

function renderExperience(){

    experienceList.innerHTML = "";
    previewExperience.innerHTML = "";

    experiences.forEach(exp => {

        const expCard = document.createElement("div");
        expCard.classList.add("exp-card");

        expCard.innerHTML = `
            <h4>${exp.role}</h4>
            <p>${exp.company}</p>
            <small>${exp.duration}</small>
        `;

        experienceList.appendChild(expCard);

        const previewExp = document.createElement("div");
        previewExp.classList.add("preview-exp");

        previewExp.innerHTML = `
            <h4>${exp.role}</h4>
            <p>${exp.company}</p>
            <small>${exp.duration}</small>
        `;

        previewExperience.appendChild(previewExp);
    });
}

/* FORM VALIDATION */

document.getElementById("resumeForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    if(
        nameInput.value.trim() === "" ||
        emailInput.value.trim() === "" ||
        phoneInput.value.trim() === ""
    ){
        alert("Please fill all required fields");
        return;
    }

    alert("Resume Saved Successfully!");

    saveData();
});

/* LOCAL STORAGE */

function saveData(){

    const resumeData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        summary: summaryInput.value,
        skills: skills,
        experiences: experiences
    };

    localStorage.setItem(
        "resumeData",
        JSON.stringify(resumeData)
    );
}

function loadData(){

    const savedData =
        JSON.parse(localStorage.getItem("resumeData"));

    if(savedData){

        nameInput.value = savedData.name || "";
        emailInput.value = savedData.email || "";
        phoneInput.value = savedData.phone || "";
        summaryInput.value = savedData.summary || "";

        skills = savedData.skills || [];
        experiences = savedData.experiences || [];

        previewName.textContent =
            savedData.name || "Your Name";

        previewEmail.textContent =
            savedData.email || "example@email.com";

        previewPhone.textContent =
            savedData.phone || "+91 9876543210";

        previewSummary.textContent =
            savedData.summary ||
            "Your professional summary will appear here.";

        profileCircle.textContent =
            savedData.name
            ? savedData.name.charAt(0).toUpperCase()
            : "E";

        renderSkills();
        renderExperience();
    }
}

loadData();