const subjectList = [
    "English Home Language",
    "English First Additional Language",
    "Afrikaans Home Language",
    "Afrikaans First Additional Language",
    "isiZulu Home Language",
    "isiXhosa Home Language",
    "Xitsonga Home Language",
    "Sesotho Home Language",
    "Setswana Home Language",
    "Sepedi Home Language",
    "Tshivenda Home Language",
    "Mathematics",
    "Mathematical Literacy",
    "Physical Sciences",
    "Life Sciences",
    "Geography",
    "History",
    "Accounting",
    "Business Studies",
    "Economics",
    "Information Technology",
    "Computer Applications Technology",
    "Engineering Graphics and Design",
    "Tourism",
    "Consumer Studies",
    "Hospitality Studies",
    "Agricultural Sciences",
    "Visual Arts",
    "Dramatic Arts",
    "Music",
    "Religion Studies",
    "Civil Technology",
    "Electrical Technology",
    "Mechanical Technology",
    "Life Orientation"
];

function getAPS(mark) {

    if (mark >= 80) return 7;
    if (mark >= 70) return 6;
    if (mark >= 60) return 5;
    if (mark >= 50) return 4;
    if (mark >= 40) return 3;
    if (mark >= 30) return 2;

    return 1;
}

function addSubject(subject = "", mark = "") {

    let options = "";

    subjectList.forEach(item => {
        options += `<option value="${item}" ${item === subject ? "selected" : ""}>${item}</option>`;
    });

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>
            <select class="subject" onchange="saveData()">
                ${options}
            </select>
        </td>

        <td>
            <input
                type="number"
                class="mark"
                min="0"
                max="100"
                value="${mark}"
                oninput="calculateAPS();saveData();">
        </td>

        <td class="aps">0</td>

        <td>
            <button class="remove-btn" onclick="removeSubject(this)">
                ❌
            </button>
        </td>
    `;

    document.getElementById("subjects").appendChild(row);

    calculateAPS();
}

function calculateAPS() {

    let total = 0;

    document.querySelectorAll("#subjects tr").forEach(row => {

        const subject = row.querySelector(".subject").value;
        const mark = Number(row.querySelector(".mark").value);

        const aps = getAPS(mark);

        row.querySelector(".aps").innerText = aps;

        if (subject !== "Life Orientation") {
            total += aps;
        }
    });

    document.getElementById("totalAPS").innerText = total;

    showQualification(total);
}

function showQualification(total) {

    let message = "";

    if (total >= 30) {
        message = "🎉 You qualify for most Belgium Campus programmes.";
    }
    else if (total >= 24) {
        message = "✅ You may qualify for selected programmes.";
    }
    else {
        message = "⚠️ APS score may not meet minimum requirements.";
    }

    document.getElementById("qualificationMessage")
        .innerHTML = `<h3>${message}</h3>`;
}

function removeSubject(button) {

    button.parentElement.parentElement.remove();

    saveData();
    calculateAPS();
}

function saveData() {

    let data = [];

    document.querySelectorAll("#subjects tr")
        .forEach(row => {

            data.push({
                subject: row.querySelector(".subject").value,
                mark: row.querySelector(".mark").value
            });

        });

    localStorage.setItem(
        "BelgiumCampusAPS",
        JSON.stringify(data)
    );
}

function loadData() {

    const saved =
        localStorage.getItem("BelgiumCampusAPS");

    if (saved) {

        JSON.parse(saved).forEach(item => {

            addSubject(
                item.subject,
                item.mark
            );

        });

    } else {

        for (let i = 0; i < 7; i++) {
            addSubject();
        }
    }

    calculateAPS();
}

function clearAll() {

    if (confirm("Clear all saved data?")) {

        localStorage.removeItem(
            "BelgiumCampusAPS"
        );

        document.getElementById("subjects")
            .innerHTML = "";

        for (let i = 0; i < 7; i++) {
            addSubject();
        }

        calculateAPS();
    }
}

window.onload = loadData;