
# Electricity Bill Calculator

## Project Description

The Electricity Bill Calculator is a web-based application developed to help users calculate and manage their estimated electricity bills.

The system calculates the electricity bill based on the number of electricity units consumed and the tariff per unit.

It also provides a dashboard for viewing bill statistics and a history section for managing previously calculated bills.

## Project Objectives

- To calculate estimated electricity bills accurately.
- To allow users to save their calculated bills.
- To provide a dashboard showing bill statistics.
- To enable users to search and manage bill history.
- To allow users to download and print electricity bill receipts.
- To demonstrate the use of HTML, CSS, and JavaScript in web development.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser Local Storage

## Features

### 1. Electricity Bill Calculation

Users can enter electricity units and tariff per unit to calculate their estimated bill.

Formula:

Total Bill = Electricity Units × Tariff per Unit

### 2. Dashboard

The dashboard displays:

- Total Bills Calculated
- Total Electricity Units
- Total Amount

The dashboard updates automatically when records are added or deleted.

### 3. Bill History

The application saves calculated bills in browser Local Storage.

Each record contains:

- Electricity units
- Tariff per unit
- Total bill amount
- Date and time

### 4. Search Bill History

Users can search their saved records by units, tariff, amount, or date.

### 5. Delete Bill

Users can delete individual bill records.

### 6. Clear History

Users can clear all saved bill records.

### 7. Download Receipt

Users can download a receipt as a text file.

### 8. Print Receipt

Users can print a receipt or save it as PDF through the browser's print dialog.

### 9. Responsive Design

The application is designed to work on both desktop and mobile devices.

## Project Structure

```text
Electricity-Bill-Calculator/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run the Project

1. Download or copy the project folder.
2. Open the folder in Visual Studio Code.
3. Open `index.html` in a browser.
4. Enter electricity units and tariff per unit.
5. Click the Calculate Bill button.
6. View the result and saved bill history.

## Calculation Example

If a user consumes 100 kWh and the tariff is ₦100 per unit:

100 × 100 = ₦10,000

The estimated electricity bill is ₦10,000.

## Data Storage

The application uses browser Local Storage to save bill history.

The records remain available in the same browser unless the user clears the browser's stored data.

## Limitations

- The application calculates estimated bills only.
- It does not connect to an electricity provider.
- It does not process payments.
- Saved records are stored locally in the user's browser.

## Future Improvements

- Add user registration and login.
- Add a database for permanent online storage.
- Add monthly bill reports.
- Add graphical charts for electricity usage.
- Add electricity provider selection.

## Author

Developed as a Software and Web Development project.

## License

This project is created for educational purposes.
