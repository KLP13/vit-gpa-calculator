// VIT Official Grade Points Mapping
export const GRADE_POINTS = {
  S: 10,
  A: 9,
  B: 8,
  C: 7,
  D: 6,
  E: 5,
  F: 0
};

// Map grade letters to performance labels
export const getPerformanceLabel = (value) => {
  const score = parseFloat(value);
  if (isNaN(score)) return { label: '-', color: 'text-slate-500 bg-slate-100' };
  
  if (score >= 9.00) return { label: 'Outstanding', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  if (score >= 8.00) return { label: 'Excellent', color: 'text-teal-700 bg-teal-50 border-teal-200' };
  if (score >= 7.00) return { label: 'Good', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
  if (score >= 6.00) return { label: 'Satisfactory', color: 'text-purple-700 bg-purple-50 border-purple-200' };
  if (score >= 5.00) return { label: 'Pass', color: 'text-amber-700 bg-amber-50 border-amber-200' };
  return { label: 'Needs Improvement', color: 'text-red-700 bg-red-50 border-red-200' };
};

/**
 * Calculate Semester GPA
 * @param {Array} courses - Array of { credits, grade }
 * @returns {Object} - { gpa, totalCredits, totalGradePoints, isError }
 */
export const calculateGPA = (courses) => {
  if (!courses || courses.length === 0) {
    return { gpa: 0, totalCredits: 0, totalGradePoints: 0, isError: true, message: 'Add at least one course row' };
  }

  let totalCredits = 0;
  let totalGradePoints = 0;
  let validCount = 0;

  for (const course of courses) {
    const credits = parseFloat(course.credits);
    const grade = course.grade;

    if (!isNaN(credits) && grade && GRADE_POINTS[grade] !== undefined) {
      totalCredits += credits;
      totalGradePoints += (credits * GRADE_POINTS[grade]);
      validCount++;
    }
  }

  if (validCount === 0 || totalCredits === 0) {
    return { gpa: 0, totalCredits: 0, totalGradePoints: 0, isError: true, message: 'Please select credits and grades for your courses' };
  }

  const gpa = totalGradePoints / totalCredits;
  return {
    gpa: parseFloat(gpa.toFixed(2)),
    totalCredits,
    totalGradePoints,
    isError: false
  };
};

/**
 * Calculate Cumulative CGPA
 * @param {Array} semesters - Array of { gpa, credits }
 * @returns {Object} - { cgpa, totalCredits, totalWeightedGPA, isError }
 */
export const calculateCGPA = (semesters) => {
  if (!semesters || semesters.length === 0) {
    return { cgpa: 0, totalCredits: 0, isError: true, message: 'Add at least one semester card' };
  }

  let totalCredits = 0;
  let totalWeightedGPA = 0;
  let validCount = 0;

  for (const sem of semesters) {
    const gpa = parseFloat(sem.gpa);
    const credits = parseFloat(sem.credits);

    if (!isNaN(gpa) && !isNaN(credits) && gpa >= 0 && gpa <= 10 && credits > 0) {
      totalCredits += credits;
      totalWeightedGPA += (gpa * credits);
      validCount++;
    }
  }

  if (validCount === 0 || totalCredits === 0) {
    return { cgpa: 0, totalCredits: 0, isError: true, message: 'Please enter valid GPA (0-10) and positive credits' };
  }

  const cgpa = totalWeightedGPA / totalCredits;
  return {
    cgpa: parseFloat(cgpa.toFixed(2)),
    totalCredits,
    isError: false
  };
};

/**
 * Predict target GPA required in future semesters
 */
export const predictTargetGPA = ({ currentCGPA, creditsCompleted, targetCGPA, remainingSemesters, creditsPerSemester }) => {
  const currCGPA = parseFloat(currentCGPA);
  const currCredits = parseFloat(creditsCompleted);
  const target = parseFloat(targetCGPA);
  const remSems = parseInt(remainingSemesters);
  const creditsPerSem = parseFloat(creditsPerSemester);

  if (isNaN(currCGPA) || isNaN(currCredits) || isNaN(target) || isNaN(remSems) || isNaN(creditsPerSem) ||
      currCGPA < 0 || currCGPA > 10 || currCredits < 0 || target < 0 || target > 10 || remSems <= 0 || creditsPerSem <= 0) {
    return { requiredGPA: 0, isAchievable: false, isAlreadyAchieved: false, error: 'Invalid input parameters' };
  }

  const remainingCredits = remSems * creditsPerSem;
  const totalCredits = currCredits + remainingCredits;
  
  const targetGradePoints = target * totalCredits;
  const currentGradePoints = currCGPA * currCredits;
  const neededGradePoints = targetGradePoints - currentGradePoints;

  const requiredGPA = neededGradePoints / remainingCredits;

  if (requiredGPA <= 0) {
    return {
      requiredGPA: 0,
      isAchievable: true,
      isAlreadyAchieved: true
    };
  }

  if (requiredGPA > 10.0) {
    return {
      requiredGPA: parseFloat(requiredGPA.toFixed(2)),
      isAchievable: false,
      isAlreadyAchieved: false
    };
  }

  return {
    requiredGPA: parseFloat(requiredGPA.toFixed(2)),
    isAchievable: true,
    isAlreadyAchieved: false
  };
};
