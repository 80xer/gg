/* eslint-disable class-methods-use-this */
import { addClass } from './utils';

class Pagination {
  constructor(props) {
    this.props = props;
    this.$area = this.createPaginationArea();
    this.createPageButtons();
  }

  createPaginationArea() {
    const paginationArea = document.createElement('div');
    addClass(paginationArea, 'gg-pagination-area');
    return paginationArea;
  }

  createPageButtons() {
    const { rowCount, perPage } = this.props;
    const pageCount = rowCount % perPage === 0 ? rowCount / perPage : rowCount / perPage + 1;
    let buttonsHTML = '';
    for (let i = 1; i <= pageCount; i += 1) {
      buttonsHTML += `<a href="#" class="gg-pagination-btn">${i}</a>`;
    }

    this.$area.innerHTML += buttonsHTML;
  }
}

export default Pagination;
