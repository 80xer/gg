/* eslint-disable class-methods-use-this */
import { addClass, hasClass } from './utils';

class Pagination {
  constructor(props) {
    this.props = props;
    this.visiblePages = 5;
    this.$area = this.createPaginationArea();
    this.createPageButtonGroup();
    this.setEventHandler();
  }

  createPaginationArea() {
    const paginationArea = document.createElement('div');
    addClass(paginationArea, 'gg-pagination-area');
    return paginationArea;
  }

  createPageButtons(pageCount, pageIdx, area) {
    let buttonsHTML = '';
    const visibleIndex = this.getVisibleIndex(pageCount, this.visiblePages, pageIdx);
    this.visibleIndex = visibleIndex;
    this.pageIndex = pageIdx;
    visibleIndex.forEach((i) => {
      let classNames = 'gg-page-btn';
      if (i === pageIdx) {
        classNames += ' gg-is-selected';
        buttonsHTML += `<span class="${classNames}" data-page-index=${i}>${i}</span>`;
      } else {
        buttonsHTML += `<a href="#" class="${classNames}" data-page-index=${i}>${i}</a>`;
      }
    });

    // 이전 페이지네이션 버튼
    if (visibleIndex[0] > 1) {
      buttonsHTML = `<a href="#" class="gg-page-btn gg-prev-ellip" data-page-goto="prev-ellip"><span class="gg-ico-ellip">...</span></a>${buttonsHTML}`;
    } else {
      buttonsHTML = `<span class="gg-page-btn gg-prev-ellip gg-is-disabled"><span class="gg-ico-ellip">...</span><span class="gg-is-disabled-mask"></span></span>${buttonsHTML}`;
    }

    // 다음 페이지네이션 버튼
    if (visibleIndex[visibleIndex.length - 1] < pageCount) {
      buttonsHTML +=
        '<a href="#" class="gg-page-btn gg-next-ellip" data-page-goto="next-ellip"><span class="gg-ico-ellip">...</span></a>';
    } else {
      buttonsHTML +=
        '<span class="gg-page-btn gg-next-ellip gg-is-disabled"><span class="gg-ico-ellip">...</span><span class="gg-is-disabled-mask"></span></span>';
    }

    if (pageIdx === 1) {
      buttonsHTML = `<span class="gg-page-btn gg-is-disabled gg-first"><span class="gg-ico-first">first</span><span class="gg-is-disabled-mask"></span></span><span class="gg-page-btn gg-is-disabled gg-prev"><span class="gg-ico-prev">prev</span><span class="gg-is-disabled-mask"></span></span>${buttonsHTML}`;
    } else {
      buttonsHTML = `<a href="#" class="gg-page-btn gg-first" data-page-goto="first"><span class="gg-ico-first">first</span></a><a href="#" class="gg-page-btn gg-prev" data-page-goto="prev"><span class="gg-ico-prev">prev</span></a>${buttonsHTML}`;
    }

    if (pageIdx === pageCount) {
      buttonsHTML = `${buttonsHTML}<span class="gg-page-btn gg-is-disabled gg-next"><span class="gg-ico-next">next</span><span class="gg-is-disabled-mask"></span></span><span class="gg-page-btn gg-is-disabled gg-last"><span class="gg-ico-first">last</span><span class="gg-is-disabled-mask"></span></span>`;
    } else {
      buttonsHTML = `${buttonsHTML}<a href="#" class="gg-page-btn gg-next" data-page-goto="next"><span class="gg-ico-next">next</span></a><a href="#" class="gg-page-btn gg-last" data-page-goto="last"><span class="gg-ico-last">last</span></a>`;
    }

    area.innerHTML = buttonsHTML;
  }

  createPageButtonGroup() {
    const { rowCount, perPage, pageIdx } = this.props;
    const pageCount = rowCount % perPage === 0 ? rowCount / perPage : Math.ceil(rowCount / perPage);
    this.pageCount = pageCount;
    this.createPageButtons(pageCount, pageIdx, this.$area);
  }

  getVisibleIndex(pageCount, visibleCount, curIndex) {
    let start;
    let end;
    const stdMiddle = Math.floor(visibleCount / 2);
    start = curIndex - stdMiddle;
    end = curIndex + stdMiddle;
    if (start <= 0) {
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

  initPageButtons() {
    this.createPageButtons(this.pageCount, 1, this.$area);
  }

  detectPageButtonOnClick(target) {
    let elm = target;
    while (elm) {
      if (hasClass(elm, 'gg-page-btn')) {
        return elm;
      }
      elm = elm.parentNode;
    }
    return false;
  }

  setEventHandler() {
    this.$area.addEventListener('click', (e) => {
      const target = this.detectPageButtonOnClick(e.target);
      if (target) {
        if (target.dataset.pageIndex) {
          this.createPageButtons(
            this.pageCount,
            parseInt(target.dataset.pageIndex, 10),
            this.$area
          );
          this.props.callback(target.dataset.pageIndex);
        } else {
          const { pageGoto } = target.dataset;
          let pageIndex = 1;
          if (pageGoto) {
            const middleIndex = Math.floor(this.visibleIndex.length / 2);
            switch (pageGoto) {
              case 'first':
                pageIndex = 1;
                break;
              case 'prev':
                pageIndex = this.pageIndex - 1;
                break;
              case 'prev-ellip':
                pageIndex = this.visibleIndex[middleIndex] - this.visiblePages;
                if (pageIndex < 0) {
                  pageIndex = 1;
                }
                break;
              case 'next-ellip':
                pageIndex = this.visibleIndex[middleIndex] + this.visiblePages;
                if (pageIndex > this.pageCount) {
                  pageIndex = this.pageCount;
                }
                break;
              case 'next':
                pageIndex = this.pageIndex + 1;
                break;
              case 'last':
                pageIndex = this.pageCount;
                break;
              default:
                break;
            }
            this.createPageButtons(this.pageCount, parseInt(pageIndex, 10), this.$area);
            this.props.callback(pageIndex);
          }
        }
      }
    });
  }
}

export default Pagination;
