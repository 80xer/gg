/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

class ColGroup {
  constructor(props) {
    props.columnClassName = props.columnClassName || 'data-column-name';
    this.props = props;
    this.$el = this.createColGroup();
    this.setWidthOfColumns();
  }

  createColGroup() {
    const colgroup = document.createElement('colgroup');
    const { columns, columnClassName } = this.props;
    columns.forEach((column) => {
      const col = document.createElement('col');
      col.setAttribute(columnClassName, column.field);
      col.textContent = column.title;
      colgroup.appendChild(col);
    });
    return colgroup;
  }

  scrollBarWidth() {
    const { hasScroll } = this.props;
    if (hasScroll) return 14;
    return 0;
  }

  setWidthOfColumns() {
    const { target, columns, data } = this.props;
    if (!target) throw new Error('required target, in colgroup');
    const positionInfo = target.getBoundingClientRect();
    const targetWidth = positionInfo.width;
    const scrollBarWidth = this.scrollBarWidth();
    const widthColumns = ColGroup.calculateWidthOfColumns(targetWidth - scrollBarWidth, columns);
    const cols = this.$el.querySelectorAll('col');
    cols.forEach((col, i) => {
      col.setAttribute('width', widthColumns[i]);
    });
  }

  static calculateWidthOfColumns(totalWidth, columns) {
    const columnsWithWidth = columns.filter((column) => column.width);
    const countColumns = columns.length - columnsWithWidth.length;
    const totalWithoutWidth = columnsWithWidth.reduce(
      (total, col) => total - col.width,
      totalWidth
    );
    const width = Math.abs(Math.floor(totalWithoutWidth / countColumns));
    const result = [];
    for (let i = 0, j = 0; i < columns.length; i += 1) {
      if (columns[i].width) {
        result.push(columns[i].width);
      } else {
        if (j === countColumns - 1 && width * countColumns < totalWithoutWidth) {
          result.push(width + (totalWithoutWidth - width * countColumns));
        } else {
          result.push(width);
        }
        j += 1;
      }
    }
    // 테이블의 우측 보더라인과 정확히 겹치기 위해 마지막 컬럼의 너비를 1px 줄인다.
    result[result.length - 1] -= 1;
    return result;
  }
}

export default ColGroup;
