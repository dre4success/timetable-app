const table = fetch('/api/view')

table
	.then(data => data.json())
	.then(data => {
		console.log(data)
		let th = Array.from(document.querySelectorAll('th'))
		let td = document.createElement('td');
		const timetable = {
			
			8: {
				"monday": {},
				"tuesday": {},
				"wednesday": {},
				"thursday": {},
				"friday": {},
				"saturday": {}
			},
			9: {
				"monday": {},
				"tuesday": {},
				"wednesday": {},
				"thursday": {},
				"friday": {},
				"saturday": {}
			},
			10: {
				"monday": {},
				"tuesday": {},
				"wednesday": {},
				"thursday": {},
				"friday": {},
				"saturday": {}
			},
			11: {
				"monday": {},
				"tuesday": {},
				"wednesday": {},
				"thursday": {},
				"friday": {},
				"saturday": {}
			},
			12: {
				"monday": {},
				"tuesday": {},
				"wednesday": {},
				"thursday": {},
				"friday": {},
				"saturday": {}
			},
			13: {
				"monday": {},
				"tuesday": {},
				"wednesday": {},
				"thursday": {},
				"friday": {},
				"saturday": {}
			},
			14: {
				"monday": {},
				"tuesday": {},
				"wednesday": {},
				"thursday": {},
				"friday": {},
				"saturday": {}
			},
			15: {
				"monday": {},
				"tuesday": {},
				"wednesday": {},
				"thursday": {},
				"friday": {},
				"saturday": {}
			},
			16: {
				"monday": {},
				"tuesday": {},
				"wednesday": {},
				"thursday": {},
				"friday": {},
				"saturday": {}
			}
		};
		data.forEach((course) => {
			const daytimes = course.daytime;
			daytimes.forEach((daytime) => {
				const time = daytime.time;
				const day = daytime.day.toLowerCase();
				timetable[time][day] = course;
			});
		});
		const tbody = document.querySelector("tbody");
		Object.keys(timetable).forEach((time) => {
			const days = timetable[time];
			const tr = document.createElement('tr');
			const tmp = document.createElement('td');
			tmp.innerHTML = `${time}`;
			tr.appendChild(tmp);
			Object.keys(days).forEach((day) => {
				const course = timetable[time][day];
				const td = document.createElement('td');
				td.innerHTML = `${course.courseName||""}`;
				tr.appendChild(td);
			})
			tbody.appendChild(tr);
		})
		console.log(timetable);
	})
	.catch((err) => {
		console.log(err)
	})