<?php namespace ProcessWire;
/**
 * This is the standard template for the photoswipe image gallery.
 * See http://photoswipe.com/documentation/seo.html for more information 
 * on this specific example.
 * 
 */
 ?>
<div class="pwpswp-gallery pwpswp-gallery--h-scroller" itemscope itemtype="http://schema.org/ImageGallery" data-pswp-options="<?= isset($options['pswpOptions']) ? htmlspecialchars(json_encode($options['pswpOptions']), ENT_QUOTES, 'UTF-8') : '{}'; ?>">
    <div class="pwpswp-gallery__inner pwpswp-gallery__inner--h-scroller">
    <?php   foreach ($images as $image): 
            
            $thumbnailImage = $imageResize($image);
            $lowresImage = $loresResize($image);
    ?>
    <figure class="pwpswp-gallery__item pwpswp-gallery__item--h-scroller" itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
        <a class="pwpswp-gallery__link pwpswp-gallery__link--h-scroller" href="<?= $image->url ?>" itemprop="contentUrl" data-size="<?= $image->width ?>x<?= $image->height ?>" data-lores-src="<?= $lowresImage->url ?>"><img class="pwpswp-gallery__image pwpswp-gallery__image--h-scroller" src="<?= $thumbnailImage->url ?>" itemprop="thumbnail" alt="<?= $image->description ?>" /></a>
        <figcaption class="pwpswp-gallery__caption pwpswp-gallery__caption--h-scroller" itemprop="caption description"><?= $image->description ?></figcaption>
    </figure>
    <?php endforeach; ?>
    </div>
</div>