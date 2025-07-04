const isFieldQuoted = (field: string) => {
  return field.startsWith('"') && field.endsWith('"') && field.length >= 2;
};

const sanitizeField = (field: string) => {
  if (isFieldQuoted(field)) {
    return field; // Already quoted, skip
  }
  return `"${field}"`; // Quote unquoted field
};

export const sanitizeCSVLine = (line: string) => {
  // Simple CSV parsing - split by comma but handle quoted fields
  const fields: string[] = [];
  let currentField = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
      currentField += char;
    } else if (char === "," && !inQuotes) {
      fields.push(currentField.trim());
      currentField = "";
    } else {
      currentField += char;
    }
  }

  // Add the last field
  if (currentField || fields.length > 0) {
    fields.push(currentField.trim());
  }

  // Sanitize each field
  const sanitizedFields = fields.map(sanitizeField);
  return sanitizedFields.join(",");
};

export const sanitizeCSVContent = (content: string) => {
  const lines = content.split("\n");
  const sanitizedLines = lines.map((line) => {
    if (line.trim() === "") return line; // Preserve empty lines
    return sanitizeCSVLine(line);
  });

  return sanitizedLines.join("\n");
};
