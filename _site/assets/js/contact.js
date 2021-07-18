const emContainer = document.querySelector('.emContainer');
var cpBtn;
var mtBtn;

let warningText = emContainer.querySelector('#em-reveal-js');
if(warningText)
    warningText.innerText = 'GET.';

let hasRevealed = false;
emContainer.addEventListener('click', revealEmOptions);
function revealEmOptions(){
    if(hasRevealed)
        return;
    hasRevealed = true;

    warningText.innerText = ':';
    let mtBtnAnchor = document.createElement('a');
    mtBtnAnchor.href = atob('bWFpbHRvOmJkZXNoaWludGVyYWN0aXZlK2JkZXNoaWRldkBnbWFpbC5jb20/c3ViamVjdD1EZWZhdWx0JTIwc3ViamVjdC4mYm9keT1TYXklMjBzb21ldGhpbmclMjBlbHNlLg==');
    mtBtn = document.createElement('button');
    mtBtn.classList.add('cta-button');
    mtBtn.innerText = '->MailTo';
    mtBtnAnchor.appendChild(mtBtn);
    emContainer.appendChild(mtBtnAnchor);


    cpBtn = document.createElement('button');

    cpBtn.addEventListener('click', cpToClipboard);
    cpBtn.classList.add('cta-button');
    cpBtn.innerText = '->Clipboard';

    emContainer.appendChild(cpBtn);
}

function cpToClipboard(){
    let dummy = document.createElement("textarea");
    dummy.value =  atob('YmRlc2hpaW50ZXJhY3RpdmUrYmRlc2hpZGV2QGdtYWlsLmNvbQ==');

    // Add it to the document
    document.body.appendChild(dummy);

    // Select it
    dummy.select();
    // Copy its contents
    document.execCommand("copy");

    // Remove it as its not needed anymore
    document.body.removeChild(dummy);

    changeCpButtonText();

}

function changeCpButtonText(){
    if(cpBtn.innerText != '->Clipboard')
        return;
    cpBtn.innerText ='Copied!';
    setTimeout(() => {
        cpBtn.innerText = '->Clipboard';
    }, 1000);
}