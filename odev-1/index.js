window.onload = function (e) {
    const gridData = [];
    const searchableGridData = [];

    const form = document.querySelector(".form-section");
    const search = document.getElementById("searchQueryInput");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const value = Object.fromEntries(data.entries());

        console.table(value);
    });


    search.addEventListener('input', (event) => {
      searchGrid(event.target.value)
    });

    sideBarToogle = () => {
        const sideBar = document.querySelector(".side-bar");
        sideBar.classList.toggle("active-sidebar");
    };

    showForm = () => {
        console.log("dsadsd");
        const grid = document.querySelector(".grid-section");
        const form = document.querySelector(".form-section");

        grid.classList.remove("active-grid");
        if (!form.classList.contains("active-form")) {
            form.classList.add("active-form");
        }
    };

    showGrid = () => {
        const grid = document.querySelector(".grid-section");
        const form = document.querySelector(".form-section");

        form.classList.remove("active-form");

        if (!grid.classList.contains("active-grid")) {
            grid.classList.add("active-grid");
        }
    };

    renderGridData = (gridData) => {
        const grid = document.querySelector(".grid");
        let grids = "";
        gridData.forEach((data) => {
          let tags = data.tags.map((tag) => (`<div class="category-item">${tag}</div>`));
            grids += (
                `<div class="grid-card">
                    <div class="grid-image">
                        <img src=${data.image} />
                    </div>
                    <div class="title">${data.text}</div>
                    <div class="category">${tags.join('')}</div>
                </div>`
            );
        });
        grid.innerHTML = grids;
    };

    searchGrid = (text) => {
      this.searchableGridData = this.gridData.filter(data => data.text.includes(text));
      renderGridData(this.searchableGridData);
    }

    (getGridData = () => {
        fetch("https://dummyapi.io/data/v1/post?limit=10", { headers: { "app-id": "613deab59443ae2c580f371b" } })
            .then((response) => response.json())
            .then((data) => {
                this.gridData = data.data;
                this.searchableGridData = data.data;
                renderGridData(this.searchableGridData);
            });
    })();
};
