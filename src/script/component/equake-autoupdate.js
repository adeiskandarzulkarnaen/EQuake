class EquakeAutoUpdate extends HTMLElement {
  constructor() {
    super();
    this._shadowContent = this.attachShadow({ mode: 'open' });
  }

  set addContent(equake) {
    this._equake = equake;
    this.render();
  }

  render() {
    this._shadowContent.innerHTML = `
      <style>
        * {
          margin : 0 ;
          padding : 0 ;
          box-sizing: border-box;
        }
        :host {
          font-family: inherit;
          margin: 0 auto;
          color: white;
        }
        .container-contents {
          margin: 0 auto;
          background-color: #fff;
          padding: 1rem 0;
        }
        .equake-data-source {
          color: black;
          text-align: center;
          text-transform: uppercase;
          font-size: 1.5em;
          padding: 1rem 3rem;
          margin: 0;
        }
        .content {
          display: flex;
          flex-wrap: wrap;
          font-size: 1em;
          padding: 0.5rem 2rem;
          margin: 0 6rem;
        }
        .equake-description {
          width: 100%;
          min-width: 330px;
          flex: 1 0 0%;
          padding: 0 1.5rem;
          margin-top: 0.5rem;
        }
        .list-group {
          display: flex;
          flex-direction: column;
          padding-left: 0;
          margin-bottom: 0;
          border-radius: 0.375rem;
        }
        ul {
          margin-top: 0;
          list-style-type: disc;
          margin-inline: 0px;
          margin-block: 1em;
        }
        .list-group-item {
          position: relative;
          display: block;
          padding: 0.2rem 1rem;
          color: #212529;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid rgba(0, 0, 0, 0.125);
        }
        li {
          display: list-item;
          text-align: left;
          line-height: 1.9;
        }
        .equake-location {
          flex: 1 0 0%;
          width: 100%;
          max-width: 100%;
          padding-right: calc(1.5rem * 0.5);
          padding-left: calc(1.5rem * 0.5);
          margin-top: 0;
        }
        .location-img {
          display: block;
          min-width: 380px;
          max-width: 100%;
          height: auto;
          margin: 0 auto;
        }
        @media screen and (max-width: 1000px) {
          .content {
            margin: 0 2.5rem;
          }
        }
        @media screen and (max-width: 900px) {
          .content {
            flex-direction: column-reverse;
            font-size: 0.9em;
          }
        }
        @media screen and (max-width: 588px) {
          .content {
            margin: 0 1rem;
          }
          .equake-description {
            font-size: 0.8em;
            max-width: 400px;
            min-width: 300px;
          }
          .location-img {
            min-width: 300px;
          }
        }
        @media screen and (max-width: 490px) {
          .equake-description {
            min-width: 200px;
          }
          .location-img {
            min-width: 200px !important;
          }
        }
      </style>
      <div class="container-contents">
        <h3 class="equake-data-source ">data gempa terbaru</h3>
        <div class="content">
          <div class="equake-description">
            <ul class="list-group">
              <li class="list-group-item"><b>Waktu Kejadian Gempa</b><br>
                ${this._equake.Tanggal}, ${this._equake.Jam}
              </li>
              <li class="list-group-item"><b>Titik Koordinat Gempa</b><br>
                ${this._equake.Lintang} , ${this._equake.Bujur}
              </li>
              <li class="list-group-item"><b>Magnitude ( Kekuatan Gempa )</b><br>
                ${this._equake.Magnitude}
              </li>
              <li class="list-group-item"><b>Kedalaman Gempa</b><br>
                ${this._equake.Kedalaman}
              </li>
              <li class="list-group-item"><b>Wilayah terdekat dengan lokasi</b><br>
                ${this._equake.Wilayah}
              </li>
              <li class="list-group-item"><b>Berpotensi terjadinya tsunami atau tidak </b><br>
                ${this._equake.Potensi}
              </li>
              <li class="list-group-item"><b>Wilayah yang merasakan gempa </b><br>
                ${this._equake.Dirasakan}
              </li>
            </ul>
          </div>
          <div class="equake-location">
            <img class="location-img" src="https://data.bmkg.go.id/DataMKG/TEWS/${this._equake.Shakemap}" alt="img-lokasi">
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('equake-autoupdate', EquakeAutoUpdate);
