"use client";

import { useState, useMemo } from "react";
import { Layout } from "@/components";
import * as XLSX from "xlsx-js-style";

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  membershipDate: string;
  status: string;
  department: string;
  address: string;
}

export default function MembersPage() {
  const [members] = useState<Member[]>([
    { id: 1, name: "John Smith", email: "john.smith@email.com", phone: "(555) 123-4567", membershipDate: "01/15/2020", status: "Active", department: "Youth Ministry", address: "123 Main St, City, ST 12345" },
    { id: 2, name: "Sarah Johnson", email: "sarah.j@email.com", phone: "(555) 234-5678", membershipDate: "03/22/2019", status: "Active", department: "Music Ministry", address: "456 Oak Ave, City, ST 12345" },
    { id: 3, name: "Michael Brown", email: "m.brown@email.com", phone: "(555) 345-6789", membershipDate: "07/10/2021", status: "Active", department: "Outreach", address: "789 Pine Rd, City, ST 12345" },
    { id: 4, name: "Emily Davis", email: "emily.davis@email.com", phone: "(555) 456-7890", membershipDate: "11/05/2018", status: "Active", department: "Children's Ministry", address: "321 Elm St, City, ST 12345" },
    { id: 5, name: "David Wilson", email: "d.wilson@email.com", phone: "(555) 567-8901", membershipDate: "02/18/2022", status: "Active", department: "Administration", address: "654 Maple Dr, City, ST 12345" },
    { id: 6, name: "Jennifer Taylor", email: "jen.taylor@email.com", phone: "(555) 678-9012", membershipDate: "09/30/2020", status: "Inactive", department: "Youth Ministry", address: "987 Cedar Ln, City, ST 12345" },
    { id: 7, name: "Robert Anderson", email: "r.anderson@email.com", phone: "(555) 789-0123", membershipDate: "05/12/2019", status: "Active", department: "Finance", address: "147 Birch Ave, City, ST 12345" },
    { id: 8, name: "Lisa Martinez", email: "lisa.m@email.com", phone: "(555) 890-1234", membershipDate: "12/08/2021", status: "Active", department: "Music Ministry", address: "258 Spruce St, City, ST 12345" },
    { id: 9, name: "James Thompson", email: "james.t@email.com", phone: "(555) 901-2345", membershipDate: "04/25/2020", status: "Active", department: "Maintenance", address: "369 Willow Rd, City, ST 12345" },
    { id: 10, name: "Mary Garcia", email: "mary.garcia@email.com", phone: "(555) 012-3456", membershipDate: "08/14/2018", status: "Active", department: "Hospitality", address: "741 Ash Dr, City, ST 12345" },
  ]);

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");

  // Get unique departments for filter
  const departments = ["All", ...Array.from(new Set(members.map(m => m.department)))];

  // Filter members
  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesSearch = searchTerm === "" ||
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.phone.includes(searchTerm);

      const matchesStatus = statusFilter === "All" || member.status === statusFilter;
      const matchesDepartment = departmentFilter === "All" || member.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [members, searchTerm, statusFilter, departmentFilter]);

  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === "Active").length;

  // Generate Excel Report
  const generateExcel = () => {
    // Create workbook
    const wb = XLSX.utils.book_new();

    // Headers
    const headers = [["#", "Name", "Email", "Phone", "Member Since", "Status"]];

    // Member Data
    const memberData = filteredMembers.map((member, index) => [
      index + 1,
      member.name,
      member.email,
      member.phone,
      member.membershipDate,
      member.status
    ]);

    // Combine all data
    const wsData = [...headers, ...memberData];

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Set column widths
    ws['!cols'] = [
      { wch: 5 },   // #
      { wch: 20 },  // Name
      { wch: 25 },  // Email
      { wch: 15 },  // Phone
      { wch: 15 },  // Member Since
      { wch: 12 },  // Status
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
    const headerCells = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1'];
    headerCells.forEach(cell => {
      if (!ws[cell]) ws[cell] = { t: 's', v: '' };
      ws[cell].s = headerStyle;
    });

    // Style data rows with borders and alternating colors
    const totalRows = wsData.length;
    for (let row = 2; row <= totalRows; row++) {
      const isEvenRow = row % 2 === 0;

      ['A', 'B', 'C', 'D', 'E', 'F'].forEach((col, colIndex) => {
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
        if (isEvenRow) {
          cellStyle.fill = { fgColor: { rgb: "F2F2F2" } };
        }

        // Center alignment for # column
        if (colIndex === 0) {
          cellStyle.alignment = { ...cellStyle.alignment, horizontal: "center" };
        }

        // Center alignment for Member Since and Status columns
        if (colIndex === 4 || colIndex === 5) {
          cellStyle.alignment = { ...cellStyle.alignment, horizontal: "center" };
        }

        ws[cellRef].s = cellStyle;
      });
    }

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Members");

    // Save file
    const fileName = `Church_Members_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <Layout title="Church Members" searchPlaceholder="Search members...">
      <div className="accounts-page">
        {!selectedMember ? (
          /* Overview - Members List */
          <>
            {/* Filters Bar */}
            <div className="filters-bar">
              <div className="filter-group">
                <label>Search:</label>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>Status:</label>
                <select
                  className="filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Department:</label>
                <select
                  className="filter-select"
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <button
                className="clear-filters-btn"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                  setDepartmentFilter("All");
                }}
              >
                Clear Filters
              </button>

              <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                <button className="export-excel-btn" onClick={generateExcel}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="9" y1="15" x2="15" y2="15"/>
                    <line x1="12" y1="12" x2="12" y2="18"/>
                  </svg>
                  Export Excel
                </button>

                <button className="view-report-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                  Add Member
                </button>
              </div>
            </div>

            {/* Members Table */}
            <div className="spreadsheet-container">
              <div className="spreadsheet-table">
                {/* Header Row */}
                <div className="spreadsheet-row header-row">
                  <div className="spreadsheet-cell header-cell" style={{ width: '50px' }}>#</div>
                  <div className="spreadsheet-cell header-cell" style={{ width: '180px' }}>Name</div>
                  <div className="spreadsheet-cell header-cell" style={{ width: '200px' }}>Email</div>
                  <div className="spreadsheet-cell header-cell" style={{ width: '130px' }}>Phone</div>
                  <div className="spreadsheet-cell header-cell" style={{ width: '120px' }}>Member Since</div>
                  <div className="spreadsheet-cell header-cell" style={{ width: '100px' }}>Status</div>
                </div>

                {/* Data Rows */}
                {filteredMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className="spreadsheet-row data-row clickable-row"
                    onClick={() => setSelectedMember(member)}
                  >
                    <div className="spreadsheet-cell" style={{ width: '50px' }}>{index + 1}</div>
                    <div className="spreadsheet-cell" style={{ width: '180px', fontWeight: 500 }}>{member.name}</div>
                    <div className="spreadsheet-cell" style={{ width: '200px', color: 'var(--primary-blue)' }}>{member.email}</div>
                    <div className="spreadsheet-cell" style={{ width: '130px' }}>{member.phone}</div>
                    <div className="spreadsheet-cell" style={{ width: '120px' }}>{member.membershipDate}</div>
                    <div className="spreadsheet-cell" style={{ width: '100px' }}>
                      <span className={`status-badge ${member.status.toLowerCase()}`}>{member.status}</span>
                    </div>
                  </div>
                ))}

                {filteredMembers.length === 0 && (
                  <div className="spreadsheet-row">
                    <div className="spreadsheet-cell" style={{ flex: 1, justifyContent: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                      No members found matching your filters
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Detail View - Member Profile */
          <div className="account-detail-view">
            {/* Header with Back Button */}
            <div className="detail-header">
              <button className="back-button" onClick={() => setSelectedMember(null)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Members
              </button>
              <h2 className="detail-title">{selectedMember.name}</h2>
            </div>

            {/* Member Details Card */}
            <div className="member-profile-card">
              <div className="profile-section">
                <h3>Contact Information</h3>
                <div className="profile-details">
                  <div className="detail-item">
                    <label>Email:</label>
                    <span>{selectedMember.email}</span>
                  </div>
                  <div className="detail-item">
                    <label>Phone:</label>
                    <span>{selectedMember.phone}</span>
                  </div>
                  <div className="detail-item">
                    <label>Address:</label>
                    <span>{selectedMember.address}</span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>Membership Information</h3>
                <div className="profile-details">
                  <div className="detail-item">
                    <label>Member Since:</label>
                    <span>{selectedMember.membershipDate}</span>
                  </div>
                  <div className="detail-item">
                    <label>Status:</label>
                    <span className={`status-badge ${selectedMember.status.toLowerCase()}`}>
                      {selectedMember.status}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Department:</label>
                    <span>{selectedMember.department}</span>
                  </div>
                </div>
              </div>

              <div className="profile-actions">
                <button className="view-report-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Edit Member
                </button>
                <button className="export-excel-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  View History
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
