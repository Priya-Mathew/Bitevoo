function saveCardDetails() {
    const saveChecked = document.getElementById("saveCard").checked;
    const cardNumber = document.getElementById("cardNumber").value;
    const expiry = document.getElementById("expiry").value;
    const address = document.getElementById("address").value;
    if (!saveChecked) {
        showToast('Please check the box to confirm saving your card details.');
        return;
    }
    else {
        if (cardNumber == null || cardNumber == '') {
            message.textContent = "❌ Please enter your card number!";
            message.style.color = "red";
            return false;
        }
        else if (expiry == null || expiry == '') {
            message.textContent = "❌ Please enter the expiry date!";
            message.style.color = "red";
            return false;
        }
        else if (address == null || address == '') {
            message.textContent = "❌ Please enter the address!";
            message.style.color = "red";
            return false;
        }
    }



    // Get current user ID from localStorage
    const userId = localStorage.getItem("loggedInUser"); // set this on login

    if (!userId) {
        showToast('User not logged in.');
        return;
    }

    const savedDetails = {
        cardNumber,
        expiry,
        address
    };

    // Save per-user card info
    localStorage.setItem(`cardDetails_${userId}`, JSON.stringify(savedDetails));
    showToast('💾 Card details saved');
}
function Payment() {
    let message = document.getElementById("paymentMessage");
    const cardNumber = document.getElementById("cardNumber").value;
    const expiry = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value;
    const address = document.getElementById("address").value;

    if (cardNumber == null || cardNumber == '') {
        message.textContent = "❌ Please enter your card number!";
        message.style.color = "red";
        return false;
    }
    else if (expiry == null || expiry == '') {
        message.textContent = "❌ Please enter the expiry date!";
        message.style.color = "red";
        return false;
    }
    else if (cvv == null || cvv == '') {
        message.textContent = "❌ Please enter the cvv!";
        message.style.color = "red";
        return false;
    }
    else if (address == null || address == '') {
        message.textContent = "❌ Please enter your address!";
        message.style.color = "red";
        return false;
    }

    // Set flag in localStorage
    localStorage.setItem("paymentStatus", "success");
    // Redirect to success page
    setTimeout(() => {
        window.location.href = "final.html";
    }, 2000);
    return false;
}