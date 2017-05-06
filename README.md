# GitBook Plugin: Provides font icons for AsciiDoc admonition blocks.

As of publishing, the GitBook AsciiDoc 3.x.x rendering pipeline does not support icons for admonition blocks, providing an inconspicuous, text-only representation:

image

With this plugin, admonition blocks are altered to provide the missing icons:

image

The default styling provides a similar look-and-feel to the Asciidoctor's standard theme; with FontAwesome icons and a comparable colour scheme. Naturally, you can override both the glyphs and styling.

Refer to the [Configuration](#Configuration) section for more detail.

## Examples

images

## Configuration

### Basic Configuration

Override the default configuration in the `pluginsConfig.admonitions` section of `book.json`.

* The 5 standard AsciiDoc admonition types are available, with the following mutable attributes <sup>[[1]](#Footnotes)</sup>:
** `classes`: CSS classes of the admonition icon container.
** `title`: HTML title attribute of admonition icon container.
** `content`: Unicode value of glyph to use.

The entire set of defaults are shown here for illustrative purposes, but you need only provide those you're overriding:

.Example book.json configuration
```json
"pluginsConfig": {
    "admonitions": {
        "note": {
            "classes": "fa icon-note",
            "title": "Note",
            "content": "\uf05a"
        },
        "tip": {
            "classes": "fa icon-tip",
            "title": "Tip",
            "content": "\uf0eb"
        },
        "important": {
            "classes": "fa icon-important",
            "title": "Important",
            "content": "\uf06a"
        },
        "caution": {
            "classes": "fa icon-caution",
            "title": "Caution",
            "content": "\uf06d"
        },
        "warning": {
            "classes": "fa icon-warning",
            "title": "Warning",
            "content": "\uf071"
        }
    }
}
```

For example, to override the `TIP` admonition type, you could change alter the `content` field to be something else:

```json
"pluginsConfig": {
    "admonitions": {
        "warning": {
            "classes": "fa icon-tip",
            "title": "Tip",
            "content": "\uf197"
        }
    }
}
```

Now, it will look something like:

![icon-tip overridden](http://i.imgur.com/TgXpcy3.png)

### Overriding Style

You can [override the default CSS](https://help.gitbook.com/content/how-can-i-include-css.html) in (at least) two ways:

1. Change the classes attribute(s) and provide your own style.
2. Override or extend the existing CSS. You may need to use the `!important` property in some circumstances.

.Example colour override in style/website.css
```css
.icon-tip {
    color: rgb(243, 21, 243, 0.7) !important;
}
```

Refer to the GitBook documentation about including [user CSS](https://help.gitbook.com/content/how-can-i-include-css.html).

## Provenance

The default Less/CSS is derived from the [apiman](http://apiman.io) blog theme, which is in turn derived from [Asciidoctor](http://asciidoctor.org) default theme. Thanks to them.

I initially forked (a fork of) https://github.com/erixtekila/gitbook-plugin-richquotes, but what you see here bears little resemblance to it; however, it provided an excellent skeleton for a neophyte.

## License

Where appropriate, code is copyright 2017, [Marc Savy](mailto:marc@rhymewithgravy.com) <marc@rhymewithgravy.com>. Released under Apache License, Version 2.0.

## Footnotes

1. NOTE, TIP, IMPORTANT, CAUTION, WARNING
