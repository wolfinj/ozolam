/// Add new class to hide element and format control elements

const newStyle = document.createElement('style');

newStyle.textContent = `
.hideEnabled {
  display : none
}
 
.wBtn {
  
  background-color: #000000e6;
  color: #ffffff;
  border-radius: 8px;
  font-size:20px;
  padding: 3px;
  margin:3px
}

.wBtn:hover {
  
  text-decoration: underline;
}

.wBtn:active {
  background-color: #8a0000
}

.ctrlBtn {
  top:100px;
  right:10px;
  position:fixed;
  z-index:9999;
  border-radius: 5px;
  padding: 5px;
  background-color: #424242bf;
  color: #ffffff;
  text-align:center;
  font-size: 20px;
  font-weight:bold;
}
`;

document.head.append(newStyle);

/// hide enabled elements

function hideEnabled() {
  const btnList = document.querySelectorAll('.bootstrap-switch-on');
  btnList.forEach((btn) => {
    btn.closest('.form-group').classList.add('hideEnabled');
  });
}

// Show hidden elements

function showHidden() {
  const hiddenList = document.querySelectorAll('.hideEnabled');
  hiddenList.forEach((elem) => elem.classList.remove('hideEnabled'));
}

//Hide enabled with empty topics

function hideEmptyHeadings() {
  hideEnabled();
  const allElContainers = document.querySelectorAll('.form-body');
  const allEl = allElContainers[1].children;
  let hrEl, h5El;
  let divEl = true;

  for (let i = 0; i < allEl.length; i++) {
    if (allEl[i]?.nodeName === 'H5' || i + 1 === allEl.length) {
      if (divEl && h5El) {
        if (hrEl) hrEl.classList.add('hideEnabled');
        h5El.classList.add('hideEnabled');
      }
      hrEl = undefined;
      h5El = undefined;
      divEl = true;

      if (allEl[i].previousSibling.previousSibling?.nodeName === 'HR') {
        hrEl = allEl[i].previousSibling.previousSibling;
      }
      h5El = allEl[i];
    }
    if (allEl[i]?.nodeName === 'DIV') {
      if (!divEl || !allEl[i].classList.contains('hideEnabled')) {
        divEl = false;
      }
    }
  }
}

//Hide Elektrum

function hideElektrum() {
  const allElContainers = document.querySelectorAll('.form-body');
  const allEl = allElContainers[1].children;

  let elektrumGroup = false;
  for (let i = 0; i < allEl.length; i++) {
    if (
      allEl[i]?.nodeName === 'H5' &&
      allEl[i]?.textContent.includes('Elektrum')
    ) {
      elektrumGroup = true;
    }
    if (
      allEl[i]?.nodeName === 'H5' &&
      !allEl[i]?.textContent.includes('Elektrum')
    ) {
      elektrumGroup = false;
    }
    if (elektrumGroup) {
      allEl[i].classList.add('hideEnabled');
      if (allEl[i - 1].nodeName === 'HR')
        allEl[i - 1].classList.add('hideEnabled');
    }
  }
}

// Create control buttons

const controlPanel = document.createElement('div');
controlPanel.classList.add('ctrlBtn');

const buttonHide = document.createElement('Button');
buttonHide.classList.add('wBtn');
buttonHide.innerHTML = ' Hide ';
buttonHide.onclick = hideEnabled;

const buttonHideT = document.createElement('Button');
buttonHideT.classList.add('wBtn');
buttonHideT.innerHTML = ' HideAll (test) ';
buttonHideT.onclick = hideEmptyHeadings;

const buttonShow = document.createElement('Button');
buttonShow.classList.add('wBtn');
buttonShow.innerHTML = ' Show ';
buttonShow.onclick = showHidden;

const buttonHideElektrum = document.createElement('Button');
buttonHideElektrum.classList.add('wBtn');
buttonHideElektrum.innerHTML = ' Hide Elektrum';
buttonHideElektrum.onclick = hideElektrum;

controlPanel.append('Controls');
controlPanel.append(document.createElement('br'));
controlPanel.append(buttonHide);
controlPanel.append(buttonShow);
controlPanel.append(document.createElement('br'));
controlPanel.append(buttonHideT);
controlPanel.append(document.createElement('br'));
controlPanel.append(buttonHideElektrum);

document.body.appendChild(controlPanel);
