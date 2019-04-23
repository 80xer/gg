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
      col.setAttribute(columnClassName, column.name);
      col.textContent = column.title;
      colgroup.appendChild(col);
    });
    return colgroup;
  }

  setWidthOfColumns() {
    const { target, columns } = this.props;
    if (!target) return;
    const positionInfo = target.getBoundingClientRect();
    const targetWidth = positionInfo.width;
    const widthColumns = ColGroup.calculateWidthOfColumns(targetWidth, columns.length);
    const cols = this.$el.querySelectorAll('col');
    cols.forEach((col, i) => {
      col.setAttribute('width', widthColumns[i]);
    });
  }

  static calculateWidthOfColumns(totalWidth, countColumns) {
    const width = Math.floor(totalWidth / countColumns);
    const result = [];
    for (let i = 0; i < countColumns; i += 1) {
      if (i === countColumns - 1 && width * countColumns < totalWidth) {
        result.push(width + (totalWidth - width * countColumns));
      } else {
        result.push(width);
      }
    }
    // 테이블의 우측 보더라인과 정확히 겹치기 위해 마지막 컬럼의 너비를 1px 줄인다.
    result[result.length - 1] -= 1;
    return result;
  }
}

export default ColGroup;
