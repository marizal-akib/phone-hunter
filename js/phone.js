const loadPhone = async (searchText, isShowAll, noData) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll , noData);
}


const displayPhones = (phones, isShowAll , noData) => {
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    // clear phoneContainer
    phoneContainer.textContent = '';

    const noDataContainer = document.getElementById('no-data-container');

    if (phones.length === 0 & !!noData ){
        noDataContainer.classList.remove('hidden')
    }
    else{
        noDataContainer.classList.add('hidden')
    }



    const showAllContainer = document.getElementById('show-all-container');

    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }
    console.log("is show all", isShowAll)

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }



    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement("div");
        phoneCard.classList = `card bg-gray-100 p-4 shadow-m`;
        phoneCard.innerHTML = ` 
        <figure class="px-10 pt-10">
        <img src="${phone.image}" />
    </figure>
    <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>${phone.brand}</p>
        <div class="card-actions">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary"> Show Details </button>
        </div>
    </div>`;
        phoneContainer.appendChild(phoneCard)
    });

    toggledLoadingSpinner(false);


}

const handleShowDetail = async (id) => {
    console.log('clicked show details', id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);

}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('phone-show-details-name');
    phoneName.innerText = phone.name,
        show_details_modal.showModal();

    const showDetailContainer = document.getElementById('show-details-container');

    showDetailContainer.innerHTML = `
        <img class= "ml-36 mb-4" src="${phone.image}" alt="" />
        <p><span class="font-bold">Storage:</span> ${phone.mainFeatures?.storage}</p>
        <p><span class="font-bold">Display Size:</span> ${phone.mainFeatures?.displaySize}</p>
        <p><span class="font-bold">Chipset:</span> ${phone.mainFeatures?.chipSet}</p>
        <p><span class="font-bold">Memory:</span> ${phone.mainFeatures?.memory}</p>
        <p><span class="font-bold">Slug:</span> ${phone.slug}</p>
        <p><span class="font-bold">Release date:</span> ${phone.releaseDate}</p>
        <p><span class="font-bold">Brand:</span> ${phone.brand}</p>
        <p><span class="font-bold">GPS:</span> ${phone?.others?.GPS}</p>
    `;
}




// search btn
const handleSearch = (isShowAll , noData) => {
    toggledLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll, noData);
}

const toggledLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spiner");
    if (isLoading) {
        loadingSpinner.classList.remove("hidden")
    }
    else {
        loadingSpinner.classList.add("hidden")

    }
}

// show all handler
const handleShowAll = () => {
    handleSearch(true);
    // console.log('show all');
}

// no data 
const handleNoData = ()=>{
    handleSearch(true);

}

// loadPhone();