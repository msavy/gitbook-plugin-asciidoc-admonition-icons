var cheerio = require("cheerio")
    , $
    , options = // map annotations to styles
        {
            /* PLUGIN SETTINGS */
            "showTypeInHeader": true,
            "note": {
                klazz: "icon-note",
                title: "Note"
            },
            "tip": {
                klazz: "icon-tip",
                title: "Tip"
            },
            "important": {
                klazz: "icon-important",
                title: "Important"
            },
            "caution": {
                klazz: "icon-caution",
                title: "Caution"
            },
            "warning": {
                klazz: "icon-warning",
                title: "Warning"
            }
        }
    ;

module.exports = {
    book: {
        assets: "./book",
        css: [
            "plugin.css"
        ]
    },
    hooks: {
        // For all the hooks, this represent the current generator
        // This is called before the book is generated
        init: function () {
            // console.log( "callouts init!" );
            if (this.options.pluginsConfig && this.options.pluginsConfig.admonitions) {
                var admonitions = this.options.pluginsConfig.admonitions;
                for (key in admonitions) {
                    options[key] = admonitions[key] === false ? undefined : admonitions[key];
                }
            }
        },

        // This is called for each page of the book
        // It can be used for modifying page content
        // It should return the new page
        page: function (page) {
            var $this;

            $ = cheerio.load(page.content);

            // Find asciidoc admonition block.
            $(".admonitionblock").each(function () {
                $this = $(this);
                // Look at classes, should include the admonition type along with other irrelevant stuff.
                candidateClasses = $(this)[0].attribs.class.split(/\s+/);
                // Find the admonition class
                admonClass = candidateClasses.find(klazz => options[klazz]);
                // Replacement we'll sub in.
                iconElem = $("<div></div>")
                    .addClass("fa")
                    .addClass(options[admonClass].klazz)
                    .attr("title", options[admonClass].title);
                // Find and replace child element that we want to hold the icon (but currently just has text).
                div = $this.find("div.title").first()
                    .replaceWith(iconElem);
                // Replace by the transformed element
                page.content = $.html();
            });

            return page;
        }
    }
};
