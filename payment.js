
function payWithPaystack(e) {
    e.preventDefault();

    var emailAddress = document.getElementById('email').value;
    var phone = document.getElementById('phone').valueAsNumber;
    var fname = document.getElementById('fname').value;
    var surname = document.getElementById('surname').value;
    var ticketType = document.getElementById('ticketType').value;
    var whoisBuying = document.getElementById('personBuying').value;
    var hub = document.getElementById('hub').value;
    var amount = document.getElementById('amount').value;




    var handler = PaystackPop.setup({ 
        key: 'pk_test_ee82b172ba5d9137cba871d02aca4f8c14cb304f', //put your public key here
        email: emailAddress, //payer email here
        amount: amount * 100,
        label: fname + ' ' + surname,
        metadata: {
            custom_fields: [
                {
                    display_name: "Mobile Number",
                    variable_name: "mobile_number",
                    value: phone, //customer's mobile number
                    firstName: fname,
                    surname: surname,
                    ticketType: ticketType,
                    whoIsBuying: whoisBuying,
                    hub: hub
                }
            ]
        },
        callback: function (response) {
            //after the transaction have been completed
            //make post call to the server with to verify payment 
            //using transaction reference as post data
            $.post("verify.php", {reference:response.reference}, function(status){
                if(status == "success")
                    //successful transaction
                    alert('Transaction was successful');
                else
                    //transaction failed
                    alert(response);
            });
        },
        onClose: function () {
            //when the user close the payment modal
            alert('Transaction cancelled');
        },
    });

    handler.openIframe(); //open the paystack's payment modal
   
}

