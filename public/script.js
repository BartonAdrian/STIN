(function() {
    const app = document.querySelector(".app");

    let uname;

    app.querySelector(".chat-screen #send-message").addEventListener("click", function() {
        let message = app.querySelector(".chat-screen #message-input").value;

        if (!validate(message)) {
            app.querySelector(".chat-screen #message-input").value = "";
            return;
        }

        if (message.length == 0) {
            return;
        }
        renderMessage("my", {
            username: uname,
            text: message
        });

        fetch('/', {
                method: 'POST',
                headers: {
                    Message: message,
                },
                body: JSON.stringify({
                    message,
                }),
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => renderMessage("other", { username: data.name, text: data.response }));

        app.querySelector(".chat-screen #message-input").value = "";
    });

    function validate(input) {
        const forbiddenChars = ["<", ">", "script", "%"];
        var result = true;
        forbiddenChars.forEach(element => {
            if (input.includes(element)) {
                result = false;
            }
        });
        return result;
    }


    function renderMessage(doc, type, message) {
        let messsageContainer = app.querySelector(".chat-screen .messages");
        //console.log(message);
        if (type == "my") {
            let el = document.createElement("div");
            el.setAttribute("class", "message my-message");
            el.innerHTML = `
                <div>
                    <div class="name">You</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messsageContainer.append(el);
        } else if (type == "other") {
            let el = document.createElement("div");
            el.setAttribute("class", "message other-message");
            el.innerHTML = `
                <div>
                    <div class="name">${message.username}</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messsageContainer.append(el);
        } else if (type == "update") {
            let el = document.createElement("div");
            el.setAttribute("class", "update");
            el.innerText = message;
            messsageContainer.append(el);
        }
        messsageContainer.screenTop = messsageContainer.scrollHeight - messsageContainer.clientHeight;
    }
})();

module.exports = { renderMessage, validate }