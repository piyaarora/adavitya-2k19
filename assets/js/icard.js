const BASEURL = "https://adavitya.predot.co.in/";
const API_ID = "6d8e710f9b34dc5e705f46f30da44c87";

function generateIcard() {
      
    var formData = new FormData();
    var file = document.getElementById('fileToUpload').files[0];

    formData.append('api_id', "6d8e710f9b34dc5e705f46f30da44c87");
    formData.append('photo', file);
    formData.append('full_name', $("#student_name").val());
    formData.append('clg_name', $("#university_name").val());
    formData.append('phone_number', $("#phone_number").val());
    formData.append('email', $("#student_email").val());
    formData.append('clg_roll_number', $("#university_roll_number").val());

    $.ajax({
        url : 'https://adavitya.predot.co.in/Registration/register',
        type : 'POST',
        data : formData,
        processData: false,  // tell jQuery not to process the data
        contentType: false,  // tell jQuery not to set contentType
        success : function(data) {  
            
            // console.log(data);
            // alert(data);
            var res = JSON.parse(data);
            if(res.response == false)
            {
                alert(res.msg);
            }
            else if(res.response === true)
            {
                alert(res.msg);
            }
        }
    });

}

