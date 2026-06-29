const input = document.getElementById('csv-input');

input.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
  const text = e.target.result;
  const courses = parseCSV(text);
  const gpa = calcGPA(courses);
  renderTable(courses, gpa);
  };

  reader.readAsText(file);
});

const VALID_GRADES = new Set([
  'A+', 'A', 'A-',
  'B+', 'B', 'B-',
  'C+', 'C', 'C-',
  'D+', 'D', 'D-',
  'F'
]);

function parseCSV(text) {
  const lines = text.trim().split('\n');
  const courses = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) continue;
    if (i === 0 && line.toLowerCase().includes('course')) continue;

    const [code, credits, grade] = line.split(',').map(s => s.trim());
    const gradeUpper = grade.toUpperCase();

    if (!VALID_GRADES.has(gradeUpper)) {
      console.log(`Skipping ${code} — grade "${grade}" not on GPA scale`);
      continue;
    }

    courses.push({
      code,
      credits: parseFloat(credits),
      grade: gradeUpper
    });
  }

  return courses;
}

const GRADE_POINTS = {
  'A+': 4.33, 'A': 4.00, 'A-': 3.67,
  'B+': 3.33, 'B': 3.00, 'B-': 2.67,
  'C+': 2.33, 'C': 2.00, 'C-': 1.67,
  'D+': 1.33, 'D': 1.00, 'D-': 0.67,
  'F': 0.00
};

function calcGPA(courses) {
  let totalPoints = 0;
  let totalCredits = 0;

  for (const course of courses) {
    totalPoints += GRADE_POINTS[course.grade] * course.credits;
    totalCredits += course.credits;
  }

  return totalPoints / totalCredits;
}

function renderTable(courses, gpa) {
  const tbody = document.getElementById('course-tbody');
  const gpaDisplay = document.getElementById('gpa-display');

  tbody.innerHTML = '';
  gpaDisplay.textContent = `Current GPA: ${gpa.toFixed(2)} / 4.33`;

  for (const course of courses) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${course.code}</td>
      <td>${course.credits}</td>
      <td>${course.grade}</td>
      <td>${GRADE_POINTS[course.grade].toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  }
}