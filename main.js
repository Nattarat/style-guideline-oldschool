$(function() {
  // Browser condition
  if(is.ie()) {
    $('html').addClass('ie');
  } else if (is.edge()) {
    $('html').addClass('edge');
  } else if (is.safari()) {
    $('html').addClass('safari');
  } else if (is.firefox()) {
    $('html').addClass('firefox');
  } else if (is.android()) {
    $('html').addClass('android');
  } else if (is.iphone() && is.safari()) {
    $('html').addClass('safari-mobile');
  } else if (is.ipad() && is.safari()) {
    $('html').addClass('safari-mobile');
  }
});