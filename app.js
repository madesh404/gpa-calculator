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

function parseCSV(text) {
  const lines = text.trim().split('\n');
  const courses = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // skip header row
    if (i === 0 && line.toLowerCase().includes('course')) continue;

    const [code, credits, grade] = line.split(',').map(s => s.trim());

    courses.push({
      code,
      credits: parseFloat(credits),
      grade: grade.toUpperCase()
    });
  }

  return courses;
}