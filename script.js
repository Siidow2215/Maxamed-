// Marka bogga la furo, soo rukh xogta horey u kaydsanayd
document.addEventListener('DOMContentLoaded', loadData);

const billForm = document.getElementById('billForm');

billForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Soo qaado xogta foomka
    const nameInput = document.getElementById('name').value.trim();
    const meterInput = document.getElementById('meter').value.trim();
    const unitsInput = document.getElementById('units').value;

    // 2. Validation: Hubi in Magacu yahay String kaliya (Xarfo iyo Boos)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(nameInput)) {
        alert("Cilad: Magaca macmiilka waa inuu xarfo kaliya noqdaa!");
        return;
    }

    // 3. Validation: Hubi in Meter-ku yahay tiro kaliya
    if (isNaN(meterInput) || meterInput === "") {
        alert("Cilad: Meter Number-ka waa inuu tiro kaliya noqdaa!");
        return;
    }

    // 4. Hubi in Units-ku ay sax yihiin
    const units = parseFloat(unitsInput);
    if (isNaN(units) || units < 0) {
        alert("Fadlan geli cadadka units-ka oo sax ah!");
        return;
    }

    // 5. Xisaabi Biilka ($0.60 per unit tusaale ahaan)
    const pricePerUnit = 0.60;
    const billAmount = units * pricePerUnit;

    // 6. Samee shay (Object) xogta u taagan
    const billData = {
        name: nameInput,
        meter: meterInput,
        units: units,
        billAmount: billAmount
    };

    // 7. Ku dar shaxda (Table) oo kaydi
    addBillToTable(billData);
    saveToLocalStorage(billData);
    updateSummary();

    // Nadiifi foomka
    billForm.reset();
});

// Shaqada ku darista Shaxda
function addBillToTable(bill) {
    const billList = document.getElementById('billList');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${bill.name}</td>
        <td>${bill.meter}</td>
        <td>${bill.units}</td>
        <td>$${bill.billAmount.toFixed(2)}</td>
        <td><button class="delete-btn" onclick="deleteBill(this)">Remove</button></td>
    `;
    billList.appendChild(row);
}

// Shaqada xisaabinta guud (Summary)
function updateSummary() {
    const rows = document.querySelectorAll('#billList tr');
    let totalCustomers = rows.length;
    let totalRevenue = 0;

    rows.forEach(row => {
        const amount = parseFloat(row.cells[3].innerText.replace('$', ''));
        totalRevenue += amount;
    });

    document.getElementById('totalCustomers').innerText = totalCustomers;
    document.getElementById('totalRevenue').innerText = totalRevenue.toFixed(2);
}

// Shaqada tirtirista
function deleteBill(btn) {
    if (confirm("Ma hubtaa inaad tirtirto macmiilkan?")) {
        const row = btn.parentElement.parentElement;
        const name = row.cells[0].innerText;
        
        row.remove();
        removeFromLocalStorage(name);
        updateSummary();
    }
}

//--- QAYBTA KAYDKA (LOCAL STORAGE) ---

function saveToLocalStorage(bill) {
    let bills = localStorage.getItem('bills') ? JSON.parse(localStorage.getItem('bills')) : [];
    bills.push(bill);
    localStorage.setItem('bills', JSON.stringify(bills));
}

function loadData() {
    let bills = localStorage.getItem('bills') ? JSON.parse(localStorage.getItem('bills')) : [];
    bills.forEach(bill => addBillToTable(bill));
    updateSummary();
}

function removeFromLocalStorage(name) {
    let bills = JSON.parse(localStorage.getItem('bills'));
    const filteredBills = bills.filter(bill => bill.name !== name);
    localStorage.setItem('bills', JSON.stringify(filteredBills));
}
function showPage(pageId) {
    // Qari dhamaan boggaga
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('about-page').style.display = 'none';
    document.getElementById('contact-page').style.display = 'none';

    // Soo saar bogga la riixay
    document.getElementById(pageId + '-page').style.display = 'block';
}
