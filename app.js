const input = document.getElementById('csv-input');

input.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    const text = e.target.result;
    const courses = parseCSV(text);
    console.log(courses);
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