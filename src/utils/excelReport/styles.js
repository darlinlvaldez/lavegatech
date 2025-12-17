const styles = {}

styles.styleTitleCell = function (cell) {
  cell.font = {
    name: 'Calibri',
    size: 14,
    bold: true,
    color: { argb: 'FF1F2937' },
  };
  cell.alignment = { vertical: 'middle', horizontal: 'center' };
}

styles.styleHeaderRow = function (row) {
  row.height = 22;
  row.eachCell(cell => {
    cell.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
      color: { argb: 'FFFFFFFF' },
    };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1F2937' },
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  });
}

styles.styleDataRow = function (row, isEven) {
  row.eachCell(cell => {
    cell.font = {
      name: 'Calibri',
      size: 11,
      color: { argb: 'FF111827' },
    };
    cell.alignment = { vertical: 'middle', horizontal: 'left' };
    cell.border = { bottom: { style: 'hair' } };
  });

  if (isEven) {
    row.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF9FAFB' },
      };
    });
  }
}

styles.styleTotalRow = function (row) {
  row.eachCell(cell => {
    cell.font = { bold: true };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE5E7EB' },
    };
  });
}

export default styles;