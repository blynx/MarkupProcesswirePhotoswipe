<?php namespace ProcessWire;
/**
 * This is the standard template for the photoswipe image gallery.
 * See http://photoswipe.com/documentation/seo.html for more information on this specific
 * example.
 * 
 */
?>
<div class="pwpswp-gallery" itemscope itemtype="http://schema.org/ImageGallery" data-pswp-options="<?= htmlspecialchars(json_encode($options['pswpOptions']), ENT_QUOTES, 'UTF-8'); ?>">
<?php foreach ($images as $image): ?>
<figure class="pwpswp-gallery__item" itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
    <a class="pwpswp-gallery__link" href="<?= $image->url ?>" itemprop="contentUrl" data-size="<?= $image->width ?>x<?= $image->height ?>" data-lores-src="<?= $loresResize($image)->url ?>">
        <img class="pwpswp-gallery__image" src="<?= $imageResize($image)->url ?>" itemprop="thumbnail" alt="<?= $image->description ?>" />
    </a>
    <figcaption class="pwpswp-gallery__caption" itemprop="caption description"><?= $image->description ?></figcaption>
</figure>
<?php endforeach; ?>
</div>