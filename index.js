var cheerio = require("cheerio")
    , $
    , options =
        {
            // Plugin default settings
            "note": {
                classes: "fa icon-note",
                title: "Note",
                content: "\uf05a" 
            },
            "tip": {
                classes: "fa icon-tip",
                title: "Tip",
                content: "\uf0eb"
            },
            "important": {
                classes: "fa icon-important",
                title: "Important",
                content: "\uf06a"
            },
            "caution": {
                classes: "fa icon-caution",
                title: "Caution",
                content: "\uf06d"
            },
            "warning": {
                classes: "fa icon-warning",
                title: "Warning",
                content: "\uf071"
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
                // Skip if no relevant candidate found
                if (admonClass === undefined) {
                    return true;
                }
                // Admonishment
                admon = options[admonClass];
                // Replacement we'll sub in.
                iconElem = $("<div></div>")
                    .addClass(admon.classes)
                    .attr("title", admon.title)
                    .text(admon.content);
                // Find and replace child element that we want to hold the icon (but currently just has text).
                $this.find("div.title").first()
                    .replaceWith(iconElem);
                // Replace by the transformed element
                page.content = $.html();
            });

            return page;
        }
    }
};
