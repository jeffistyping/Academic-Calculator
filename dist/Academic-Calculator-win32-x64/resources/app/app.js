var app = angular.module('calculator', []);
var app = angular.module("calculator", ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.

    when('/marks', {
        templateUrl: 'views/entergrades.html',
        controller: 'addGrades'
    }).


    when('/graphs', {
        templateUrl: 'views/viewgraphs.html',
        controller: 'graphs'
    }).

    otherwise({
        redirectTo: '/marks'
    });

}]);

app.controller('addGrades', function($scope) {
    $scope.name = 4;
    $scope.names = [1, 2, 3]
    $scope.totalWeight = 0;
    $scope.totalMarks = 0;
    $scope.onehundred = "";

    //Initalize Page
    $scope.showMarks = false;
    $scope.showGraph = false;

    $scope.shaker = function(){
        $("#btncalculate").addClass('errorShake');
        $('#btncalculate').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
  $('#btncalculate').delay(200).removeClass('errorShake');
});       
    }
    $scope.addField = function() {
        $scope.showMarks = false;
        $scope.showGraph = false;    
        $scope.names.push($scope.name);
        $scope.name++;
    }
    $scope.delField = function() {
        $scope.showMarks = false;
        $scope.showGraph = false;
        $scope.names.pop();
        $scope.name--;
    }
    $scope.calculate = function() {
        $scope.passingMark = 0;
        $scope.totalWeight = 0;
        $scope.totalMarks = 0;
        $scope.shownMark = 0;
        $scope.markValidation = 0; 
        var x;
        //
        for (x = 0; x < $scope.names.length; x++) { 
            var currentMark = parseFloat(document.getElementById("mark-" + x).value) * 0.01; //Mark in decimal representation
            var currentWeight = parseFloat(document.getElementById("wt-" + x).value);
            if(isNaN(currentMark) || isNaN(currentWeight) || currentMark == null || currentWeight == null ){
                continue;
            }
            else {
                $scope.markValidation = $scope.markValidation + currentMark;
                $scope.totalWeight = $scope.totalWeight + currentWeight;
                $scope.totalMarks = $scope.totalMarks + (currentWeight * currentMark);
            }
        }
        $scope.lastMark = 100 - $scope.totalWeight
        $scope.passingMark = Math.round((50 - $scope.totalMarks)/($scope.lastMark*0.01));
        if ($scope.totalWeight < 100 && $scope.totalWeight > 0) {
            $scope.showMarks = true;
            $scope.showGraph = true;
            $scope.onehundred = "Your Mark So Far: "
        }
        else if ($scope.totalWeight == 100){
            $scope.showMarks = true;
            $scope.showGraph = false;
            $scope.onehundred = "Your Mark in the Course: "
        } 
        else if ($scope.totalWeight > 100){
            $scope.showMarks = false;
            $scope.showGraph = false;
            $scope.shaker();
        }
        else{
            $scope.shaker();
        }
        var y;
        var chartboi = []
        for(y = 0; y < 10; y++){
            chartboi.push($scope.totalMarks + (0.1*(y+1)*$scope.lastMark)); 
        }
        var ctx = document.getElementById("myChart");
        ctx.innerHTML = "" ;
        var myChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"],
                datasets: [{
                    label: 'Final Mark',
                    data: chartboi,
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
});

