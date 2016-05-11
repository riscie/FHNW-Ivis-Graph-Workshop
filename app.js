(function(win) {

    var _startYear = 1955,
        _step = 5;

    // init functions
    initSlider(_startYear, _step);
    setSliderValueText(_startYear, _startYear + _step);

    // load init data
    loadJSONData(_startYear, _startYear + _step);

    $("#js_slider").on("change", function(event, ui) {
        /*
        var startYear = parseInt($(this).val());
        var endYear = startYear + 10;
        $("#yearText").text(startYear + ' - ' + endYear);
        var apiUrl = '/api/api.php?startYear=' + startYear + '&endYear=' + endYear;
        $.getJSON(apiUrl, processJSON);
        */
        // get slider data
        var startYear = parseInt($(this).val());
        var endYear = startYear + 10;

        // set html text
        setSliderValueText(startYear, endYear);

        // load data from API
        loadJSONData(startYear, endYear);
    });

    //$.getJSON('/api/api.php', processJSON);

    function initSlider(startYear, step) {
        var $slider = $('#js_slider')
            .attr('value', startYear)
            .attr('type', 'range')
            .attr('step', step)
            .attr('min', 1890)
            .attr('max', 2020)
    }

    // load data from api
    function loadJSONData(startYear, endYear) {
        var apiUrl = '/api/api.php';
        // add startYear and endYear parameter to URL if set
        if(startYear !== undefined && endYear !== undefined) {
            apiUrl += '?startYear=' + startYear + '&endYear=' + endYear;
        }
        // load data from API
        $.getJSON(apiUrl, processJSON);
    }

    function setSliderValueText(startYear, endYear) {
        $("#js_yearText").text(startYear + ' - ' + endYear);
    }

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
