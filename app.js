(function(win) {

    $("#slider").on("change", function(event, ui) {
        var startYear = parseInt($(this).val());
        var endYear = startYear + 10;
        $("#yearText").text(startYear + ' - ' + endYear);
        var apiUrl = '/api/api.php?startYear=' + startYear + '&endYear=' + endYear;
        $.getJSON(apiUrl, processJSON);
    });

    $.getJSON('/api/api.php', processJSON);

    function processJSON(json) {
        var nodes = [];
        var edges = [];
        //creating people nodes
        nodes.push.apply(nodes, json.people.map((person) => {
            return {
                data: {
                    id: person.id,
                    name: person.name
                },
                classes: "artist"
            }
        }));

        //creating award nodes
        nodes.push.apply(nodes, json.awards.map((award) => {
            return {
                data: {
                    id: award.id,
                    name: award.name
                },
                classes: "award"
            }
        }));

        //creating edges
        edges.push.apply(edges, json.edges.map((edge) => {
            return {
                data: {
                    source: edge.source,
                    target: edge.target
                }
            }
        }));
        /*
            json.edges.forEach(function(edge, index) {
                edge.years.forEach(function(year, index) {
                    edges.push({
                        data: {
                            source: edge.source,
                            target: edge.target,
                        }
                    });
                });
            });
        */

        // creating cytoscape object
        var cy = cytoscape({
            container: document.getElementById('cy'),

            elements: {
                nodes: nodes,
                edges: edges
            },
            style: cytoscape.stylesheet()
                .selector('node')
                .css({
                    'content': 'data(name)',
                    'text-valign': 'top',
                    'color': '#000'
                })
                .selector('node.artist')
                .css({
                    'shape': 'roundrectangle',
                    'font-size': '6',
                    'background-color': '#ECD078'
                })
                .selector('node.award')
                .css({
                    'shape': 'star',
                    'font-size': '6',
                    'font-style': 'bold',
                    'background-color': '#C02942',
                })
                .selector('edge')
                .css({
                    'width': '3px',
                    'target-arrow-shape': 'triangle-tee'
                })

        });

        var options = {
            name: 'cose',
            fit: true, // whether to fit to viewport
            padding: 10, // fit padding
            //center: true,
            //boundingBox: undefined,
            // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            //animate: true, // whether to transition the node positions
            //animationDuration: 1500, // duration of animation in ms if enabled
        };




        cy.layout(options);



    }
})(window);
