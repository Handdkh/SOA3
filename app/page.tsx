"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  FileText,
  CreditCard,
  Receipt,
  Users,
  Plus,
  Edit,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  MoreHorizontal,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  AlertTriangle,
} from "lucide-react"

// Enhanced Mock Data with more transactions to show company owes employee scenarios
const mockAgents = [
  {
    agent_id: "A001",
    name: "Rambo Kor",
    designation: "Associate Manager",
    status: "Active",
    source: "Internal Salesperson",
    created_at: "2024-01-01",
    upline: "Sarah Ng",
    accumulated_commission: 585936.5,
    to_promotion: 5100000.0,
  },
  {
    agent_id: "A002",
    name: "Sarah Ng",
    designation: "Associate Manager",
    status: "Active",
    source: "Internal Salesperson",
    created_at: "2024-02-01",
    upline: "N/A",
    accumulated_commission: 555072.1,
    to_promotion: 5100000.0,
  },
  {
    agent_id: "A003",
    name: "ADMIN 1",
    designation: "Marketing Associate",
    status: "Active",
    source: "Client",
    created_at: "2024-03-01",
    upline: "Nicholas Ang Taylor",
    accumulated_commission: 513500.0,
    to_promotion: 550000.0,
  },
  {
    agent_id: "A004",
    name: "Adrian Lim",
    designation: "Marketing Associate",
    status: "Active",
    source: "Internal Co-broke",
    created_at: "2024-04-01",
    upline: "Rambo Kor",
    accumulated_commission: 59658.78,
    to_promotion: 550000.0,
  },
  {
    agent_id: "A005",
    name: "Nicholas Ang Taylor",
    designation: "Senior Associate Director",
    status: "Active",
    source: "External Co-broke",
    created_at: "2024-05-01",
    upline: "Adrian Lim",
    accumulated_commission: 52558100.0,
    to_promotion: 55000000.0,
  },
  {
    agent_id: "A006",
    name: "Michael Chen",
    designation: "Associate",
    status: "Active",
    source: "Client",
    created_at: "2024-06-01",
    upline: "Sarah Ng",
    accumulated_commission: 125000.0,
    to_promotion: 300000.0,
  },
  {
    agent_id: "A007",
    name: "Lisa Wong",
    designation: "Senior Associate",
    status: "Active",
    source: "Internal Co-broke",
    created_at: "2024-07-01",
    upline: "Rambo Kor",
    accumulated_commission: 275000.0,
    to_promotion: 500000.0,
  },
]

// State management for bills, vouchers, and credit notes
const mockBills = [
  {
    bill_id: "B001",
    agent_id: "A001",
    ref: "RCPT-236-000000236",
    description: "Commission Q1",
    amount: 51000.0,
    balance_due: 30000.0,
    status: "PARTIALLY_PAID",
    created_at: "2025-01-01",
    payee_name: "Rambo Kor",
  },
  {
    bill_id: "B002",
    agent_id: "A002",
    ref: "RCPT-237-000000237",
    description: "Commission Q2",
    amount: 30000.0,
    balance_due: 15000.0,
    status: "PARTIALLY_PAID",
    created_at: "2025-02-01",
    payee_name: "Sarah Ng",
  },
  {
    bill_id: "B003",
    agent_id: "A003",
    ref: "RCPT-238-000000238",
    description: "Commission Q3",
    amount: 40000.0,
    balance_due: 20000.0,
    status: "PARTIALLY_PAID",
    created_at: "2025-03-01",
    payee_name: "ADMIN 1",
  },
  {
    bill_id: "B004",
    agent_id: "A004",
    ref: "RCPT-239-000000239",
    description: "Commission Q4",
    amount: 60000.0,
    balance_due: 45000.0,
    status: "PENDING",
    created_at: "2025-04-01",
    payee_name: "Adrian Lim",
  },
  {
    bill_id: "B005",
    agent_id: "A005",
    ref: "RCPT-240-000000240",
    description: "Bonus Commission",
    amount: 20000.0,
    balance_due: 10000.0,
    status: "PARTIALLY_PAID",
    created_at: "2025-05-01",
    payee_name: "Nicholas Ang Taylor",
  },
  {
    bill_id: "B006",
    agent_id: "A001",
    ref: "RCPT-241-000000241",
    description: "Year-end Bonus",
    amount: 25000.0,
    balance_due: 25000.0,
    status: "PENDING",
    created_at: "2025-06-01",
    payee_name: "Rambo Kor",
  },
  // Additional bills for agents with negative outstanding balance
  {
    bill_id: "B007",
    agent_id: "A002",
    ref: "RCPT-244-000000244",
    description: "Additional Commission",
    amount: 8000.0,
    balance_due: 8000.0,
    status: "PENDING",
    created_at: "2025-07-01",
    payee_name: "Sarah Ng",
  },
  {
    bill_id: "B008",
    agent_id: "A006",
    ref: "RCPT-245-000000245",
    description: "Performance Bonus",
    amount: 12000.0,
    balance_due: 12000.0,
    status: "PENDING",
    created_at: "2025-07-15",
    payee_name: "Michael Chen",
  },
]

const mockVouchers = [
  {
    voucher_id: "V001",
    agent_id: "A001",
    bill_id: "B001",
    ref: "PVMT-236-000000158",
    description: "Payment for RCPT-236-000000236",
    amount: 5238.91,
    payment_method: "GIRO",
    status: "COMPLETED",
    created_at: "2025-01-05",
    payee_name: "Rambo Kor",
  },
  {
    voucher_id: "V002",
    agent_id: "A002",
    bill_id: "B002",
    ref: "PVMT-237-000000159",
    description: "Payment for Commission",
    amount: 15000.0,
    payment_method: "Bank Transfer",
    status: "COMPLETED",
    created_at: "2025-02-05",
    payee_name: "Sarah Ng",
  },
  {
    voucher_id: "V003",
    agent_id: "A003",
    bill_id: "B003",
    ref: "PVMT-238-000000160",
    description: "Payment for Commission",
    amount: 20000.0,
    payment_method: "Cheque",
    status: "COMPLETED",
    created_at: "2025-03-05",
    payee_name: "ADMIN 1",
  },
]

const mockCreditNotes = [
  {
    note_id: "C001",
    agent_id: "A001",
    bill_id: "B001", // Allocated to specific bill
    ref: "SCN-236-000000005",
    description: "Credit Note for Bill RCPT-236-000000236",
    amount: 5500.0,
    remaining_amount: 2500.0,
    status: "PARTIALLY_ALLOCATED",
    created_at: "2025-01-10",
    payee_name: "Rambo Kor",
  },
  {
    note_id: "C002",
    agent_id: "A002",
    bill_id: null, // Unallocated - available for offset
    ref: "SCN-237-000000006",
    description: "Expense reimbursement",
    amount: 5000.0,
    remaining_amount: 5000.0,
    status: "NEW",
    created_at: "2025-02-10",
    payee_name: "Sarah Ng",
  },
  {
    note_id: "C003",
    agent_id: "A003",
    bill_id: null, // Unallocated
    ref: "SCN-238-000000007",
    description: "Advance payment",
    amount: 3000.0,
    remaining_amount: 1500.0,
    status: "PARTIALLY_ALLOCATED",
    created_at: "2025-03-10",
    payee_name: "ADMIN 1",
  },
  {
    note_id: "C004",
    agent_id: "A004",
    bill_id: "B004", // Allocated to specific bill
    ref: "SCN-239-000000008",
    description: "Commission adjustment",
    amount: 2000.0,
    remaining_amount: 0.0,
    status: "ALLOCATED",
    created_at: "2025-04-10",
    payee_name: "Adrian Lim",
  },
  {
    note_id: "C005",
    agent_id: "A005",
    bill_id: null, // Unallocated
    ref: "SCN-240-000000009",
    description: "Training fee reimbursement",
    amount: 1000.0,
    remaining_amount: 1000.0,
    status: "NEW",
    created_at: "2025-05-10",
    payee_name: "Nicholas Ang Taylor",
  },
  {
    note_id: "C006",
    agent_id: "A001",
    bill_id: null, // Unallocated - this will create company owes employee scenario
    ref: "SCN-241-000000010",
    description: "Advance salary payment",
    amount: 15000.0,
    remaining_amount: 15000.0,
    status: "NEW",
    created_at: "2025-06-15",
    payee_name: "Rambo Kor",
  },
  // Additional credit notes for agents with negative outstanding balance
  {
    note_id: "C007",
    agent_id: "A002",
    bill_id: null,
    ref: "SCN-244-000000011",
    description: "Travel expense reimbursement",
    amount: 3000.0,
    remaining_amount: 3000.0,
    status: "NEW",
    created_at: "2025-07-10",
    payee_name: "Sarah Ng",
  },
  {
    note_id: "C008",
    agent_id: "A006",
    bill_id: null,
    ref: "SCN-245-000000012",
    description: "Equipment reimbursement",
    amount: 7000.0,
    remaining_amount: 7000.0,
    status: "NEW",
    created_at: "2025-07-20",
    payee_name: "Michael Chen",
  },
]

// Enhanced transactions with scenarios where company owes employee (positive balance)
const mockTransactions = [
  // Agent A001 - Company owes employee (positive balance = $40,000)
  {
    id: "T001",
    agent_id: "A001",
    date: "2024-01-15",
    description: "Commission Payment",
    ref: "RCPT-236-000000236",
    type: "Bill to Pay",
    credit: 51000.0,
    debit: 0.0,
  },
  {
    id: "T002",
    agent_id: "A001",
    date: "2024-01-20",
    description: "Payment Received",
    ref: "PVMT-236-000000158",
    type: "Payment Voucher",
    credit: 0.0,
    debit: 21000.0,
  },
  {
    id: "T003",
    agent_id: "A001",
    date: "2024-02-10",
    description: "Credit Note - Advance salary",
    ref: "SCN-241-000000010",
    type: "Credit Note",
    credit: 0.0,
    debit: 15000.0,
  },
  {
    id: "T004",
    agent_id: "A001",
    date: "2024-06-01",
    description: "Year-end Bonus",
    ref: "RCPT-241-000000241",
    type: "Bill to Pay",
    credit: 25000.0,
    debit: 0.0,
  },
  // Final balance for A001: 51000 - 21000 - 15000 + 25000 = 40000 (Company owes employee)

  // Agent A002 - Employee owes company (negative balance = -$2,000)
  {
    id: "T005",
    agent_id: "A002",
    date: "2024-01-15",
    description: "Commission Payment",
    ref: "RCPT-237-000000237",
    type: "Bill to Pay",
    credit: 30000.0,
    debit: 0.0,
  },
  {
    id: "T006",
    agent_id: "A002",
    date: "2024-02-20",
    description: "Payment Received",
    ref: "PVMT-237-000000159",
    type: "Payment Voucher",
    credit: 0.0,
    debit: 15000.0,
  },
  {
    id: "T007",
    agent_id: "A002",
    date: "2024-03-10",
    description: "Expense reimbursement",
    ref: "SCN-237-000000006",
    type: "Credit Note",
    credit: 0.0,
    debit: 5000.0,
  },
  {
    id: "T020",
    agent_id: "A002",
    date: "2024-04-10",
    description: "Additional Payment",
    ref: "PVMT-244-000000164",
    type: "Payment Voucher",
    credit: 0.0,
    debit: 12000.0,
  },
  // Final balance for A002: 30000 - 15000 - 5000 - 12000 = -2000 (Employee owes company)

  // Agent A003 - Company owes employee (positive balance = $17,000)
  {
    id: "T008",
    agent_id: "A003",
    date: "2024-01-15",
    description: "Commission Payment",
    ref: "RCPT-238-000000238",
    type: "Bill to Pay",
    credit: 40000.0,
    debit: 0.0,
  },
  {
    id: "T009",
    agent_id: "A003",
    date: "2024-02-20",
    description: "Payment Received",
    ref: "PVMT-238-000000160",
    type: "Payment Voucher",
    credit: 0.0,
    debit: 20000.0,
  },
  {
    id: "T010",
    agent_id: "A003",
    date: "2024-03-10",
    description: "Advance payment",
    ref: "SCN-238-000000007",
    type: "Credit Note",
    credit: 0.0,
    debit: 3000.0,
  },
  // Final balance for A003: 40000 - 20000 - 3000 = 17000 (Company owes employee)

  // Agent A004 - Company owes employee (positive balance = $43,000)
  {
    id: "T011",
    agent_id: "A004",
    date: "2024-01-15",
    description: "Commission Payment",
    ref: "RCPT-239-000000239",
    type: "Bill to Pay",
    credit: 60000.0,
    debit: 0.0,
  },
  {
    id: "T012",
    agent_id: "A004",
    date: "2024-02-20",
    description: "Commission adjustment",
    ref: "SCN-239-000000008",
    type: "Credit Note",
    credit: 0.0,
    debit: 2000.0,
  },
  {
    id: "T013",
    agent_id: "A004",
    date: "2024-03-10",
    description: "Advance payment",
    ref: "ADV-2024-004",
    type: "Advance",
    credit: 0.0,
    debit: 15000.0,
  },
  // Final balance for A004: 60000 - 2000 - 15000 = 43000 (Company owes employee)

  // Agent A005 - Company owes employee (positive balance = $10,000)
  {
    id: "T014",
    agent_id: "A005",
    date: "2024-01-15",
    description: "Bonus Commission",
    ref: "RCPT-240-000000240",
    type: "Bill to Pay",
    credit: 20000.0,
    debit: 0.0,
  },
  {
    id: "T015",
    agent_id: "A005",
    date: "2024-02-20",
    description: "Payment Received",
    ref: "PVMT-240-000000161",
    type: "Payment Voucher",
    credit: 0.0,
    debit: 10000.0,
  },
  // Final balance for A005: 20000 - 10000 = 10000 (Company owes employee)

  // Agent A006 - Employee owes company (negative balance = -$5,000)
  {
    id: "T016",
    agent_id: "A006",
    date: "2024-01-15",
    description: "Commission Payment",
    ref: "RCPT-242-000000242",
    type: "Bill to Pay",
    credit: 15000.0,
    debit: 0.0,
  },
  {
    id: "T017",
    agent_id: "A006",
    date: "2024-02-20",
    description: "Payment Received",
    ref: "PVMT-242-000000162",
    type: "Payment Voucher",
    credit: 0.0,
    debit: 20000.0,
  },
  // Final balance for A006: 15000 - 20000 = -5000 (Employee owes company)

  // Agent A007 - Employee owes company (negative balance = -$5,000)
  {
    id: "T018",
    agent_id: "A007",
    date: "2024-01-15",
    description: "Commission Payment",
    ref: "RCPT-243-000000243",
    type: "Bill to Pay",
    credit: 10000.0,
    debit: 0.0,
  },
  {
    id: "T019",
    agent_id: "A007",
    date: "2024-02-20",
    description: "Payment Received",
    ref: "PVMT-243-000000163",
    type: "Payment Voucher",
    credit: 0.0,
    debit: 15000.0,
  },
  // Final balance for A007: 10000 - 15000 = -5000 (Employee owes company)
]

// Helper function to calculate outstanding balance for an agent
function calculateOutstandingBalance(agentId) {
  const agentTransactions = mockTransactions.filter((t) => t.agent_id === agentId)
  return agentTransactions.reduce((sum, t) => sum + t.credit - t.debit, 0)
}

// Helper function to get available credit notes for offset (only for agents with negative balance)
function getAvailableCreditNotes(agentId) {
  return mockCreditNotes.filter(
    (note) =>
      note.agent_id === agentId &&
      note.bill_id === null &&
      (note.status === "NEW" || note.status === "PARTIALLY_ALLOCATED") &&
      note.remaining_amount > 0,
  )
}

// Helper function to get bills with balance due for an agent
function getBillsWithBalanceDue(agentId) {
  return mockBills.filter((bill) => bill.agent_id === agentId && bill.balance_due > 0)
}

// Offset functionality
function applyOffset(creditNoteId, billId, offsetAmount) {
  // Find and update credit note
  const creditNoteIndex = mockCreditNotes.findIndex((note) => note.note_id === creditNoteId)
  if (creditNoteIndex !== -1) {
    mockCreditNotes[creditNoteIndex].remaining_amount -= offsetAmount
    mockCreditNotes[creditNoteIndex].bill_id = billId

    // Update credit note status
    if (mockCreditNotes[creditNoteIndex].remaining_amount === 0) {
      mockCreditNotes[creditNoteIndex].status = "FULLY_USED"
    } else {
      mockCreditNotes[creditNoteIndex].status = "PARTIALLY_USED"
    }
  }

  // Find and update bill
  const billIndex = mockBills.findIndex((bill) => bill.bill_id === billId)
  if (billIndex !== -1) {
    mockBills[billIndex].balance_due -= offsetAmount

    // Update bill status
    if (mockBills[billIndex].balance_due === 0) {
      mockBills[billIndex].status = "PAID"
    } else {
      mockBills[billIndex].status = "PARTIALLY_PAID"
    }
  }

  return {
    success: true,
    message: `Successfully offset $${offsetAmount.toLocaleString()} from Credit Note ${creditNoteId} to Bill ${billId}`,
  }
}

// Updated Sidebar Component with 5 pages
function Sidebar({ currentPage, setCurrentPage }) {
  const menuItems = [
    { id: "bills", label: "Bills to Pay", icon: FileText },
    { id: "vouchers", label: "Payment Vouchers", icon: CreditCard },
    { id: "creditNotes", label: "Credit Notes", icon: Receipt },
    { id: "salespersons", label: "Internal Salesperson", icon: Users },
    { id: "statement", label: "Statement of Account", icon: DollarSign },
  ]

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 z-10">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
            <span className="text-white font-bold">F</span>
          </div>
          <span className="font-semibold">Financial System</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  currentPage === item.id
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

// Enhanced Bills Page Component with Outstanding Balance Info
function BillsPage() {
  const [selectedBill, setSelectedBill] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showOffsetModal, setShowOffsetModal] = useState(false)

  if (selectedBill) {
    const outstandingBalance = calculateOutstandingBalance(selectedBill.agent_id)
    const availableCreditNotes = getAvailableCreditNotes(selectedBill.agent_id)
    // Updated condition: only show offset when outstanding balance < 0 (employee owes company)
    const canOffset = outstandingBalance < 0 && availableCreditNotes.length > 0 && selectedBill.balance_due > 0

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setSelectedBill(null)}>
              ← Back
            </Button>
            <h1 className="text-2xl font-bold">Bill Detail</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Outstanding Balance Alert - Updated logic */}
        {outstandingBalance < 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <div className="flex-1">
                  <p className="font-medium text-orange-800">Outstanding Balance Alert</p>
                  <p className="text-sm text-orange-700">
                    Employee owes company ${Math.abs(outstandingBalance).toLocaleString()}.
                    {canOffset &&
                      ` You can offset ${availableCreditNotes.length} available credit note(s) against this bill.`}
                  </p>
                </div>
                {canOffset && (
                  <Button
                    size="sm"
                    onClick={() => setShowOffsetModal(true)}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Apply Offset
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Bill Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Bill ID:</span>
                  <p className="font-medium">{selectedBill.ref}</p>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>
                  <Badge variant={selectedBill.status === "PAID" ? "default" : "secondary"}>
                    {selectedBill.status.replace("_", " ")}
                  </Badge>
                </div>
                <div>
                  <span className="text-gray-500">Bill Date:</span>
                  <p className="font-medium">{selectedBill.created_at}</p>
                </div>
                <div>
                  <span className="text-gray-500">Payment Due Date:</span>
                  <p className="font-medium">{selectedBill.created_at}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payee's Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Payee's Name:</span>
                  <p className="font-medium">{selectedBill.payee_name}</p>
                </div>
                <div>
                  <span className="text-gray-500">Outstanding Balance:</span>
                  <p className={`font-medium ${outstandingBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
                    ${Math.abs(outstandingBalance).toLocaleString()}
                    {outstandingBalance >= 0 ? " (Company owes employee)" : " (Employee owes company)"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Email:</span>
                  <p className="font-medium">handel12233@gmail.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bills Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Item Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Tax</TableHead>
                  <TableHead>Tax Incl.</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>{selectedBill.description}</TableCell>
                  <TableCell>Commission</TableCell>
                  <TableCell>${selectedBill.amount.toLocaleString()}</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell>No</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>${selectedBill.amount.toLocaleString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-end">
              <div className="space-y-2 text-right">
                <div className="flex justify-between gap-8">
                  <span>Subtotal:</span>
                  <span>${selectedBill.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span>Tax:</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between gap-8 font-bold">
                  <span>Total Amount:</span>
                  <span>${selectedBill.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Payment Voucher
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">There is no recording of payment for this bill</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Credit Note
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Credit Note</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCreditNotes
                    .filter((note) => note.bill_id === selectedBill.bill_id)
                    .map((note, index) => (
                      <TableRow key={note.note_id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{note.ref}</TableCell>
                        <TableCell>${note.amount.toLocaleString()}</TableCell>
                        <TableCell>{note.created_at}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{note.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-medium">Bill Balance Due:</span>
            <span className="text-2xl font-bold text-green-600">${selectedBill.balance_due.toLocaleString()}</span>
          </div>
        </div>

        {/* Enhanced Offset Modal */}
        <OffsetModal
          isOpen={showOffsetModal}
          onClose={() => setShowOffsetModal(false)}
          billId={selectedBill?.bill_id}
          agentId={selectedBill?.agent_id}
          availableBalance={selectedBill?.balance_due || 0}
          outstandingBalance={outstandingBalance}
          onOffset={(offsetData) => {
            if (offsetData.operations && offsetData.operations.length > 0) {
              const messages = offsetData.operations.map(
                (op) => `Credit Note ${op.creditNoteId} to Bill ${op.billId} for $${op.amount.toLocaleString()}`,
              )
              alert(
                `Successfully applied offsets:\n${messages.join("\n")}\n\nTotal offset: $${offsetData.totalAmount.toLocaleString()}`,
              )

              // Update the selected bill with new balance
              const updatedBill = mockBills.find((bill) => bill.bill_id === selectedBill.bill_id)
              if (updatedBill) {
                setSelectedBill({ ...updatedBill })
              }
            }
            setShowOffsetModal(false)
          }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bills</h1>
          <p className="text-gray-600">Total Bill: {mockBills.length}</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create New
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Bills List</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Billing To</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Balance Due</TableHead>
                <TableHead>Outstanding Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBills.map((bill, index) => {
                const outstandingBalance = calculateOutstandingBalance(bill.agent_id)
                // Updated condition: only show offset when outstanding balance < 0
                const canOffset = outstandingBalance < 0 && bill.balance_due > 0

                return (
                  <TableRow key={bill.bill_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{bill.payee_name}</TableCell>
                    <TableCell className="text-blue-600 cursor-pointer" onClick={() => setSelectedBill(bill)}>
                      {bill.ref}
                    </TableCell>
                    <TableCell>${bill.amount.toLocaleString()}</TableCell>
                    <TableCell>${bill.balance_due.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${outstandingBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
                          ${Math.abs(outstandingBalance).toLocaleString()}
                          {outstandingBalance >= 0 ? " (Company owes)" : " (Employee owes)"}
                        </span>
                        {canOffset && (
                          <Badge variant="outline" className="text-orange-600 border-orange-600">
                            Offset Available
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={bill.status === "PAID" ? "default" : "secondary"}>
                        {bill.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => setSelectedBill(bill)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showCreateForm && (
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create New Bill</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Payee</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Payee" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockAgents.map((agent) => (
                        <SelectItem key={agent.agent_id} value={agent.agent_id}>
                          {agent.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Bill Date</Label>
                  <Input type="date" />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea placeholder="Enter bill description" />
              </div>

              <div>
                <Label>Bill Items</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Input placeholder="Item description" />
                      </TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="commission">Commission</SelectItem>
                            <SelectItem value="bonus">Bonus</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue="1" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" placeholder="0.00" />
                      </TableCell>
                      <TableCell>$0.00</TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowCreateForm(false)}>Save Changes</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Payment Vouchers Page Component (unchanged for brevity)
function PaymentVouchersPage() {
  const [selectedVoucher, setSelectedVoucher] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  if (selectedVoucher) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setSelectedVoucher(null)}>
              ← Back
            </Button>
            <h1 className="text-2xl font-bold">Payment Voucher Detail</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Payee Name:</span>
                <p className="font-medium">{selectedVoucher.payee_name}</p>
              </div>
              <div>
                <span className="text-gray-500">Payment Voucher Number:</span>
                <p className="font-medium">{selectedVoucher.ref}</p>
              </div>
              <div>
                <span className="text-gray-500">Creation Date:</span>
                <p className="font-medium">{selectedVoucher.created_at}</p>
              </div>
              <div>
                <span className="text-gray-500">Payment Method:</span>
                <p className="font-medium">{selectedVoucher.payment_method}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Voucher Detail</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Related Bill / Item Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Tax</TableHead>
                  <TableHead>Tax Incl.</TableHead>
                  <TableHead>Total Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>{selectedVoucher.ref}</TableCell>
                  <TableCell>${selectedVoucher.amount.toLocaleString()}</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell>No</TableCell>
                  <TableCell>${selectedVoucher.amount.toLocaleString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-end">
              <div className="space-y-2 text-right">
                <div className="flex justify-between gap-8">
                  <span>Subtotal:</span>
                  <span>${selectedVoucher.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span>Tax:</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between gap-8 font-bold">
                  <span>Total Amount:</span>
                  <span>${selectedVoucher.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Payment Vouchers</h1>
          <p className="text-gray-600">Total Vouchers: {mockVouchers.length}</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create New
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Payee Name</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVouchers.map((voucher, index) => (
                <TableRow key={voucher.voucher_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{voucher.payee_name}</TableCell>
                  <TableCell className="text-blue-600 cursor-pointer" onClick={() => setSelectedVoucher(voucher)}>
                    {voucher.ref}
                  </TableCell>
                  <TableCell>${voucher.amount.toLocaleString()}</TableCell>
                  <TableCell>{voucher.payment_method}</TableCell>
                  <TableCell>
                    <Badge variant="default">{voucher.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setSelectedVoucher(voucher)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Credit Notes Page Component (unchanged for brevity)
function CreditNotesPage() {
  const [selectedNote, setSelectedNote] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  if (selectedNote) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setSelectedNote(null)}>
              ← Back
            </Button>
            <h1 className="text-2xl font-bold">Credit Note Detail</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Payee Name:</span>
                <p className="font-medium">{selectedNote.payee_name}</p>
              </div>
              <div>
                <span className="text-gray-500">Credit Note Number:</span>
                <p className="font-medium">{selectedNote.ref}</p>
              </div>
              <div>
                <span className="text-gray-500">Credit Note Date:</span>
                <p className="font-medium">{selectedNote.created_at}</p>
              </div>
              <div>
                <span className="text-gray-500">Status:</span>
                <Badge variant="outline">{selectedNote.status}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credit Note Detail</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Item Description</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Remaining Amount</TableHead>
                  <TableHead>Tax</TableHead>
                  <TableHead>Tax Incl.</TableHead>
                  <TableHead>Total Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>{selectedNote.description}</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>${selectedNote.amount.toLocaleString()}</TableCell>
                  <TableCell>${selectedNote.remaining_amount.toLocaleString()}</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell>No</TableCell>
                  <TableCell>${selectedNote.amount.toLocaleString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-end">
              <div className="space-y-2 text-right">
                <div className="flex justify-between gap-8">
                  <span>Subtotal:</span>
                  <span>${selectedNote.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span>Tax:</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between gap-8 font-bold">
                  <span>Total Credit:</span>
                  <span>${selectedNote.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bill Credit Notes</h1>
          <p className="text-gray-600">Total Credit Notes: {mockCreditNotes.length}</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create New
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Billing To</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Remaining Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCreditNotes.map((note, index) => (
                <TableRow key={note.note_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{note.payee_name}</TableCell>
                  <TableCell className="text-blue-600 cursor-pointer" onClick={() => setSelectedNote(note)}>
                    {note.ref}
                  </TableCell>
                  <TableCell>${note.amount.toLocaleString()}</TableCell>
                  <TableCell>${note.remaining_amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{note.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setSelectedNote(note)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Enhanced Statement of Account Component with corrected logic and offset functionality
function StatementOfAccount({ agentId }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" })
  const [typeFilter, setTypeFilter] = useState("all")
  const [showOffsetModal, setShowOffsetModal] = useState(false)

  // Filter transactions for the selected agent
  let agentTransactions = mockTransactions.filter((t) => t.agent_id === agentId)

  // Apply filters
  if (dateFilter.from) {
    agentTransactions = agentTransactions.filter((t) => t.date >= dateFilter.from)
  }
  if (dateFilter.to) {
    agentTransactions = agentTransactions.filter((t) => t.date <= dateFilter.to)
  }
  if (typeFilter !== "all") {
    agentTransactions = agentTransactions.filter((t) => t.type === typeFilter)
  }

  // Sort transactions
  agentTransactions.sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]

    if (sortField === "date") {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Calculate running balance
  let runningBalance = 0
  const transactionsWithBalance = agentTransactions.map((transaction) => {
    runningBalance += transaction.credit - transaction.debit
    return {
      ...transaction,
      balance: runningBalance,
    }
  })

  // Pagination
  const totalPages = Math.ceil(transactionsWithBalance.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedTransactions = transactionsWithBalance.slice(startIndex, endIndex)

  const outstandingBalance = runningBalance
  const availableCreditNotes = getAvailableCreditNotes(agentId)
  const availableBills = getBillsWithBalanceDue(agentId)

  // Updated condition: only show offset when outstanding balance < 0 (employee owes company)
  const canOffset = outstandingBalance < 0 && availableCreditNotes.length > 0 && availableBills.length > 0

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4" />
    return sortDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
  }

  const jumpToLatest = () => {
    setCurrentPage(totalPages)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Statement of Account</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={jumpToLatest}>
                Jump to Latest
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <Label>From Date</Label>
              <Input
                type="date"
                value={dateFilter.from}
                onChange={(e) => setDateFilter({ ...dateFilter, from: e.target.value })}
                placeholder="mm/dd/yyyy"
              />
            </div>
            <div>
              <Label>To Date</Label>
              <Input
                type="date"
                value={dateFilter.to}
                onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
                placeholder="mm/dd/yyyy"
              />
            </div>
            <div>
              <Label>Transaction Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Bill to Pay">Bill to Pay</SelectItem>
                  <SelectItem value="Payment Voucher">Payment Voucher</SelectItem>
                  <SelectItem value="Credit Note">Credit Note</SelectItem>
                  <SelectItem value="Advance">Advance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setDateFilter({ from: "", to: "" })
                  setTypeFilter("all")
                  setCurrentPage(1)
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Table with sticky header */}
          <div className="relative overflow-auto max-h-96">
            <Table>
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow>
                  <TableHead>
                    <Button variant="ghost" size="sm" onClick={() => handleSort("date")} className="h-auto p-0">
                      Date {getSortIcon("date")}
                    </Button>
                  </TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleSort("credit")} className="h-auto p-0">
                      Credit {getSortIcon("credit")}
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleSort("debit")} className="h-auto p-0">
                      Debit {getSortIcon("debit")}
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((transaction, index) => (
                  <TableRow key={`${transaction.type}-${transaction.id}`}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="text-blue-600">{transaction.ref}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.type}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {transaction.credit > 0 ? `$${transaction.credit.toLocaleString()}` : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      {transaction.debit > 0 ? `$${transaction.debit.toLocaleString()}` : "-"}
                    </TableCell>
                    <TableCell
                      className={`text-right font-medium ${transaction.balance >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      ${Math.abs(transaction.balance).toLocaleString()}
                      {transaction.balance >= 0 ? " (Company owes employee)" : " (Employee owes company)"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(endIndex, transactionsWithBalance.length)} of{" "}
              {transactionsWithBalance.length} transactions
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Outstanding Balance:</span>
              <div className="flex items-center gap-4">
                <span className={`text-2xl font-bold ${outstandingBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ${Math.abs(outstandingBalance).toLocaleString()}
                  {outstandingBalance >= 0 ? " (Company owes employee)" : " (Employee owes company)"}
                </span>
                {/* Updated condition: only show offset when outstanding balance < 0 */}
                {canOffset && (
                  <Button size="sm" onClick={() => setShowOffsetModal(true)}>
                    <DollarSign className="w-4 h-4 mr-2" />
                    Offset Balance
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Offset Modal for Statement of Account */}
      <OffsetModal
        isOpen={showOffsetModal}
        onClose={() => setShowOffsetModal(false)}
        billId={null}
        agentId={agentId}
        availableBalance={0}
        outstandingBalance={outstandingBalance}
        onOffset={(offsetData) => {
          const result = applyOffset(offsetData.creditNoteId, offsetData.billId, offsetData.amount)
          if (result.success) {
            alert(result.message)
            // Force re-render by updating the page
            setCurrentPage(currentPage)
          }
          setShowOffsetModal(false)
        }}
      />
    </div>
  )
}

// Internal Salespersons Page Component (unchanged for brevity)
function InternalSalespersonsPage() {
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [activeTab, setActiveTab] = useState("info")

  if (selectedAgent) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setSelectedAgent(null)}>
              ← Back
            </Button>
            <h1 className="text-2xl font-bold">Commission Profile</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <Users className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{selectedAgent.name}</h2>
                <p className="text-gray-600">Registration Number: R123456</p>
                <p className="text-gray-600">Designation: {selectedAgent.designation}</p>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <Badge variant="default">Appointed</Badge>
              <Badge variant="secondary">Pending</Badge>
              <Badge variant="outline">% To Promotion</Badge>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-orange-500 h-2 rounded-full mb-2">
              <div className="bg-orange-500 h-full rounded-full" style={{ width: "75%" }}></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-6">
              <span>${selectedAgent.accumulated_commission.toLocaleString()}</span>
              <span>Next Tier: ${selectedAgent.to_promotion.toLocaleString()}</span>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="info">Agent Information</TabsTrigger>
                <TabsTrigger value="commission">Commission Matrix</TabsTrigger>
                <TabsTrigger value="accumulated">Accumulated Commission</TabsTrigger>
                <TabsTrigger value="referral">Referral Commission</TabsTrigger>
                <TabsTrigger value="level">Referral Level</TabsTrigger>
                <TabsTrigger value="statement">Statement of Account</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Personal Information
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Email:</span>
                          <p className="font-medium">handel@gmail.com</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Marital Status:</span>
                          <p className="font-medium">N/A</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Phone number:</span>
                          <p className="font-medium">+65 3444</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Address:</span>
                          <p className="font-medium">51 CUPPAGE ROAD 51 CUPPAGE ROAD SINGAPORE 229469</p>
                        </div>
                        <div>
                          <span className="text-gray-500">ID Type:</span>
                          <p className="font-medium">N/A</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Bank Name:</span>
                          <p className="font-medium">N/A</p>
                        </div>
                        <div>
                          <span className="text-gray-500">ID Number:</span>
                          <p className="font-medium">N/A</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Bank Code:</span>
                          <p className="font-medium">N/A</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Passport number:</span>
                          <p className="font-medium">N/A</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Bank Account No.:</span>
                          <p className="font-medium">N/A</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Nationality:</span>
                          <p className="font-medium">N/A</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Bank Account Name:</span>
                          <p className="font-medium">N/A</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Date of Birth:</span>
                          <p className="font-medium">N/A</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Swift Code:</span>
                          <p className="font-medium">N/A</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Sales Supports</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Users className="w-6 h-6 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">Sarah Ng</p>
                          <p className="text-sm text-gray-600">Registration Number: 0001</p>
                          <p className="text-sm text-gray-600">Appointment Type: Recruiter / Co-Leader</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Attachment
                      <Button size="sm" variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">No attachments uploaded</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="statement" className="mt-6">
                <StatementOfAccount agentId={selectedAgent.agent_id} />
              </TabsContent>

              <TabsContent value="commission" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Commission Matrix</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Commission matrix data will be displayed here</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="accumulated" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Accumulated Commission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Accumulated commission data will be displayed here</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="referral" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Referral Commission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Referral commission data will be displayed here</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="level" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Referral Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Referral level data will be displayed here</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Internal Salesperson</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Salesperson
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Salesperson</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Upline Tier 1</TableHead>
                <TableHead>Accumulated Commission</TableHead>
                <TableHead>To Promotion</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAgents.map((agent, index) => (
                <TableRow key={agent.agent_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                        <Users className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-gray-500">{agent.agent_id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{agent.designation}</TableCell>
                  <TableCell>{agent.upline}</TableCell>
                  <TableCell>${agent.accumulated_commission.toLocaleString()}</TableCell>
                  <TableCell>${agent.to_promotion.toLocaleString()}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => setSelectedAgent(agent)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// New Statement of Account Page Component
function StatementOfAccountPage() {
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [sourceFilter, setSourceFilter] = useState("Internal Salesperson")

  const sourceOptions = ["Client", "Internal Co-broke", "External Co-broke", "Internal Salesperson"]

  // Filter agents by source
  const filteredAgents = mockAgents.filter((agent) => agent.source === sourceFilter)

  if (selectedAgent) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setSelectedAgent(null)}>
              ← Back to List
            </Button>
            <h1 className="text-2xl font-bold">Statement of Account - {selectedAgent.name}</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <StatementOfAccount agentId={selectedAgent.agent_id} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Statement of Account</h1>
          <p className="text-gray-600">View financial statements for all agents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Agent List</CardTitle>
            <div className="flex items-center gap-4">
              <Label htmlFor="source-filter">Source:</Label>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sourceOptions.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Agent ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Outstanding Balance</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.map((agent, index) => {
                // Calculate outstanding balance for each agent
                const agentTransactions = mockTransactions.filter((t) => t.agent_id === agent.agent_id)
                const outstandingBalance = agentTransactions.reduce((sum, t) => sum + t.credit - t.debit, 0)

                return (
                  <TableRow key={agent.agent_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{agent.agent_id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                          <Users className="w-4 h-4 text-gray-500" />
                        </div>
                        <span className="font-medium">{agent.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{agent.source}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={agent.status === "Active" ? "default" : "secondary"}>{agent.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${outstandingBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
                        ${Math.abs(outstandingBalance).toLocaleString()}
                        {outstandingBalance >= 0 ? " (Company owes employee)" : " (Employee owes company)"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" onClick={() => setSelectedAgent(agent)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Statement
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Enhanced Offset Modal Component with Multiple Credit Note Selection
function OffsetModal({ isOpen, onClose, billId, agentId, availableBalance, outstandingBalance, onOffset }) {
  const [selectedBill, setSelectedBill] = useState(billId || "")
  const [selectedCreditNotes, setSelectedCreditNotes] = useState({}) // Object to track selected notes and their offset amounts
  const [offsetAmounts, setOffsetAmounts] = useState({}) // Individual offset amounts for each credit note

  // Get eligible credit notes (NEW or PARTIALLY_ALLOCATED with remaining_amount > 0 and bill_id is null)
  const eligibleCreditNotes = mockCreditNotes.filter(
    (note) =>
      note.agent_id === agentId &&
      note.bill_id === null &&
      (note.status === "NEW" || note.status === "PARTIALLY_ALLOCATED") &&
      note.remaining_amount > 0,
  )

  // Get bills with balance due for this agent
  const eligibleBills = mockBills.filter((bill) => bill.agent_id === agentId && bill.balance_due > 0)

  const selectedBillData = eligibleBills.find((bill) => bill.bill_id === selectedBill)

  // Calculate total offset amount from all selected credit notes
  const totalOffsetAmount = Object.values(offsetAmounts).reduce(
    (sum, amount) => sum + (Number.parseFloat(amount) || 0),
    0,
  )

  // Calculate available credits (sum of remaining amounts of all eligible credit notes)
  const availableCredits = eligibleCreditNotes.reduce((sum, note) => sum + note.remaining_amount, 0)

  // Maximum offset is the minimum of available credits and bill balance due
  const maximumOffset = selectedBillData ? Math.min(availableCredits, selectedBillData.balance_due) : 0

  const handleCreditNoteSelection = (noteId, isSelected) => {
    setSelectedCreditNotes((prev) => {
      const updated = { ...prev }
      if (isSelected) {
        updated[noteId] = true
      } else {
        delete updated[noteId]
        // Also remove the offset amount when deselecting
        setOffsetAmounts((prev) => {
          const updatedAmounts = { ...prev }
          delete updatedAmounts[noteId]
          return updatedAmounts
        })
      }
      return updated
    })
  }

  const handleOffsetAmountChange = (noteId, amount) => {
    const note = eligibleCreditNotes.find((n) => n.note_id === noteId)
    const maxAmount = note ? note.remaining_amount : 0
    const validAmount = Math.min(Number.parseFloat(amount) || 0, maxAmount)

    setOffsetAmounts((prev) => ({
      ...prev,
      [noteId]: validAmount.toString(),
    }))
  }

  const handleApplyOffset = () => {
    if (!selectedBillData || totalOffsetAmount <= 0) {
      alert("Please select a bill and enter valid offset amounts.")
      return
    }

    if (totalOffsetAmount > selectedBillData.balance_due) {
      alert("Total offset amount cannot exceed bill balance due.")
      return
    }

    // Apply offset for each selected credit note
    const offsetOperations = []
    Object.keys(selectedCreditNotes).forEach((noteId) => {
      const amount = Number.parseFloat(offsetAmounts[noteId]) || 0
      if (amount > 0) {
        offsetOperations.push({
          creditNoteId: noteId,
          billId: selectedBill,
          amount: amount,
        })
      }
    })

    if (offsetOperations.length === 0) {
      alert("Please enter valid offset amounts for selected credit notes.")
      return
    }

    // Apply all offset operations
    offsetOperations.forEach((operation) => {
      applyOffset(operation.creditNoteId, operation.billId, operation.amount)
    })

    onOffset({
      operations: offsetOperations,
      totalAmount: totalOffsetAmount,
    })

    // Reset form
    setSelectedCreditNotes({})
    setOffsetAmounts({})
    setSelectedBill(billId || "")
  }

  const resetForm = () => {
    setSelectedCreditNotes({})
    setOffsetAmounts({})
    setSelectedBill(billId || "")
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Apply Credit Note Offset</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Bill Information Section */}
          {selectedBillData && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-3">Bill Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-blue-700">Bill:</span>
                  <p className="font-medium text-blue-900">
                    {selectedBillData.ref} - {selectedBillData.description}
                  </p>
                </div>
                <div>
                  <span className="text-blue-700">Balance Due:</span>
                  <p className="font-medium text-blue-900">${selectedBillData.balance_due.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-blue-700">Available Credits:</span>
                  <p className="font-medium text-blue-900">${availableCredits.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-blue-700">Maximum Offset:</span>
                  <p className="font-medium text-blue-900">${maximumOffset.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          {/* Outstanding Balance Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-600">Outstanding Balance:</span>
                <span className={`ml-2 font-medium ${outstandingBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ${Math.abs(outstandingBalance).toLocaleString()}
                  {outstandingBalance >= 0 ? " (Company owes employee)" : " (Employee owes company)"}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Available Credit Notes:</span>
                <span className="ml-2 font-medium">{eligibleCreditNotes.length}</span>
              </div>
            </div>
          </div>

          {/* Bill Selection */}
          <div>
            <Label className="text-base font-medium">Select Bill to Pay</Label>
            <Select value={selectedBill} onValueChange={setSelectedBill}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select a bill with balance due" />
              </SelectTrigger>
              <SelectContent>
                {eligibleBills.map((bill) => (
                  <SelectItem key={bill.bill_id} value={bill.bill_id}>
                    {bill.ref} - ${bill.balance_due.toLocaleString()} due
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Available Credit Notes Table */}
          <div>
            <h3 className="text-base font-medium mb-4">Available Credit Notes:</h3>

            {eligibleCreditNotes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No eligible credit notes available.</p>
                <p className="text-sm">
                  Credit notes must have status "NEW" or "PARTIALLY_ALLOCATED" with remaining amount &gt; 0.
                </p>
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-16">SELECT</TableHead>
                      <TableHead>REFERENCE</TableHead>
                      <TableHead>DESCRIPTION</TableHead>
                      <TableHead>STATUS</TableHead>
                      <TableHead className="text-right">ORIGINAL AMOUNT</TableHead>
                      <TableHead className="text-right">REMAINING</TableHead>
                      <TableHead className="text-right w-32">OFFSET AMOUNT</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {eligibleCreditNotes.map((note) => (
                      <TableRow key={note.note_id}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={!!selectedCreditNotes[note.note_id]}
                            onChange={(e) => handleCreditNoteSelection(note.note_id, e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </TableCell>
                        <TableCell>
                          <span className="text-blue-600 font-medium">{note.ref}</span>
                        </TableCell>
                        <TableCell>{note.description}</TableCell>
                        <TableCell>
                          <Badge
                            variant={note.status === "NEW" ? "default" : "secondary"}
                            className={note.status === "PARTIALLY_ALLOCATED" ? "bg-orange-100 text-orange-800" : ""}
                          >
                            {note.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">${note.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-medium text-green-600">
                          ${note.remaining_amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={offsetAmounts[note.note_id] || ""}
                            onChange={(e) => handleOffsetAmountChange(note.note_id, e.target.value)}
                            disabled={!selectedCreditNotes[note.note_id]}
                            max={note.remaining_amount}
                            step="0.01"
                            className="w-24 text-right"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          {/* Summary Section */}
          {totalOffsetAmount > 0 && selectedBillData && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium mb-2 text-green-800">Offset Summary:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-green-700">
                <div>
                  <p>
                    <strong>Total Offset Amount:</strong> ${totalOffsetAmount.toLocaleString()}
                  </p>
                  <p>
                    <strong>Selected Credit Notes:</strong> {Object.keys(selectedCreditNotes).length}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>New Bill Balance Due:</strong> $
                    {(selectedBillData.balance_due - totalOffsetAmount).toLocaleString()}
                  </p>
                  <p>
                    <strong>Remaining Available Credits:</strong> $
                    {(availableCredits - totalOffsetAmount).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Validation Warnings */}
          {totalOffsetAmount > maximumOffset && (
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <p className="text-sm text-red-800">
                  <strong>Warning:</strong> Total offset amount (${totalOffsetAmount.toLocaleString()}) exceeds maximum
                  allowed (${maximumOffset.toLocaleString()}).
                </p>
              </div>
            </div>
          )}

          {outstandingBalance >= 0 && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Offset is only available when employee owes company (negative outstanding
                  balance).
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                resetForm()
                onClose()
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApplyOffset}
              disabled={
                !selectedBillData ||
                totalOffsetAmount <= 0 ||
                totalOffsetAmount > maximumOffset ||
                Object.keys(selectedCreditNotes).length === 0 ||
                outstandingBalance >= 0
              }
              className="min-w-32"
            >
              Apply Offset (${totalOffsetAmount.toLocaleString()})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Main App Component
export default function FinancialManagementSystem() {
  const [currentPage, setCurrentPage] = useState("bills")

  function renderCurrentPage() {
    switch (currentPage) {
      case "bills":
        return <BillsPage />
      case "vouchers":
        return <PaymentVouchersPage />
      case "creditNotes":
        return <CreditNotesPage />
      case "salespersons":
        return <InternalSalespersonsPage />
      case "statement":
        return <StatementOfAccountPage />
      default:
        return <BillsPage />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 ml-64">
        <div className="p-6">{renderCurrentPage()}</div>
      </div>
    </div>
  )
}
