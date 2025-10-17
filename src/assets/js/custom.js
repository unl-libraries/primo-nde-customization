//console.log('Helo from custom js');

/******** Begin the code for the libanswers libchat from springshare *****/
const libchatHash = '5dd5116ae15968f4af337742a3a5c17c';
const divEl = document.createElement('div');
divEl.id = libchatHash;
const scriptEl = document.createElement('script');
scriptEl.src = 'https://libanswers.unl.edu/load_chat.php?hash=' + libchatHash;
scriptEl.onload = () => {console.log('loaded springshare script');}

document.head.appendChild(scriptEl);
document.body.appendChild(divEl);