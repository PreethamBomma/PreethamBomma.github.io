var table1Cost = 0,
    table2Cost = 0,
    table3Cost = 0;

var tables = {
    "table1": {
        "itemCount": 0,
        "bill": 0,
        "dishes": [],
        "dishCount": []
    },
    "table2": {
        "itemCount": 0,
        "bill": 0,
        "dishes": [],
        "dishCount": []
    },
    "table3": {
        "itemCount": 0,
        "bill": 0,
        "dishes": [],
        "dishCount": []
    }
}
var menu = {
    "menu1": {
        "dish": "Crusty Garlic Focaccia with melted cheese",
        "cost": 105,
        "dragCount": 0,
    },
    "menu2": {
        "dish": "French fries",
        "cost": 205,
        "dragCount": 0,
    },
    "menu3": {
        "dish": "Home Country Fries with Herbs and Chilli Flakes",
        "cost": 305,
        "dragCount": 0,
    },
    "menu4": {
        "dish": "French fries with Cheese & Jalapenos",
        "cost": 405,
        "dragCount": 0,
    }

}



function searchTable() {
    var input = document.getElementById("tableName");
    var filter = input.value.toLowerCase();
    var nodes = document.getElementsByClassName('table-names');
    for (i = 0; i < nodes.length; i++) {
        if (nodes[i].innerText.toLowerCase().includes(filter)) {
            nodes[i].style.display = "block";
        } else {
            nodes[i].style.display = "none";
        }
    }
}

function searchMenu() {
    var input = document.getElementById("searchMenu");
    var filter = input.value.toLowerCase();
    var nodes = document.getElementsByClassName('menu-names');

    for (i = 0; i < nodes.length; i++) {
        if (nodes[i].innerText.toLowerCase().includes(filter)) {
            nodes[i].style.display = "block";
        } else {
            nodes[i].style.display = "none";
        }
    }
}

function allowDrop(ev) {

    ev.preventDefault();
    console.log(ev.target.id);
}

function drag(ev) {
    console.log("dragged with id  " + ev.target.id);
    var menuName = document.getElementById(ev.target.id), menuDetails;
    var dishPrice = 0;
    menu[ev.target.id].dragCount += 1;
    for (i = 0; i < menuName.childNodes.length; i++) {

        menuDetails = menuName.childNodes[i];
        if (menuDetails.id == "cost") {
            dishPrice = menuDetails.textContent;
        }
    }
    let dish = document.getElementById(ev.target.id).children[3].textContent;
    console.log(dish);
    var data = [dish, dishPrice];
    ev.dataTransfer.setData("text", dish);
    ev.dataTransfer.setData("cost", menu[event.target.id].cost);
    ev.dataTransfer.setData("name", menu[event.target.id].dish);

}

function drop(ev, t) {
    ev.preventDefault();
    let cost = ev.dataTransfer.getData("cost");
    let name = ev.dataTransfer.getData("name");
    tables[ev.target.id].bill += parseInt(cost);
    t.childNodes[7].textContent = tables[ev.target.id].bill;
    isItemAlreadyPresentOnTable(ev.target.id, name);
    tables[ev.target.id].itemCount += 1;
    t.childNodes[9].textContent = tables[ev.target.id].itemCount;
    console.log("got the dishPrice " + cost);
}

function isItemAlreadyPresentOnTable(tableId, itemName) {
    for (i = 0; i < tables[tableId]["dishes"].length; i++) {
        if (tables[tableId]["dishes"][i] == itemName) {
            tables[tableId]["dishCount"][i]++;
            return;
        }
    }
    tables[tableId].dishes.push(itemName);
    tables[tableId].dishCount.push(1);
}

function getOrderDetails(event, t) {
    console.log("clicked " + event.id);
    console.log("checking t " + t.id);
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
    var orderHeading = document.getElementById("orderHeading").innerHTML = document.getElementById(event.id).childNodes[1].textContent + " | Order details";
    // Get the button that opens the modalev
    //var btn = document.getElementById("myBtn");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the modal
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        document.getElementById('popup-body').innerHTML = "";
        document.getElementById("totalcost").innerHTML = "";
        modal.style.display = "none";
    }
    displayOrderDetails(event.id);
}

function displayOrderDetails(tableId) {
    console.log("in displayOrderDetails " + tableId);
    const tableBody = document.getElementById('popup-body');
    let i = 1;
    let rmI = 0;
    tableBody.innerHTML = "";
    console.log(tables[tableId].dishes);
    for (dish in tables[tableId].dishes) {
        console.log(tables[tableId].dishes[dish] + " for loop");
        let dishCost = 0;
        for (j = 1; j <= 4; j++) {
            if (menu["menu" + j]["dish"] == tables[tableId].dishes[dish])
                dishCost = menu["menu" + j]["cost"];
        }
        console.log(tables[tableId].dishCount[dish]);

        tableBody.innerHTML += `<tr> <td class ="sNo"> ${i++} </td>
    <td class = "itemName">${tables[tableId].dishes[dish]}</td>
    <td id = "itemPrice" class = "itemPrice"> ${dishCost} </td>
    <td>
          <label id = "noOfServings" style="font-size: 10px; display: block" for="quantity">Number of Servings</label>
          <input id="quantity" name="quantity" class="quantity"  oninput = "getTotalBill(tableBody)" type="number" min="1" step="1" value="${tables[tableId].dishCount[dish]}" />
    </td>
    <td> <img class = "remove" style = "padding-left: 15px;" height = "18px" src = "trashCanImage" onclick ="removeItem(this, ${rmI},${tableId})" /> </td>
    </tr>`;

        getTotalBill(tableBody);
        rmI++;
    }
    let modalFooter = document.getElementById("closeSession");
    modalFooter.innerHTML = `<p onclick = closeSession(${tableId})> CLOSE SESSION (GENERATE BILL) </p>`;
    for (k = 0; k < document.getElementsByClassName("quantity").length; k++)
        document.getElementsByClassName("quantity")[k].oninput = function() {
            console.log("onInput");
            getTotalBill(tableBody)
        };
}

function getTotalBill(tableBody) {
    let totalCost = 0;
    let totalCount = 0;
    var quantity = tableBody.getElementsByClassName("quantity");
    Array.from(quantity).forEach(function(count) {
        if (!(count.value == ''))
            totalCount += parseInt(count.value);
        totalCost += count.value * count.parentElement.previousElementSibling.innerHTML;
    });
    var totalcost = document.getElementById("totalcost");

    totalcost.innerHTML = "Cost: " + totalCost;
}

function removeItem(t, i, tableId) {
    console.log("in removeItem with row" + i);
    console.log(tables[tableId.id].dishes);
    console.log("checking splice");
    for (let k = 0; k < tables[tableId.id].dishes.length; k++) {
        if (tables[tableId.id].dishes[k] != document.getElementById("popup-body").rows[i].cells[1].innerHTML)
            continue;
        var indexToRemove = k;
    }
    for (let j = indexToRemove; j < tables[tableId.id].dishes.length; j++) {
        tables[tableId.id].dishes[j] = tables[tableId.id].dishes[j + 1];
    }
    tables[tableId.id].dishes.length = tables[tableId.id].dishes.length - 1;
    tables[tableId.id].itemCount = tables[tableId.id].itemCount - document.getElementById("popup-body").rows[i].cells[3].children[1].value;
    document.getElementById(tableId.id).childNodes[7].textContent = document.getElementById(tableId.id).childNodes[7].textContent - (document.getElementById("popup-body").rows[i].cells[3].children[1].value * parseInt(document.getElementById("popup-body").rows[i].cells[2].innerHTML));
    //changing cost in table order popup body

    if (tables[tableId.id].itemCount == 0)
        document.getElementById("totalcost").textContent = "";
    else
        document.getElementById("totalcost").textContent = "Cost: " + (parseInt(document.getElementById(tableId.id).childNodes[7].textContent)) //- ( parseInt(document.getElementById("popup-body").rows[i].cells[3].children[1].value) * parseInt(document.getElementById("popup-body").rows[i].cells[2].innerHTML)));
    tables[tableId.id].bill = parseInt(document.getElementById(tableId.id).childNodes[7].textContent);
    document.getElementById("popup-body").deleteRow(i);
    document.getElementById(tableId.id).childNodes[9].textContent = tables[tableId.id].itemCount;
}

function closeSession(tableId) {

    alert("Total bill: " + document.getElementById("totalcost").innerHTML);
    const tableBody = document.getElementById('popup-body');
    document.getElementById("totalcost").innerHTML = "";
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
    tableBody.innerHTML = "";
    tables[tableId.id].itemCount = 0;
    tables[tableId.id].bill = 0;
    tables[tableId.id].dishes = [];
    tables[tableId.id].dishCount = [];
    document.getElementById(tableId.id).childNodes[9].textContent = 0;
    document.getElementById(tableId.id).childNodes[7].textContent = 0;
}
