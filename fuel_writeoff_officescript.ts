/**
 * Office Script для Excel Online.
 * Формирует лист "Списание ГСМ" на основе исходных данных с обязательным указанием водителя и машины.
 */
function main(workbook: ExcelScript.Workbook) {
  const SOURCE_SHEET = "Данные";
  const RESULT_SHEET = "Списание ГСМ";

  const source = workbook.getWorksheet(SOURCE_SHEET);
  if (!source) {
    throw new Error(`Лист "${SOURCE_SHEET}" не найден. Создайте лист с колонками: Дата, Водитель, Машина, Пробег, Норма(л/100км), Выдано(л).`);
  }

  const used = source.getUsedRange();
  if (!used) {
    throw new Error(`Лист "${SOURCE_SHEET}" пуст.`);
  }

  const values = used.getValues();
  if (values.length < 2) {
    throw new Error("Недостаточно данных: нужна строка заголовков и хотя бы одна строка данных.");
  }

  const headers = values[0].map(v => String(v).trim().toLowerCase());

  const colDate = findHeader(headers, ["дата"]);
  const colDriver = findHeader(headers, ["водитель", "фио водителя"]);
  const colCar = findHeader(headers, ["машина", "авто", "автомобиль", "госномер", "тс"]);
  const colMileage = findHeader(headers, ["пробег", "км"]);
  const colNorm = findHeader(headers, ["норма(л/100км)", "норма", "норма л/100км", "расход на 100"]);
  const colIssued = findHeader(headers, ["выдано(л)", "выдано", "заправлено", "факт(л)", "факт"]);

  const required = [colDate, colDriver, colCar, colMileage, colNorm, colIssued];
  if (required.some(i => i === -1)) {
    throw new Error(
      "Не найдены обязательные колонки. Нужны: Дата, Водитель, Машина, Пробег, Норма(л/100км), Выдано(л)."
    );
  }

  const output: (string | number)[][] = [[
    "Дата",
    "Водитель",
    "Машина",
    "Пробег, км",
    "Норма, л/100км",
    "Нормативный расход, л",
    "Выдано, л",
    "К списанию, л",
    "Перерасход(+)/Экономия(-), л"
  ]];

  for (let r = 1; r < values.length; r++) {
    const row = values[r];

    const date = row[colDate];
    const driver = String(row[colDriver] ?? "").trim();
    const car = String(row[colCar] ?? "").trim();
    const mileage = toNumber(row[colMileage]);
    const normPer100 = toNumber(row[colNorm]);
    const issued = toNumber(row[colIssued]);

    if (!driver || !car) {
      continue;
    }

    const normLiters = round2((mileage * normPer100) / 100);
    const writeOff = round2(Math.min(issued, normLiters));
    const delta = round2(issued - normLiters);

    output.push([
      asDateString(date),
      driver,
      car,
      mileage,
      normPer100,
      normLiters,
      issued,
      writeOff,
      delta
    ]);
  }

  let result = workbook.getWorksheet(RESULT_SHEET);
  if (!result) {
    result = workbook.addWorksheet(RESULT_SHEET);
  }

  const old = result.getUsedRange();
  if (old) old.clear(ExcelScript.ClearApplyTo.all);

  const target = result.getRangeByIndexes(0, 0, output.length, output[0].length);
  target.setValues(output);

  // Форматирование
  const headerRange = result.getRangeByIndexes(0, 0, 1, output[0].length);
  headerRange.getFormat().getFont().setBold(true);

  result.getUsedRange()?.getFormat().autofitColumns();
  result.getUsedRange()?.getFormat().autofitRows();
}

function findHeader(headers: string[], variants: string[]): number {
  for (const v of variants) {
    const idx = headers.indexOf(v.toLowerCase());
    if (idx !== -1) return idx;
  }
  return -1;
}

function toNumber(value: string | number | boolean): number {
  if (typeof value === "number") return value;
  if (typeof value === "boolean") return value ? 1 : 0;
  const normalized = String(value).replace(/\s/g, "").replace(",", ".");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function asDateString(value: string | number | boolean): string {
  if (typeof value === "number") {
    // Excel serial date -> JS date (упрощенно)
    const epoch = new Date(Date.UTC(1899, 11, 30));
    const dt = new Date(epoch.getTime() + value * 86400000);
    return dt.toISOString().slice(0, 10);
  }
  return String(value);
}
