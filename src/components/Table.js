function Table(props) {
  const classPrefix = 'table'
  const classList = [];
  classList.push(props.className);
  if (props.className) classList.push(props.className);
  if (props.isVertical) classList.push('.table-v');
  if (props.isHorizontal) classList.push('.table-h');
  if (props.isBordered) classList.push('is-bordered');
  if (props.isStriped) classList.push('is-striped');
  if (props.isNarrow) classList.push('is-narrow');
  if (props.isHoverable) classList.push('is-hoverable');
  if (props.isFullwidth) classList.push('is-fullwidth');
  const classOptions = classList.join(' ');

  return (
    <>
      <table className={`${classPrefix} ${classOptions}`}>
        {props.children}
      </table>
    </>
  )
}

export default Table;