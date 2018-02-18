class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}

class SelfOrganizedList {
	constructor() {
		this.head = null;
		this.tail = null;
	}

	insert(data) {
		if (this.head === null){
			this.head = this.tail = new Node(data);
		} else {
			var newNode = new Node(data);	
			this.tail.next = newNode;
			newNode.prev = this.tail;
			this.tail = newNode;	
		}
	}

	size() {
		var size = 0,
		currentNode = this.head;
		while (currentNode !== null){
			currentNode = currentNode.next;
			size++;
		}
		return size;
	}

	at(index) {
		if (this.head === null){
			return null;
		} else {
			var i = 0,
			currentNode = this.head;
			while (i < index){
				if (currentNode === null){
					return null;
				}
				currentNode = currentNode.next;
				i++;
			}
			return currentNode.data;
		}
	}

	findNode(data) {
		var currentNode = this.head;
		while (currentNode !== null && currentNode.data !== data){
			currentNode = currentNode.next;
		}
		return currentNode;
	}

	toArray() {
		var answer = new Array(),
		currentNode = this.head;
		while (currentNode !== null){
			answer.push(currentNode.data);
			currentNode = currentNode.next;
		}
		return answer;
	}

	removeAt(index) {
		var removingNode = this.findNode(this.at(index));
		if (this.head === this.tail){
			this.head = this.tail = null;			
		}
		else {
			if (removingNode === this.head){
				this.head = this.head.next;
				this.head.prev = null;
			} else {

				if (removingNode === this.tail){				
					this.tail = this.tail.prev;	
					this.tail.next = null;
				} else {
					removingNode.prev.next = removingNode.next;
					removingNode.next.prev = removingNode.prev;
				}
			}		
		}

	}

	moveToFront(node) {
		if (node === this.head){
			node.prev = node.next = null;
			this.head = this.tail = node;
		}
		else {
			if (node === this.tail){
				this.tail = this.tail.prev;
				this.tail.next = null;

				this.head.prev = node;
				node.next = this.head;
				node.prev = null;
				this.head = node;
			} else {
				node.prev.next = node.next;
				node.next.prev = node.prev;

				this.head.prev = node;
				node.next = this.head;
				node.prev = null;
				this.head = node;

			}
		}
	}

	reorganize(data) {
		/*console.log("a");
		this.moveToFront(this.findNode(data));
		console.log("aa");
		return !!this.findNode(data);
		console.log("aaa");*/
		var node = this.findNode(data);
		if (node === null){
			return false;
		} else {
			this.moveToFront(node);
			return true;
		}
	}

}

module.exports = {
	SelfOrganizedList,
	Node
};
