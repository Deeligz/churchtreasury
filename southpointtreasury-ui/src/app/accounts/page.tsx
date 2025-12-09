"use client";

import { useState, useMemo } from "react";
import { Layout } from "@/components";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx-js-style";

interface Account {
  id: number;
  name: string;
  type: string;
  balance: number;
  lastTransaction: string;
  status: string;
  description: string;
}

interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  debit: number;
  credit: number;
  balance: number;
}

// Sample transaction data
const generateTransactions = (accountId: number): Transaction[] => {
  const transactions: Transaction[] = [
    { id: 1, date: "2025-12-08", description: "Sunday Service Offering", category: "Income", debit: 0, credit: 1250.00, balance: 15420.50 },
    { id: 2, date: "2025-12-07", description: "Office Supplies", category: "Expense", debit: 150.00, credit: 0, balance: 14170.50 },
    { id: 3, date: "2025-12-06", description: "Utilities Payment", category: "Expense", debit: 320.50, credit: 0, balance: 14320.50 },
    { id: 4, date: "2025-12-05", description: "Member Donation", category: "Income", debit: 0, credit: 500.00, balance: 14641.00 },
    { id: 5, date: "2025-12-04", description: "Cleaning Services", category: "Expense", debit: 200.00, credit: 0, balance: 14141.00 },
    { id: 6, date: "2025-12-03", description: "Music Ministry", category: "Expense", debit: 180.00, credit: 0, balance: 14341.00 },
    { id: 7, date: "2025-12-02", description: "Special Offering", category: "Income", debit: 0, credit: 800.00, balance: 14521.00 },
    { id: 8, date: "2025-12-01", description: "Sunday Service Offering", category: "Income", debit: 0, credit: 1100.00, balance: 13721.00 },
    { id: 9, date: "2025-11-30", description: "Internet Service", category: "Expense", debit: 89.99, credit: 0, balance: 12621.00 },
    { id: 10, date: "2025-11-29", description: "Building Maintenance", category: "Expense", debit: 450.00, credit: 0, balance: 12710.99 },
    { id: 11, date: "2025-11-28", description: "Member Tithe", category: "Income", debit: 0, credit: 650.00, balance: 13160.99 },
    { id: 12, date: "2025-11-27", description: "Security System", category: "Expense", debit: 125.00, credit: 0, balance: 12510.99 },
    { id: 13, date: "2025-11-26", description: "Landscaping", category: "Expense", debit: 275.00, credit: 0, balance: 12635.99 },
    { id: 14, date: "2025-11-25", description: "Special Collection", category: "Income", debit: 0, credit: 950.00, balance: 12910.99 },
    { id: 15, date: "2025-11-24", description: "Sunday Service Offering", category: "Income", debit: 0, credit: 1200.00, balance: 11960.99 },
    { id: 16, date: "2025-11-23", description: "Phone Service", category: "Expense", debit: 95.00, credit: 0, balance: 10760.99 },
    { id: 17, date: "2025-11-22", description: "Printer Supplies", category: "Expense", debit: 120.00, credit: 0, balance: 10855.99 },
    { id: 18, date: "2025-11-21", description: "Guest Speaker Honorarium", category: "Expense", debit: 300.00, credit: 0, balance: 10975.99 },
    { id: 19, date: "2025-11-20", description: "Member Donation", category: "Income", debit: 0, credit: 425.00, balance: 11275.99 },
    { id: 20, date: "2025-11-19", description: "Water Bill", category: "Expense", debit: 145.00, credit: 0, balance: 10850.99 },
  ];
  return transactions;
};

export default function AccountsPage() {
  const [accounts] = useState<Account[]>([
    { id: 1, name: "Church Budget", type: "Operating", balance: 15420.50, lastTransaction: "12/07/2025", status: "Active", description: "General operating expenses" },
    { id: 2, name: "Building Fund", type: "Capital", balance: 22000.00, lastTransaction: "12/05/2025", status: "Active", description: "Church building improvements" },
    { id: 3, name: "Tithe Account", type: "Revenue", balance: 12500.00, lastTransaction: "12/08/2025", status: "Active", description: "Member tithe contributions" },
    { id: 4, name: "Youth Ministry", type: "Program", balance: 3200.00, lastTransaction: "12/06/2025", status: "Active", description: "Youth programs and activities" },
    { id: 5, name: "Outreach Fund", type: "Program", balance: 5100.00, lastTransaction: "12/04/2025", status: "Active", description: "Community outreach programs" },
    { id: 6, name: "Maintenance Account", type: "Operating", balance: 8750.00, lastTransaction: "12/03/2025", status: "Active", description: "Facility maintenance" },
  ]);

  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  const transactions = selectedAccount ? generateTransactions(selectedAccount.id) : [];

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = searchTerm === "" ||
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDateFrom = dateFrom === "" || transaction.date >= dateFrom;
      const matchesDateTo = dateTo === "" || transaction.date <= dateTo;

      return matchesSearch && matchesDateFrom && matchesDateTo;
    }).slice(0, entriesPerPage);
  }, [transactions, searchTerm, dateFrom, dateTo, entriesPerPage]);

  // Generate PDF Report
  const generatePDF = () => {
    if (!selectedAccount) return;

    const doc = new jsPDF();

    // Load logo PNG
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/logo.png";

    img.onload = () => {
      // Calculate aspect ratio to maintain original proportions
      const maxWidth = 40;
      const maxHeight = 40;
      const aspectRatio = img.naturalWidth / img.naturalHeight;

      let imgWidth = maxWidth;
      let imgHeight = maxWidth / aspectRatio;

      // If height exceeds max, adjust based on height instead
      if (imgHeight > maxHeight) {
        imgHeight = maxHeight;
        imgWidth = maxHeight * aspectRatio;
      }

      // Add logo centered at top
      const pageWidth = doc.internal.pageSize.getWidth();
      const xPos = (pageWidth - imgWidth) / 2;

      doc.addImage(img, "PNG", xPos, 10, imgWidth, imgHeight);

      // Church Header
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("Southpoint Treasury", 105, 48, { align: "center" });

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("Church Accounts Report", 105, 56, { align: "center" });

      // Account Information
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(`Account: ${selectedAccount.name}`, 14, 68);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Type: ${selectedAccount.type}`, 14, 75);
      doc.text(`Current Balance: $${selectedAccount.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 14, 81);

      // Date Range (if filtered)
      if (dateFrom || dateTo) {
        const fromText = dateFrom ? new Date(dateFrom).toLocaleDateString('en-US') : "Beginning";
        const toText = dateTo ? new Date(dateTo).toLocaleDateString('en-US') : "Present";
        doc.text(`Period: ${fromText} - ${toText}`, 14, 87);
      }

      doc.text(`Generated: ${new Date().toLocaleDateString('en-US')} ${new Date().toLocaleTimeString('en-US')}`, 14, dateFrom || dateTo ? 93 : 87);

      // Transactions Table
      const tableData = filteredTransactions.map((transaction, index) => [
        index + 1,
        new Date(transaction.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
        transaction.description,
        transaction.category,
        transaction.debit > 0 ? `$${transaction.debit.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '-',
        transaction.credit > 0 ? `$${transaction.credit.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '-',
        `$${transaction.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
      ]);

      // Calculate totals
      const totalDebit = filteredTransactions.reduce((sum, t) => sum + t.debit, 0);
      const totalCredit = filteredTransactions.reduce((sum, t) => sum + t.credit, 0);

      autoTable(doc, {
        startY: dateFrom || dateTo ? 99 : 93,
        head: [['#', 'Date', 'Description', 'Category', 'Debit', 'Credit', 'Balance']],
        body: tableData,
        foot: [['', '', '', 'TOTAL', `$${totalDebit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, `$${totalCredit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, '']],
        theme: 'grid',
        styles: {
          fontSize: 9,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [241, 243, 245],
          textColor: [73, 80, 87],
          fontStyle: 'bold',
          halign: 'center',
        },
        footStyles: {
          fillColor: [241, 243, 245],
          textColor: [33, 37, 41],
          fontStyle: 'bold',
        },
        columnStyles: {
          0: { halign: 'center', cellWidth: 10 },
          1: { halign: 'center', cellWidth: 25 },
          2: { cellWidth: 60 },
          3: { halign: 'center', cellWidth: 25 },
          4: { halign: 'right', cellWidth: 25 },
          5: { halign: 'right', cellWidth: 25 },
          6: { halign: 'right', cellWidth: 25 },
        },
        alternateRowStyles: {
          fillColor: [250, 251, 252],
        },
      });

      // Footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: "center" }
        );
      }

      // Save the PDF
      const fileName = `${selectedAccount.name.replace(/\s+/g, '_')}_Report_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
    };
  };

  // Generate Excel Report
  const generateExcel = () => {
    if (!selectedAccount) return;

    // Create workbook
    const wb = XLSX.utils.book_new();

    // Transaction Headers
    const headers = [["#", "Date", "Description", "Category", "Debit", "Credit", "Balance"]];

    // Transaction Data
    const transactionData = filteredTransactions.map((transaction, index) => [
      index + 1,
      new Date(transaction.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      transaction.description,
      transaction.category,
      transaction.debit > 0 ? transaction.debit : "",
      transaction.credit > 0 ? transaction.credit : "",
      transaction.balance
    ]);

    // Calculate totals
    const totalDebit = filteredTransactions.reduce((sum, t) => sum + t.debit, 0);
    const totalCredit = filteredTransactions.reduce((sum, t) => sum + t.credit, 0);

    // Add total row
    const totalRow = [["", "", "", "TOTAL", totalDebit, totalCredit, ""]];

    // Combine all data
    const wsData = [...headers, ...transactionData, ...totalRow];

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Set column widths
    ws['!cols'] = [
      { wch: 5 },   // #
      { wch: 12 },  // Date
      { wch: 35 },  // Description
      { wch: 12 },  // Category
      { wch: 12 },  // Debit
      { wch: 12 },  // Credit
      { wch: 15 },  // Balance
    ];

    // Style header row
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "4472C4" } },
      alignment: { horizontal: "center", vertical: "center" },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } }
      }
    };

    // Apply header styles
    const headerCells = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1'];
    headerCells.forEach(cell => {
      if (!ws[cell]) ws[cell] = { t: 's', v: '' };
      ws[cell].s = headerStyle;
    });

    // Style data rows with borders and alternating colors
    const totalRows = wsData.length;
    for (let row = 2; row <= totalRows; row++) {
      const isLastRow = row === totalRows;
      const isEvenRow = row % 2 === 0;

      ['A', 'B', 'C', 'D', 'E', 'F', 'G'].forEach((col, colIndex) => {
        const cellRef = `${col}${row}`;
        if (!ws[cellRef]) ws[cellRef] = { t: 's', v: '' };

        // Base style
        const cellStyle: any = {
          border: {
            top: { style: "thin", color: { rgb: "D0D0D0" } },
            bottom: { style: "thin", color: { rgb: "D0D0D0" } },
            left: { style: "thin", color: { rgb: "D0D0D0" } },
            right: { style: "thin", color: { rgb: "D0D0D0" } }
          },
          alignment: { vertical: "center" }
        };

        // Alternating row color
        if (!isLastRow && isEvenRow) {
          cellStyle.fill = { fgColor: { rgb: "F2F2F2" } };
        }

        // Total row styling
        if (isLastRow) {
          cellStyle.font = { bold: true };
          cellStyle.fill = { fgColor: { rgb: "E7E6E6" } };
          cellStyle.border = {
            top: { style: "medium", color: { rgb: "000000" } },
            bottom: { style: "medium", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "D0D0D0" } },
            right: { style: "thin", color: { rgb: "D0D0D0" } }
          };
        }

        // Center alignment for specific columns
        if (colIndex === 0 || colIndex === 1 || colIndex === 3) { // #, Date, Category
          cellStyle.alignment = { ...cellStyle.alignment, horizontal: "center" };
        }

        // Right alignment for currency columns
        if (colIndex === 4 || colIndex === 5 || colIndex === 6) { // Debit, Credit, Balance
          cellStyle.alignment = { ...cellStyle.alignment, horizontal: "right" };

          // Apply currency format if cell has a number
          if (ws[cellRef].v && typeof ws[cellRef].v === 'number') {
            cellStyle.numFmt = "$#,##0.00";
          }
        }

        ws[cellRef].s = cellStyle;
      });
    }

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");

    // Save file
    const fileName = `${selectedAccount.name.replace(/\s+/g, '_')}_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <Layout title="Church Accounts" searchPlaceholder="Search accounts...">
      <div className="accounts-page">
        {!selectedAccount ? (
          /* Overview - Account List */
          <div className="spreadsheet-container">
            <div className="spreadsheet-table">
              {/* Header Row */}
              <div className="spreadsheet-row header-row">
                <div className="spreadsheet-cell header-cell" style={{ width: '50px' }}>#</div>
                <div className="spreadsheet-cell header-cell" style={{ width: '200px' }}>Account Name</div>
                <div className="spreadsheet-cell header-cell" style={{ width: '120px' }}>Type</div>
                <div className="spreadsheet-cell header-cell" style={{ width: '140px' }}>Balance</div>
                <div className="spreadsheet-cell header-cell" style={{ width: '120px' }}>Last Transaction</div>
                <div className="spreadsheet-cell header-cell" style={{ width: '100px' }}>Status</div>
                <div className="spreadsheet-cell header-cell" style={{ flex: 1 }}>Description</div>
              </div>

              {/* Data Rows */}
              {accounts.map((account, index) => (
                <div
                  key={account.id}
                  className="spreadsheet-row data-row clickable-row"
                  onClick={() => setSelectedAccount(account)}
                >
                  <div className="spreadsheet-cell" style={{ width: '50px' }}>{index + 1}</div>
                  <div className="spreadsheet-cell" style={{ width: '200px', fontWeight: 500 }}>{account.name}</div>
                  <div className="spreadsheet-cell" style={{ width: '120px' }}>{account.type}</div>
                  <div className="spreadsheet-cell" style={{ width: '140px', fontWeight: 600, color: 'var(--primary-blue)' }}>
                    ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="spreadsheet-cell" style={{ width: '120px' }}>{account.lastTransaction}</div>
                  <div className="spreadsheet-cell" style={{ width: '100px' }}>
                    <span className={`status-badge ${account.status.toLowerCase()}`}>{account.status}</span>
                  </div>
                  <div className="spreadsheet-cell" style={{ flex: 1, color: 'var(--text-secondary)' }}>{account.description}</div>
                </div>
              ))}

              {/* Total Row */}
              <div className="spreadsheet-row total-row">
                <div className="spreadsheet-cell" style={{ width: '50px' }}></div>
                <div className="spreadsheet-cell" style={{ width: '200px', fontWeight: 700 }}>TOTAL</div>
                <div className="spreadsheet-cell" style={{ width: '120px' }}></div>
                <div className="spreadsheet-cell" style={{ width: '140px', fontWeight: 700, fontSize: '14px', color: '#1F2937' }}>
                  ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="spreadsheet-cell" style={{ width: '120px' }}></div>
                <div className="spreadsheet-cell" style={{ width: '100px' }}></div>
                <div className="spreadsheet-cell" style={{ flex: 1 }}></div>
              </div>
            </div>
          </div>
        ) : (
          /* Detail View - Transactions for Selected Account */
          <div className="account-detail-view">
            {/* Header with Back Button */}
            <div className="detail-header">
              <button className="back-button" onClick={() => setSelectedAccount(null)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Accounts
              </button>
              <h2 className="detail-title">{selectedAccount.name}</h2>
              <div className="detail-balance">
                Balance: <span>${selectedAccount.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="filters-bar">
              <div className="filter-group">
                <label>Search:</label>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>From:</label>
                <input
                  type="date"
                  className="filter-input"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>To:</label>
                <input
                  type="date"
                  className="filter-input"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>Show:</label>
                <select
                  className="filter-select"
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                >
                  <option value={10}>10 entries</option>
                  <option value={50}>50 entries</option>
                  <option value={100}>100 entries</option>
                </select>
              </div>

              <button
                className="clear-filters-btn"
                onClick={() => {
                  setSearchTerm("");
                  setDateFrom("");
                  setDateTo("");
                  setEntriesPerPage(10);
                }}
              >
                Clear Filters
              </button>

              <button className="view-report-btn" onClick={generatePDF}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
                Export PDF
              </button>

              <button className="export-excel-btn" onClick={generateExcel}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="9" y1="15" x2="15" y2="15"/>
                  <line x1="12" y1="12" x2="12" y2="18"/>
                </svg>
                Export Excel
              </button>
            </div>

            {/* Transactions Table */}
            <div className="spreadsheet-container">
              <div className="spreadsheet-table">
                {/* Header Row */}
                <div className="spreadsheet-row header-row">
                  <div className="spreadsheet-cell header-cell" style={{ width: '50px' }}>#</div>
                  <div className="spreadsheet-cell header-cell" style={{ width: '120px' }}>Date</div>
                  <div className="spreadsheet-cell header-cell" style={{ width: '300px' }}>Description</div>
                  <div className="spreadsheet-cell header-cell" style={{ width: '120px' }}>Category</div>
                  <div className="spreadsheet-cell header-cell" style={{ width: '120px' }}>Debit</div>
                  <div className="spreadsheet-cell header-cell" style={{ width: '120px' }}>Credit</div>
                  <div className="spreadsheet-cell header-cell" style={{ width: '140px' }}>Balance</div>
                </div>

                {/* Transaction Rows */}
                {filteredTransactions.map((transaction, index) => (
                  <div key={transaction.id} className="spreadsheet-row data-row">
                    <div className="spreadsheet-cell" style={{ width: '50px' }}>{index + 1}</div>
                    <div className="spreadsheet-cell" style={{ width: '120px' }}>
                      {new Date(transaction.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                    </div>
                    <div className="spreadsheet-cell" style={{ width: '300px' }}>{transaction.description}</div>
                    <div className="spreadsheet-cell" style={{ width: '120px' }}>
                      <span className={`category-badge ${transaction.category.toLowerCase()}`}>{transaction.category}</span>
                    </div>
                    <div className="spreadsheet-cell" style={{ width: '120px', color: transaction.debit > 0 ? '#DC2626' : '#9CA3AF' }}>
                      {transaction.debit > 0 ? `$${transaction.debit.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '-'}
                    </div>
                    <div className="spreadsheet-cell" style={{ width: '120px', color: transaction.credit > 0 ? '#16A34A' : '#9CA3AF' }}>
                      {transaction.credit > 0 ? `$${transaction.credit.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '-'}
                    </div>
                    <div className="spreadsheet-cell" style={{ width: '140px', fontWeight: 600 }}>
                      ${transaction.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}

                {filteredTransactions.length === 0 && (
                  <div className="spreadsheet-row">
                    <div className="spreadsheet-cell" style={{ flex: 1, justifyContent: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                      No transactions found matching your filters
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
