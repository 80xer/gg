/* eslint-disable class-methods-use-this */
import { addClass, hasClass } from './utils';

class Pagination {
  constructor(props) {
    this.props = props;
    this.$area = this.createPaginationArea();
    this.createPageButtons();
    this.setEventHandler();
  }

  createPaginationArea() {
    const paginationArea = document.createElement('div');
    addClass(paginationArea, 'gg-pagination-area');
    return paginationArea;
  }

  createPageButtons() {
    const { rowCount, perPage, pageIdx } = this.props;
    const pageCount = rowCount % perPage === 0 ? rowCount / perPage : rowCount / perPage + 1;
    this.pageCount = pageCount;
    let buttonsHTML = '';
    const visibleIndex = this.getVisibleIndex(pageCount, 5, pageIdx);
    visibleIndex.forEach((i) => {
      buttonsHTML += `<a href="#" class="gg-page-btn" data-page-index=${i}>${i}</a>`;
    });

    // 이전 페이지네이션 버튼
    if (visibleIndex[0] > 1) {
      buttonsHTML = `<a href="#" class="gg-page-btn gg-prev-is-ellip gg-first-child"><span class="gg-ico-ellip">...</span></a>${buttonsHTML}`;
    }

    // 다음 페이지네이션 버튼
    if (visibleIndex[visibleIndex.length - 1] < pageCount) {
      buttonsHTML +=
        '<a href="#" class="gg-page-btn gg-next-is-ellip gg-last-child"><span class="gg-ico-ellip">...</span></a>';
    }

    this.$area.innerHTML += buttonsHTML;
  }

  getVisibleIndex(pageCount, visibleCount, curIndex) {
    let start;
    let end;
    const stdMiddle = Math.floor(visibleCount / 2);
    start = curIndex - stdMiddle;
    end = curIndex + stdMiddle;
    if (start < 0) {
      end += 1 - start;
      start += 1 - start;
    }
    if (end > pageCount) {
      start -= end - pageCount;
      end -= end - pageCount;
    }

    const result = [];
    for (let index = start; index <= end; index += 1) {
      result.push(index);
    }

    return result;
  }

  setEventHandler() {
    this.$area.addEventListener('click', (e) => {
      if (hasClass(e.target, 'gg-page-btn')) {
        if (e.target.dataset.pageIndex) {
          this.props.callback.call(this.props.grid, e.target.dataset.pageIndex);
        }
      }
    });
  }
}

export default Pagination;
