// Generates the downloadable .xlsx templates into public/templates/.
// Run with: node scripts/build-templates.mjs  (or `npm run build:templates`)
//
// Uses ExcelJS so the files ship with BOTH live formulas (auto-totaling) and
// styling (brand-green headers, currency formats, bordered totals). Editing a
// template? Change it here and re-run — never hand-edit the binary .xlsx.

import ExcelJS from "exceljs";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "templates");

// Brand palette (ARGB for ExcelJS).
const FOREST = "FF0C4A39";
const FOREST_LIGHT = "FFE2ECE8";
const CREAM = "FFFBF8F1";
const STONE = "FF44514A";
const USD = '"$"#,##0';

const FOOTER_NOTE =
  "Free template from Empower (empowerproject.org) — no sign-up, ever. The blue cells with formulas total themselves; just fill in your numbers.";

/** Title bar across the top of a sheet. */
function titleBlock(ws, title, lastCol) {
  ws.mergeCells(`A1:${lastCol}1`);
  const t = ws.getCell("A1");
  t.value = title;
  t.font = { bold: true, size: 16, color: { argb: CREAM } };
  t.alignment = { vertical: "middle", indent: 1 };
  t.fill = { type: "pattern", pattern: "solid", fgColor: { argb: FOREST } };
  ws.getRow(1).height = 30;

  ws.mergeCells(`A2:${lastCol}2`);
  const s = ws.getCell("A2");
  s.value =
    "Fill in your numbers — the totals update on their own. A free Empower template.";
  s.font = { italic: true, size: 10, color: { argb: STONE } };
  s.alignment = { indent: 1 };
}

/** Bold, filled column-header row. */
function headerRow(ws, rowIdx, labels) {
  const row = ws.getRow(rowIdx);
  labels.forEach((label, i) => {
    const cell = row.getCell(i + 1);
    cell.value = label;
    cell.font = { bold: true, color: { argb: FOREST } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: FOREST_LIGHT } };
    cell.border = { bottom: { style: "thin", color: { argb: FOREST } } };
  });
}

/** A bold "TOTAL" / summary row with a top border. */
function totalRowStyle(ws, rowIdx, fromCol, toCol) {
  for (let c = fromCol; c <= toCol; c++) {
    const cell = ws.getRow(rowIdx).getCell(c);
    cell.font = { bold: true };
    cell.border = { top: { style: "thin", color: { argb: STONE } } };
  }
}

function footer(ws, rowIdx, lastCol) {
  ws.mergeCells(`A${rowIdx}:${lastCol}${rowIdx}`);
  const f = ws.getCell(`A${rowIdx}`);
  f.value = FOOTER_NOTE;
  f.font = { italic: true, size: 9, color: { argb: STONE } };
  f.alignment = { wrapText: true, vertical: "top" };
  ws.getRow(rowIdx).height = 28;
}

// ---------------------------------------------------------------------------
// 1) Monthly Budget
// ---------------------------------------------------------------------------
function buildBudget(wb) {
  const ws = wb.addWorksheet("Monthly Budget", {
    views: [{ showGridLines: false }],
  });
  ws.columns = [
    { width: 30 },
    { width: 15 },
    { width: 15 },
  ];
  titleBlock(ws, "Empower — Monthly Budget", "C");
  headerRow(ws, 4, ["Category", "Planned", "Actual"]);

  ws.getCell("A5").value = "INCOME";
  ws.getCell("A5").font = { bold: true, color: { argb: STONE } };
  const incomeRows = ["Take-home pay", "Other income (side gigs, support)"];
  incomeRows.forEach((label, i) => (ws.getCell(`A${6 + i}`).value = label));
  ws.getCell("A8").value = "Total income";
  ws.getCell("B8").value = { formula: "SUM(B6:B7)", result: 0 };
  ws.getCell("C8").value = { formula: "SUM(C6:C7)", result: 0 };
  totalRowStyle(ws, 8, 1, 3);

  ws.getCell("A10").value = "EXPENSES";
  ws.getCell("A10").font = { bold: true, color: { argb: STONE } };
  const expenses = [
    "Rent / housing",
    "Utilities",
    "Groceries",
    "Transportation",
    "Phone / internet",
    "Insurance",
    "Debt payments",
    "Subscriptions",
    "Personal / fun",
    "Savings",
    "Other",
  ];
  expenses.forEach((label, i) => (ws.getCell(`A${11 + i}`).value = label));
  const expEnd = 11 + expenses.length - 1; // 21
  const totalExpRow = expEnd + 1; // 22
  ws.getCell(`A${totalExpRow}`).value = "Total expenses";
  ws.getCell(`B${totalExpRow}`).value = { formula: `SUM(B11:B${expEnd})`, result: 0 };
  ws.getCell(`C${totalExpRow}`).value = { formula: `SUM(C11:C${expEnd})`, result: 0 };
  totalRowStyle(ws, totalExpRow, 1, 3);

  const leftRow = totalExpRow + 2; // 24
  ws.getCell(`A${leftRow}`).value = "Left over (income − expenses)";
  ws.getCell(`B${leftRow}`).value = { formula: `B8-B${totalExpRow}`, result: 0 };
  ws.getCell(`C${leftRow}`).value = { formula: `C8-C${totalExpRow}`, result: 0 };
  for (let c = 1; c <= 3; c++) {
    const cell = ws.getRow(leftRow).getCell(c);
    cell.font = { bold: true, color: { argb: FOREST } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: FOREST_LIGHT } };
  }

  // Currency format on all numeric cells.
  for (let r = 6; r <= leftRow; r++) {
    ws.getCell(`B${r}`).numFmt = USD;
    ws.getCell(`C${r}`).numFmt = USD;
  }
  footer(ws, leftRow + 2, "C");
}

// ---------------------------------------------------------------------------
// 2) Debt Payoff Tracker
// ---------------------------------------------------------------------------
function buildDebt(wb) {
  const ws = wb.addWorksheet("Debt Tracker", {
    views: [{ showGridLines: false }],
  });
  ws.columns = [
    { width: 26 },
    { width: 15 },
    { width: 12 },
    { width: 16 },
    { width: 30 },
  ];
  titleBlock(ws, "Empower — Debt Payoff Tracker", "E");
  headerRow(ws, 4, ["Debt", "Balance", "APR (%)", "Min. payment", "Notes / due date"]);

  const firstRow = 5;
  const lastRow = 13; // 9 debt rows
  const totalRow = lastRow + 1; // 14
  ws.getCell(`A${totalRow}`).value = "Total";
  ws.getCell(`B${totalRow}`).value = { formula: `SUM(B${firstRow}:B${lastRow})`, result: 0 };
  ws.getCell(`D${totalRow}`).value = { formula: `SUM(D${firstRow}:D${lastRow})`, result: 0 };
  totalRowStyle(ws, totalRow, 1, 5);

  for (let r = firstRow; r <= totalRow; r++) {
    ws.getCell(`B${r}`).numFmt = USD;
    ws.getCell(`D${r}`).numFmt = USD;
    ws.getCell(`C${r}`).numFmt = '0.0"%"';
  }

  const tipRow = totalRow + 2; // 16
  ws.mergeCells(`A${tipRow}:E${tipRow}`);
  const tip = ws.getCell(`A${tipRow}`);
  tip.value =
    "Two ways to choose your order: list the smallest balance first (the snowball — fast wins keep you going), or the highest APR first (the avalanche — saves the most money). Pay minimums on everything, then throw every extra dollar at the top one.";
  tip.font = { italic: true, size: 10, color: { argb: STONE } };
  tip.alignment = { wrapText: true, vertical: "top" };
  ws.getRow(tipRow).height = 42;

  footer(ws, tipRow + 2, "E");
}

// ---------------------------------------------------------------------------
// 3) Savings Goal Worksheet
// ---------------------------------------------------------------------------
function buildSavings(wb) {
  const ws = wb.addWorksheet("Savings Goal", {
    views: [{ showGridLines: false }],
  });
  ws.columns = [
    { width: 28 },
    { width: 16 },
    { width: 14 },
    { width: 14 },
    { width: 14 },
    { width: 12 },
  ];
  titleBlock(ws, "Empower — Savings Goal Worksheet", "F");

  // Single-goal calculator block.
  ws.getCell("A4").value = "ONE GOAL AT A TIME";
  ws.getCell("A4").font = { bold: true, color: { argb: STONE } };
  const pairs = [
    ["What you're saving for", null],
    ["Goal amount", null],
    ["Already saved", null],
    ["Still to save", { formula: "IFERROR(B6-B7,0)", result: 0 }],
    ["Monthly contribution", null],
    ["Months to reach it", { formula: 'IFERROR(ROUNDUP((B6-B7)/B9,0),"")', result: "" }],
  ];
  pairs.forEach(([label, val], i) => {
    const r = 5 + i;
    ws.getCell(`A${r}`).value = label;
    if (val !== null) ws.getCell(`B${r}`).value = val;
  });
  // Currency formats (rows: goal amount 6, saved 7, still 8, monthly 9).
  ["B6", "B7", "B8", "B9"].forEach((c) => (ws.getCell(c).numFmt = USD));
  ws.getCell("A10").font = { bold: true };
  ws.getCell("B10").font = { bold: true, color: { argb: FOREST } };

  // Multi-goal table.
  ws.getCell("A12").value = "SEVERAL GOALS";
  ws.getCell("A12").font = { bold: true, color: { argb: STONE } };
  headerRow(ws, 13, ["Goal", "Target", "Saved", "Remaining", "Monthly", "Months"]);
  const first = 14;
  const last = 19;
  for (let r = first; r <= last; r++) {
    ws.getCell(`D${r}`).value = { formula: `IFERROR(B${r}-C${r},"")`, result: "" };
    ws.getCell(`F${r}`).value = { formula: `IFERROR(ROUNDUP((B${r}-C${r})/E${r},0),"")`, result: "" };
    ["B", "C", "D", "E"].forEach((col) => (ws.getCell(`${col}${r}`).numFmt = USD));
  }

  footer(ws, last + 2, "F");
}

// ---------------------------------------------------------------------------

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const files = [
    ["empower-budget-template.xlsx", buildBudget],
    ["empower-debt-payoff-tracker.xlsx", buildDebt],
    ["empower-savings-goal-worksheet.xlsx", buildSavings],
  ];
  for (const [name, build] of files) {
    const wb = new ExcelJS.Workbook();
    wb.creator = "Empower — Economic Mobility Project";
    wb.created = new Date(0); // deterministic (avoids noisy diffs on rebuild)
    build(wb);
    await wb.xlsx.writeFile(join(OUT_DIR, name));
    console.log("wrote", name);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
