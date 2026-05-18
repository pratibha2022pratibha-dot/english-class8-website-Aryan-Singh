/* Upload Notice */

function uploadNotice(){

    const text =
    document.getElementById("noticeText").value;

    const file =
    document.getElementById("fileInput").files[0];

    if(text === "" && !file){

        alert("Please add text or file.");

        return;
    }

    const reader = new FileReader();

    reader.onload = function(){

        const fileData = file ? reader.result : "";

        const notice = {

            text:text,

            file:fileData,

            fileName:file ? file.name : "",

            fileType:file ? file.type : "",

            time:new Date().toLocaleString()
        };

        let notices =
        JSON.parse(localStorage.getItem("schoolNotices"))
        || [];

        notices.unshift(notice);

        localStorage.setItem(
            "schoolNotices",
            JSON.stringify(notices)
        );

        document.getElementById("noticeText").value = "";

        document.getElementById("fileInput").value = "";

        alert("Notice Uploaded Successfully!");

        displayTeacherNotices();
    }

    if(file){

        reader.readAsDataURL(file);
    }
    else{

        reader.onload();
    }
}

/* Render Files */

function renderFile(notice){

    if(notice.fileType.startsWith("image/")){

        return `
        <img src="${notice.file}">
        `;
    }

    else if(notice.fileType === "application/pdf"){

        return `
        <a href="${notice.file}"
        target="_blank"
        download="${notice.fileName}">
            📄 Open PDF: ${notice.fileName}
        </a>
        `;
    }

    else{

        return `
        <a href="${notice.file}"
        download="${notice.fileName}">
            📁 Download File: ${notice.fileName}
        </a>
        `;
    }
}

/* Display Notices */

function displayTeacherNotices(){

    const preview =
    document.getElementById("preview");

    let notices =
    JSON.parse(localStorage.getItem("schoolNotices"))
    || [];

    preview.innerHTML = "";

    notices.forEach((notice, index) => {

        preview.innerHTML += `

        <div class="notice">

            <h3>📌 Notice</h3>

            <p>${notice.text}</p>

            ${notice.file ? renderFile(notice) : ""}

            <small>${notice.time}</small>

            <br><br>

            <button onclick="deleteNotice(${index})">
                🗑️ Delete Notice
            </button>

        </div>
        `;
    });
}

/* Delete Notice */

function deleteNotice(index){

    let notices =
    JSON.parse(localStorage.getItem("schoolNotices"))
    || [];

    const confirmDelete =
    confirm("Delete this notice?");

    if(confirmDelete){

        notices.splice(index, 1);

        localStorage.setItem(
            "schoolNotices",
            JSON.stringify(notices)
        );

        displayTeacherNotices();

        alert("Notice Deleted Successfully!");
    }
}

/* Load Notices Automatically */

displayTeacherNotices();