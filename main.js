


document.addEventListener('DOMContentLoaded', function () {
    const routesTableBody = document.getElementById('routesTableBody'); 
    const pagination = document.getElementById('pagination'); 
    const searchInput = document.getElementById('searchInput'); 
    const gidTableBody = document.getElementById('gidTableBody');
    const buttonForm = document.getElementById('buttonForm'); 
    
    const searchButton = document.querySelector('.btn-primary');
    
    
    let currentPage = 1;
    let currentPageG = 1;

    const itemsPerPage = 10; 
    let allRoutesData = []; 
    let allGidData =[];

    function getRoutesData() {
        const apiUrl = `http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=ff1c575c-8565-4a6d-8663-4aea8fb95b46`;
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                allRoutesData = data; 
                console.log(allRoutesData)
                updataTable(currentPage);
            })
            // .catch(error => {
            //     console.error('Ошибка получения данных о маршрутах:', error);
            // });
    };

    function getGidData(id, nameRoute){
        const apiUrlG = `http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes/${id}/guides?api_key=ff1c575c-8565-4a6d-8663-4aea8fb95b46`;
        
        fetch(apiUrlG)
            .then(response => response.json())
            .then(dataG => {
                allGidData = dataG; 
                console.log(dataG);
                updataGid(currentPageG, nameRoute);
            })
            // .catch(error => {
            //     console.error('Ошибка получения данных о гидах:', error);
            // });

    };
   
    
    getRoutesData();
    
    



    

    searchButton.addEventListener('click', function () {
        event.preventDefault(); 

        const searchTerm = searchInput.value.toLowerCase(); 

        const filteredRoutes = allRoutesData.filter(route => {
            return route.name.toLowerCase().includes(searchTerm);
        });

        
        routesTableBody.innerHTML = '';
        filteredRoutes.forEach(route => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const descriptionCell = document.createElement('td');
            const objectsCell = document.createElement('td');
            const buttonCell = document.createElement('td');
            const selectButton = document.createElement('button');
            let idRoute = undefined;
            
        
            nameCell.textContent = route.name;
            descriptionCell.textContent = route.description;
            objectsCell.textContent = route.mainObject;
            idRoute = route.id

            selectButton.textContent = 'Выбрать';
            selectButton.classList.add('btn', 'btn-secondary', 'selectRouteBtn');
            selectButton.addEventListener('click', function () {
                row.classList.toggle('selected');
                document.getElementById('nameRoute').innerText = `"${route.name}"`;

                getGidData(route.id, route.name);

            });

            buttonCell.appendChild(selectButton);

            row.appendChild(nameCell);
            row.appendChild(descriptionCell);
            row.appendChild(objectsCell);
            row.appendChild(buttonCell);

            routesTableBody.appendChild(row);
        });

        
    });

    function updataTable(currentPage) {

        routesTableBody.innerHTML = '';
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const routesData = allRoutesData.slice(startIndex, endIndex);

        routesData.forEach(route => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const descriptionCell = document.createElement('td');
            const objectsCell = document.createElement('td');
            const buttonCell = document.createElement('td');
            const selectButton = document.createElement('button');
            
            nameCell.textContent = route.name;
            descriptionCell.textContent = route.description;
            objectsCell.textContent = route.mainObject;

            selectButton.textContent = 'Выбрать';
            selectButton.classList.add('btn', 'btn-secondary', 'selectRouteBtn');
            selectButton.addEventListener('click', function () {
                row.classList.toggle('selected');
                document.getElementById('nameRoute').innerText = `"${route.name}"`;

                getGidData(route.id,route.name);
            });

            buttonCell.appendChild(selectButton);

            row.appendChild(nameCell);
            row.appendChild(descriptionCell);
            row.appendChild(objectsCell);
            row.appendChild(buttonCell);

            routesTableBody.appendChild(row);
        });

        createPagination();
    }

    function createPagination() {

        pagination.innerHTML = '';
        const totalPages = Math.ceil(allRoutesData.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.classList.add('page-link');
            a.href = '#';
            a.textContent = i;

            if (i === currentPage) {
                li.classList.add('page-item', 'active');
            } else {
                li.classList.add('page-item');
            }

            a.addEventListener('click', function (event) {
                event.preventDefault();
                currentPage = i;
                updataTable(currentPage);
            });

            li.appendChild(a);
            pagination.appendChild(li);
        }
    };


    function updataGid(page, nameRoute) {
        gidTableBody.innerHTML = '';
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const gitData = allGidData.slice(startIndex, endIndex);

        gitData.forEach(gid => {
            const row = document.createElement('tr');
            const nameGit = document.createElement('td');
            const langGit = document.createElement('td');
            const workGit = document.createElement('td');
            const moneyGit = document.createElement('td');
            const buttonGit = document.createElement('td');
            const selectButtonGit = document.createElement('button');

            nameGit.textContent = gid.name;
            langGit.textContent = gid.language;
            workGit.textContent = gid.workExperience;
            moneyGit.textContent = gid.pricePerHour;
            selectButtonGit.textContent = 'Выбрать';
            selectButtonGit.classList.add('btn', 'databutton', 'btn-secondary');
            selectButtonGit.setAttribute('data-price-per-hour', gid.pricePerHour);
            selectButtonGit.setAttribute('data-guide-id', gid.id);
            selectButtonGit.setAttribute('data-route-id', routeId);
            selectButtonGit.addEventListener('click', function () {
                document.getElementById('nameRoute').innerText = `"${gid.name}"`;
                document.getElementById('nameRoute').innerText = `"${nameRoute}"`;
                
                selectButtonGit.classList.toggle('selectedG');
                buttonForm.click();
            });

            buttonGit.appendChild(selectButtonGit);

            row.appendChild(nameGit);
            row.appendChild(langGit);
            row.appendChild(workGit);
            row.appendChild(moneyGit);
            row.appendChild(buttonGit)

            gidTableBody.appendChild(row);
        });
    };






    document.getElementById('calculateCost').addEventListener('click', function () {
        const hoursNumber = parseInt(document.getElementById('duration').value);
        console.log(hoursNumber)
        
        const tourDate = new Date(document.getElementById('tourDate').value);
        console.log(tourDate)
        const startTime = document.getElementById('startTime').value;
        console.log(startTime)
        
        

        const isThisDayOff = calculateIsThisDayOff(tourDate);
        console.log(isThisDayOff)

        const isItMorning = calculateIsItMorning(startTime);
        console.log(isItMorning)

        const isItEvening = calculateIsItEvening(startTime);
        console.log(isItEvening)


        
        let guidePricePerHour = parseFloat(document.querySelector('.btn.selectedG').getAttribute('data-price-per-hour'));
        console.log(guidePricePerHour)
        if (isNaN(guidePricePerHour)) {
            guidePricePerHour = 1400;
        }
        const numberOfVisitors = parseInt(document.getElementById('groupSize').value);
        console.log(numberOfVisitors);

        const totalPrice = calculatePrice(
            guidePricePerHour,
            hoursNumber,
            isThisDayOff,
            isItMorning,
            isItEvening,
            numberOfVisitors
        );


        document.getElementById('totalCost').value = totalPrice.toFixed(2);
        const requestBody = {
            guide_id: 2, // Пример значения
            route_id: 20, // Пример значения
            date: '2024-01-15', // Пример значения в формате YYYY-MM-DD
            time: '14:30', // Пример значения в формате HH:MM
            duration: 2, // Пример значения от 1 до 3
            persons: 10, // Пример значения от 1 до 20
            price: 1500, // Пример значения
            optionFirst: 1, // Пример значения, передаваемого как 0 или 1 (ноль или единица)
            optionSecond: 0, // Пример значения, передаваемого как 0 или 1 (ноль или единица)
            student_id: 789 // Пример значения
            // Добавьте другие значения, если необходимо
        };

    });


    function calculatePrice(guideServiceCost, hoursNumber, isThisDayOff, isItMorning, isItEvening, numberOfVisitors) {
        let totalPrice = guideServiceCost * hoursNumber * isThisDayOff + isItMorning + isItEvening;

        if (numberOfVisitors > 0 && numberOfVisitors <= 5) {
            totalPrice += 0; 
        } else if (numberOfVisitors > 5 && numberOfVisitors <= 10) {
            totalPrice += 1000; 
        } else if (numberOfVisitors > 10 && numberOfVisitors <= 20) {
            totalPrice += 1500;
        }

        return totalPrice;
    };

    function calculateIsThisDayOff(date) {
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return 1.5; 
        } else {
            return 1; 
        }
    };

    
    function calculateIsItMorning(time) {
        const startTime = new Date(`05/05/2024 ${time}`);

        const morningStartTime = new Date(`05/05/2024 09:00`);
        const morningEndTime = new Date(`05/05/2024 12:00`);

        if (startTime >= morningStartTime && startTime <= morningEndTime) {
            return 400;
        } else {
            return 0;
        }
    };

    function calculateIsItEvening(time) {
        const startTime = new Date(`05/05/2024 ${time}`); 

        const eveningStartTime = new Date(`05/05/2024 20:00`);
        const eveningEndTime = new Date(`05/05/2024 23:00`);

        if (startTime >= eveningStartTime && startTime <= eveningEndTime) {
            return 1000; 
        } else {
            return 0; 
        }
    };

});