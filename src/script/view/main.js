import '../component/main-banner.js';
import '../component/equake-autoupdate.js';

const main = () => {
	const baseUrl = "https://data.bmkg.go.id/DataMKG/TEWS" ;
	const mainElement = document.querySelector('main'); /* don't remove */
	const mainBannerElement = document.querySelector('main-banner'); /* don't remove */
	
	const getAutoUpdate = async () => {
		try {
			const response = await fetchWithProxy(`${baseUrl}/autogempa.json`); 
			const statusFetch = response.status; 
			const responseJson = await response.json();
			
			if(response.status === 200){
				swal("Fetch Success", "data telah tersedia", "success");
				let dataEquake = responseJson.Infogempa.gempa;
				
				const autoUpdateElement = document.createElement('equake-autoupdate');
				autoUpdateElement.addContent = dataEquake;
				mainElement.innerHTML = '';
				mainElement.append(autoUpdateElement);
			} else {
				showResponseMessage(`status response : ${statusFetch}`);
			}
		} catch (error) {
			showResponseMessage(error);
		}
	}
	
	const fetchWithProxy = (url, options) => {
		return fetch(`https://api.allorigins.win/raw?url=${url}`,options);
	}
	
	const showResponseMessage = (message = 'Check your internet connection') => {
		swal("Error", `${message}`, "error");
	}
	
	mainBannerElement.clickEvent = getAutoUpdate;
}

export default main;