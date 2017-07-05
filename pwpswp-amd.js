(function (name, definition){
    if (typeof define === 'function') { define(definition) }
    else { 
        var theModule = definition(), global = this, old = global[name]
        theModule.noConflict = function () { global[name] = old; return theModule; }
        global[name] = theModule
    }
})('ProcesswirePhotoswipe', function () {

    var galleries, 
        nonmodals,
        pswpElement

    function init() {

        pswpElement = document.querySelector('.pswp')

        galleries = document.querySelectorAll('.pwpswp-gallery')
        galleries = galleries ? Array.prototype.slice.call(galleries) : null
        galleries = galleries.map(function(galleryElement, index, array) {
            return {
                element : galleryElement,
                items : buildItemsArray(galleryElement)
            }
        })

        galleries.forEach(function(gallery, index, galleriesArray) {

            gallery.items.forEach(function(item, index, itemsArray) {

                var options = JSON.parse(gallery.element.getAttribute('data-pswp-options'))
                if(options === null) options = {}
                options.index = index

                item.linkElement.addEventListener('click', function(event) {
                    event.preventDefault()
                    var pswpInstance = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, itemsArray, options)
                    pswpInstance.init()
                })
            })

        });

    }

    function buildItemsArray(galleryElement) {

        var items = galleryElement.querySelectorAll('.pwpswp-gallery__item')
        items = items ? Array.prototype.slice.call(items) : null
        items = items.map(function(itemElement, index, array) {
            
            var linkElement = itemElement.querySelector('.pwpswp-gallery__link'),
                size = linkElement.getAttribute('data-size').split("x")

            return {
                itemElement : itemElement,
                linkElement : linkElement,
                src : linkElement.getAttribute('href'),
                w : parseInt(size[0]),
                h : parseInt(size[1]),
                msrc : linkElement.getAttribute('data-lores-src')
            }
        })

        return items
    }

    return {
        init : init
    }
})