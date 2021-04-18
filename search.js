async function fetchData() {
	try{
		const response = await fetch('http://api.tvmaze.com/shows')
		const data = await response.json()
		const filmsList = document.getElementById('list_film')
		console.log(data)
		
		const filmsOnPage = 10;
		const countOfPages = Math.ceil(data.length / filmsOnPage) // расчет кол-ва страниц пагинации
		const paginationList = document.getElementById('pagination')
		const liArray = []

		for(let i=1; i<=countOfPages; i++){ //создаем нумерацию пагинации
			const li = document.createElement('li')
			const a = document.createElement('a')
			li.textContent = i
			
			a.setAttribute('href','#top')
			a.append(li)

			paginationList.append(a)
			liArray.push(li)
		}

		showFilms(liArray[0])//при загрузке сайта выводится первая страница пагинации.
		
		for(let li of liArray){  // добавляем событие на каждую страницу пагинации
			li.addEventListener('click', function() {
				showFilms(this)
			} )
		}
	
		function showFilms(page){ //ф-ция для отображения конкретного кол-ва фильмов на конкретной странице
			const active = document.querySelector('li.active')
			
			if(active){
				active.classList.remove('active')
			}
			page.classList.add('active') 

			const pageNum = +page.innerText;
			const from = (pageNum - 1) * filmsOnPage 
			const to   = from + filmsOnPage // формула расчета разбиения массива, для распределения фильмов на соответсвующих страницах

			const films = data.slice(from, to) 
			filmsList.textContent = ''
			
			films.forEach(film => { // отображение фильмов на соответсвующих страницах
				const li = document.createElement('li')
				const div = document.createElement('div')
				const filmName = document.createElement('span')
				
				filmName.className = 'filmName'
				div.className = 'element'
				
				filmName.textContent = film.name
				
				if(!film.image){
					div.innerText =` ${film.name} - POSTER`
				} else {
					div.style.backgroundImage = `url(${film.image.original})`
				}
				
				li.append(div)
				li.prepend(filmName)
				filmsList.append(li)
			})
		}

		function searchFilms(someData){
			const searchButton = document.getElementById('search_button')

			searchButton.addEventListener('click', function(){
				const searchFieldValue = document.getElementById('search_field').value.toLowerCase().trim()
				// console.log(searchFieldValue)

				if(searchFieldValue) {
					someData.forEach(function({name}){
						const nameInLowerCase = name.toLowerCase()
						
						if(nameInLowerCase.includes(searchFieldValue)){
							console.log(name)
						} else{
							console.log('there is no such film')
						}
					})
				}
			 
			

				document.getElementById('search_field').value = ''
			})
		}
		searchFilms(data)

	} catch(e){
			console.error(e)
		}
	}
	fetchData()

	// const names = []
				// data.find((elem)=>{
				// 	names = elem.name
				// 	console.log(cons.toLowerCase())
				// })





function filmsShow(data){

	data.forEach(film => { // отображение фильмов на соответсвующих страницах
		const li = document.createElement('li')
		const div = document.createElement('div')
		const filmName = document.createElement('span')
		
		filmName.className = 'filmName'
		div.className = 'element'
		
		filmName.textContent = film.name
		
		if(!film.image){
			div.innerText =` ${film.name} - POSTER`
		} else {
			div.style.backgroundImage = `url(${film.image.original})`
		}
		
		li.append(div)
		li.prepend(filmName)
		filmsList.append(li)
	})

}
