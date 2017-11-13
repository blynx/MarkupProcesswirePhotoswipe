(function (window, document, undefined) { 

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

            var gid = index + 1

            gallery.items.forEach(function(item, index, itemsArray) {

                var pid = index + 1
                
                var options = getGalleryOptions(gid)
                
                options.getThumbBoundsFn = function(index) {
                    thumbnail = item.itemElement.querySelector('img')
                    var pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                    var rect = thumbnail.getBoundingClientRect()
                    return {x:rect.left, y:rect.top + pageYScroll, w:rect.width}
                }

                item.linkElement.addEventListener('click', function(event) {
                    event.preventDefault()
                    openGallery(gid, pid, options)
                    // var pswpInstance = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, itemsArray, options)
                    // pswpInstance.init()
                })
            })
        })

        var urlParams = getUrlParams()
        if(urlParams !== null && urlParams.gid >= 0 && urlParams.pid >= 0) {
            openGallery(urlParams.gid, urlParams.pid, getGalleryOptions(urlParams.gid))
        }
    }



    /**
     * buildItemsArray
     * 
     * @param {*} galleryElement 
     */
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


    /**
     * openGallery
     * 
     * @param {*} gid 
     * @param {*} pid 
     * @param {*} options 
     */
    function openGallery(gid, pid, options) {
        
        itemsArray = galleries[gid-1].items
        options.index = pid - 1
        var pswpInstance = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, itemsArray, options)
        pswpInstance.init()
    }



    /**
     * 
     * @param {*} gid 
     */
    function getGalleryOptions(gid) {
        var options = {}
        var usrOptions = JSON.parse(galleries[gid-1].element.getAttribute('data-pswp-options'))
        for (var attr in usrOptions) { 
            options[attr] = usrOptions[attr]
        }
        return options
    }



    /**
     * getUrlParams
     * 
     * @return 
     */
    function getUrlParams() {
        
        var params = {}
        var hash = window.location.hash.substring(1)
        if(hash) {
            params.gid = parseInt(hash.match(/&gid=([0-9]+)/)[1])
            params.pid = parseInt(hash.match(/&pid=([0-9]+)/)[1])
            return params
        }
        return null
    }

    
    document.addEventListener("DOMContentLoaded", function() {
        init()
    })

})(window, document)