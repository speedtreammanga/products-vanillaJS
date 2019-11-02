"use strict";

let data = {
	"count": 7,
	"nodes": {
		"abc": {
			"id": "abc",
			"name": "The Solstice",
			"price": 65,
			"rating": 5,
			"imageUrl": "https://res.cloudinary.com/urbanstems/image/upload/w_1600/products/the-solstice/k2aznaou_carousel-1",
			"cart": true,
		},
		"def": {
			"id": "def",
			"name": "The Roman",
			"price": 65,
			"rating": 4,
			"imageUrl": "https://res.cloudinary.com/urbanstems/image/upload/w_1600/products/the-roman/jwkuz7wh_carousel-1",
			"cart": false
		},
		"hij": {
			"id": "hij",
			"name": "The Azores",
			"price": 50,
			"rating": 3,
			"imageUrl": "https://res.cloudinary.com/urbanstems/image/upload/w_1600/products/the-azores/jwqwy0sm_carousel-1",
			"cart": false
		},
		"klm": {
			"id": "klm",
			"name": "The Runyon",
			"price": 48,
			"rating": 5,
			"imageUrl": "https://res.cloudinary.com/urbanstems/image/upload/w_1600/products/the-runyon/jxlz20v7_carousel-1",
			"cart": true
		},
		"nop": {
			"id": "nop",
			"name": "The Archie",
			"price": 65,
			"rating": 3,
			"imageUrl": "https://res.cloudinary.com/urbanstems/image/upload/w_1600/products/the-archie/jx0xnlix_carousel-1",
			"cart": false
		},
		"qrs": {
			"id": "qrs",
			"name": "The Audubon",
			"price": 70,
			"rating": 4,
			"imageUrl": "https://res.cloudinary.com/urbanstems/image/upload/w_1600/products/the-audubon/jyrjpcjs_carousel-1",
			"cart": false
		},
		"tuv": {
			"id": "tuv",
			"name": "The Phoebe",
			"price": 55,
			"rating": 2,
			"imageUrl": "https://res.cloudinary.com/urbanstems/image/upload/w_1600/products/the-phoebe/k1b6leeh_carousel-1",
			"cart": false
		}
	}
}

const Node = {
	getDOMElement: function(element) {
		return document.querySelector(`.product[key=${this.id}] ${element ? element : ''}`);
	},
	render: function () {
		this.createNode();
		const button = this.getDOMElement('.picture button');
		button.addEventListener('click', () => this.addRemoveFromCart());
		this.update();
	},
	getRating: function() {
		let str = "";
		for (let i = 0; i < 5; i++) {
			str += i <= (this.rating - 1) ? '⭑' : '⭒';
		}
		return str;
	},
	addRemoveFromCart: function() {
		this.cart = !this.cart;
		this.update();
	},
	update: function() {
		this.updateCartButton();
		this.updateCartTag();
	},
	updateCartTag: function() {
		let tagNode = this.getDOMElement('.cart-tag');
		if (!this.cart && tagNode) {
			tagNode.remove();
		} else if (this.cart && !tagNode) {
			const node = this.getDOMElement();
			tagNode = document.createElement('div');
			tagNode.setAttribute('class', 'cart-tag');
			tagNode.innerText = 'In Cart';
			node.insertBefore(tagNode, node.firstChild);
		}
	},
	updateCartButton: function() {
		const text = this.cart ? 'Remove From Cart' : 'Add to Cart';
		let button = this.getDOMElement('button');
		button.innerText = text;
	},
	createNode: function() {
		var div = document.createElement('div');
		div.setAttribute('class', `product col ${this.cart ? 'in-cart': ''}`);
		div.setAttribute('key', this.id);
	
		div.innerHTML = `
			${this.cart && '<div class="cart-tag">In Cart</div>' || ''}
			<div class="picture">
				<img src="${this.imageUrl}" />
				${this.cart
					? '<button>Remove From Cart</button>'
					: '<button>Add to Cart</button>'
				}
			</div>
			<div class="details">
				<div>
					<h4>${this.name}</h4>
					<div class="rating">
						${this.getRating()}
					</div>
				</div>
				<div class="price">$${this.price}</div>
			</div>
		`.trim();
		
		target.appendChild(div);
	}
}

const target = document.getElementById('container');

const init = () => {
	const nodeKeys = Object.keys(data.nodes);

	for (let i = 0; i < nodeKeys.length; i++) {
		const product = data.nodes[nodeKeys[i]];
		Object.setPrototypeOf(product, Node);
		product.render();
	}
}
init();