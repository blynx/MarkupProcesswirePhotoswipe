# MarkupProcesswirePhotoswipe


![Petersburger Hängung [image credits](https://commons.wikimedia.org/wiki/File:David_Teniers_d._J._008.jpg)](https://upload.wikimedia.org/wikipedia/commons/4/4e/David_Teniers_d._J._008.jpg "Petersburger Hängung")

MarkupProcesswirePhotoswipe is a module for an easy yet customizable image gallery integration into your ProcessWire website. It uses [Photoswipe](http://photoswipe.com) by [Dmitry Semenov, @dimsemenov](https://twitter.com/dimsemenov), a very very good Javascript lightbox/gallery which does not depend on jQuery or anything else.

This guide is likely incomplete but hopefully sufficient enough to get you started. Please let me know if you find any errors and bugs or if you have any suggestions and requests!

You may get support directly from [me](https://twitter.com/blynxical) or in the [official ProcessWire forum thread](https://processwire.com/talk/topic/16677-markupprocesswirephotoswipe/)

In the [processwire modules directory](https://modules.processwire.com/modules/markup-processwire-photoswipe/)

## Installing the module

The ProcessWire way of life: [http://modules.processwire.com/install-uninstall/](http://modules.processwire.com/install-uninstall/)

I recommend to install the module via `Modules > New > Add Module From Directory`. Paste the class name `MarkupProcesswirePhotoswipe` into the text field and click `Download And Install`.

## How To

### Plug In Module

You can simply create a gallery and insert a thumbnail view by passing an image field to the module like so:

```php
$pwpswp = $modules->get('MarkupProcesswirePhotoswipe');
echo $pwpswp->renderGallery($page->nicePictures);
```

All necessary scripts will then be automatically inserted into the page markup via hook after page render. They won't if you do not call the function.

Mind that `renderGallery()` returns the markup string for delayed output. So you will have to `echo` the markup at a desired place.

The default gallery is "Petersburger Hängung" ([wtf?](https://de.wikipedia.org/wiki/Salonhängung)). You can choose the default gallery style in the module config or you can choose different galleries during runtime like so:

```php
echo $pwpswp->renderGallery($page->nicePictures, 'plain');
echo $pwpswp->renderGallery($page->nicePictures, $optionsArray, 'plain');
echo $pwpswp->renderGallery($page->nicePictures, ['gallery' => 'plain', 'moreOptions' => ...]);
```

Every gallery module has a short alias which is used here. You can find it in the description of the module. Otherwise, here is the list:

- **petersburger**: A balanced gallery (default).
- **plain**: Base module, nothing is styled here.
- **flex**: Basic grid using flexbox.
- **h-scroller**: Horizontally scrollable box.

### BYOM (Build Your Own Module)

- Extend MarkupPwpswpGallery class
- implement `::alias()` method which returns unique short name
- implement `::render()` function and process images to your liking
- there are severel helper functions which are probabyly useful
    - `$this->resizeImage($image, $resizeOptions)`  
        resize an image
    - `$this->prepareImageData(WireData $image, $options = [])`  
        prepares array of data for
    - `$this->renderImageElement($data)`  
        receives prepared image data and renders markup for an image
    - `$this->wrapMarkup($innerMarkup, $options = [])`  
        wraps up the whole package
    - `$this->getPswpOptionsAttribute($pswpOptions)`  
        returns the pswp options as escaped json

[...]

### BYOM (Bring Your Own Markup) DEPRECATED

[...]

```php
echo $pwpswp->renderGallery($images, $options, 'to/template/file.php');
echo $pwpswp->renderGallery($images, 'to/template/file.php');
echo $pwpswp->renderGallery($page->nicePictures, ['theme' => 'to/template/file.php']);
``` 

## Options And Configuration

ProcesswirePhotoswipe tries to stick to the original configuration and options terminology and structure Processwire and Photoswipe are using.

Here are the availbale options with examples:

```php
$galleryOptions = [

    // Choose gallery
    'gallery' => 'petersburger',

    // Image resize options for thumbnail image.
    // Example: Default module configuration.
    'imageResizerOptions' => [
        'size' => '500x500',
        'quality' => 70,
        'upscaling' => false,
        'cropping' => false
    ],

    // Image resize options for quick preview image in Photoswipe.
    // Example: Default module configuration.
    'loresResizerOptions' => [
        'size' => '500x500',
        'quality' => 20,
        'upscaling' => false,
        'cropping' => false
    ],

    // options for Photoswipe; will be JSON encoded.
    // example: Some random options.
    'pswpOptions' => (object) [ // <-- cast as stdClass !!!
        'shareEl' => false,
        'indexIndicatorSep' => ' von ',
        'closeOnScroll' => false
    ]
];

echo $pwpswp->renderGallery($page->images, $galleryOptions);
```

#### imageResizerOptions

Options for the thumbnail images of the galleries. It uses Processwires ImageSizer options and is also configurable in the module configuration. See a [list of available options here](http://processwire.com/api/ref/pageimage/size/).

**Note:** Size is provided as a string like `150x430` (width x height) !!

#### loresResizerOptions

Options for lowres images for fast previews in Photoswipe. Same principle as above.

#### pswpOptions

Options for Photoswipe; see the [Photoswipe documentation](http://photoswipe.com/documentation/options.html) for available options.
The options will be provided to the script as json.

**Note** how `pswpOptions` is cast as a `stdClass` object to mimic Photoswipes options object. Do the same to avoid complications.

### Custom scripts and usage of AMD 

You can deactiveate the automatic insertion of the script tags in the modules configuration.

If you want to use eg. [require.js](http://www.requirejs.org) you can also activate that option. The photoswipe initiation script will be compatible then. Also you will need to initiate the galleries manually by calling the `init()` method of the JS module.

## Compatibility

### Legacy

I rewrote the module for version 0.99.0. The legacy code is still available on the [legacy branch](https://github.com/blynx/MarkupProcesswirePhotoswipe/tree/legacy).

### Javascript

Javascript stuff should work from ie10+ upwards.
You may still provide your own more compatible gallery init script. (See _Custom scripts and usage of AMD_)

## ToDos, perspective and notes

- srcset

- individual images lightbox mode
    - options: 
        - manual trigger
        - "auto on all pages" (default)
    - groupable

- gallery module: "click on single preview image opens gallery with multiple images"



## Changelog

#### 0.99.1 - 2017/11/16

* fixed: ProcessWirePhotoswipe.module was not able to get correct url when modules directory differed from class name. Determine module urls with actual file path via reflector class now.


#### 0.99.0 - 2017/11/13

* other: Refactoring. No more 'themes', instead gallery modules.  
* added: Basic gallery module (MarkupPwpswpGallery) to extend from  
* added: Gallery 'Petersburger Hängung'  
* added: Photoswipe animation on gallery init  
* added: Galleries open automatically via url hash e.g. "#&gid=1&pid=2"

#### 0.7.5 - 2017/10/24, 

* breaking change: Renamed `getResizeLamda()` to `getResizeClosure()`

* fixed: Removal of scalar type hints for compatibility to php 5.6  
* other: Very minor code refactoring  

#### 0.7.1 - 2017/07/13, rubberband fix

* fixed: Added rubberband/momentum scrolling on ios for h-scroller theme.

#### 0.7 - 2017/07/12, themes

* fixed: Size option correctly adopts height value  
* added: Theme functionality  
* added: Simple themes 'plain' (previous default), 'flex', 'h-scroller' 
* other: Updated readme  
* other: No notice on undefined photoswipe options  
* other: Refactoring  

#### 0.6 - 2017/07/06, liberated renderGallery()

* added: Liberated `renderGallery()` to accept arrays and WireArray derivatives  
* removed: Removed pointless shortcut alias class  
* fixed: Use of correct module/class name for file paths  
* fixed: Configuration instructions for file paths  
* other: Updated readme
* other: Updated readme  

#### 0.5.0 - 2017/07/05, Initial release
