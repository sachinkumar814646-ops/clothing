const DEFAULT_SHEET_ID = "1AfLdIfU_tdibY4FTHLM_zwMzP5pQcqDTTSKnCSQPumg";
const DEFAULT_GID = "0";

function parseCsvLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  result.push(current);
  return result.map((v) => v.trim());
}

function parseCsv(text) {
  const lines = text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter((line) => line.trim().length > 0);

  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i += 1) {
    const cols = parseCsvLine(lines[i]);
    const row = {};
    headers.forEach((header, idx) => {
      row[header] = cols[idx] ?? "";
    });
    rows.push(row);
  }

  return rows;
}

function getCsvUrl(sheetId, gid) {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid}`;
}

export async function fetchSheetRows({
  sheetId = process.env.REACT_APP_GOOGLE_SHEET_ID || DEFAULT_SHEET_ID,
  gid = process.env.REACT_APP_GOOGLE_SHEET_GID || DEFAULT_GID,
  signal,
} = {}) {
  const res = await fetch(getCsvUrl(sheetId, gid), {
    method: "GET",
    cache: "no-store",
    signal,
  });

  if (!res.ok) {
    throw new Error(`Sheet request failed: ${res.status}`);
  }

  const text = await res.text();
  return parseCsv(text);
}

