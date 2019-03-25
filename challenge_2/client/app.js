function sendDataToServer(inputJson) {
  console.log(inputJson);
  $.post({
    url: 'http://localhost:3001/data',
    contentType: 'application/json',
    data: inputJson,
  }).done(function (reply) {
    console.log("successfully sent to server, and response from server is: ", reply );
    $('#json-input').val(reply);
  }).fail(function () {
    console.log("datatype: ", typeof inputJson);
    console.log("datatype needs to be of valid content-type: application/json");
  });
}


$(document).ready(() => {
  console.log("doc loaded");

  $('.submit').click(function(e) {
    e.preventDefault();
    console.log('submit clicked');
    let inputJson = $('#json-input').val();
    console.log("sending: ", inputJson);
    sendDataToServer(inputJson);
  });

});

// console.log("Script Was Run outside of docReady")