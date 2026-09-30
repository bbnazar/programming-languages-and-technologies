const students = [
    {
        name: "Даниэль",
        grades: [5, 4, 5]
    },
    {
        name: "Александр",
        grades: [4, 4, 5]
    },
    {
        name: "Дияр",
        grades: [5, 5, 4]
    },
    {
        name: "Иван",
        grades: [3, 4, 4]
    }
];

const button = document.getElementById("showJournal");
const journalBody = document.getElementById("journalBody");

function calculateAverage(grades) {
    let sum = 0;

    for (let i = 0; i < grades.length; i++) {
        sum += grades[i];
    }

    return (sum / grades.length).toFixed(2);
}

function showJournal() {
    journalBody.innerHTML = "";

    for (let i = 0; i < students.length; i++) {
        const student = students[i];

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        const grade1 = document.createElement("td");
        grade1.textContent = student.grades[0];

        const grade2 = document.createElement("td");
        grade2.textContent = student.grades[1];

        const grade3 = document.createElement("td");
        grade3.textContent = student.grades[2];

        const averageCell = document.createElement("td");
        averageCell.textContent = calculateAverage(student.grades);

        row.appendChild(nameCell);
        row.appendChild(grade1);
        row.appendChild(grade2);
        row.appendChild(grade3);
        row.appendChild(averageCell);

        journalBody.appendChild(row);
    }
}

button.addEventListener("click", showJournal);