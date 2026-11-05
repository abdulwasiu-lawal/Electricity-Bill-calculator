
/* =====================================
   ELECTRICITY BILL CALCULATOR
   COMPLETE JAVASCRIPT - DAY 10
===================================== */


/* =====================================
   GET HTML ELEMENTS
===================================== */

const billForm = document.getElementById("billForm");

const unitsInput = document.getElementById("units");
const tariffInput = document.getElementById("tariff");

const errorMessage = document.getElementById("errorMessage");

const resultSection = document.getElementById("result");
const billAmount = document.getElementById("billAmount");

const billHistory = document.getElementById("billHistory");
const historySearch = document.getElementById("historySearch");
const clearHistoryButton = document.getElementById("clearHistory");

// Dashboard elements
const totalBillsElement = document.getElementById("totalBills");
const totalUnitsElement = document.getElementById("totalUnits");
const totalAmountElement = document.getElementById("totalAmount");


/* =====================================
   LOAD SAVED HISTORY
===================================== */

let history = [];

try {
    history = JSON.parse(
        localStorage.getItem("electricityBillHistory")
    ) || [];
} catch (error) {
    history = [];
}


/* =====================================
   FORMAT CURRENCY
===================================== */

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}


/* =====================================
   SAVE HISTORY
===================================== */

function saveHistory() {
    localStorage.setItem(
        "electricityBillHistory",
        JSON.stringify(history)
    );
}


/* =====================================
   DAY 10 - UPDATE DASHBOARD
===================================== */

function updateDashboard() {

    // Total number of saved bills
    const totalBills = history.length;

    // Total electricity units
    const totalUnits = history.reduce(function (total, bill) {
        return total + Number(bill.units || 0);
    }, 0);

    // Total amount of saved bills
    const totalAmount = history.reduce(function (total, bill) {
        return total + Number(bill.amountValue || 0);
    }, 0);

    // Display dashboard values
    totalBillsElement.textContent = totalBills;

    totalUnitsElement.textContent =
        totalUnits.toLocaleString("en-NG", {
            maximumFractionDigits: 2
        }) + " kWh";

    totalAmountElement.textContent =
        formatCurrency(totalAmount);
}


/* =====================================
   DISPLAY BILL HISTORY
===================================== */

function displayHistory() {

    billHistory.innerHTML = "";

    const searchText = historySearch.value
        .toLowerCase()
        .trim();

    // Filter history based on search input
    const filteredHistory = history
        .map(function (bill, index) {
            return {
                ...bill,
                originalIndex: index
            };
        })
        .filter(function (bill) {

            const searchableText = `
                ${bill.units}
                ${bill.tariff}
                ${bill.amount}
                ${bill.date}
            `.toLowerCase();

            return searchableText.includes(searchText);
        });

    // Show empty message if no records exist
    if (filteredHistory.length === 0) {

        const emptyMessage = document.createElement("p");

        emptyMessage.className = "empty-history";

        if (history.length === 0) {
            emptyMessage.textContent = "No bill history yet.";
        } else {
            emptyMessage.textContent =
                "No bill records match your search.";
        }

        billHistory.appendChild(emptyMessage);

        updateDashboard();

        return;
    }

    // Display each bill record
    filteredHistory.forEach(function (bill) {

        const historyItem = document.createElement("div");

        historyItem.className = "history-item";

        const unitsParagraph = document.createElement("p");
        unitsParagraph.innerHTML =
            `<strong>Units Consumed:</strong> ${bill.units} kWh`;

        const tariffParagraph = document.createElement("p");
        tariffParagraph.innerHTML =
            `<strong>Tariff per Unit:</strong> ${formatCurrency(Number(bill.tariff))}`;

        const amountParagraph = document.createElement("p");
        amountParagraph.innerHTML =
            `<strong>Total Bill:</strong> ${bill.amount}`;

        const dateParagraph = document.createElement("p");
        dateParagraph.innerHTML =
            `<strong>Date:</strong> ${bill.date}`;

        // Download receipt button
        const downloadButton = document.createElement("button");

        downloadButton.type = "button";
        downloadButton.className = "download-receipt-button";
        downloadButton.textContent = "Download Receipt";

        downloadButton.dataset.receiptIndex =
            bill.originalIndex;

        // Print receipt button
        const printButton = document.createElement("button");

        printButton.type = "button";
        printButton.className = "print-receipt-button";
        printButton.textContent = "Print Receipt";

        printButton.dataset.printIndex =
            bill.originalIndex;

        // Delete bill button
        const deleteButton = document.createElement("button");

        deleteButton.type = "button";
        deleteButton.className = "delete-bill-button";
        deleteButton.textContent = "Delete Bill";

        deleteButton.dataset.deleteIndex =
            bill.originalIndex;

        // Add elements to history item
        historyItem.appendChild(unitsParagraph);
        historyItem.appendChild(tariffParagraph);
        historyItem.appendChild(amountParagraph);
        historyItem.appendChild(dateParagraph);

        historyItem.appendChild(downloadButton);
        historyItem.appendChild(printButton);
        historyItem.appendChild(deleteButton);

        billHistory.appendChild(historyItem);
    });

    updateDashboard();
}


/* =====================================
   CALCULATE BILL
===================================== */

billForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const units = Number(unitsInput.value);
    const tariff = Number(tariffInput.value);

    // Reset previous error message
    errorMessage.textContent = "";

    // Validate input values
    if (
        unitsInput.value.trim() === "" ||
        tariffInput.value.trim() === ""
    ) {
        errorMessage.textContent =
            "Please enter both electricity units and tariff.";

        return;
    }

    if (
        !Number.isFinite(units) ||
        !Number.isFinite(tariff) ||
        units < 0 ||
        tariff < 0
    ) {
        errorMessage.textContent =
            "Please enter valid positive values.";

        return;
    }

    // Calculate electricity bill
    const amount = units * tariff;

    // Format bill amount
    const formattedBill = formatCurrency(amount);

    // Display result
    billAmount.textContent = formattedBill;

    resultSection.style.display = "block";

    // Create bill record
    const billRecord = {
        units: units,
        tariff: tariff,
        amount: formattedBill,
        amountValue: amount,
        date: new Date().toLocaleString("en-NG")
    };

    // Add bill record to history
    history.unshift(billRecord);

    // Save and display updated history
    saveHistory();

    displayHistory();

    // Clear input fields
    billForm.reset();

});


/* =====================================
   SEARCH BILL HISTORY
===================================== */

historySearch.addEventListener("input", function () {

    displayHistory();

});


/* =====================================
   DELETE ONE BILL
===================================== */

function deleteBill(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this bill?"
    );

    if (!confirmDelete) {
        return;
    }

    history.splice(index, 1);

    saveHistory();

    displayHistory();
}


/* =====================================
   CLEAR ALL HISTORY
===================================== */

clearHistoryButton.addEventListener("click", function () {

    if (history.length === 0) {
        alert("There is no bill history to clear.");
        return;
    }

    const confirmClear = confirm(
        "Are you sure you want to clear all bill history?"
    );

    if (!confirmClear) {
        return;
    }

    history = [];

    saveHistory();

    displayHistory();

});


/* =====================================
   DOWNLOAD RECEIPT
===================================== */

function downloadReceipt(index) {

    const bill = history[index];

    if (!bill) {
        alert("Bill record not found.");
        return;
    }

    const receiptContent = `
====================================
       ELECTRICITY BILL RECEIPT
====================================

Electricity Units: ${bill.units} kWh

Tariff per Unit: ${formatCurrency(Number(bill.tariff))}

Total Bill: ${bill.amount}

Date: ${bill.date}

------------------------------------
Thank you for using our calculator.
====================================
    `;

    const blob = new Blob(
        [receiptContent],
        { type: "text/plain" }
    );

    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");

    downloadLink.href = url;

    downloadLink.download =
        `electricity-bill-receipt-${index + 1}.txt`;

    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);

    URL.revokeObjectURL(url);
}


/* =====================================
   PRINT RECEIPT
===================================== */

function printReceipt(index) {

    const bill = history[index];

    if (!bill) {
        alert("Bill record not found.");
        return;
    }

    const printWindow = window.open(
        "",
        "_blank",
        "width=600,height=600"
    );

    if (!printWindow) {

        alert(
            "Please allow pop-ups in your browser to print the receipt."
        );

        return;
    }

    const receiptHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">

            <meta name="viewport"
                  content="width=device-width, initial-scale=1.0">

            <title>Electricity Bill Receipt</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 30px;
                    color: #1e293b;
                }

                .receipt {
                    max-width: 500px;
                    margin: auto;
                    border: 1px solid #cbd5e1;
                    padding: 25px;
                    border-radius: 10px;
                }

                h1 {
                    text-align: center;
                    color: #166534;
                    font-size: 22px;
                }

                .line {
                    border-top: 1px dashed #94a3b8;
                    margin: 20px 0;
                }

                p {
                    margin: 12px 0;
                    font-size: 15px;
                }

                .total {
                    font-size: 22px;
                    font-weight: bold;
                    color: #15803d;
                }

                .footer {
                    text-align: center;
                    margin-top: 25px;
                    font-size: 13px;
                }

                @media print {
                    body {
                        padding: 0;
                    }

                    .receipt {
                        border: none;
                    }
                }
            </style>
        </head>

        <body>

            <div class="receipt">

                <h1>Electricity Bill Receipt</h1>

                <div class="line"></div>

                <p>
                    <strong>Electricity Units:</strong>
                    ${bill.units} kWh
                </p>

                <p>
                    <strong>Tariff per Unit:</strong>
                    ${formatCurrency(Number(bill.tariff))}
                </p>

                <p class="total">
                    Total Bill: ${bill.amount}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${bill.date}
                </p>

                <div class="line"></div>

                <div class="footer">
                    Thank you for using our Electricity Bill Calculator.
                </div>

            </div>

            <script>
                window.onload = function () {
                    window.print();
                };
            <\/script>

        </body>
        </html>
    `;

    printWindow.document.open();

    printWindow.document.write(receiptHTML);

    printWindow.document.close();
}


/* =====================================
   HISTORY BUTTON EVENTS
===================================== */

billHistory.addEventListener("click", function (event) {

    const target = event.target;

    // Download receipt
    if (target.classList.contains("download-receipt-button")) {

        const index = Number(
            target.dataset.receiptIndex
        );

        downloadReceipt(index);
    }

    // Print receipt
    if (target.classList.contains("print-receipt-button")) {

        const index = Number(
            target.dataset.printIndex
        );

        printReceipt(index);
    }

    // Delete bill
    if (target.classList.contains("delete-bill-button")) {

        const index = Number(
            target.dataset.deleteIndex
        );

        deleteBill(index);
    }

});


/* =====================================
   INITIALIZE APPLICATION
===================================== */

// Display saved history when page loads
displayHistory();

// Update dashboard when page loads
updateDashboard();
