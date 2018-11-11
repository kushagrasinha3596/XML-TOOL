let builder = require('xmlbuilder', { encoding: 'utf-8' });
let fs = require('browserify-fs');
let decode = require("unescape");
let xml = builder.create('Slides');
let slideNumber = 0;

window.XML_Creator = {} || window.XML_Creator;

window.XML_Creator.generateDiv = function generateDiv1() {
  let a = document.getElementById("slide-specific-property");
  let b = document.getElementById("slide").cloneNode(true);
  slideNumber = slideNumber + 1;
  let newid = "slide" + slideNumber.toString();
  b.id = newid;
  a.appendChild(b);
  $("#" + newid + " .slide-heading").html("Slide - " + slideNumber.toString());
}

window.XML_Creator.fetchFormData = function fetchFormData1() {
  let parent = document.getElementById("slide-specific-property");
  let child_count = parent.childElementCount;
  let slide_height = $("#slide-common-property #image_height").val();
  let slide_width = $("#slide-common-property #image_width").val();
  let child_object = [];
  for (var i = 1; i <= child_count; i++) {
    let child = parent.childNodes[i];
    let image_source = $("#" + child.id + " #image-source").val();
    let slide_title = $("#" + child.id + " #slide-title").val();
    let notes_text = $("#" + child.id + " #notes-text").val();
    let section_name = $("#" + child.id + " #section-name").val();
    let hide_slide = $("#" + child.id + " #hide-slide").val();
    let show_star = $("#" + child.id + " #show-star").val();
    let obj = {};
    obj.slide_height = slide_height;
    obj.slide_width = slide_width;
    obj.image_source = image_source;
    obj.slide_title = slide_title;
    obj.notes_text = notes_text;
    obj.section_name = section_name;
    obj.hide_slide = hide_slide;
    obj.show_star = show_star;
    child_object.push(obj);
  }

  generateXML(child_object);
  xml.end({ pretty: true });
  console.log(xml.toString());
  // fs.appendFile('xmloutput.txt', xml.toString(), (err) => {
  //   if (err) throw err;
  //   console.log('The file has been saved!');
  //   });
}

function generateXML(array) {
  array.forEach(function (element, index) {
    xml.ele('props')
    .ele('Height', element.slide_height).up()
    .ele('Width', element.slide_width).up()
    .up()
    .ele('Slide', { 'number': index+1 })
    .ele("html", "<[CDATA[<img src={" + element.image_source + "}>]").up()
    .ele("metadata")
    .ele("title", element.slide_title).up()
    .ele("notestext","<![CDATA[" + element.notes_text + "]]>").up()
    .ele("showstar", element.show_star).up()
    .ele("hideslide", element.hide_slide).up()
    .ele("sectionname", element.section_name).up()
    .up()
    .up()
  });
}




