import { getSheetsClient } from './auth';

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;

type RowObject = Record<string, string>;

async function ensureSheetExists(sheetName: string) {
  const sheets = await getSheetsClient();
  if (!sheets || !SPREADSHEET_ID) return false;

  const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
  const hasSheet = meta.data.sheets?.some((s) => s.properties?.title === sheetName);

  if (!hasSheet) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{ addSheet: { properties: { title: sheetName } } }],
      },
    });
  }

  return true;
}

export async function ensureSheetWithHeaders(sheetName: string, headers: string[]) {
  const sheets = await getSheetsClient();
  if (!sheets || !SPREADSHEET_ID) return false;

  await ensureSheetExists(sheetName);

  const headerRange = `${sheetName}!1:1`;
  const current = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: headerRange,
  });

  const currentHeaders = (current.data.values && current.data.values[0]) || [];
  const needsUpdate =
    currentHeaders.length !== headers.length ||
    currentHeaders.some((h, idx) => h !== headers[idx]);

  if (!currentHeaders.length || needsUpdate) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: headerRange,
      valueInputOption: 'RAW',
      requestBody: { values: [headers] },
    });
  }

  return true;
}

export async function readSheet(sheetName: string): Promise<RowObject[]> {
  const sheets = await getSheetsClient();
  if (!sheets || !SPREADSHEET_ID) return [];

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:Z`,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) return [];

    const headers = rows[0];
    return rows.slice(1).map((row) => {
      const obj: RowObject = {};
      headers.forEach((header: string, index: number) => {
        obj[header] = row[index] || '';
      });
      return obj;
    });
  } catch (error) {
    console.error(`Error reading sheet ${sheetName}:`, error);
    return [];
  }
}

export async function findByField(sheetName: string, field: string, value: string) {
  const data = await readSheet(sheetName);
  return data.filter((row) => row[field] === value);
}

export async function findById(sheetName: string, id: string) {
  const data = await readSheet(sheetName);
  return data.find((row) => row['ID'] === id);
}

async function getRawValues(sheetName: string) {
  const sheets = await getSheetsClient();
  if (!sheets || !SPREADSHEET_ID) return { headers: [], values: [] as string[][] };

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A:Z`,
  });

  const values = response.data.values || [];
  const headers = values[0] || [];
  return { headers, values: values.slice(1) };
}

export async function updateRowById(sheetName: string, id: string, data: Record<string, string>) {
  const sheets = await getSheetsClient();
  if (!sheets || !SPREADSHEET_ID) return false;

  const { headers, values } = await getRawValues(sheetName);
  if (!headers.length) return false;

  const idCol = headers.indexOf('ID');
  if (idCol === -1) return false;

  const rowIndex = values.findIndex((row) => row[idCol] === id);
  if (rowIndex === -1) return false;

  const targetRowNumber = rowIndex + 2; // +1 to skip header, +1 because Sheets rows are 1-based
  const rowData = headers.map((header) => data[header] ?? values[rowIndex][headers.indexOf(header)] ?? '');

  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A${targetRowNumber}:Z${targetRowNumber}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [rowData] },
  });

  return true;
}

export async function deleteRowById(sheetName: string, id: string) {
  const sheets = await getSheetsClient();
  if (!sheets || !SPREADSHEET_ID) return false;

  const { headers, values } = await getRawValues(sheetName);
  if (!headers.length) return false;

  const idCol = headers.indexOf('ID');
  if (idCol === -1) return false;

  const rowIndex = values.findIndex((row) => row[idCol] === id);
  if (rowIndex === -1) return false;

  // +1 to account for header row in zero-based index
  const startIndex = rowIndex + 1;

  const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
  const sheetId = meta.data.sheets?.find((s) => s.properties?.title === sheetName)?.properties?.sheetId;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: sheetId ?? 0,
              dimension: 'ROWS',
              startIndex,
              endIndex: startIndex + 1,
            },
          },
        },
      ],
    },
  });

  return true;
}

export async function createRow(sheetName: string, data: Record<string, string>) {
  const sheets = await getSheetsClient();
  if (!sheets || !SPREADSHEET_ID) return null;

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!1:1`,
    });
    
    const headers = response.data.values?.[0] || [];
    const rowData = headers.map((header: string) => data[header] || '');

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:Z`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    });
    return data;
  } catch (error) {
    console.error(`Error creating row in ${sheetName}:`, error);
    return null;
  }
}

export async function appendRows(sheetName: string, headers: string[], rows: RowObject[]) {
  const sheets = await getSheetsClient();
  if (!sheets || !SPREADSHEET_ID) return null;

  try {
    await ensureSheetWithHeaders(sheetName, headers);
    const values = rows.map((row) => headers.map((header) => row[header] ?? ''));

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:Z`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    return rows;
  } catch (error) {
    console.error(`Error appending rows to ${sheetName}:`, error);
    return null;
  }
}
