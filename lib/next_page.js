module.exports = function next_page ($, data) {
  var next = $('.pagination > a').filter(function () {
    return $(this).text() === "Next";
  });
  if(next.length > 0) {
    data.next_page = next['0'].attribs.href;
  }
  return data;
}
