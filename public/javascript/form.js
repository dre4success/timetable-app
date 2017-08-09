	let counter = 0;
function addInput(divName) {
	

	const newTime = document.createElement('label');
	newTime.innerHTML = `Add New Time <input type='number' min='8' max='16' name='daytime[time]'>`;

	const newDay = document.createElement('label');
	newDay.innerHTML = `Add New Day <input type='text' name='daytime[day]'>`;

	document.getElementById(divName).appendChild(newTime);
	document.getElementById(divName).appendChild(newDay);

	counter++
}