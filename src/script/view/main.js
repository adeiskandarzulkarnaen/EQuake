/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */

import '../component/main-banner.js';
import '../component/equake-autoupdate.js';
import '../component/equake-list.js';

import fetchWithProxy from '../utils/fetchWithproxy.js';
import convertISODateToLocalString from '../utils/dateUtils.js';
import { showResponseSuccess, showResponseFailed, showErrorMessage } from '../utils/sweetAlert.js';

const main = () => {
  const baseUrl = 'https://data.bmkg.go.id/DataMKG/TEWS';

  /* don't remove */
  const mainElement = document.querySelector('main');
  const searchEquakeElement = document.querySelector('nav-bar');
  const mainBannerElement = document.querySelector('main-banner');

  const getAutoUpdate = async () => {
    try {
      const response = await fetchWithProxy(`${baseUrl}/autogempa.json`);
      const responseJson = await response.json();
      if (response.status === 200) {
        showResponseSuccess('menampilkan data gempa terbaru');
        const dataEquake = responseJson.Infogempa.gempa;
        const autoUpdateElement = document.createElement('equake-autoupdate');
        autoUpdateElement.addContent = dataEquake;
        mainElement.innerHTML = '';
        mainElement.append(autoUpdateElement);
      } else {
        showResponseFailed('check your internet connection', 'network failed');
      }
    } catch (error) {
      showErrorMessage(error);
    }
  };

  const searchEquakeByDate = async () => {
    try {
      const inputValueFromSearchBar = searchEquakeElement.getDateValue;
      if (inputValueFromSearchBar) {
        const response = await fetchWithProxy(`${baseUrl}/gempadirasakan.json`);
        const responseJson = await response.json();
        const earthQuakeDataFromResponse = responseJson.Infogempa.gempa;

        if (response.status === 200) {
          const searchResult = earthQuakeDataFromResponse.filter((earthQuake) => {
            return convertISODateToLocalString(earthQuake.DateTime) === inputValueFromSearchBar;
          });

          if (searchResult.length) {
            showResponseSuccess('menampilkan hasil pencarian ');
            const equakeListElement = document.createElement('equake-list');
            equakeListElement.setEquakes = searchResult;
            mainElement.innerHTML = '';
            mainElement.append(equakeListElement);
          } else {
            showResponseFailed('tidak ada data gempa', 'nothing');
          }
        }
      } else {
        showResponseFailed('silahkan input tanggal terlebih dahulu', 'no date selected');
        mainElement.innerHTML = '';
      }
    } catch (error) {
      showErrorMessage(error);
    }
  };

  searchEquakeElement.searchEvent = searchEquakeByDate;
  mainBannerElement.clickEvent = getAutoUpdate;
};

export default main;
