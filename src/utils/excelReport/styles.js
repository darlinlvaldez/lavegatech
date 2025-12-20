const styles = {};

styles.styleTitleCell = function (cell) {
  cell.font = {
    name: 'Segoe UI',
    size: 16,
    bold: true,
    color: { argb: 'FFFFFFFF' },
  };
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF2D3748' },
  };
  cell.alignment = { 
    vertical: 'middle', 
    horizontal: 'center',
    wrapText: true 
  };
  cell.border = {
    top: { style: 'medium', color: { argb: 'FF1A202C' } },
    bottom: { style: 'medium', color: { argb: 'FF1A202C' } },
    left: { style: 'medium', color: { argb: 'FF1A202C' } },
    right: { style: 'medium', color: { argb: 'FF1A202C' } },
  };
};

styles.styleSubtitleCell = function (cell) {
  cell.font = {
    name: 'Segoe UI',
    size: 10,
    italic: true,
    color: { argb: 'FF4A5568' },
  };
  cell.alignment = { 
    vertical: 'middle', 
    horizontal: 'center' 
  };
};

styles.styleHeaderRow = function (row) {
  row.height = 25;
  row.eachCell((cell) => {
    cell.font = {
      name: 'Segoe UI',
      size: 11,
      bold: true,
      color: { argb: 'FFFFFFFF' },
    };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4C51BF' },
    };
    cell.alignment = { 
      vertical: 'middle', 
      horizontal: 'center' 
    };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FF2D3748' } },
      left: { style: 'thin', color: { argb: 'FF2D3748' } },
      bottom: { style: 'thin', color: { argb: 'FF2D3748' } },
      right: { style: 'thin', color: { argb: 'FF2D3748' } },
    };
  });
};

styles.styleDataRow = function (row, index) {
  const isEven = index % 2 === 0;
  
  row.eachCell((cell, colNumber) => {
    cell.font = {
      name: 'Segoe UI',
      size: 10,
      color: { argb: 'FF1A202C' },
    };
    
    cell.alignment = { 
      vertical: 'middle', 
      horizontal: colNumber === 1 ? 'left' : 'right'
    };
    
    cell.border = {
      bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      right: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      left: colNumber === 1 ? { style: 'thin', color: { argb: 'FFE2E8F0' } } : {}
    };

    if (colNumber === 4 && cell.value < 0) {
      cell.font.color = { argb: 'FFE53E3E' };
    } else if (colNumber === 4 && cell.value > 0) {
      cell.font.color = { argb: 'FF38A169' };
    }

    if (isEven) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF7FAFC' },
      };
    } else {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFFFF' },
      };
    }
  });
};

styles.styleTotalRow = function (row) {
  row.eachCell((cell, colNumber) => {
    cell.font = {
      name: 'Segoe UI',
      size: 11,
      bold: true,
      color: { argb: 'FF1A202C' },
    };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFEDF2F7' },
    };
    cell.border = {
      top: { style: 'double', color: { argb: 'FF4C51BF' } },
      bottom: { style: 'thin', color: { argb: 'FF2D3748' } },
      left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      right: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    };
    cell.alignment = { 
      vertical: 'middle', 
      horizontal: colNumber === 1 ? 'left' : 'right' 
    };
  });
};

styles.styleSummaryTitle = function (cell) {
  cell.font = {
    name: 'Segoe UI',
    size: 12,
    bold: true,
    color: { argb: 'FFFFFFFF' },
  };
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF38A169' },
  };
  cell.alignment = { 
    vertical: 'middle', 
    horizontal: 'center' 
  };
  cell.border = {
    top: { style: 'medium', color: { argb: 'FF2D3748' } },
    bottom: { style: 'medium', color: { argb: 'FF2D3748' } },
    left: { style: 'medium', color: { argb: 'FF2D3748' } },
    right: { style: 'medium', color: { argb: 'FF2D3748' } },
  };
};

styles.styleSummaryRow = function (row, index) {
  const isEven = index % 2 === 0;
  
  row.eachCell((cell, colNumber) => {
    cell.font = {
      name: 'Segoe UI',
      size: 10,
      color: { argb: 'FF1A202C' },
    };
    
    if (colNumber === 1) {
      cell.font.bold = true;
      cell.alignment = { vertical: 'middle', horizontal: 'left' };
    } else {
      cell.alignment = { vertical: 'middle', horizontal: 'right' };
    }
    
    if (isEven) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF0FFF4' },
      };
    } else {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE6FFFA' },
      };
    }
    
    cell.border = {
      bottom: { style: 'hair', color: { argb: 'FFE2E8F0' } },
    };
  });
};

styles.styleExecutiveSummaryRow = function (row, index) {
  const isEven = index % 2 === 0;

  row.eachCell((cell, colNumber) => {
    cell.font = {
      name: 'Segoe UI',
      size: 10,
      bold: colNumber === 2,
      color: { argb: 'FF1A202C' }, 
    };

    cell.alignment = {
      vertical: 'middle',
      horizontal: colNumber === 2 ? 'left' : 'right',
      wrapText: true
    };

    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: isEven ? 'FFF7FAFC' : 'FFFFFFFF' } 
    };

    cell.border = {
      bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } }
    };

    if (colNumber === 3 && typeof cell.value === 'string' && cell.value.startsWith('$')) {
      cell.numFmt = '"$"#,##0.00';
    }
  });
};

export default styles;