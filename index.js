var selectedRow = null;

function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}


// Add data
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const rollNumber = document.querySelector("#rollNumber").value;
    if (firstName === "" || lastName === "" || rollNumber === "") {
        // alert("Please fill in all fields");
        showAlert("Please Fill in all Fields", "danger");
    } else {
        if (selectedRow === null) {
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${rollNumber}</td>
                <td>
                    <a href="#" class="btn btn-primary edit">Edit</a>
                    <a href="#" class="btn btn-danger delete">Delete</a>
                </td>
                `;
            list.appendChild(row);
            showAlert("Data Added", "success");
            clearFields();
        } else {
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = rollNumber;
            selectedRow = null;
            showAlert("Data Updated", "success");
        }
    }
})

// Clear fields
function clearFields() {
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#rollNumber").value = "";
}

// Delete data
document.querySelector("#student-list").addEventListener("click", (e) => {
        target = e.target;
        if (target.classList.contains("delete")) {
            target.parentElement.parentElement.remove();
            showAlert("Data Deleted", "danger");
        }
    })
    // Edit data
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#rollNumber").value = selectedRow.children[2].textContent;
    }
})