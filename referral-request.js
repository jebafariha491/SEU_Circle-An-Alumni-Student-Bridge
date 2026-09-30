const MIN_LEN = 30;
const MAX_LEN = 500;

function onMessageInput(){

  const val = document.getElementById('message').value;

  const countEl = document.getElementById('char-count');

  countEl.textContent =
    val.length + ' / ' + MAX_LEN + ' (min ' + MIN_LEN + ')';

  countEl.classList.toggle('over', val.length > MAX_LEN);

  if(val.length >= MIN_LEN){

    document.getElementById('message').classList.remove('invalid');

    document.getElementById('message-error').classList.remove('show');

  }

}


function onFileChange(){

  const input = document.getElementById('cv-upload');

  const textEl = document.getElementById('upload-text');

  if(input.files.length > 0){

    textEl.textContent = '📄 ' + input.files[0].name;

    document.getElementById('upload-box').classList.remove('invalid');

    document.getElementById('file-error').classList.remove('show');

  }
  else{

    textEl.innerHTML =
      'Click to choose a file <span class="note-up">(PDF, up to 5MB)</span>';

  }

}


document.getElementById('referral-form').addEventListener('submit', function(e){

  e.preventDefault();

  let valid = true;


  const message =
    document.getElementById('message').value.trim();

  if(message.length < MIN_LEN){

    document.getElementById('message').classList.add('invalid');

    document.getElementById('message-error').classList.add('show');

    valid = false;

  }


  const fileInput =
    document.getElementById('cv-upload');

  if(fileInput.files.length === 0){

    document.getElementById('upload-box').classList.add('invalid');

    document.getElementById('file-error').classList.add('show');

    valid = false;

  }


  if(!valid) return;


  localStorage.setItem(
    'referral_request_sent',
    JSON.stringify({
      alumni: 'Nusrat Jahan',
      company: 'Therap BD',
      message: message,
      fileName: fileInput.files[0].name,
      sentAt: new Date().toISOString()
    })
  );


  window.location.href = 'referral-confirmation.html';

});