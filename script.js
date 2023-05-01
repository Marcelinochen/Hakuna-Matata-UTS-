var baris = null

function kumpul(e) {
	event.preventDefault();
        var formData = bacaData();
        if (baris == null){
            tambahBarisBaru(formData);
		}
        reset();
}

function bacaData() {
    var formData = {};
    formData["kodeantri"] = document.getElementById("kodeantri").value;
    formData["pelanggan"] = document.getElementById("pelanggan").value;
    formData["nomor"] = document.getElementById("nomor").value;
    formData["harga"] = document.getElementById("harga").value;
    return formData;
}

function tambahBarisBaru(data) {
    var table = document.getElementById("tambahList").getElementsByTagName('tbody')[0];
    var barisbaru = table.insertRow(table.length);
    cell1 = barisbaru.insertCell(0);
		cell1.innerHTML = data.kodeantri;
    cell2 = barisbaru.insertCell(1);
		cell2.innerHTML = data.pelanggan;
    cell3 = barisbaru.insertCell(2);
		cell3.innerHTML = data.nomor;
    cell4 = barisbaru.insertCell(3);
		cell4.innerHTML = data.harga;
    cell4 = barisbaru.insertCell(4);
        cell4.innerHTML = `<button onClick="hapus(this)">Lunas</button>`;
}

function hapus(td) {
    if (confirm('Pelanggan sudah Bayar ?')) {
        baris = td.parentElement.parentElement;
        document.getElementById('tambahList').deleteRow(baris.rowIndex);
        resetForm();
    }
}

function reset() {
    document.getElementById("kodeantri").value = '';
    document.getElementById("pelanggan").value = '';
    document.getElementById("nomor").value = '';
    document.getElementById("harga").value = '';
    baris = null;
}