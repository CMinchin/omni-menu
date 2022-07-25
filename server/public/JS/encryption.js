function encrypt(text,password) {
    return CryptoJS.AES.encrypt(text,password).toString();
}

function decrypt(EncryptedValue,password) {
    return CryptoJS.AES.decrypt(EncryptedValue,password).toString(CryptoJS.enc.Utf8);
}

const secret = 'aaa';

const password = localStorage.getItem("password") || secret;

$("#new").submit((event)=>{
    event.preventDefault();
    const passwordEl = document.getElementById('password')
     console.log(passwordEl.value, 'passss');
    const passwordVal = passwordEl.value;

    
    const encrypted = encrypt(passwordVal, password);
    console.log(encrypted, 'encccc');
    const body = JSON.stringify({
        name: $("#name").val(),
        username: $("#username").val(),
        website: $("#website").val(),
        password: encrypted
    })
    console.log(body)
    fetch('../api/passwords/', {method:'post', headers: {
        "Content-Type": 'application/json'
      },body
    }).then((res)=>{
        console.log(res);
        if (res.status==200) {
            window.location.replace("./");
        }
    });
});

$("#edit").submit((event)=>{
    const body = JSON.stringify({
        name: $("#name").val(),
        username: $("#username").val(),
        website: $("#website").val(),
        password: encrypt($("#password").val(), password)
    })
    console.log(body)
    event.preventDefault();
    fetch('../../api/passwords/'+window.location.toString().split("/")[5], {method:'post', headers: {
        "Content-Type": 'application/json'
      },body
    }).then((res)=>{
        console.log(res);
        if (res.status==200) {
            window.location.replace("../");
        }
    });
});

if ($("#edit").length) {
    $("#password").val(decrypt($("#password").val(),password));
}

if ($(".card-password").length) {
    const passes = $(".card-password");
    for (let x = 0; x < passes.length; x++) 
    {
        let pass = passes[x];
        try {
            let encryptedValue = passes[x].children[0].textContent.trim();
            let newContent = decrypt(encryptedValue,password);
            if (newContent) {
                passes[x].children[0].textContent = newContent;
            }
            // console.log(encryptedValue, newContent);
        } catch (e) {
            console.log(`pass ${x+1} not decrypted ${e}`);
        }
    }
}