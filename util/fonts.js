/* eslint-disable */
exports.Roboto = function () {
  const table = [
    '6.0625',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
  ]; const baseSize = 9; const height = 11; const descent = 3.8499999999999996; const defaultWidth = 8.5; const
    re = new RegExp('([1])|([!\',\\.:;I\\]il\\|])|(["\\(\\)\\-\\[`jrt\\{\\}])|([\\*/<\\?\\\\\\^f])|([\\$\\+023456789=>EFJLS_abcdeghknopqsuvxyz])|([#&ABCDGHKNOPQRTUVXYZ~])|([%w])|([@MWm])');
  return function (fontSize) {
    const ratio = fontSize / baseSize;
    const getIndex = (ch) => {
      const m = ch.match(re);
      if (m !== null) for (let i = 0; i < table.length; i += 1) if (m[i + 1] !== undefined) return i;
    };
    const getWidth = str => str.split('').reduce((acc, e) => acc + (table[getIndex(e)] || defaultWidth) * ratio, 0);
    return {
      getHeight() {
        return ratio * height;
      },
      getDescent() {
        return ratio * descent;
      },
      getWidth,
    };
  };
};
