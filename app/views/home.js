if(Meteor.isClient)/*$(".button-collapse").sideNav();*/
{
    /*------------instellingen-------------*/
    var dataArray = [0.03, 0.04, 0.02, 0.05, 0.08, 0.08, 0.08, 0.06, 0.06, 0.04, 0.02, 0.05, 0.08, 0.07, 0.07, 0.06, 0.06, 0.03, 0.02, 0.05, 0.08, 0.10, 0.08, 0.06, 0.06, 0.05, 0.04, 0.05, 0.08, 0.10, 0.08, 0.06, 0.06, 0.04, 0.02, 0.05, 0.08, 0.10, 0.08, 0.06];
    var selectFijnstofValue = false;
    var checkboxFijnstofValue = 0.02;
    var serie = [];


    Template.account.rendered = function () {
        initInstellingen();

        $('#checkboxFijnstof').on('change', function () {

            $("#saveDivFijnstof").css({
                "display": "flex"
            });

        });

        $('#selectFijnstof').on('change', function () {
            $("#saveDivFijnstof").css({
                "display": "flex"
            });

        });

        $("#saveFijnstof").click(function (event) {
                event.preventDefault();
                console.log('save');
                selectFijnstofValue = $('#selectFijnstof').val();
                checkboxFijnstofValue = $('#checkboxFijnstof').is(":checked");
                console.log(selectFijnstofValue);
                console.log(checkboxFijnstofValue);
                Materialize.toast('veranderingen zijn opgeslagen', 4000); // 4000 is the duration of the toast
                $("#saveDivFijnstof").css({
                    "display": "none"
                });
            }
        );

        $("#cancelFijnstof").click(function (event) {
                event.preventDefault();
                $("#saveDivFijnstof").css({
                    "display": "none"
                });
                /*console.log(checkboxFijnstofValue);*/
                $('#checkboxFijnstof').prop('checked', checkboxFijnstofValue);
                console.log(selectFijnstofValue);


                Materialize.toast('veranderingen zijn niet opgeslagen', 4000); // 4000 is the duration of the toast

            }
        );


    };

    function initInstellingen() {
        loadSelect();
    }

    function loadSelect() {

        $('select').material_select();

    }


    /*------------home-------------*/

    Template.home.rendered = function () {
        init();
        setInterval(function () {
            init();
        }, 30000);

    };

    function init() {

        if (selectFijnstofValue === undefined || selectFijnstofValue === null) {
            console.log("geen waarde select");
            loadCharts(serie);


        } else {
            if (checkboxFijnstofValue === true) {
                console.log("checbox is true");

                serie = [selectFijnstofValue, selectFijnstofValue, selectFijnstofValue, selectFijnstofValue, selectFijnstofValue, selectFijnstofValue, selectFijnstofValue, selectFijnstofValue];
                console.log(serie);
                console.log(selectFijnstofValue);
                loadCharts(serie);

            } else {
                loadCharts(serie);
            }

        }


    }

    function loadCharts(serie) {
        var dataArrayGenerate = [dataArray[Math.floor(Math.random() * dataArray.length)], dataArray[Math.floor(Math.random() * dataArray.length)], dataArray[Math.floor(Math.random() * dataArray.length)], dataArray[Math.floor(Math.random() * dataArray.length)], dataArray[Math.floor(Math.random() * dataArray.length)], dataArray[Math.floor(Math.random() * dataArray.length)], dataArray[Math.floor(Math.random() * dataArray.length)]];
        /*------------------line chart--------------------------*/
// Our labels and three data series
        var data = {
            labels: ['Ma', 'Di', 'Wo', 'Do', 'Vrij', 'Za', 'Zo'],
            series: [
                dataArrayGenerate,
                serie
            ]
        };

// We are setting a few options for our chart and override the defaults
        var options = {
            /*ticks: [0.02, 0.04, 0.06, 0.08],*/

            /*fullWidth: true,*/
            /*showArea: true,*/
            showPoint: true,
            lineSmooth: false,
            // X-Axis specific configuration
            axisX: {
                showGrid: false,
                // and also show the label
                showLabel: true
            },
            // Y-Axis specific configuration
            axisY: {
                // Lets offset the chart a bit from the labels
                type: Chartist.FixedScaleAxis,
                low: 0,
                high: 0.1,
                ticks: [0.02, 0.04, 0.06, 0.08],
                labelInterpolationFnc: function (value) {
                    return value + "" + 'ppm';
                }
            }
        };

        new Chartist.Line('#fijnstof', data, options);

        /*----------------------pie chart top------------*/
        /*var chartPie = new Chartist.Pie('#topPie', {
         series: [70, 30],
         labels: [1]
         }, {
         donut: true,
         showLabel: false

         });
         chartPie.on('draw', function (data) {
         if (data.type === 'slice') {
         // Get the total path length in order to use for dash array animation
         var pathLength = data.element._node.getTotalLength();

         // Set a dasharray that matches the path length as prerequisite to animate dashoffset
         data.element.attr({
         'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
         });

         // Create animation definition while also assigning an ID to the animation for later sync usage
         var animationDefinition = {
         'stroke-dashoffset': {
         id: 'anim' + data.index,
         dur: 1000,
         from: -pathLength + 'px',
         to: '0px',
         easing: Chartist.Svg.Easing.easeOutQuint,
         // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
         fill: 'freeze'
         }
         };

         // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
         if (data.index !== 0) {
         animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
         }

         // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
         data.element.attr({
         'stroke-dashoffset': -pathLength + 'px'
         });

         // We can't use guided mode as the animations need to rely on setting begin manually
         // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
         data.element.animate(animationDefinition, false);
         }
         });
         */
// For the sake of the example we update the chart every time it's created with a delay of 8 seconds
        /* chart.on('created', function() {
         if(window.__anim21278907124) {
         clearTimeout(window.__anim21278907124);
         window.__anim21278907124 = null;
         }
         window.__anim21278907124 = setTimeout(chart.update.bind(chart), 10000);
         });*/

    }
}


/*Template.index.events({

 'scroll': function() {
 console.log("scrollHeight");
 var scrollHeight = $(window).scrollTop();
 console.log(scrollHeight);
 if (scrollHeight > 170 && !$(".pageDescription").hasClass("logoTop")) {
 $(".pageDescription").toggleClass("logoTop").animate({
 opacity: 1.0
 }).css({});

 }
 if (scrollHeight < 170 && $(".pageDescription").hasClass("logoTop")) {

 $(".pageDescription").toggleClass("logoTop");
 }
 }
 });
 */
