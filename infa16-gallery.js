(function ($) {
    $.fn.infa16_gallery = function (options) {
        var opts = $.extend({
            size: 150,
            autoplay: 2000
        }, options);

        var currentImage = 0;
        var gallery = this;
        var images = [];
        var lightbox = null;
        var lightboxImage = null;
        var timer = null;
        var autoplay = null;

        this.find("img").each(function (index, img) {
            images.push({
                landscape: img.naturalWidth > img.naturalHeight,
                src: img.src,
                text: img.title ? img.title : img.src.substring(img.src.lastIndexOf('/') + 1)
            });
            img.remove();
        });

        gallery.addClass("infa16-gallery");
        images.forEach(function (e, index) {
            var image = $("<div class='infa16-image'>");
            image.append("<div class='infa16-thumb' style='width: " + opts.size + "px; height: " + opts.size + "px'>" +
                "<img src='" + e.src + "' class='" + (e.landscape ? 'landscape' : 'portrait') + "'/></div>" +
                "<div class='infa16-text' style='width: " + opts.size + "px;'>" + e.text + "</div>");
            image.on("click", function () {
                currentImage = index;
                showLightbox();
            });
            gallery.append(image);
        });

        function nextImage() {
            currentImage = (currentImage + 1) % images.length;
            lightboxImage.attr("src", images[currentImage].src);
        }

        function prevImage() {
            if (currentImage == 0) {
                currentImage = images.length - 1;
            } else {
                currentImage = (currentImage - 1) % images.length
            }
            lightboxImage.attr("src", images[currentImage].src);
        }

        function showLightbox() {
            appendLightboxHtml();
            lightboxImage.attr("src", images[currentImage].src);
            lightbox.show();
        }

        function hideLightbox() {
            lightbox.hide();
            stopTimer();
        }

        function stopTimer() {
            clearInterval(timer);
            autoplay.prop('checked', false);
            timer = null;
        }

        function appendLightboxHtml() {
            if (!lightbox) {
                lightbox = $('<div class="infa16-lightbox">').appendTo(gallery);
                var header = $('<div class="infa16-lightbox-header">').appendTo(lightbox);
                $('<span class="infa16-lightbox-prev">&lt;</span>')
                    .appendTo(header)
                    .on("click", prevImage);

                $('<span class="infa16-lightbox-next">&gt;</span>')
                    .appendTo(header)
                    .on("click", nextImage);

                $('<span class="infa16-lightbox-close">&times;</span>')
                    .appendTo(header)
                    .on("click", hideLightbox);

                lightboxImage = $('<img class="infa16-lightbox-image" src="#"/>').appendTo(lightbox);

                var autoplayDiv = $('<div class="infa16-lightbox-autoplay"></div>')
                    .appendTo(lightbox);

                autoplay = $('<input type="checkbox">')
                    .appendTo(autoplayDiv)
                    .on("change", function () {
                        if (timer) {
                            stopTimer();
                        } else {
                            timer = setInterval(nextImage, opts.autoplay);
                        }
                    });
                autoplayDiv.append("&nbsp;Automatisk uppspelning");
            }
        }

        return this;
    };
}(jQuery));
