# MarkupProcesswirePhotoswipe

MarkupProcesswirePhotoswipe is a module for an easy yet customizable image gallery integration into your ProcessWire website. It uses [Photoswipe](http://photoswipe.com) by [Dmitry Semenov, @dimsemenov](https://twitter.com/dimsemenov), a very very good Javascript gallery which does not depend on jQuery or anything else.

This guide is likely incomplete but hopefully sufficient enough to get you started. Please let me know if you find any errors and bugs or if you have any suggestions and requests!

You may get support directly from [me](https://twitter.com/blynxical) or in the [official ProcessWire forum thread](https://processwire.com/talk/topic/16677-markupprocesswirephotoswipe/)

## Installing the module

The ProcessWire way of life: [http://modules.processwire.com/install-uninstall/](http://modules.processwire.com/install-uninstall/)
(Not yet in the module directory)

You can use this link to install from URL: https://github.com/blynx/MarkupProcesswirePhotoswipe/archive/master.zip

## How To

### I. Plug In Module

You can simply create a gallery and insert a thumbnail view by passing an image field to the module like so:

```php
$pwpswp = $modules->get('MarkupProcesswirePhotoswipe');
echo $pwpswp->renderGallery($page->nicePictures);
```

All necessary scripts will then be automatically inserted into the page markup via hook. They won't if you do not call the function.

Mind that `renderGallery()` returns the markup string for delayed output. So you will have to `echo` the markup at a desired place.

Also, this markup comes unstyled. You will have to give it a basic style by yourself.

### IIa. BYOM No1 (Bring Your Own Markup)

By default pwpswp provides the "pswp-gallery-template.html.php" template file for an easy gallery integration. It offers already pretty sufficient customization options. Yet, you may use your own gallery template file or files, though.  
When calling the `renderGallery()` method simply pass the path to your own template as the third argument:

```php
echo $pwpswp->renderGallery($images, $options, 'path/to/template/file');
```

Like this you could create different gallery templates for different occasions:

```php
echo $pwpswp->renderGallery($images, $options, 'path/to/template/file_2');
echo $pwpswp->renderGallery($images, $options, 'path/to/template/file_3');
```

For the gallery initiation script to work you will have to implement the following CSS classes in your template. (As long as you won't provide your own initiation script)

**`pwpswp-gallery`** &emsp;Defines individual galleries, provides photoswipe options  
**`pwpswp-gallery__item`** &emsp;Defines gallery items  
**`pwpswp-gallery__link`** &emsp;Provides original image url, dimensions, lores image url  
**`pwpswp-gallery__image`** &emsp;Provides thumbnail image  
**`pwpswp-gallery__caption`** &emsp;Provides caption  

Please have a look at the sourcecode of `pswp-gallery-template.html.php` and/or [the photoswipe documentation](https://github.com/dimsemenov/PhotoSwipe/blob/master/website/documentation/getting-started.md#-how-to-build-an-array-of-slides-from-a-list-of-links) for details of the implementation.  

### IIb. BYOM No2

You may also just put your gallery markup inside your ProcessWire template file and call `$pwpswp->init();` somewhere in this template.  
ProcesswirePhotoswipe will automatically add all scripts and stylesheets. See also IIb on the requirements for this to work.

Photoswipe options must be provided manually to the `data-pswp-options` attribute of the `.pwpswp-gallery` element.

This might me helpful:

```php
htmlspecialchars(json_encode($PhotoswipeJsonOptions), ENT_QUOTES, 'UTF-8');
```

### III. Custom scripts and usage of AMD 

You can deactiveate the automatic insertion of the script tags in the modules configuration.

If you want to use eg. [require.js](http://www.requirejs.org) you can also activate that option. The photoswipe initiation script will be compatible then. Also you will need to initiate the galleries manually like above.

## Options And Configuration

ProcesswirePhotoswipe tries to stick to the original configuration and options terminology and structure Processwire and Photoswipe are using.

Here is an example:

```php
$galleryOptions = [
    'imageResizerOptions' => [
        'size' => '500x500'
        'quality' => 70,
        'upscaling' => false,
        'cropping' => false
    ],
    'loresResizerOptions' => [
        'size' => '500x500'
        'quality' => 20,
        'upscaling' => false,
        'cropping' => false
    ],
    'pswpOptions' => (object) [
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

### Styling

Of course the module implements the default CSS and UI files of Photoswipe. You can set up your own in the module configuration. 

Right now the module comes with no styling of its standard gallery template. There might be themes in the future.

## Compatibility

Slightly more modern JS stuff is used here. It should work from ie10+ upwards.
You may still provide your own more compatible gallery init script. (See _Custom scripts and usage of AMD_)

## Changelog

#### 0.6 - 2017/07/06, liberated renderGallery()

added: Liberated `renderGallery()` to accept arrays and WireArray derivatives  
other: Updated readme

#### 0.5.1 - 2017/07/06, fixes

removed: Removed pointless shortcut alias class  
fixed: Use of correct module/class name for file paths  
fixed: Configuration instructions for file paths  
other: Updated readme  

#### 0.5.0 - 2017/07/05, Initial release