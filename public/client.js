let socket = io();
let form = document.getElementById('form');
let title = document.getElementById('title');
let price = document.getElementById('price');
let thumbnail = document.getElementById('thumbnail');
let messages = document.getElementById('messages')
socket.emit('askCurrentData');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	socket.emit('add products', {
		title: title.value,
		price: price.value,
		thumbnail: thumbnail.value,
	});
	title.value = '';
	price.value = '';
	thumbnail.value = '';
});

const renderProducts = (data) => {
	let productshtml = data
		.map((product) => {
			return `<tr>
						<td>${product.title}</td>
						<td>${product.price}</td>
						<td>
							<img
							    style='width: 50px; height: auto'
								src='${product.thumbnail}'
								alt='products'
							/>
						</td>
					</tr>`;
		})
		.join(' ');

	document.getElementById('products').innerHTML = productshtml;
};

socket.on('messages', (data) => {
	console.log('RECIBI MENSAJE');
	alert(data);
  });

socket.on('updateChat', (messages) => {
	messages.forEach((message) => {
	  renderChat(message);
	});
});

submitChat.addEventListener('submit', (e) => {
	let form = submitChat.getElementsByTagName('input');
	let inputText = document.getElementById('text');
	let inputs = new Object();
	e.preventDefault();
  
	for (let index = 0; index < form.length; index++) {
	  inputs[form[index].name] = form[index].value;
	}
	socket.emit('new-message', inputs);
	inputText.value = '';
  });

renderChat = (data) => {
	let chatUl = document.getElementById('messages');
	let newElement = document.createElement('li');
	newElement.className = 'message left appeared';
	let htmlMessage = `
	<div class="avatar"></div>
	<div class="text_wrapper">
		<span class="email">${data.email}</span>
		<span class="date"> [ ${data.date} ]: </span>
		<span class="text">${data.text}</span>
	</div>`;
	newElement.innerHTML = htmlMessage;
	chatUl.appendChild(newElement);
	chatUl.scrollTo(0, document.body.scrollHeight);
  };

socket.on('products', (data) => {
	renderProducts(data);
});