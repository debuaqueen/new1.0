const fs = require('fs').promises;
const path = require('path');

const LOG_FILE = path.join(__dirname, '../data/students.log.txt');

// Auto-create data/ folder
(async () => {
  try {
    await fs.mkdir(path.dirname(LOG_FILE), { recursive: true });
  } catch (err) {}
})();

function getTimestamp() {
  return new Date().toISOString().replace('T', ' ').substring(0, 19);
}

async function logStudentAction({ userEmail, action, student }) {
  const type = student.isPG ? 'Graduate' : 'Undergraduate';
  const line = `[${getTimestamp()}] USER: ${userEmail} | ACTION: ${action} | ` +
               `ID: ${student.studentId} | NAME: ${student.name} | ` +
               `GPA: ${student.gpa} | TYPE: ${type}\n`;

  try {
    await fs.appendFile(LOG_FILE, line);
    console.log('Logged:', line.trim());
  } catch (err) {
    console.error('Log failed:', err);
  }
}

module.exports = { logStudentAction };
