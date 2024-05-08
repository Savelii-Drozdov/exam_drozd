


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
            selectButtonGit.classList.add('btn', 'btn-secondary', 'selectGitBtn');
            selectButtonGit.addEventListener('click', function () {
                document.getElementById('nameRoute').innerText = `"${gid.name}"`;
                document.getElementById('nameRoute').innerText = `"${nameRoute}"`;
                
                row.classList.toggle('selected');
                buttonForm.click();
            });

            buttonGit.appendChild(selectButtonGit);

            row.appendChild(nameGit);
            row.appendChild(langGit);
            row.appendChild(workGit);
            row.appendChild(moneyGit);
            row.appendChild(buttonGit)

            gidTableBody.appendChild(row);
        })


        
    }


});