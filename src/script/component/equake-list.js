/* eslint-disable max-classes-per-file */

class EquakeItem extends HTMLElement {
  set addEquakeItem(equake) {
    this._equake = equake;
    this.render();
  }

  render() {
    this.innerHTML = `
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
          <li class="list-group-item"><b>Wilayah yang merasakan gempa</b><br>
          ${this._equake.Dirasakan}
          </li>
        </ul>
      </div>
    `;
  }
}

class EquakeList extends HTMLElement {
  constructor() {
    super();
    this._shadowContent = this.attachShadow({ mode: 'open' });
  }

  set setEquakes(equakes) {
    this._equakes = equakes;
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
        .data-source-header {
          color: black;
          text-align: center;
          text-transform: uppercase;
          font-size: 1.5rem;
          padding: 1rem 6rem;
          margin: 0;
        }
        .data-source-header > a {
          text-decoration: none;
          color: inherit;
        }
        .data-source-header > a:hover {
          text-decoration: none;
          color: blue;
          font-weight: bold;
        }
        .content {
          display: grid;
          font-size: 1em;
          grid-template-columns: 1fr 1fr;
          padding: 0.5rem ;
          margin: 0 3rem;
        }
        .equake-description {
          width: 100%;
          min-width: 330px;
          padding: 0 1.5rem 2.5rem 1.5rem;
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
        @media screen and (max-width: 1000px) {
          .content {
            margin: 0 2rem;
          }
        }
        @media screen and (max-width: 760px) {
          .content {
            grid-template-columns: 1fr;
            font-size: 16px;
          }
        }
        @media screen and (max-width: 588px) {
          .content {
            margin: 0 1rem;
          }
          .equake-description {
            min-width: 300px;
          }
        }
        @media screen and (max-width: 490px) {
          .equake-description {
            font-size: 15px;
            min-width: 200px;
          }
        }
      </style>
      <div class="container-contents">
        <h3 class="data-source-header">data gempa terbaru</h3>
        <div class="content" id="equake-list-content">
          <!-- equake item -->
        </div>
      </div>
    `;
    this._equakes.forEach((equake) => {
      const equakeElement = document.createElement('equake-item');
      equakeElement.addEquakeItem = equake;
      this._shadowContent.querySelector('#equake-list-content').appendChild(equakeElement);
    });
  }
}

customElements.define('equake-item', EquakeItem);
customElements.define('equake-list', EquakeList);
