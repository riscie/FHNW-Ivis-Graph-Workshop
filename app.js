var cy = cytoscape({
    container: document.getElementById('cy'),

    elements: {
        nodes: [
            { data: { id: '0', name: 'Alfred Mauser' }, classes: "artist"},
            { data: { id: '1', name: 'Karl Lager' }, classes: "artist" },
            { data: { id: '2', name: 'Sandra Kunz' }, classes: "artist" },
            { data: { id: '3', name: 'Frederic Müller' }, classes: "artist" },
            { data: { id: '4', name: 'Kevin Kist' }, classes: "artist" },
            { data: { id: '5', name: 'Manfred Körig' }, classes: "artist"},
            { data: { id: '6', name: 'Alfredo Luigi' }, classes: "artist" },
            { data: { id: '7', name: 'Cesto Alani' }, classes: "artist" },
            { data: { id: '8', name: 'Mark Muster' }, classes: "artist" },
            { data: { id: '9', name: 'Franz Bell' }, classes: "artist" },

            { data: { id: '100', name: 'Bildpreis 2010' }, classes: "prize" },
            { data: { id: '101', name: 'Bildpreis 2012' }, classes: "prize" },
            { data: { id: '102', name: 'CulturePrize One' }, classes: "prize" },


        ],
        edges: [
            { data: { source: '0', target: '1' } },
            { data: { source: '1', target: '2' } },
            { data: { source: '1', target: '3' } },
            { data: { source: '9', target: '5' } },
            { data: { source: '1', target: '9' } },
            { data: { source: '6', target: '9' } },
            { data: { source: '6', target: '7' } },
            { data: { source: '8', target: '1' } },
            { data: { source: '2', target: '100' }, classes: "prize" },
            { data: { source: '4', target: '101' }, classes: "prize" },
            { data: { source: '1', target: '102' }, classes: "prize" }

        ]
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
            'font-size': '14',
            'background-color': '#ECD078'
        })
        .selector('node.prize')
        .css({
            'shape': 'star',
            'font-size': '18',
            'font-style': 'bold',
            'background-color': '#C02942',
        })
        .selector('edge.prize')
          .css({
            'width': '5px',
            'target-arrow-shape': 'triangle-tee'
          })



});

var options = {
  name: 'random',
  fit: true, // whether to fit to viewport
  padding: 10, // fit padding
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  animate: true, // whether to transition the node positions
  animationDuration: 1500, // duration of animation in ms if enabled
};

cy.layout( options );