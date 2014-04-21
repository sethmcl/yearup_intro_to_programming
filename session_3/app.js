alert('Welcome!');

var name = prompt('What is your name?');

if (name === 'obama') {
	alert('Nice to see you again, Mr. President');
} else if (name.length < 5) {
	alert('I like your name, ' + name);
} else {
	alert('Oh, hello ' + name);
}
