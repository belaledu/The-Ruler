import { appendRows, ensureSheetWithHeaders, readSheet, updateRowById, deleteRowById, createRow } from '@/lib/google/sheets.service';

export const SHEETS = {
  courses: 'Courses',
  lessons: 'Lessons',
  students: 'Students',
  enrollments: 'Enrollments',
  assignments: 'Assignments',
  submissions: 'Submissions',
  notifications: 'Notifications',
} as const;

const COURSE_HEADERS = ['ID', 'Title', 'Description', 'Grade', 'Price', 'Thumbnail', 'IsPublished', 'LessonsCount', 'DurationMins'];
const LESSON_HEADERS = ['ID', 'CourseID', 'Title', 'VideoUrl', 'DurationSeconds', 'Section', 'Order', 'IsLocked'];
const STUDENT_HEADERS = ['ID', 'Name', 'Email', 'Phone', 'Password', 'Grade', 'City', 'CreatedAt', 'Status', 'Role'];
const ENROLLMENT_HEADERS = ['ID', 'StudentID', 'CourseID', 'Status', 'ProgressPercent', 'LastLessonID'];
const ASSIGNMENT_HEADERS = ['ID', 'CourseID', 'Title', 'DueAt', 'Type', 'ResourcesUrl'];
const SUBMISSION_HEADERS = ['ID', 'AssignmentID', 'StudentID', 'Status', 'SubmittedAt', 'Grade', 'FeedbackUrl'];
const NOTIFICATION_HEADERS = ['ID', 'StudentID', 'Message', 'Type', 'CreatedAt', 'Read'];

const SAMPLE_VIDEO = 'https://www.youtube.com/watch?v=H7q3QYw2z1s';

const sampleCourses = [
  {
    ID: 'course-1',
    Title: 'رياضيات الصف الثالث ثانوي - الفصل الدراسي الأول',
    Description: 'منهج رياضيات ثالث ثانوي مع تمارين واختبارات عملية',
    Grade: 'ثانوي ثالث',
    Price: '199',
    Thumbnail: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=80',
    IsPublished: 'true',
    LessonsCount: '12',
    DurationMins: '540',
  },
];

const sampleLessons = [
  {
    ID: 'lesson-1',
    CourseID: 'course-1',
    Title: 'مقدمة في النهايات',
    VideoUrl: SAMPLE_VIDEO,
    DurationSeconds: '900',
    Section: 'الوحدة الأولى',
    Order: '1',
    IsLocked: 'false',
  },
  {
    ID: 'lesson-2',
    CourseID: 'course-1',
    Title: 'قواعد الاشتقاق',
    VideoUrl: SAMPLE_VIDEO,
    DurationSeconds: '1100',
    Section: 'الوحدة الأولى',
    Order: '2',
    IsLocked: 'false',
  },
  {
    ID: 'lesson-3',
    CourseID: 'course-1',
    Title: 'تطبيقات على الاشتقاق',
    VideoUrl: SAMPLE_VIDEO,
    DurationSeconds: '1050',
    Section: 'الوحدة الثانية',
    Order: '3',
    IsLocked: 'false',
  },
];

const SAMPLE_HASHED_PASSWORD = '$2b$10$CwTycUXWue0Thq9StjUM0uJ8vZ.V5.PG4rpsr3A.YB2S/bRMyCV9C'; // bcrypt hash for "password123"

const sampleStudents = [
  {
    ID: 'dev-user-1',
    Name: 'Demo Student',
    Email: 'demo@student.local',
    Phone: '0500000000',
    Password: SAMPLE_HASHED_PASSWORD,
    Grade: 'ثانوي ثالث',
    City: 'الرياض',
    CreatedAt: '2026-03-01T00:00:00Z',
    Status: 'active',
    Role: 'student',
  },
  {
    ID: 'admin-1',
    Name: 'Super Admin',
    Email: 'admin@demo.local',
    Phone: '0599999999',
    Password: SAMPLE_HASHED_PASSWORD,
    Grade: 'إداري',
    City: 'الرياض',
    CreatedAt: '2026-03-01T00:00:00Z',
    Status: 'active',
    Role: 'super_admin',
  },
  {
    ID: 'admin-2',
    Name: 'Belal Karam',
    Email: 'belalkaram@gmail.com',
    Phone: '0501234567',
    Password: '$2b$10$8AT/RmTvIIUEdmFWA5fbme5vWlvEvNxq7JfLi1xWfxQpwofQPgVui', // bcrypt hash for "admin123"
    Grade: 'إداري',
    City: 'الرياض',
    CreatedAt: '2026-03-01T00:00:00Z',
    Status: 'active',
    Role: 'super_admin',
  },
];

const sampleEnrollments = [
  { ID: 'enroll-1', StudentID: 'dev-user-1', CourseID: 'course-1', Status: 'active', ProgressPercent: '45', LastLessonID: 'lesson-2' },
];

const sampleAssignments = [
  { ID: 'assign-1', CourseID: 'course-1', Title: 'واجب النهايات', DueAt: '2026-04-05', Type: 'واجب', ResourcesUrl: '' },
];

const sampleSubmissions = [
  { ID: 'submission-1', AssignmentID: 'assign-1', StudentID: 'dev-user-1', Status: 'submitted', SubmittedAt: '2026-03-30', Grade: '10/10', FeedbackUrl: '' },
];

const sampleNotifications = [
  { ID: 'notif-1', StudentID: 'dev-user-1', Message: 'تم إضافة واجب جديد', Type: 'assignment', CreatedAt: '2026-03-30T10:00:00Z', Read: 'false' },
  { ID: 'notif-2', StudentID: 'dev-user-1', Message: 'حصلت على درجة ٩٢٪ في اختبار الوحدة', Type: 'exam', CreatedAt: '2026-03-28T09:00:00Z', Read: 'true' },
];

const BELAL_ADMIN = sampleStudents.find((s) => s.Email === 'belalkaram@gmail.com');

async function ensureSpecificStudents(required: Record<string, string>[]) {
  if (!required.length) return;
  await ensureSheetWithHeaders(SHEETS.students, STUDENT_HEADERS);
  const existing = await readSheet(SHEETS.students);
  const missing = required.filter((u) => !existing.some((e) => e.Email === u.Email));
  if (missing.length) {
    await appendRows(SHEETS.students, STUDENT_HEADERS, missing);
  }
}

async function seedIfEmpty(sheet: string, headers: string[], rows: Record<string, string>[]) {
  const existing = await readSheet(sheet);
  if (existing.length === 0) {
    await appendRows(sheet, headers, rows);
    return rows;
  }
  return existing;
}

export async function ensureDemoData() {
  await ensureSheetWithHeaders(SHEETS.courses, COURSE_HEADERS);
  await ensureSheetWithHeaders(SHEETS.lessons, LESSON_HEADERS);
  await ensureSheetWithHeaders(SHEETS.students, STUDENT_HEADERS);
  await ensureSheetWithHeaders(SHEETS.enrollments, ENROLLMENT_HEADERS);
  await ensureSheetWithHeaders(SHEETS.assignments, ASSIGNMENT_HEADERS);
  await ensureSheetWithHeaders(SHEETS.submissions, SUBMISSION_HEADERS);
  await ensureSheetWithHeaders(SHEETS.notifications, NOTIFICATION_HEADERS);

  if (BELAL_ADMIN) {
    await ensureSpecificStudents([BELAL_ADMIN]);
  }

  await seedIfEmpty(SHEETS.courses, COURSE_HEADERS, sampleCourses);
  await seedIfEmpty(SHEETS.lessons, LESSON_HEADERS, sampleLessons);
  await seedIfEmpty(SHEETS.students, STUDENT_HEADERS, sampleStudents);
  await seedIfEmpty(SHEETS.enrollments, ENROLLMENT_HEADERS, sampleEnrollments);
  await seedIfEmpty(SHEETS.assignments, ASSIGNMENT_HEADERS, sampleAssignments);
  await seedIfEmpty(SHEETS.submissions, SUBMISSION_HEADERS, sampleSubmissions);
  await seedIfEmpty(SHEETS.notifications, NOTIFICATION_HEADERS, sampleNotifications);
}

export async function getCourses() {
  await ensureDemoData();
  const rows = await readSheet(SHEETS.courses);
  return rows.filter((c) => `${c.IsPublished}` === 'true');
}

export async function getCourse(courseId: string) {
  await ensureDemoData();
  const rows = await readSheet(SHEETS.courses);
  return rows.find((c) => c.ID === courseId);
}

export async function getLessonsByCourse(courseId: string) {
  await ensureDemoData();
  const rows = await readSheet(SHEETS.lessons);
  return rows.filter((l) => l.CourseID === courseId).sort((a, b) => Number(a.Order) - Number(b.Order));
}

export async function getLesson(lessonId: string) {
  await ensureDemoData();
  const lessons = await readSheet(SHEETS.lessons);
  return lessons.find((l) => l.ID === lessonId);
}

export async function getEnrollment(studentId: string, courseId: string) {
  await ensureDemoData();
  const enrollments = await readSheet(SHEETS.enrollments);
  return enrollments.find((e) => e.StudentID === studentId && e.CourseID === courseId);
}

export async function getAssignments(studentId: string) {
  await ensureDemoData();
  const assignments = await readSheet(SHEETS.assignments);
  const submissions = await readSheet(SHEETS.submissions);
  const enrollments = await readSheet(SHEETS.enrollments);
  const enrolledCourseIds = enrollments.filter((e) => e.StudentID === studentId).map((e) => e.CourseID);

  return assignments
    .filter((a) => enrolledCourseIds.includes(a.CourseID))
    .map((a) => ({
      ...a,
      submission: submissions.find((s) => s.AssignmentID === a.ID && s.StudentID === studentId),
    }));
}

export async function getNotifications(studentId: string) {
  await ensureDemoData();
  const notifications = await readSheet(SHEETS.notifications);
  return notifications.filter((n) => n.StudentID === studentId);
}

export async function getDashboard(studentId: string) {
  await ensureDemoData();
  const students = await readSheet(SHEETS.students);
  const courses = await readSheet(SHEETS.courses);
  const lessons = await readSheet(SHEETS.lessons);
  const enrollments = await readSheet(SHEETS.enrollments);
  const notifications = await getNotifications(studentId);
  const assignments = await getAssignments(studentId);

  const student = students.find((s) => s.ID === studentId);
  const enrollment = enrollments.find((e) => e.StudentID === studentId);
  const course = courses.find((c) => c.ID === enrollment?.CourseID);
  const continueLesson = lessons.find((l) => l.ID === enrollment?.LastLessonID) || lessons[0];

  const completedLessons = Math.round(Number(enrollment?.ProgressPercent || '0') / 100 * (Number(course?.LessonsCount || '0') || 1));

  return {
    student,
    stats: {
      completedLessons,
      progressPercent: Number(enrollment?.ProgressPercent || '0'),
      bestScore: 92,
      streakDays: 12,
    },
    continueLesson: continueLesson
      ? {
          lesson: continueLesson,
          course,
          progressPercent: Number(enrollment?.ProgressPercent || '0'),
        }
      : null,
    assignments,
    notifications,
  };
}

export async function listStudents() {
  await ensureDemoData();
  return readSheet(SHEETS.students);
}

export async function addStudent(input: {
  name: string;
  email: string;
  phone: string;
  passwordHash?: string;
  grade?: string;
  city?: string;
  status?: string;
  role?: string;
}) {
  await ensureDemoData();

  const student = {
    ID: `stu_${Date.now()}`,
    Name: input.name,
    Email: input.email,
    Phone: input.phone,
    Password: input.passwordHash || SAMPLE_HASHED_PASSWORD,
    Grade: input.grade || '',
    City: input.city || '',
    CreatedAt: new Date().toISOString(),
    Status: input.status || 'active',
    Role: input.role || 'student',
  };

  await createRow(SHEETS.students, student);
  return student;
}

export async function updateStudent(id: string, updates: Partial<Record<typeof STUDENT_HEADERS[number], string>>) {
  await ensureDemoData();
  const existing = await readSheet(SHEETS.students);
  const current = existing.find((s) => s.ID === id);
  if (!current) return null;

  const merged = { ...current, ...updates, ID: id };
  await updateRowById(SHEETS.students, id, merged);
  return merged;
}

export async function removeStudent(id: string) {
  await ensureDemoData();
  return deleteRowById(SHEETS.students, id);
}

export async function listCoursesAdmin() {
  await ensureDemoData();
  return readSheet(SHEETS.courses);
}

export async function createCourse(input: {
  title: string;
  description?: string;
  grade: string;
  price: string;
  thumbnail?: string;
  isPublished?: boolean;
}) {
  await ensureDemoData();
  const course = {
    ID: `course_${Date.now()}`,
    Title: input.title,
    Description: input.description || '',
    Grade: input.grade,
    Price: input.price,
    Thumbnail: input.thumbnail || '',
    IsPublished: input.isPublished ? 'true' : 'false',
    LessonsCount: '0',
    DurationMins: '0',
  };
  await createRow(SHEETS.courses, course);
  return course;
}

export async function getAdminDashboardData() {
  await ensureDemoData();
  const [students, courses, enrollments] = await Promise.all([
    readSheet(SHEETS.students),
    readSheet(SHEETS.courses),
    readSheet(SHEETS.enrollments),
  ]);

  const totalStudents = students.length;
  const totalCourses = courses.length;
  const activeEnrollments = enrollments.filter((e) => e.Status === 'active');

  const recentEnrollments = activeEnrollments.slice(-5).reverse().map((e) => ({
    enrollment: e,
    student: students.find((s) => s.ID === e.StudentID),
    course: courses.find((c) => c.ID === e.CourseID),
  }));

  return {
    stats: {
      totalStudents,
      totalCourses,
      activeSubscriptions: activeEnrollments.length,
    },
    recentEnrollments,
  };
}
