
async function fetchData() {
	try{
		const response = await fetch('http://api.tvmaze.com/shows')
		const data = await response.json()
		const filmsList = document.getElementById('list_film')

		const searchButton = document.getElementById('search_button')
		const searchField = document.getElementById('search_field')

		const filmsOnPage = 10;
	
		searchButton.addEventListener('click', ()=>{ //не могу понять как соеденить поиск с остальной логикой
			let filteredData = []
			if(searchField.value){
				filteredData = data.filter(films=>{
					return films.name.toLowerCase().includes(searchField.value.toLowerCase().trim())
				})
			}
			if(!searchField.value){
				console.log('Введите хоть что-то')
			}
			searchField.value = ''
			console.log(filteredData)
		
			return filteredData
		})

		function makePagination(data){
			// const filmsOnPage = 10;
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
			
			liArray.forEach((item)=>{ // добавляем событие на каждую страницу пагинации
				item.addEventListener('click', function() { 
					showFilms(this)
				} )
			})
		}
		makePagination(data)
	
	


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
			
			putFilmsOnPage(films)
		}
		


		function putFilmsOnPage(data){ // ф-ция перебора массива и отображения фильмов
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

	} catch(e){
			console.error(e)
		}
	}
	fetchData()

