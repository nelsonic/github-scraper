module.exports = function next_page ($, data) {
  var next_page = $('.pagination > a').filter(function () {
    return $(this).text() === "Next";
  });
  if(next_page.length > 0) {
    data.next_page = next_page['0'].attribs.href;
  }
  return data;
}
