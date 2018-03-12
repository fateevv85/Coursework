(function ($) {
  $(function () {

    // F:\GIT\Coursework\JSON_server>json-server db.json -w -d 1000

    var endPoint = 'http://localhost:3000/cart';

    //get cart on page load
    $.get({
      url: endPoint,
      beforeSend: function () {
        $('.gooditem').toggleClass('showcase__loading');
      }
    }).done(function (cart) {
      $('.gooditem').toggleClass('showcase__loading');
      Object.keys(cart).forEach(function (value) {
        $('.gooditem[productId="' + this[value].productId + '"]').addClass('incart');
      }, cart)
    });

    //add item to the cart by click on "add to cart" button
    $('.addtocart_button').click(function () {
      var thisButton = $(this);

      if (thisButton.parent().hasClass('incart')) {
        console.log('Already in cart!');
      } else {
        $.post({
          url: endPoint,
          beforeSend: function () {
            thisButton.parent().toggleClass('showcase__loading');
          },
          data: {
            productId: $(this).parent().attr('productId'),
            price: $(this).next().children('.item_cost').text(),
            imgURL: $(this).prev().css('background-image'),
            productName: $(this).next().children(':first').text()
          }
        }).done(function () {
          console.log('Success!');
          thisButton.parent().addClass('incart').toggleClass('showcase__loading');
        })
          .fail(function () {
            console.log('Error!');
          });
      }
    });

    //end of jQuery
  });
})(jQuery);